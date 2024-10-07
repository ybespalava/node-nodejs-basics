import { promises as fsPromises, constants } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const fileToRead = 'files/fileToRead.txt';
  const filePath = join(__dirname, fileToRead);

  try {
    await fsPromises.access(filePath, constants.R_OK);
    const content = await fsPromises.readFile(filePath, 'utf-8');
    console.log(`Content of ${fileToRead}:`);
    console.log(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: File does not exist');
    } else {
      throw error;
    }
  } 
};

await read();
