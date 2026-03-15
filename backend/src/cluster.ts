import cluster from 'cluster';
import os from 'os';
import { runServer } from './server';

// Determine how many CPUs are available to spawn workers
// Use 1 less than max so the OS stays responsive, but minimum 1.
const numCPUs = Math.max(1, os.cpus().length - 1);

if (cluster.isPrimary) {
    console.log(`[Cluster] Primary ${process.pid} is running`);
    console.log(`[Cluster] Spawning ${numCPUs} worker processes to handle concurrent video downloads...`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Attempt to restart dead workers to ensure high availability
    cluster.on('exit', (worker, code, signal) => {
        console.warn(`[Cluster] Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        console.log('[Cluster] Starting a new worker...');
        cluster.fork();
    });

} else {
    // Workers share the TCP connection in this block
    console.log(`[Cluster] Worker ${process.pid} started`);
    runServer();
}
