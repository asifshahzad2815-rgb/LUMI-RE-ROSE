import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const docsDir = path.join(rootDir, 'docs');

try {
  if (fs.existsSync(distDir)) {
    fs.rmSync(docsDir, { recursive: true, force: true });
    fs.cpSync(distDir, docsDir, { recursive: true });
    fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');
    console.log('✓ Successfully synced build output to docs/ for GitHub Pages (Branch -> /docs deployment).');
  } else {
    console.warn('! Dist directory not found, skipping docs sync.');
  }
} catch (err) {
  console.error('Error syncing docs directory:', err);
}
