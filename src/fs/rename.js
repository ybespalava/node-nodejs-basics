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
  const newFileExtension = extname(newFileName).toLowerCase();

  try {
    console.log(`Checking if the old file exists: ${oldFilePath}`);

    // Check if the source file exists
    await fsPromises.access(oldFilePath, constants.R_OK);

    try {
      console.log(`Checking if the new file already exists: ${newFilePath}`);

      // Check if the destination file already exists
      await fsPromises.access(newFilePath, constants.R_OK);

      // If the file exists, throw an error
      throw new Error('FS operation failed: Destination file already exists');
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Check if the new file has a valid extension
        if (!newFileExtension.includes('md')) {
          throw new Error('FS operation failed: Invalid file extension for destination file');
        }

        // Proceed with renaming the file
        await fsPromises.rename(oldFilePath, newFilePath);
        console.log(`File ${oldFileName} renamed to ${newFileName}`);
      } else {
        throw error; // Rethrow other errors
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);

    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: Source file does not exist');
    } else {
      throw error; // Rethrow any other errors
    }
  }
};

// Execute the function
await rename();
