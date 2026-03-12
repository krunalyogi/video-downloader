import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { createServer } from 'http';
import { initSocket } from './socket';

// Import config and routes
import { connectDB } from './config/db';
import { connection as redisClient } from './config/redis';
import apiRoutes from './routes';
import imageRoutes from './routes/imageRoutes';
import jobRoutes from './routes/jobRoutes';
import aiRoutes from './routes/aiRoutes';
import videoRoutes from './routes/videoRoutes';

dotenv.config({ override: true });

// Suppress noisy network errors in local dev so it doesn't pollute the user's terminal
process.on('uncaughtException', (err: any) => {
    if (err?.code === 'ECONNREFUSED' || String(err).includes('ECONNREFUSED')) return;
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason: any) => {
    if (reason?.code === 'ECONNREFUSED' || String(reason).includes('ECONNREFUSED')) return;
    console.error('Unhandled Rejection:', reason);
});

const app: Express = express();
const httpServer = createServer(app);

// Initialize WebSockets
initSocket(httpServer);

// Security headers via helmet
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for now (would block CDN resources)
  crossOriginEmbedderPolicy: false,
}))

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'https://klipto.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (mobile apps, curl, server-side)
    if (!origin) return callback(null, true);
    // Allow exact matches OR any Vercel preview deployment (*.vercel.app)
    const isAllowed = allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin);
    if (!isAllowed) {
      return callback(new Error('CORS: Origin not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting (Redis Backed for Production, Fallback to Memory)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  // Only use RedisStore if Redis is actually connected to avoid crashes
  ...(process.env.NODE_ENV === 'production' || redisClient.status === 'ready' ? {
    store: new RedisStore({
      // @ts-expect-error - Type mismatch between rate-limit-redis and ioredis
      sendCommand: (...args: string[]) => redisClient.call(...args),
    })
  } : {})
});
app.use('/api', limiter);

// Connect to Database
connectDB();

// API Routes
app.use('/api', apiRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/ai', aiRoutes);

// Base Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Klipto API is running ✓', uptime: process.uptime() });
});

// Start Server using the HTTP server (not app) so WebSockets work
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // ── Keep-alive self-ping (prevents Render free tier cold starts) ──────────
  // Render spins down free services after 15 minutes of inactivity.
  // We ping ourselves every 10 minutes to stay warm.
  if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
    const selfUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
    setInterval(async () => {
      try {
        const fetch = (await import('node-fetch')).default;
        await fetch(selfUrl);
        console.log('[KeepAlive] Self-ping sent to', selfUrl);
      } catch {
        // Non-fatal — best effort keep-alive
      }
    }, 10 * 60 * 1000); // Every 10 minutes
    console.log('[KeepAlive] Self-ping enabled — backend will stay warm');
  }
});
