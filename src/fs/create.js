import { promises as fsPromises } from 'fs';
import { join } from 'path';

const create = async () => {
  const fileName = 'fresh.txt';
  const folderPath = 'files';
  const filePath = join(folderPath, fileName);
  const fileContent = 'I am fresh and young';

  try {
    await fsPromises.access(filePath);

    throw new Error('FS operation failed: File already exists');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fsPromises.writeFile(filePath, fileContent);
      console.log(`File ${fileName} created successfully at ${folderPath}`);
    } else {
      throw error;
    }
  }
};

await create();
