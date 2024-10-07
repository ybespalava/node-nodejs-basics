import { promises as fsPromises, constants } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const fileToRemove = 'files/fileToRemove.txt';
  const filePath = join(__dirname, fileToRemove);

  try {
    await fsPromises.access(filePath, constants.R_OK);

    await fsPromises.unlink(filePath);
    console.log(`File ${fileToRemove} successfully removed`);
  } catch (error) {

    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: File does not exist');
    } else {

      throw error;
    }
  }
};

await remove();
