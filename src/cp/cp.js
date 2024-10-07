import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {

  const childProcess = spawn('node', ['script.js', ...args], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });

  childProcess.stdout.on('data', (data) => {
    console.log(`Received from child process: ${data.toString()}`);
  });

  process.stdin.on('data', (data) => {
    childProcess.stdin.write(data);
  });

  childProcess.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
    process.stdin.end(); 
  });
};

spawnChildProcess(['arg1', 'arg2']);
