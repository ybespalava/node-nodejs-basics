import { promises as fsPromises, constants } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const sourceFolder = 'files';
  const destinationFolder = 'files_copy';
  const sourceFolderPath = join(__dirname, sourceFolder);
  const destinationFolderPath = join(__dirname, destinationFolder);

  try {
    // Check if the source folder exist
    await fsPromises.access(sourceFolderPath, constants.R_OK);

    try {
      // Check if the destination folder already exists
      await fsPromises.access(destinationFolderPath, constants.R_OK);
      throw new Error('FS operation failed: Destination folder already exists');
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fsPromises.mkdir(destinationFolderPath);

        const files = await fsPromises.readdir(sourceFolderPath);

        for (const file of files) {
          const sourcePath = join(sourceFolderPath, file);
          const destinationPath = join(destinationFolderPath, file);
          await fsPromises.copyFile(sourcePath, destinationPath);
        }

        console.log(`Folder ${sourceFolder} copied to ${destinationFolder}`);
      } else {
        throw error;
      }
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: Source folder does not exist');
    } else {
      throw error;
    }
  }
};

await copy();
