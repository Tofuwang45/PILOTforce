export const mockManagerConfig = {
  teamId: "platform-cloud",
  role: "software_engineer",
  configuredBy: "Alex Martinez",
  categories: [
    {
      name: "DEV ENVIRONMENT",
      tasks: [
        {
          title: "Install VS Code & Claude Code",
          required: true,
          agentCanVerify: true
        },
        {
          title: "Set up OrgFarm extension",
          required: true,
          agentCanVerify: true
        },
        {
          title: "Clone the Core repo",
          required: true,
          agentCanVerify: true
        },
        {
          title: "Start and run Core app locally",
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
