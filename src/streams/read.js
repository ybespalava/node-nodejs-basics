import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const read = async () => {
  const fileName = "fileToRead.txt";

  const currentModulePath = dirname(fileURLToPath(import.meta.url));

  const filePath = path.resolve(currentModulePath, "files", fileName);

  const readStream = createReadStream(filePath);

  try {
    await pipeline(readStream, process.stdout);
  } catch (error) {
    console.error("Read operation failed:", error);
  }
};

await read();
