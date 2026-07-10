// Task detail data for the PILOTForce demo.
//
// Each step has a `type` that controls how it renders in the main panel:
//   - "standard"      → description + optional terminal output + Next Step
//   - "agent-run"     → agent streams live terminal output, then unlocks Next Step
//   - "document-sign" → document shown inline with a draw/type signature pad
//   - "approval"      → agent-requested access, awaiting manager approval
//
// `agentScript` lines: { text, kind, pause?, activity? }
//   kind ∈ command | info | success | warning | error
//   activity (optional) → surfaced in the right-sidebar Agent Activity feed
//
// Resources carry inline `content` so they open in a side panel (no redirect).

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
        type: "standard",
        status: "COMPLETE",
        description: "Download and install VS Code from the official website.",
        terminalOutput: null,
        statusChip: { label: "VS Code installed", icon: "check" }
      },
      {
        stepId: "s2",
        title: "Install Extensions",
        type: "agent-run",
        status: "ACTIVE",
        description:
          "The agent will install the Salesforce Extension Pack and Claude Code for you and verify each one. Watch it work in real time.",
        agentScript: [
          { text: "$ code --install-extension salesforce.salesforcedx-vscode", kind: "command", pause: 500, activity: { message: "Installing Salesforce Extension Pack…", status: "in_progress" } },
          { text: "Resolving extension dependencies…", kind: "info", pause: 400 },
          { text: "Downloading salesforcedx-vscode@60.13.0 (14.2 MB)", kind: "info", pause: 600 },
          { text: "✓ Salesforce Extension Pack installed", kind: "success", pause: 500, activity: { message: "Salesforce Extension Pack verified", status: "complete" } },
          { text: "$ code --install-extension anthropic.claude-code", kind: "command", pause: 500, activity: { message: "Installing Claude Code extension…", status: "in_progress" } },
          { text: "Downloading claude-code@1.4.2 (8.6 MB)", kind: "info", pause: 600 },
          { text: "✓ Claude Code extension installed", kind: "success", pause: 500, activity: { message: "Claude Code extension verified", status: "complete" } },
          { text: "Verifying installation…", kind: "info", pause: 500 },
          { text: "✓ All extensions installed successfully", kind: "success", pause: 300, activity: { message: "Environment check passed — all extensions active", status: "complete" } }
        ],
        completeChip: { label: "Extensions installed & verified", icon: "check" }
      },
      {
        stepId: "s3",
        title: "Verify Claude Code",
        type: "standard",
        status: "PENDING",
        description: "Open Claude Code and verify it's working correctly.",
        terminalOutput: null,
        statusChip: null
      },
      {
        stepId: "s4",
        title: "Open Workspace",
        type: "standard",
        status: "PENDING",
        description: "Open your team's workspace in VS Code.",
        terminalOutput: null,
        statusChip: null
      }
    ],
    resources: [
      {
        title: "VS Code Download Page",
        icon: "external-link",
        content: {
          heading: "Download Visual Studio Code",
          body: [
            "Visual Studio Code is a free, lightweight code editor that runs on macOS, Windows, and Linux.",
            "For Salesforce development, download the Stable build (not Insiders). After installing, you'll add the Salesforce Extension Pack and Claude Code — the agent handles that for you in the next step.",
            "System requirements: macOS 10.15+, 1 GB RAM minimum (4 GB recommended)."
          ]
        }
      },
      {
        title: "Claude Code Quickstart",
        icon: "book",
        content: {
          heading: "Claude Code Quickstart",
          body: [
            "Claude Code is an agentic coding assistant that lives in your editor and terminal. It can read your codebase, make edits across files, run commands, and explain what it's doing as it goes.",
            "Once installed, open the Command Palette (⌘⇧P) and run 'Claude: Start Session' to begin. Ask it to scaffold a component, debug a failing test, or walk you through the Core repo.",
            "Tip: the more context you give it about your task, the better its output."
          ]
        }
      },
      {
        title: "Salesforce Extension Pack Docs",
        icon: "file-text",
        content: {
          heading: "Salesforce Extension Pack",
          body: [
            "The Salesforce Extension Pack bundles everything you need for Salesforce DX development: Apex, SOQL, Lightning Web Components, and org management.",
            "Key features: syntax highlighting and IntelliSense for Apex, one-click deploy/retrieve to your org, an integrated SOQL query editor, and Apex test running with inline results.",
            "The agent verified this pack is active in your VS Code install in the previous step."
          ]
        }
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
        type: "agent-run",
        status: "ACTIVE",
        description:
          "The agent will provision an OrgFarm scratch org and connect it to your workspace.",
        agentScript: [
          { text: "$ sf org create scratch --definition-file config/project-scratch-def.json", kind: "command", pause: 500, activity: { message: "Requesting OrgFarm scratch org…", status: "in_progress" } },
          { text: "Contacting OrgFarm provisioning service…", kind: "info", pause: 700 },
          { text: "Creating scratch org (this can take ~30s)…", kind: "info", pause: 900 },
          { text: "✓ Scratch org created: platform-cloud-sarah-c", kind: "success", pause: 500, activity: { message: "OrgFarm scratch org provisioned", status: "complete" } },
          { text: "$ sf org open", kind: "command", pause: 400 },
          { text: "✓ Org connected to workspace", kind: "success", pause: 300, activity: { message: "OrgFarm connected to workspace", status: "complete" } }
        ],
        completeChip: { label: "OrgFarm provisioned", icon: "check" }
      },
      {
        stepId: "s2",
        title: "Connect to org",
        type: "standard",
        status: "PENDING",
        description: "Connect OrgFarm to your development org.",
        terminalOutput: null,
        statusChip: null
      },
      {
        stepId: "s3",
        title: "Verify connection",
        type: "standard",
        status: "PENDING",
        description: "Test the connection to ensure everything is working.",
        terminalOutput: null,
        statusChip: null
      }
    ],
    resources: [
      {
        title: "OrgFarm Setup Guide",
        icon: "book",
        content: {
          heading: "OrgFarm Setup Guide",
          body: [
            "OrgFarm provides on-demand Salesforce scratch orgs for development and testing.",
            "The agent provisions an org scoped to your team and role automatically. Scratch orgs expire after 7 days by default — the agent will re-provision as needed.",
            "You can manage your active orgs from the OrgFarm panel in VS Code's sidebar."
          ]
        }
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
        title: "Development environment access",
        type: "approval",
        status: "PENDING",
        description:
          "The agent detected you need elevated access to deploy to the Platform Cloud dev environment.",
        request: {
          summary: "Deploy access to Platform Cloud dev environment",
          requestedBy: "PILOTForce Agent",
          justification:
            "Sarah's onboarding requires deploying and running the Core app locally against a shared dev org. This needs the 'Platform Cloud — Developer' permission set.",
          scope: ["Deploy metadata to dev org", "Run Apex tests", "Read team CI logs"],
          approver: "Manager — Platform Cloud"
        },
        statusChip: { label: "Awaiting manager approval", icon: "clock" }
      }
    ],
    resources: []
  },

  "admin-01": {
    taskId: "admin-01",
    category: "ADMIN / DOCS",
    title: "Complete compliance training",
    status: "ACTIVE",
    order: 1,
    totalSteps: 2,
    currentStep: 1,
    steps: [
      {
        stepId: "s1",
        title: "Sign the Confidentiality & Compliance Agreement",
        type: "document-sign",
        status: "ACTIVE",
        description:
          "Review and sign your intern confidentiality agreement. You can sign directly here — no need to leave PILOTForce.",
        document: {
          title: "Salesforce Intern Confidentiality & Compliance Agreement",
          effectiveDate: "July 10, 2026",
          signerName: "Sarah Chen",
          signerRole: "Intern, Platform Cloud",
          body: [
            "1. CONFIDENTIAL INFORMATION. During your internship, you will have access to non-public information including source code, customer data, product roadmaps, and internal tools. You agree to keep all such information strictly confidential.",
            "2. ACCEPTABLE USE. You agree to use Salesforce systems, including AI tools such as Claude Code, in accordance with company policy and only for authorized business purposes.",
            "3. DATA PROTECTION. You will not copy, transmit, or store confidential information outside approved Salesforce systems. Customer data must never be used in prompts to external services unless explicitly approved.",
            "4. INTELLECTUAL PROPERTY. All work product created during your internship is the property of Salesforce.",
            "5. RETURN OF MATERIALS. Upon completion of your internship, you will return or securely delete all confidential materials in your possession.",
            "By signing below, you acknowledge that you have read, understood, and agree to be bound by the terms of this agreement."
          ]
        }
      },
      {
        stepId: "s2",
        title: "Confirm training complete",
        type: "standard",
        status: "PENDING",
        description: "Your signed agreement is on file. Compliance training is complete.",
        terminalOutput: null,
        statusChip: null
      }
    ],
    resources: [
      {
        title: "Salesforce Code of Conduct",
        icon: "file-text",
        content: {
          heading: "Salesforce Code of Conduct",
          body: [
            "Our Code of Conduct reflects our core values: Trust, Customer Success, Innovation, Equality, and Sustainability.",
            "As an intern you're held to the same standards as every employee: act with integrity, protect customer trust, respect your colleagues, and speak up if something doesn't seem right.",
            "The confidentiality agreement you're signing is one part of these commitments."
          ]
        }
      }
    ]
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
        title: "1Password vault access",
        type: "approval",
        status: "PENDING",
        description:
          "The agent requested access to the Platform Cloud shared vault on your behalf.",
        request: {
          summary: "Read access to 'Platform Cloud — Shared' 1Password vault",
          requestedBy: "PILOTForce Agent",
          justification:
            "Sarah needs shared team credentials (CI tokens, sandbox logins) stored in the team vault to complete environment setup.",
          scope: ["Read shared team secrets", "No edit or share permissions"],
          approver: "Manager — Platform Cloud"
        },
        statusChip: { label: "Awaiting manager approval", icon: "clock" }
      },
      {
        stepId: "s2",
        title: "Set up 1Password app",
        type: "standard",
        status: "PENDING",
        description: "Install and configure the 1Password application.",
        terminalOutput: null,
        statusChip: null
      }
    ],
    resources: [
      {
        title: "1Password Getting Started",
        icon: "book",
        content: {
          heading: "1Password Getting Started",
          body: [
            "1Password stores your team's shared credentials securely. Once your manager approves vault access, the shared vault appears automatically in your 1Password app.",
            "Install the desktop app and the browser extension, then sign in with your Salesforce SSO.",
            "Never paste credentials into code or chat — reference them from the vault."
          ]
        }
      }
    ]
  }
};
