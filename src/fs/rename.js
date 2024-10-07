import { promises as fsPromises, constants } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
      const oldFileName = 'wrongFilename.txt';
  const newFileName = 'properFilename.md';
  const oldFilePath = join(__dirname, 'files', oldFileName);
  const newFilePath = join(__dirname, 'files', newFileName);
  const fileExtension = extname(newFileName).toLowerCase();

  try {
    console.log(`Checking if the old file exists: ${oldFilePath}`);

    await fsPromises.access(oldFilePath, constants.R_OK);

    try {
 
      console.log(`Checking if the new file already exists: ${newFilePath}`);

      await fsPromises.access(newFilePath, constants.R_OK);

      throw new Error('FS operation failed: Destination file already exists');
    } catch (error) {

      if (error.code === 'ENOENT') {
        const fileExtension = extname(oldFileName);


console.log(`File extension for destination file: ${fileExtension}`);
if (!fileExtension.includes('md')) {
  throw new Error('FS operation failed: Invalid file extension for destination file');
}


        await fsPromises.rename(oldFilePath, newFilePath);
        console.log(`File ${oldFileName} renamed to ${newFileName}`);
      } else {

        throw error;
      }
    }
  } catch (error) {

    console.error(`Error: ${error.message}`);


    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: Source file does not exist');
    } else {
      throw error;
    }
  }
};

await rename();
