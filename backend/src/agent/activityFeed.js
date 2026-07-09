/**
 * Agent activity feed helpers, backed by the shared in-memory store.
 */
import { activityFeed, addActivity as storeAddActivity } from '../data/store.js';

/**
 * Adds a new activity item to the feed (newest first, capped at 20).
 * @param {Object} activityItem - The activity item to add
 */
export function addActivity(activityItem) {
  storeAddActivity(activityItem);
}

/**
 * Gets the activity feed for a user.
 * @param {string} _userId - User ID (single-user demo returns all activities)
 * @returns {Array} Array of activity items
 */
export function getActivityFeed(_userId) {
  return activityFeed;
}
