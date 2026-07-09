import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load progress data
const progressPath = join(__dirname, '../../data/progress.json');
const tasksPath = join(__dirname, '../../data/generatedTasks.json');

/**
 * Recalculates progress based on current task statuses
 */
function recalculateProgress() {
  const tasksData = JSON.parse(readFileSync(tasksPath, 'utf-8'));

  // Count tasks by category and status
  const categoryCounts = {};
  let totalComplete = 0;
  let totalTasks = tasksData.tasks.length;

  tasksData.tasks.forEach((task) => {
    if (!categoryCounts[task.category]) {
      categoryCounts[task.category] = { completed: 0, total: 0 };
    }

    categoryCounts[task.category].total += 1;

    if (task.status === 'COMPLETE') {
      categoryCounts[task.category].completed += 1;
      totalComplete += 1;
    }
  });

  // Build progress object
  const progress = {
    overall: {
      completed: totalComplete,
      total: totalTasks,
      percentage: Math.round((totalComplete / totalTasks) * 100),
    },
    categories: [],
  };

  // Map category names to display names
  const categoryNameMap = {
    'DEV ENVIRONMENT': 'Dev Env',
    'BLACK TAB (BT)': 'BT',
    'ADMIN / DOCS': 'Admin',
  };

  Object.entries(categoryCounts).forEach(([category, counts]) => {
    progress.categories.push({
      name: categoryNameMap[category] || category,
      completed: counts.completed,
      total: counts.total,
      percentage: Math.round((counts.completed / counts.total) * 100),
    });
  });

  // Save updated progress
  writeFileSync(progressPath, JSON.stringify(progress, null, 2), 'utf-8');

  return progress;
}

/**
 * GET /api/progress/:userId
 * Returns progress summary for a user
 */
router.get('/:userId', (req, res) => {
  // Recalculate progress from current task state
  const progress = recalculateProgress();
  res.json(progress);
});

export default router;
