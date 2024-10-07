import { Transform } from 'stream';

const transform = async () => {

  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().split('').reverse().join('');
      this.push(reversedChunk);
      callback();
    }
  });
  
  process.stdin.pipe(reverseTransform).pipe(process.stdout);

  reverseTransform.on('finish', () => {
    console.log('Transform operation completed');
  });

  reverseTransform.on('error', (error) => {
    console.error(`Transform operation failed: ${error.message}`);
  });
};

await transform();
