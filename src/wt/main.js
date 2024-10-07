import { Worker } from 'worker_threads';
import os from 'os';

const performCalculations = async () => {
      const numCPUs = os.cpus().length;
  const workers = [];
  const results = [];

  const workerPromises = Array.from({ length: numCPUs }, (_, index) => {
    const workerData = index + 10;
    return new Promise((resolve, reject) => {
      const worker = new Worker('./worker.js', { workerData });

      worker.on('message', (message) => {
        results.push({ status: 'resolved', data: message });
        resolve();
      });

      worker.on('error', (error) => {
        results.push({ status: 'error', data: null });
        reject(error);
      });

      workers.push(worker);
    });
  });

  await Promise.all(workerPromises);

  console.log(results);

  workers.forEach(worker => worker.terminate());
};

await performCalculations();
