export const mockManagerConfig = {
  teamId: "platform-cloud",
  role: "software_engineer",
  configuredBy: "Alex Martinez",
  categories: [
    {
      name: "DEV ENVIRONMENT",
      tasks: [
        {
          title: "Authorize Salesforce Workspaces",
          required: true,
          agentCanVerify: true
        },
        {
          title: "Provision your Core workspace",
          required: true,
          agentCanVerify: true
        },
        {
          title: "Open workspace in browser VS Code",
          required: true,
          agentCanVerify: true
        },
        {
          title: "Verify Core build in workspace",
          required: true,
          agentCanVerify: true
        },
        {
          title: "Request permissions",
          required: true,
          agentCanVerify: false
        }
      ]
    }
  ],
  aiLiteracy: {
    currentLevel: "PL1",
    targetLevel: "PL2",
    recommendations: [
      "Complete Claude Code basics module",
      "Try 3 code-assist prompts this week",
      "Explore Agentforce documentation"
    ]
  }
};
