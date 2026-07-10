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
    title: "Authorize Salesforce Workspaces",
    status: "ACTIVE",
    order: 1,
    totalSteps: 4,
    currentStep: 2,
    steps: [
      {
        stepId: "s1",
        title: "Sign in to the SFW Console",
        type: "standard",
        status: "COMPLETE",
        description:
          "You signed in to the Salesforce Workspaces console with your Salesforce SSO — no local install required.",
        terminalOutput: null,
        statusChip: { label: "Signed in to SFW Console", icon: "check" }
      },
      {
        stepId: "s2",
        title: "Authorize OAuth access",
        type: "agent-run",
        status: "ACTIVE",
        description:
          "The agent completes the Salesforce Workspaces OAuth2 handshake so your cloud dev environment can be provisioned. Nothing is cloned to your laptop. Watch it work in real time.",
        agentScript: [
          { text: "→ Opening git.soma.salesforce.com/pages/salesforce-workspaces/sfw-console/#!/oauth2", kind: "command", pause: 600, activity: { message: "Starting Salesforce Workspaces OAuth2…", status: "in_progress" } },
          { text: "Redirecting to Salesforce SSO…", kind: "info", pause: 500 },
          { text: "✓ Identity confirmed: sarah.chen@salesforce.com", kind: "success", pause: 500, activity: { message: "SSO identity confirmed", status: "complete" } },
          { text: "Requesting scopes: workspace.read workspace.write core.access", kind: "info", pause: 600 },
          { text: "Exchanging authorization code for access token…", kind: "info", pause: 700 },
          { text: "✓ OAuth2 token granted (expires in 8h)", kind: "success", pause: 500, activity: { message: "Workspaces OAuth token granted", status: "complete" } },
          { text: "Registering device with SFW dataplane…", kind: "info", pause: 500 },
          { text: "✓ Salesforce Workspaces authorized", kind: "success", pause: 300, activity: { message: "Salesforce Workspaces authorized — no local clone needed", status: "complete" } }
        ],
        completeChip: { label: "Workspaces authorized", icon: "check" }
      },
      {
        stepId: "s3",
        title: "Confirm workspace entitlement",
        type: "standard",
        status: "PENDING",
        description:
          "Confirm your account is entitled to the Platform Cloud workspace pool.",
        terminalOutput: null,
        statusChip: null
      },
      {
        stepId: "s4",
        title: "Ready to provision",
        type: "standard",
        status: "PENDING",
        description:
          "Authorization complete. The agent can now provision your Core workspace in the next task.",
        terminalOutput: null,
        statusChip: null
      }
    ],
    resources: [
      {
        title: "Salesforce Workspaces Console",
        icon: "external-link",
        content: {
          heading: "Salesforce Workspaces (SFW) Console",
          body: [
            "Salesforce Workspaces gives you a fully managed, cloud-hosted development environment — you don't clone repos or run builds on your laptop.",
            "Sign in at git.soma.salesforce.com/pages/salesforce-workspaces/sfw-console via the OAuth2 flow. The agent handles the token exchange for you in this step.",
            "Because everything runs in the cloud dataplane, your environment is consistent with the rest of the team and available from any machine with a browser."
          ]
        }
      },
      {
        title: "Why no local clone?",
        icon: "book",
        content: {
          heading: "Cloud-first: no local clone",
          body: [
            "The Core repository is large and its toolchain is heavy. Salesforce Workspaces hosts the code and build environment in the cloud so you skip the multi-hour local clone and setup entirely.",
            "You get a browser-based VS Code connected to your workspace. Files, terminal, builds, and Claude Code all run remotely on the dataplane.",
            "This is the current, recommended path — the old 'clone the Core repo locally' flow is deprecated for interns."
          ]
        }
      },
      {
        title: "Claude Code in Workspaces",
        icon: "file-text",
        content: {
          heading: "Claude Code in your workspace",
          body: [
            "Claude Code is preinstalled in your Salesforce Workspace's browser VS Code. Open the Command Palette (⌘⇧P) and run 'Claude: Start Session' to begin.",
            "It can read the Core codebase, make edits, run commands in the workspace terminal, and explain what it's doing — all in the cloud environment.",
            "Tip: the more context you give it about your task, the better its output."
          ]
        }
      }
    ]
  },

  "dev-env-02": {
    taskId: "dev-env-02",
    category: "DEV ENVIRONMENT",
    title: "Provision your Core workspace",
    status: "PENDING",
    order: 2,
    totalSteps: 3,
    currentStep: 1,
    steps: [
      {
        stepId: "s1",
        title: "Provision cloud workspace",
        type: "agent-run",
        status: "ACTIVE",
        description:
          "The agent provisions a Core workspace for you on the Salesforce Workspaces dataplane. The Core repo is mounted in the cloud — nothing is cloned to your machine.",
        agentScript: [
          { text: "→ POST sfw-console/api/workspaces { template: 'core-public/core' }", kind: "command", pause: 600, activity: { message: "Requesting Core workspace…", status: "in_progress" } },
          { text: "Allocating compute on cvw-dataplane (aws-dev2-uswest2)…", kind: "info", pause: 900 },
          { text: "Mounting /opt/workspace/core-public/core …", kind: "info", pause: 800 },
          { text: "✓ Core source mounted (no local clone)", kind: "success", pause: 500, activity: { message: "Core repo mounted in cloud workspace", status: "complete" } },
          { text: "Warming build cache and dependencies…", kind: "info", pause: 900 },
          { text: "✓ Workspace ready: i-0fab267da14da88bf (port 8000)", kind: "success", pause: 500, activity: { message: "Core workspace provisioned", status: "complete" } },
          { text: "Registering core.code-workspace …", kind: "info", pause: 500 },
          { text: "✓ Workspace URL issued", kind: "success", pause: 300, activity: { message: "Browser VS Code URL ready", status: "complete" } }
        ],
        completeChip: { label: "Core workspace provisioned", icon: "check" }
      },
      {
        stepId: "s2",
        title: "Attach dev org",
        type: "standard",
        status: "PENDING",
        description:
          "The workspace comes pre-attached to a shared Platform Cloud dev org — no scratch-org setup needed.",
        terminalOutput: null,
        statusChip: null
      },
      {
        stepId: "s3",
        title: "Confirm workspace health",
        type: "standard",
        status: "PENDING",
        description: "Confirm the workspace is running and reachable before opening it.",
        terminalOutput: null,
        statusChip: null
      }
    ],
    resources: [
      {
        title: "Open workspace in browser VS Code",
        icon: "external-link",
        content: {
          heading: "Your Core workspace",
          body: [
            "Once provisioned, your workspace opens in a browser-based VS Code served from the Salesforce Workspaces dataplane.",
            "Workspace: /opt/workspace/core-public/core/core.code-workspace on instance i-0fab267da14da88bf (port 8000).",
            "You'll open it in the next task. Everything — editor, terminal, build, and Claude Code — runs in the cloud, so it works from any browser."
          ]
        }
      },
      {
        title: "Workspaces vs. scratch orgs",
        icon: "book",
        content: {
          heading: "No scratch org setup",
          body: [
            "Salesforce Workspaces provisions a ready-to-use Core environment pre-attached to a shared dev org, replacing the old OrgFarm scratch-org dance for onboarding.",
            "The agent handles allocation, source mounting, and dependency warm-up automatically.",
            "If your workspace expires or gets recycled, the agent re-provisions it — you never lose local work because there is no local work."
          ]
        }
      }
    ]
  },

  "dev-env-03": {
    taskId: "dev-env-03",
    category: "DEV ENVIRONMENT",
    title: "Open workspace in browser VS Code",
    status: "PENDING",
    order: 3,
    totalSteps: 3,
    currentStep: 1,
    steps: [
      {
        stepId: "s1",
        title: "Launch browser VS Code",
        type: "agent-run",
        status: "ACTIVE",
        description:
          "The agent opens your Core workspace in browser-based VS Code on the dataplane. No download, no clone — it loads straight in your browser.",
        agentScript: [
          { text: "→ Resolving workspace endpoint for i-0fab267da14da88bf…", kind: "command", pause: 600, activity: { message: "Resolving workspace endpoint…", status: "in_progress" } },
          { text: "Connecting to cvw-dataplane-test.aws-dev2-uswest2 (port 8000)…", kind: "info", pause: 800 },
          { text: "✓ Tunnel established", kind: "success", pause: 500, activity: { message: "Dataplane tunnel established", status: "complete" } },
          { text: "Loading core.code-workspace …", kind: "info", pause: 700 },
          { text: "✓ Browser VS Code ready — Claude Code preinstalled", kind: "success", pause: 400, activity: { message: "Browser VS Code opened for Core workspace", status: "complete" } }
        ],
        completeChip: { label: "Workspace open in browser VS Code", icon: "check" }
      },
      {
        stepId: "s2",
        title: "Explore the Core tree",
        type: "standard",
        status: "PENDING",
        description:
          "Open the Explorer in browser VS Code to see the Core source, mounted from the cloud.",
        terminalOutput: null,
        statusChip: null
      },
      {
        stepId: "s3",
        title: "Start a Claude Code session",
        type: "standard",
        status: "PENDING",
        description:
          "Run 'Claude: Start Session' from the Command Palette and ask it to orient you in the Core repo.",
        terminalOutput: null,
        statusChip: null
      }
    ],
    resources: [
      {
        title: "Open my workspace",
        icon: "external-link",
        content: {
          heading: "Launch browser VS Code",
          body: [
            "Your workspace opens at the Salesforce Workspaces dataplane URL, with the workspace parameter pointing at /opt/workspace/core-public/core/core.code-workspace.",
            "The editor, integrated terminal, build tools, and Claude Code all run remotely — your browser is just the window.",
            "Bookmark the workspace URL so you can jump back in from any machine."
          ]
        }
      },
      {
        title: "Browser VS Code tips",
        icon: "book",
        content: {
          heading: "Working in browser VS Code",
          body: [
            "It behaves like desktop VS Code: Command Palette (⌘⇧P), integrated terminal (⌃`), extensions, and source control all work.",
            "Because compute is in the cloud, large Core builds run on dataplane hardware, not your laptop.",
            "Your session persists — if you close the tab, reopen the workspace URL to pick up where you left off."
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
            "Sarah's onboarding requires deploying and running Core from her Salesforce Workspace against the shared dev org. This needs the 'Platform Cloud — Developer' permission set.",
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
