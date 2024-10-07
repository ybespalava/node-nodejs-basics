import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const archivePath = join(__dirname, 'archive.gz');
  const decompressedFilePath = join(__dirname, 'fileToCompress.txt');

  const readStream = createReadStream(archivePath);

  const gunzipStream = createGunzip();

  const writeStream = createWriteStream(decompressedFilePath);

  readStream.pipe(gunzipStream).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log(`Decompression completed. File decompressed to ${decompressedFilePath}`);
  });

  writeStream.on('error', (error) => {
    console.error(`Decompression failed: ${error.message}`);
  });
};

await decompress();
