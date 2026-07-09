import express from 'express';
import { getActivityFeed, addActivity } from '../../agent/activityFeed.js';
import { createActivityItem, simulateVerification } from '../../agent/agentMonitor.js';
import { generateTasksFromConfig } from '../../agent/taskGenerator.js';
import { tasksData, managerConfig } from '../../data/store.js';

const router = express.Router();

/**
 * GET /api/agent/activity/:userId
 * Returns agent activity feed for a user
 */
router.get('/activity/:userId', (req, res) => {
  const { userId } = req.params;
  const activities = getActivityFeed(userId);

  res.json({ activities });
});

/**
 * POST /api/agent/trigger/:taskId
 * Triggers agent to run a verification task
 */
router.post('/trigger/:taskId', (req, res) => {
  const { taskId } = req.params;

  // Simulate verification
  const verification = simulateVerification(taskId);

  // Create activity item and add to feed
  const activityItem = createActivityItem(verification.message, verification.status);
  addActivity(activityItem);

  res.json({
    success: true,
    activityId: activityItem.id,
    message: 'Agent task triggered',
  });
});

/**
 * POST /api/agent/generate
 * Triggers task generation from manager config (Claude API, seed fallback).
 * Updates the in-memory task store in place.
 */
router.post('/generate', async (req, res) => {
  try {
    const generatedTasks = await generateTasksFromConfig(managerConfig);

    // Replace the in-memory task list in place so all routes see the update.
    if (generatedTasks && Array.isArray(generatedTasks.tasks)) {
      tasksData.tasks = generatedTasks.tasks;
    }

    addActivity(createActivityItem('Generated personalized checklist', 'complete'));

    res.json({
      success: true,
      message: 'Tasks generated successfully',
      taskCount: tasksData.tasks.length,
    });
  } catch (error) {
    console.error('Error generating tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate tasks',
      message: error.message,
    });
  }
});

export default router;
