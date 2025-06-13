import cluster from 'cluster';
import os from 'os';
import http from 'http';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);
    console.log(`Forking ${numCPUs} workers...`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Optional: listen for worker exits
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited. Spawning a new one.`);
        cluster.fork();
    });

} else {
    // Workers can share any TCP connection
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Handled by worker ${process.pid}\n`);
    }).listen(3000);

    console.log(`Worker ${process.pid} started`);
}
