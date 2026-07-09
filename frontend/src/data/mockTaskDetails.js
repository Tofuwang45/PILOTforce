export const mockTaskDetails = {
  "dev-env-01": {
    taskId: "dev-env-01",
    category: "DEV ENVIRONMENT",
    title: "Install VS Code & Claude Code",
    status: "ACTIVE",
    order: 1,
    totalSteps: 4,
    currentStep: 2,
    steps: [
      {
        stepId: "s1",
        title: "Download VS Code",
        status: "COMPLETE",
        description: "Download and install VS Code from official website.",
        terminalOutput: null,
        statusChip: {
          label: "VS Code installed",
          icon: "check"
        }
      },
      {
        stepId: "s2",
        title: "Install Extensions",
        status: "ACTIVE",
        description: "Install the Claude Code and Salesforce Extensions Pack in VS Code.",
        terminalOutput: "$ code --install-extension Salesforce.salesforcedx-vscode\n✓ Installing Salesforce Extension Pack...\n✓ Installing Claude Code extension...\n✓ All extensions installed successfully",
        statusChip: {
          label: "Extensions installed",
          icon: "check"
        }
      },
      {
        stepId: "s3",
        title: "Verify Claude Code",
        status: "PENDING",
        description: "Open Claude Code and verify it's working correctly.",
        terminalOutput: null,
        statusChip: null
      },
      {
        stepId: "s4",
        title: "Open Workspace",
        status: "PENDING",
        description: "Open your team's workspace in VS Code.",
        terminalOutput: null,
        statusChip: null
      }
    ],
    resources: [
      {
        title: "VS Code Download Page",
        url: "https://code.visualstudio.com/download",
        icon: "external-link"
      },
      {
        title: "Claude Code Quickstart",
        url: "https://claude.ai/code",
        icon: "book"
      },
      {
        title: "Salesforce Extension Pack Docs",
        url: "https://developer.salesforce.com/tools/vscode",
        icon: "file-text"
      }
    ]
  },
  "dev-env-02": {
    taskId: "dev-env-02",
    category: "DEV ENVIRONMENT",
    title: "Set up OrgFarm extension",
    status: "PENDING",
    order: 2,
    totalSteps: 3,
    currentStep: 1,
    steps: [
      {
        stepId: "s1",
        title: "Install OrgFarm",
        status: "PENDING",
        description: "Install the OrgFarm browser extension for managing Salesforce orgs.",
        terminalOutput: null,
        statusChip: null
      },
      {
        stepId: "s2",
        title: "Connect to org",
        status: "PENDING",
        description: "Connect OrgFarm to your development org.",
        terminalOutput: null,
        statusChip: null
      },
      {
        stepId: "s3",
        title: "Verify connection",
        status: "PENDING",
        description: "Test the connection to ensure everything is working.",
        terminalOutput: null,
        statusChip: null
      }
    ],
    resources: [
      {
        title: "OrgFarm Setup Guide",
        url: "https://orgfarm.salesforce.com/setup",
        icon: "book"
      }
    ]
  },
  "dev-env-05": {
    taskId: "dev-env-05",
    category: "DEV ENVIRONMENT",
    title: "Request permissions",
    status: "AWAITING_APPROVAL",
    order: 5,
    totalSteps: 1,
    currentStep: 1,
    steps: [
      {
        stepId: "s1",
        title: "Manager approval required",
        status: "PENDING",
        description: "Waiting for manager to grant development environment access permissions.",
        terminalOutput: null,
        statusChip: {
          label: "Awaiting approval",
          icon: "clock"
        }
      }
    ],
    resources: []
  },
  "admin-02": {
    taskId: "admin-02",
    category: "ADMIN / DOCS",
    title: "Set up 1Password vault access",
    status: "AWAITING_APPROVAL",
    order: 2,
    totalSteps: 2,
    currentStep: 1,
    steps: [
      {
        stepId: "s1",
        title: "Manager approval required",
        status: "PENDING",
        description: "Waiting for manager to grant 1Password vault access.",
        terminalOutput: null,
        statusChip: {
          label: "Awaiting approval",
          icon: "clock"
        }
      },
      {
        stepId: "s2",
        title: "Set up 1Password app",
        status: "PENDING",
        description: "Install and configure the 1Password application.",
        terminalOutput: null,
        statusChip: null
      }
    ],
    resources: [
      {
        title: "1Password Getting Started",
        url: "https://support.1password.com/",
        icon: "book"
      }
    ]
  }
};
