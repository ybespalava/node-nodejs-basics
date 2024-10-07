import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const fileToCompress = 'files/fileToCompress.txt';
  const filePath = join(__dirname, fileToCompress);
  const archivePath = join(__dirname, 'archive.gz');

  const readStream = createReadStream(filePath);

  const gzipStream = createGzip();

  const writeStream = createWriteStream(archivePath);

  readStream.pipe(gzipStream).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log(`Compression completed. File compressed to ${archivePath}`);
  });

  writeStream.on('error', (error) => {
    console.error(`Compression failed: ${error.message}`);
  });
};

await compress();
