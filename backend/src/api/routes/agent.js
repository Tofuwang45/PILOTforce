import express from 'express';
import { getActivityFeed, addActivity } from '../../agent/activityFeed.js';
import { createActivityItem, simulateVerification } from '../../agent/agentMonitor.js';
import { generateTasksFromConfig } from '../../agent/taskGenerator.js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  const { action } = req.body;

  // Simulate verification
  const verification = simulateVerification(taskId);

  // Create activity item
  const activityItem = createActivityItem(verification.message, verification.status);

  // Add to feed
  addActivity(activityItem);

  res.json({
    success: true,
    activityId: activityItem.id,
    message: 'Agent task triggered',
  });
});

/**
 * POST /api/agent/generate
 * Triggers task generation from manager config
 */
router.post('/generate', async (req, res) => {
  try {
    // Load manager config
    const managerConfigPath = join(__dirname, '../../data/managerConfig.json');
    const managerConfig = JSON.parse(readFileSync(managerConfigPath, 'utf-8'));

    // Generate tasks
    const generatedTasks = await generateTasksFromConfig(managerConfig);

    // Save to file
    const tasksPath = join(__dirname, '../../data/generatedTasks.json');
    writeFileSync(tasksPath, JSON.stringify(generatedTasks, null, 2), 'utf-8');

    // Add activity
    const activityItem = createActivityItem('Generated personalized checklist', 'complete');
    addActivity(activityItem);

    res.json({
      success: true,
      message: 'Tasks generated successfully',
      taskCount: generatedTasks.tasks.length,
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
