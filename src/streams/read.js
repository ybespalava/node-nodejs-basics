import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const fileToRead = 'files/fileToRead.txt';
  const filePath = join(__dirname, fileToRead);

  const readStream = createReadStream(filePath);

  readStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on('end', () => {
    console.log('\nRead operation completed');
  });

  readStream.on('error', (error) => {
    console.error(`FS operation failed: ${error.message}`);
  });
};

await read();
