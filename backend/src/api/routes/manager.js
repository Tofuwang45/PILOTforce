import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createActivityItem } from '../../agent/agentMonitor.js';
import { addActivity } from '../../agent/activityFeed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load manager config and tasks
const managerConfigPath = join(__dirname, '../../data/managerConfig.json');
const tasksPath = join(__dirname, '../../data/generatedTasks.json');

/**
 * GET /api/manager/config/:teamId
 * Returns manager configuration for a team
 */
router.get('/config/:teamId', (req, res) => {
  const { teamId } = req.params;

  const managerConfig = JSON.parse(readFileSync(managerConfigPath, 'utf-8'));

  if (managerConfig.teamId !== teamId) {
    return res.status(404).json({
      error: 'Team configuration not found',
      message: `No configuration found for team: ${teamId}`,
    });
  }

  res.json(managerConfig);
});

/**
 * POST /api/manager/approve/:taskId
 * Approves a task that is awaiting approval
 */
router.post('/approve/:taskId', (req, res) => {
  const { taskId } = req.params;
  const { approved, comment } = req.body;

  const tasksData = JSON.parse(readFileSync(tasksPath, 'utf-8'));

  const task = tasksData.tasks.find((t) => t.taskId === taskId);

  if (!task) {
    return res.status(404).json({
      error: 'Task not found',
      message: `No task found with ID: ${taskId}`,
    });
  }

  if (task.status !== 'AWAITING_APPROVAL') {
    return res.status(400).json({
      error: 'Invalid task status',
      message: `Task ${taskId} is not awaiting approval (current status: ${task.status})`,
    });
  }

  if (approved) {
    // Approve and activate
    task.status = 'ACTIVE';

    // Save updated tasks
    writeFileSync(tasksPath, JSON.stringify(tasksData, null, 2), 'utf-8');

    // Add activity
    const activityItem = createActivityItem(
      `Task "${task.title}" approved by manager`,
      'complete'
    );
    addActivity(activityItem);

    res.json({
      success: true,
      taskId: task.taskId,
      newStatus: 'ACTIVE',
      message: 'Task approved and unblocked',
    });
  } else {
    // Denied
    task.status = 'PENDING';

    writeFileSync(tasksPath, JSON.stringify(tasksData, null, 2), 'utf-8');

    res.json({
      success: true,
      taskId: task.taskId,
      newStatus: 'PENDING',
      message: 'Task approval denied',
    });
  }
});

export default router;
