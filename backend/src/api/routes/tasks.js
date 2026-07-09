import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load tasks data
const tasksPath = join(__dirname, '../../data/generatedTasks.json');
let tasksData;

function loadTasks() {
  tasksData = JSON.parse(readFileSync(tasksPath, 'utf-8'));
}

function saveTasks() {
  writeFileSync(tasksPath, JSON.stringify(tasksData, null, 2), 'utf-8');
}

// Initialize on module load
loadTasks();

/**
 * GET /api/tasks/:userId
 * Returns all tasks grouped by category
 */
router.get('/:userId', (req, res) => {
  // Group tasks by category
  const categories = {};

  tasksData.tasks.forEach((task) => {
    if (!categories[task.category]) {
      categories[task.category] = [];
    }

    // Return simplified task info for list view
    categories[task.category].push({
      taskId: task.taskId,
      title: task.title,
      status: task.status,
      order: task.order,
      totalSteps: task.totalSteps,
      currentStep: task.currentStep,
    });
  });

  // Convert to array format matching data-contracts
  const categoriesArray = Object.keys(categories).map((categoryName) => ({
    name: categoryName,
    tasks: categories[categoryName].sort((a, b) => a.order - b.order),
  }));

  res.json({ categories: categoriesArray });
});

/**
 * GET /api/tasks/:userId/:taskId
 * Returns single task with full details including steps and resources
 */
router.get('/:userId/:taskId', (req, res) => {
  const { taskId } = req.params;

  const task = tasksData.tasks.find((t) => t.taskId === taskId);

  if (!task) {
    return res.status(404).json({
      error: 'Task not found',
      message: `No task found with ID: ${taskId}`,
    });
  }

  res.json(task);
});

/**
 * POST /api/tasks/:userId/:taskId/advance
 * Marks current step complete and advances to next step
 */
router.post('/:userId/:taskId/advance', (req, res) => {
  const { taskId } = req.params;
  const { stepId } = req.body;

  const task = tasksData.tasks.find((t) => t.taskId === taskId);

  if (!task) {
    return res.status(404).json({
      error: 'Task not found',
      message: `No task found with ID: ${taskId}`,
    });
  }

  // Find the current step
  const currentStepIndex = task.steps.findIndex((s) => s.stepId === stepId);

  if (currentStepIndex === -1) {
    return res.status(400).json({
      error: 'Invalid step',
      message: `Step ${stepId} not found in task ${taskId}`,
    });
  }

  // Mark current step as complete
  task.steps[currentStepIndex].status = 'COMPLETE';

  // Advance to next step if available
  if (currentStepIndex + 1 < task.steps.length) {
    task.steps[currentStepIndex + 1].status = 'ACTIVE';
    task.currentStep = currentStepIndex + 2; // +2 because steps are 1-indexed

    saveTasks();

    return res.json({
      success: true,
      nextStep: task.steps[currentStepIndex + 1].stepId,
      message: 'Advanced to next step',
    });
  } else {
    // Task complete
    task.status = 'COMPLETE';
    task.currentStep = task.totalSteps;

    saveTasks();

    return res.json({
      success: true,
      nextStep: null,
      message: 'Task completed',
    });
  }
});

export default router;
