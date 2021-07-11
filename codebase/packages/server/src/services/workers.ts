import { Worker } from 'worker_threads';
import path from 'path';
import os from 'os';

import { partition } from '../utils/array';

export const spawnWorkers = <T, P>(workerName: string, list: T[], payload: P) => {
  const cpuCount = os.cpus().length - 1;
  console.log('cpuCount', cpuCount);
  const partitions = partition(list, cpuCount);

  for (const partition of partitions) {
    const worker = new Worker(path.resolve(__dirname, '..', 'workers', 'worker.js'), {
      workerData: {
        list: partition,
        payload,
        path: workerName,
      },
    });

    const workerId = worker.threadId;
    console.log(`Spawn worker with ID: ${workerId}`);

    worker.on('message', (msg) => {
      console.log(`Message from ${workerId}: ${msg}`);
    });

    worker.on('error', (err) => {
      console.log(`An error occurred in the worker with ID ${workerId}: ${JSON.stringify(err)}`);
    });

    worker.on('exit', (code) => {
      console.log(`Worker with ID ${workerId} terminated with code: ${code}`);
    });
  }
};
