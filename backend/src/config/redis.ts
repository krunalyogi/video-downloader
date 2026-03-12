import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);
const redisPassword = process.env.REDIS_PASSWORD;

const redisOptions = {
    maxRetriesPerRequest: null, // Required by BullMQ
    retryStrategy: (times: number) => {
        if (times > 3) {
            console.warn('[Redis] Max retries reached, giving up.');
            return null; // Stop retrying
        }
        return Math.min(times * 50, 2000);
    }
};

export const connection = redisUrl 
    ? new Redis(redisUrl, redisOptions)
    : new Redis({
        host: redisHost,
        port: redisPort,
        password: redisPassword,
        ...redisOptions
    });

connection.on('error', () => {
    // Silently suppress expected local connection errors
});

connection.on('connect', () => {
    console.log('[Redis] Connected successfully');
});
