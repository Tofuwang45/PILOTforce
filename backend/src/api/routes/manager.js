import express from 'express';
import { tasksData, managerConfig } from '../../data/store.js';
import { createActivityItem } from '../../agent/agentMonitor.js';
import { addActivity } from '../../agent/activityFeed.js';

const router = express.Router();

/**
 * GET /api/manager/config/:teamId
 * Returns manager configuration for a team
 */
router.get('/config/:teamId', (req, res) => {
  const { teamId } = req.params;

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
 * Approves (or denies) a task that is awaiting approval
 */
router.post('/approve/:taskId', (req, res) => {
  const { taskId } = req.params;
  const { approved } = req.body;

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

    addActivity(
      createActivityItem(`Task "${task.title}" approved by manager`, 'complete')
    );

    return res.json({
      success: true,
      taskId: task.taskId,
      newStatus: 'ACTIVE',
      message: 'Task approved and unblocked',
    });
  }

  // Denied
  task.status = 'PENDING';

  return res.json({
    success: true,
    taskId: task.taskId,
    newStatus: 'PENDING',
    message: 'Task approval denied',
  });
});

export default router;
