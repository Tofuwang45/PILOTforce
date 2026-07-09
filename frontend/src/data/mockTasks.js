export const mockTasks = {
  categories: [
    {
      name: "DEV ENVIRONMENT",
      tasks: [
        {
          taskId: "dev-env-01",
          title: "Install VS Code & Claude Code",
          status: "ACTIVE",
          order: 1,
          totalSteps: 4,
          currentStep: 2
        },
        {
          taskId: "dev-env-02",
          title: "Set up OrgFarm extension",
          status: "PENDING",
          order: 2,
          totalSteps: 3,
          currentStep: 1
        },
        {
          taskId: "dev-env-03",
          title: "Clone the Core repo",
          status: "PENDING",
          order: 3,
          totalSteps: 2,
          currentStep: 1
        },
        {
          taskId: "dev-env-04",
          title: "Start and run Core app locally",
          status: "PENDING",
          order: 4,
          totalSteps: 3,
          currentStep: 1
        },
        {
          taskId: "dev-env-05",
          title: "Request permissions",
          status: "AWAITING_APPROVAL",
          order: 5,
          totalSteps: 1,
          currentStep: 1
        }
      ]
    },
    {
      name: "BLACK TAB (BT)",
      tasks: [
        {
          taskId: "bt-01",
          title: "Complete BT orientation module",
          status: "PENDING",
          order: 1,
          totalSteps: 5,
          currentStep: 1
        },
        {
          taskId: "bt-02",
          title: "Set up BT dev environment",
          status: "PENDING",
          order: 2,
          totalSteps: 4,
          currentStep: 1
        },
        {
          taskId: "bt-03",
          title: "Run first BT build",
          status: "PENDING",
          order: 3,
          totalSteps: 3,
          currentStep: 1
        },
        {
          taskId: "bt-04",
          title: "Submit practice PR",
          status: "PENDING",
          order: 4,
          totalSteps: 4,
          currentStep: 1
        }
      ]
    },
    {
      name: "ADMIN / DOCS",
      tasks: [
        {
          taskId: "admin-01",
          title: "Complete compliance training",
          status: "PENDING",
          order: 1,
          totalSteps: 6,
          currentStep: 1
        },
        {
          taskId: "admin-02",
          title: "Set up 1Password vault access",
          status: "AWAITING_APPROVAL",
          order: 2,
          totalSteps: 2,
          currentStep: 1
        },
        {
          taskId: "admin-03",
          title: "Review team documentation",
          status: "PENDING",
          order: 3,
          totalSteps: 3,
          currentStep: 1
        }
      ]
    }
  ]
};
