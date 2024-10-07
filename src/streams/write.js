import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const fileToWrite = 'files/fileToWrite.txt';
  const filePath = join(__dirname, fileToWrite);

  const writeStream = createWriteStream(filePath);

  // Pipe the data from process.stdin to the writable stream
  process.stdin.pipe(writeStream);

  // Handle events for the Writable stream
  writeStream.on('finish', () => {
    console.log(`Write operation completed. Data written to ${fileToWrite}`);
  });

  writeStream.on('error', (error) => {
    console.error(`FS operation failed: ${error.message}`);
  });
};

await write();
