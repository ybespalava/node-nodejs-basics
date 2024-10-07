import { createReadStream } from 'fs';
import { createHash } from 'crypto';

const calculateHash = async () => {
    const fileToCalculateHashFor = 'files/fileToCalculateHashFor.txt';
  const hash = createHash('sha256');

  return new Promise((resolve, reject) => {
    const stream = createReadStream(fileToCalculateHashFor);

    stream.on('data', (chunk) => {
      hash.update(chunk);
    });

    stream.on('end', () => {
      const hashResult = hash.digest('hex');
      console.log(`SHA256 hash for ${fileToCalculateHashFor}: ${hashResult}`);
      resolve(hashResult);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
};

await calculateHash();
