const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const projectRoot = '/home/prabesh/Documents/IntelligenceReconSystem';
const venvPython = path.join(projectRoot, 'venv', 'bin', 'python');
const installScript = path.join(projectRoot, 'install.sh');

function ensureProjectSetup() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(venvPython)) {
      resolve();
      return;
    }

    if (!fs.existsSync(projectRoot)) {
      reject(new Error(`Project folder not found: ${projectRoot}`));
      return;
    }

    const scriptToRun = fs.existsSync(installScript) ? installScript : null;
    const child = spawn(
      scriptToRun ? 'bash' : 'python3',
      scriptToRun ? [installScript] : ['-m', 'venv', path.join(projectRoot, 'venv')],
      {
        cwd: projectRoot,
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
        reject(new Error(`Setup exited with code ${code}`));
      }
    });
  });
}

ensureProjectSetup()
  .then(() => {
    console.log('Intelligence Recon System setup complete.');
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
