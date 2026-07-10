// Copies the Salesforce Lightning Design System static assets (CSS + icon
// sprites) from node_modules into public/slds so Vite can serve them directly
// and the SVG sprite url()s resolve at runtime. Runs automatically before
// dev/build (see package.json "predev"/"prebuild"). Idempotent.

import { cpSync, existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const src = resolve(root, 'node_modules/@salesforce-ux/design-system/assets');
const dest = resolve(root, 'public/slds');

if (!existsSync(src)) {
  console.error('[copy-slds] @salesforce-ux/design-system not installed — run npm install first.');
  process.exit(0); // don't hard-fail the build; SLDS just won't be themed
}

mkdirSync(dest, { recursive: true });
for (const part of ['styles', 'icons']) {
  cpSync(resolve(src, part), resolve(dest, part), { recursive: true });
}
console.log('[copy-slds] SLDS assets copied to public/slds');
