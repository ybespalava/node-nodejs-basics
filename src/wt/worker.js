import { parentPort, workerData, isMainThread } from 'worker_threads';

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = (result) => {

  if (isMainThread) {
    console.error('This function should be called from a worker thread');
    return;
  }


  parentPort.postMessage(result);
};

if (!isMainThread) {

  const n = workerData;
  const result = nthFibonacci(n);
  sendResult(result);
}
