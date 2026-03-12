import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: SocketIOServer;

export const initSocket = (server: HttpServer) => {
    io = new SocketIOServer(server, {
        cors: {
            origin: process.env.FRONTEND_URL || '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`[Socket.io] Client connected: ${socket.id}`);

        // Client can join a specific room for their job using the job ID
        socket.on('subscribe_job', (jobId: string) => {
            console.log(`[Socket.io] Client ${socket.id} subscribed to job: ${jobId}`);
            socket.join(`job_${jobId}`);
        });

        socket.on('disconnect', () => {
            console.log(`[Socket.io] Client disconnected: ${socket.id}`);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};
