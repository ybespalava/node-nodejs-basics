import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const spawnChildProcess = async (args) => {
  const currentDir = dirname(fileURLToPath(import.meta.url));

  const childModule = path.resolve(currentDir, "files", "script.js");
  const childProcess = spawn("node", [childModule, ...args]);

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
};

spawnChildProcess(["node", "js"]);
