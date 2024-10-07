import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const write = async () => {
  const fileName = "fileToWrite.txt";

  const currentModulePath = dirname(fileURLToPath(import.meta.url));

  const filePath = path.resolve(currentModulePath, "files", fileName);

  const writeStream = createWriteStream(filePath);

  console.log(filePath);

  try {
    console.log(
      "Please write some text. After writing the text press CTRL + C to exit and check FileToWrite.txt"
    );
    await pipeline(process.stdin, writeStream);
  } catch (error) {
    console.error("Write operation failed:", error);
    console.error(error.stack);
  }
};

await write();
