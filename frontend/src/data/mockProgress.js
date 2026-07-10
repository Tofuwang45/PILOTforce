// Kept in sync with mockTasks.js: no task there currently has status
// COMPLETE, so completed counts start at 0 everywhere. If you mark a task
// complete in mockTasks.js, update the matching category (and overall) count
// here too — the mock server recomputes this from live status after any
// advanceTask() call, but this file is the cold-start values shown on load.
export const mockProgress = {
  overall: {
    completed: 0,
    total: 12,
    percentage: 0
  },
  categories: [
    {
      name: "Dev Env",
      completed: 0,
      total: 5,
      percentage: 0
    },
    {
      name: "BT",
      completed: 0,
      total: 4,
      percentage: 0
    },
    {
      name: "Admin",
      completed: 0,
      total: 3,
      percentage: 0
    }
  ]
};
