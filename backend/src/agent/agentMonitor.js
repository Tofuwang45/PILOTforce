/**
 * Simulates background agent verification tasks.
 * In a real system, this would check actual system state.
 */

const verificationMessages = [
  { message: 'Checking extension compatibility...', status: 'in_progress' },
  { message: 'Extension pack verified', status: 'complete' },
  { message: 'Verifying repo access permissions...', status: 'complete' },
  { message: 'VS Code installation confirmed', status: 'complete' },
  { message: 'Checking Git configuration...', status: 'complete' },
  { message: 'SSH keys validated', status: 'complete' },
  { message: 'Environment variables configured', status: 'complete' },
  { message: 'Workspace permissions verified', status: 'complete' },
];

/**
 * Simulates running an agent verification task
 * @param {string} taskId - The task ID to verify
 * @returns {Object} A verification result object
 */
export function simulateVerification(taskId) {
  const randomMessage =
    verificationMessages[Math.floor(Math.random() * verificationMessages.length)];

  return {
    taskId,
    message: randomMessage.message,
    status: randomMessage.status,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Generates a simulated activity item for the feed
 * @param {string} message - Activity message
 * @param {string} status - Activity status (in_progress, complete, error)
 * @returns {Object} Activity item
 */
export function createActivityItem(message, status = 'complete') {
  const dotColorMap = {
    in_progress: 'yellow',
    complete: 'green',
    error: 'red',
  };

  return {
    id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: 'Just now',
    message,
    status,
    dotColor: dotColorMap[status] || 'gray',
  };
}
