import { Worker } from 'worker_threads';
import path from 'path';
import os from 'os';

import { partition } from '../utils/array';

export const standardWorkersCount = () => os.cpus().length - 1;

export const spawnWorkers = <T, P>(workerName: string, list: T[], payload: P, count: number) => {
  const partitions = partition(list, count);

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
