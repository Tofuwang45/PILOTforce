/**
 * Shared in-memory data store.
 *
 * Seed JSON is read from disk ONCE at import time into mutable module-level
 * objects. Because ESM modules are singletons, every route imports the SAME
 * objects and mutates shared state. Nothing is ever written back to disk, so
 * the committed seed stays pristine and state resets cleanly on each restart.
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function readSeed(name) {
  return JSON.parse(readFileSync(join(__dirname, name), 'utf-8'));
}

// Mutable in-memory state (structuredClone keeps the on-disk seed untouched).
export const tasksData = readSeed('generatedTasks.json');
export const userProfile = readSeed('userProfile.json');
export const managerConfig = readSeed('managerConfig.json');
export const aiLiteracy = readSeed('aiLiteracy.json');
export const activityFeed = readSeed('agentActivity.json').activities;

// Progress is seeded from progress.json (the contract's 1/12, 8% baseline) and
// then maintained incrementally as tasks complete.
export const progress = readSeed('progress.json');

// Maps a task category to its progress-summary display name.
const CATEGORY_DISPLAY = {
  'DEV ENVIRONMENT': 'Dev Env',
  'BLACK TAB (BT)': 'BT',
  'ADMIN / DOCS': 'Admin',
};

/**
 * Records that a task in the given category just transitioned to COMPLETE,
 * bumping the overall and per-category counters (clamped to their totals).
 */
export function recordTaskCompletion(category) {
  const bump = (entry) => {
    if (entry && entry.completed < entry.total) {
      entry.completed += 1;
      entry.percentage = Math.round((entry.completed / entry.total) * 100);
    }
  };

  bump(progress.overall);
  const displayName = CATEGORY_DISPLAY[category] || category;
  bump(progress.categories.find((c) => c.name === displayName));
}

/** Prepends an activity item to the in-memory feed, keeping the newest 20. */
export function addActivity(item) {
  activityFeed.unshift(item);
  if (activityFeed.length > 20) activityFeed.length = 20;
}
