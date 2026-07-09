import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ACTIVITY_FILE = join(__dirname, '../data/agentActivity.json');

/**
 * Loads agent activity from JSON file
 * @returns {Array} Array of activity items
 */
export function loadActivity() {
  try {
    const data = readFileSync(ACTIVITY_FILE, 'utf-8');
    return JSON.parse(data).activities;
  } catch (error) {
    console.error('Error loading agent activity:', error.message);
    return [];
  }
}

/**
 * Adds a new activity item to the feed
 * @param {Object} activityItem - The activity item to add
 */
export function addActivity(activityItem) {
  try {
    const activities = loadActivity();
    // Add to beginning (newest first)
    activities.unshift(activityItem);
    // Keep only the most recent 20 items
    const trimmedActivities = activities.slice(0, 20);
    writeFileSync(
      ACTIVITY_FILE,
      JSON.stringify({ activities: trimmedActivities }, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.error('Error adding activity:', error.message);
  }
}

/**
 * Gets the activity feed for a user
 * @param {string} userId - User ID
 * @returns {Array} Array of activity items
 */
export function getActivityFeed(userId) {
  // In a real system, this would filter by userId
  // For the demo, we return all activities
  return loadActivity();
}
