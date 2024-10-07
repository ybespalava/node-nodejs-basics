import { promises as fsPromises, constants } from 'fs';
import { join } from 'path';

const list = async () => {
      const folderPath = 'files';

  try {
    await fsPromises.access(folderPath, constants.R_OK);

    const files = await fsPromises.readdir(folderPath);
    console.log('List of files in the folder:');
    files.forEach(file => console.log(file));
  } catch (error) {
    // If the error is due to the folder not existing, rethrow it
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: Folder does not exist');
    } else {
      throw error;
    }
  }
};

await list();
