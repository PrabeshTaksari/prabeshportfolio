import path from 'node:path';
import fs from 'node:fs';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const projectRoot = '/home/prabesh/Documents/IntelligenceReconSystem';
const pythonExecutable = path.join(projectRoot, 'venv', 'bin', 'python');
const appEntry = path.join(projectRoot, 'app', 'main.py');
const installScript = path.join(projectRoot, 'install.sh');
const printerProjectRoot = '/home/prabesh/Downloads/Printer-ecommerce-site-main/Group Course work/Group Course work';

function isIrsRunning(): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.get('http://127.0.0.1:8080/api/health', (res) => {
      res.resume();
      resolve(res.statusCode !== undefined && res.statusCode >= 200 && res.statusCode < 500);
    });

    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function hasIrsFiles(): boolean {
  return fs.existsSync(projectRoot) && fs.existsSync(appEntry);
}

function ensureSetup(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(pythonExecutable)) {
      resolve();
      return;
    }

    if (!fs.existsSync(projectRoot)) {
      reject(new Error(`Project folder not found: ${projectRoot}`));
      return;
    }

    const child = spawn(
      fs.existsSync(installScript) ? 'bash' : 'python3',
      fs.existsSync(installScript) ? [installScript] : ['-m', 'venv', path.join(projectRoot, 'venv')],
      {
        cwd: projectRoot,
        env: { ...process.env, PYTHONUNBUFFERED: '1' },
        stdio: 'inherit',
      }
    );

    child.on('error', (error) => {
      reject(error);
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Intelligence Recon System setup exited with code ${code}`));
      }
    });
  });
}

function isPrinterSiteRunning(): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.get('http://127.0.0.1:8010/html/index.html', (res) => {
      res.resume();
      resolve(res.statusCode !== undefined && res.statusCode >= 200 && res.statusCode < 500);
    });

    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function startIrsProcess(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(pythonExecutable)) {
      reject(new Error(`Missing Python virtual environment for Intelligence Recon System at: ${pythonExecutable}`));
      return;
    }

    if (!fs.existsSync(appEntry)) {
      reject(new Error(`Missing app entry point at: ${appEntry}`));
      return;
    }

    const child = spawn(pythonExecutable, ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8080'], {
      cwd: projectRoot,
      env: { ...process.env, PYTHONUNBUFFERED: '1' },
      stdio: 'inherit',
    });

    child.on('error', (error) => {
      reject(error);
    });

    const checkInterval = setInterval(async () => {
      const running = await isIrsRunning();
      if (running) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
      reject(new Error('Timed out while starting the Intelligence Recon System.'));
    }, 15000);

    child.on('exit', (code) => {
      clearInterval(checkInterval);
      clearTimeout(timeout);

      if (code !== 0) {
        reject(new Error(`Intelligence Recon System exited with code ${code}`));
      }
    });
  });
}

function startPrinterSiteProcess(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(printerProjectRoot)) {
      reject(new Error(`Missing printer project folder at: ${printerProjectRoot}`));
      return;
    }

    const child = spawn('python3', ['-m', 'http.server', '8010', '--directory', printerProjectRoot], {
      stdio: 'inherit',
    });

    child.on('error', (error) => {
      reject(error);
    });

    const checkInterval = setInterval(async () => {
      const running = await isPrinterSiteRunning();
      if (running) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
      reject(new Error('Timed out while starting the local printer website.'));
    }, 10000);

    child.on('exit', (code) => {
      clearInterval(checkInterval);
      clearTimeout(timeout);

      if (code !== 0) {
        reject(new Error(`Printer website server exited with code ${code}`));
      }
    });
  });
}

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    hmr: {
      host: '0.0.0.0',
      port: 5173,
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'start-irs-on-demand',
      configureServer(server) {
        server.middlewares.use('/api/irs-status', async (_req, res) => {
          try {
            const running = await isIrsRunning();

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              ok: true,
              running,
              hasFiles: hasIrsFiles(),
            }));
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: false, message }));
          }
        });

        server.middlewares.use('/api/setup-irs', async (_req, res) => {
          try {
            const alreadyRunning = await isIrsRunning();

            if (!alreadyRunning) {
              await ensureSetup();
              await startIrsProcess();
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, started: !alreadyRunning }));
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: false, message }));
          }
        });

        server.middlewares.use('/api/start-irs', async (_req, res) => {
          try {
            const alreadyRunning = await isIrsRunning();

            if (!alreadyRunning) {
              await ensureSetup();
              await startIrsProcess();
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, started: !alreadyRunning }));
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: false, message }));
          }
        });

        server.middlewares.use('/api/start-printer-site', async (_req, res) => {
          try {
            const alreadyRunning = await isPrinterSiteRunning();

            if (!alreadyRunning) {
              await startPrinterSiteProcess();
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, started: !alreadyRunning }));
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: false, message }));
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
