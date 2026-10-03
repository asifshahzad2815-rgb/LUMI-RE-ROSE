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
    // 1. Sync to docs/ for GitHub Pages (Branch -> /docs)
    fs.rmSync(docsDir, { recursive: true, force: true });
    fs.cpSync(distDir, docsDir, { recursive: true });
    fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');
    console.log('✓ Successfully synced build output to docs/ for GitHub Pages (Branch -> /docs deployment).');

    // 2. Sync assets to root assets/ for GitHub Pages (Branch -> / (root) deployment)
    const rootAssetsDir = path.join(rootDir, 'assets');
    const distAssetsDir = path.join(distDir, 'assets');
    if (fs.existsSync(distAssetsDir)) {
      fs.rmSync(rootAssetsDir, { recursive: true, force: true });
      fs.cpSync(distAssetsDir, rootAssetsDir, { recursive: true });

      // Find primary JS and CSS files and create stable aliases index-bundle.js / index-bundle.css
      const files = fs.readdirSync(distAssetsDir);
      const jsEntry = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
      const cssEntry = files.find(f => f.startsWith('index-') && f.endsWith('.css'));

      if (jsEntry) {
        fs.copyFileSync(path.join(distAssetsDir, jsEntry), path.join(rootAssetsDir, 'index-bundle.js'));
      }
      if (cssEntry) {
        fs.copyFileSync(path.join(distAssetsDir, cssEntry), path.join(rootAssetsDir, 'index-bundle.css'));
      }
      console.log('✓ Successfully synced compiled assets to root assets/ for direct root deployment.');
    }
  } else {
    console.warn('! Dist directory not found, skipping docs sync.');
  }
} catch (err) {
  console.error('Error syncing docs and assets directory:', err);
}
