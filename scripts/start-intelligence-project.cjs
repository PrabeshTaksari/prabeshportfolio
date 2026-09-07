const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const projectRoot = '/home/prabesh/Documents/IntelligenceReconSystem';
const pythonExecutable = path.join(projectRoot, 'venv', 'bin', 'python');
const appEntry = path.join(projectRoot, 'app', 'main.py');
const healthUrl = 'http://127.0.0.1:8080/api/health';

function isRunning() {
  return new Promise((resolve) => {
    const req = http.get(healthUrl, (res) => {
      res.resume();
      resolve(res.statusCode >= 200 && res.statusCode < 500);
    });

    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function startBackend() {
  const env = { ...process.env, PYTHONUNBUFFERED: '1' };

  const child = spawn(pythonExecutable, ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8080'], {
    cwd: projectRoot,
    env,
    stdio: 'inherit',
  });

  child.on('error', (error) => {
    console.error('Failed to start the Intelligence Recon System:', error.message);
    process.exit(1);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Intelligence Recon System exited with code ${code}`);
      process.exit(code || 1);
    }
  });
}

async function main() {
  if (!fs.existsSync(pythonExecutable)) {
    console.error('Missing Python virtual environment for Intelligence Recon System at:', pythonExecutable);
    console.error('Create it first or point to the correct Python interpreter.');
    process.exit(1);
  }

  if (!fs.existsSync(appEntry)) {
    console.error('Missing app entry point at:', appEntry);
    process.exit(1);
  }

  const running = await isRunning();
  if (running) {
    console.log('Intelligence Recon System is already running on http://localhost:8080');
    return;
  }

  console.log('Starting Intelligence Recon System on http://localhost:8080...');
  startBackend();
}

main();
