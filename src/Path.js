import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

const getPaths = (url) => {
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);
  return { __filename, __dirname };
};

const getPathToFile = (url, ...files) => {
  const __dirname = dirname(fileURLToPath(url));
  const pathToFile = path.join(__dirname, ...files);
  return pathToFile;
};

export { getPaths, getPathToFile };
