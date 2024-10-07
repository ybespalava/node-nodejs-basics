import { Transform } from "stream";
import { pipeline } from "stream/promises";

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, _, callback) {
      const reversedText = chunk.toString().split("").reverse().join("");
      this.push(reversedText);
      callback();
    },
  });

  try {
    await pipeline(process.stdin, reverseTransform, process.stdout);
    console.log("Transform operation complete.");
  } catch (error) {
    console.error("Transform operation failed:", error);
  }
};

await transform();
