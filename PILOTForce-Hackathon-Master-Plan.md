# PILOTForce Hackathon Master Plan

## Team 23 - Future Force Hackathon 2026
**Deadline: Friday July 10, 2026 at 2:00 PM PT**
**Coding Complete: Thursday July 9 EOD**
**Video + Submission: Friday AM**

---

## Table of Contents
1. [Rubric Alignment Strategy](#rubric-alignment)
2. [Dashboard UI Feature Spec](#dashboard-ui)
3. [Frontend Implementation Plan](#frontend-plan)
4. [Backend Team 1: API & Data](#backend-api)
5. [Backend Team 2: Agent & AI Integration](#backend-agent)
6. [GitHub Repository Structure](#github-structure)
7. [Timeline - Today Through Friday](#timeline)
8. [Presentation Plan (3-Min Video)](#presentation)
9. [Claude Prompts for Rapid Development](#claude-prompts)

---

## 1. Rubric Alignment Strategy {#rubric-alignment}

The hackathon is scored on **5 criteria**. Here's how PILOTForce hits each one:

### Criterion 1: Problem & Business Impact
**What judges want:** Structured, well-reasoned understanding of the challenge. Business impact clearly articulated and grounded in evidence.

**How we hit it:**
- Frame onboarding as a **bureaucratic process with invisible friction** (exact hackathon language)
- Cite real pain: fragmented across 5+ systems (Slack, Base Camp, OrgFarm, GitHub, 1Password, access portals)
- Quantify: "New hires spend 2-3 days navigating disconnected systems instead of contributing"
- Connect to Salesforce's FY27 #1 priority: "busting bureaucracy" (Robin Washington, COFO)
- Use our real onboarding experience as evidence

### Criterion 2: Solution Design & Creative Thinking
**What judges want:** Well-structured, technically achievable, original thinking beyond the obvious.

**How we hit it:**
- Not just a checklist app - an **agentic system** that generates personalized checklists from manager JSON config
- Single-page dashboard (not multi-tab) to minimize cognitive load
- Agent runs background tasks (env setup, permission verification) with real-time status
- Differentiated from generic onboarding: team-context-aware + AI literacy integration
- Architecture: Manager Config -> Agent Generation -> Guided Dashboard -> Human Approval Loop

### Criterion 3: Agent & AI Literacy
**What judges want:** Effective leverage of agentic capabilities. Understanding of what agents can and can't do.

**How we hit it:**
- **Agent capabilities demonstrated:** Task generation from config, environment verification, progress monitoring, resource aggregation
- **Agent limitations acknowledged:** Agent doesn't make access decisions (human approves), doesn't replace manager judgment, escalates when blocked
- **AI Literacy panel** in the dashboard: PL1-PL4 proficiency tracking, recommended prompts, tool guides
- **Built WITH AI tools:** Claude Code for development, Claude Design for mockups (mention in video)

### Criterion 4: Human-Agent Collaboration
**What judges want:** Clear demo of human and agent working together, each doing what they do best.

**How we hit it:**
- **Manager (Human):** Defines requirements via JSON config, approves access requests, steers priorities
- **Agent (AI):** Generates personalized checklist, monitors progress, verifies environment setup, surfaces blockers
- **Intern (Human):** Completes tasks, reviews agent recommendations, marks completion
- **The Loop:** Manager configures -> Agent generates -> Intern executes -> Agent monitors -> Manager approves blocked items
- Visual: "Agent Activity" panel shows real-time agent status alongside human task list

### Criterion 5: Storytelling & Presentation
**What judges want:** Clear, compelling communication within 3-minute limit.

**How we hit it:**
- Structure: Problem (30s) -> Solution (60s) -> Demo (60s) -> Impact (30s)
- Use "Sarah Chen, Intern, Day 3" as narrative persona (shown in mockup)
- Show the BEFORE (fragmented, confusing) vs. AFTER (guided, clear)
- End with scale potential: "Works for interns today, adaptable to any role tomorrow"

---

## 2. Dashboard UI Feature Spec {#dashboard-ui}

Based on the mockup and team decisions, here is the complete feature spec:

### Layout Structure (Single Page)
```
+------------------------------------------------------------------+
| HEADER: PILOTForce logo | Breadcrumb nav | User avatar + role    |
+------------------------------------------------------------------+
| LEFT SIDEBAR        | MAIN CONTENT AREA      | RIGHT SIDEBAR     |
| (240px)             | (flex-grow)            | (320px)           |
|                     |                        |                   |
| Overall Progress    | Current Task Card      | Agent Activity    |
| (circular %)        | - Title + Status badge | - Live feed       |
|                     | - Step progress bar    | - Status dots     |
| Section Nav:        | - Current Step detail  |   (yellow=working)|
| - DEV ENVIRONMENT   |   with instructions    |   (green=done)    |
|   1. Task [ACTIVE]  | - Terminal/code output  |                   |
|   2. Task [PENDING] | - Action buttons       | Your Progress     |
|   3. Task [PENDING] |   ("Next Step ->")     | - Category bars   |
|   4. Task [PENDING] |                        | - X of Y done     |
|                     | Resources & Docs       |                   |
| - BLACK TAB (BT)    | - Linked resources     | Need Help?        |
| - ADMIN / DOCS      |   (open in panel)      | - Ask Einstein    |
|                     |                        |   Copilot button  |
| Next: hint arrow    | Status chips           | - View Full Docs  |
|                     | (e.g. "Extensions      | - Avg setup time  |
|                     |  installed checkmark") |                   |
+------------------------------------------------------------------+
```

### Feature Inventory

| Feature | Priority | Description | Rubric Hit |
|---------|----------|-------------|------------|
| Task Checklist (left nav) | MUST | Grouped by category (Dev Env, BT, Admin), numbered, status badges | 2, 4 |
| Overall Progress Ring | MUST | Circular progress indicator with percentage | 2 |
| Current Task Detail Card | MUST | Step-by-step sub-tasks with progress bar, instructions, terminal output | 2, 3 |
| Agent Activity Panel | MUST | Real-time feed showing agent actions (checking compatibility, verifying) | 3, 4 |
| Your Progress Summary | MUST | Per-category progress bars | 2 |
| Resources & Docs Section | MUST | Context-relevant links (no external redirects - inline display) | 2 |
| Next Step Button | MUST | Primary CTA advancing through flow | 2 |
| Need Help / Ask Copilot | SHOULD | AI chat interface for questions | 3, 4 |
| Status Chips | SHOULD | Green checkmarks for completed sub-steps | 2 |
| Manager Approval View | MUST | Shows when task is "Awaiting Manager Approval" | 4 |
| AI Literacy Card | SHOULD | PL1-PL4 progress, recommended next actions | 3 |
| User Profile Header | NICE | Avatar, name, role, "Day X" indicator | 5 |

### Task Status States
- `ACTIVE` - Currently being worked on (blue badge)
- `PENDING` - Not yet started (gray badge)
- `COMPLETE` - Done (green checkmark)
- `AWAITING_APPROVAL` - Blocked on manager (orange badge)
- `AGENT_RUNNING` - Agent is processing (yellow pulse)

### Demo Persona Data
- **Name:** Sarah Chen
- **Role:** Intern
- **Day:** 3
- **Team:** Platform Cloud (Software Engineer)
- **Tasks completed:** 1 of 5 Dev Env, 0 of 4 BT, 0 of 3 Admin

---

## 3. Frontend Implementation Plan {#frontend-plan}

### Tech Stack
- **Framework:** React (Vite for build speed)
- **Styling:** Tailwind CSS (rapid prototyping, no custom CSS debugging)
- **Components:** Shadcn/ui (pre-built, accessible, customizable)
- **Icons:** Lucide React
- **State:** React useState/useContext (no Redux overhead for demo)
- **Mock Data:** JSON files imported directly

### Component Tree
```
App
 |-- Layout
 |    |-- Header (logo, breadcrumb, user profile)
 |    |-- Sidebar
 |    |    |-- ProgressRing (overall %)
 |    |    |-- TaskNavigation
 |    |    |    |-- CategoryGroup ("DEV ENVIRONMENT")
 |    |    |    |    |-- TaskItem (numbered, with status badge)
 |    |    |-- NextHint ("Next: Set up OrgFarm ->")
 |    |-- MainContent
 |    |    |-- TaskHeader (title, status badge, "Task X of Y")
 |    |    |-- StepProgressBar (sub-step indicators)
 |    |    |-- CurrentStepCard
 |    |    |    |-- StepTitle + description
 |    |    |    |-- TerminalOutput (dark code block)
 |    |    |    |-- StatusChip ("Extensions installed")
 |    |    |    |-- ActionButton ("Next Step ->")
 |    |    |-- ResourcesPanel
 |    |    |    |-- ResourceLink (icon + title + external icon)
 |    |-- RightSidebar
 |    |    |-- AgentActivity
 |    |    |    |-- ActivityItem (dot color + message + timestamp)
 |    |    |-- YourProgress
 |    |    |    |-- ProgressBar (per category)
 |    |    |-- NeedHelp
 |    |    |    |-- CopilotButton
 |    |    |    |-- ViewDocsButton
 |    |    |    |-- SetupTimeEstimate
```

### File Structure (Frontend)
```
frontend/
  src/
    components/
      layout/
        Header.jsx
        Sidebar.jsx
        MainContent.jsx
        RightSidebar.jsx
      tasks/
        TaskNavigation.jsx
        TaskItem.jsx
        CategoryGroup.jsx
        CurrentStepCard.jsx
        StepProgressBar.jsx
        TerminalOutput.jsx
        StatusChip.jsx
      agent/
        AgentActivity.jsx
        ActivityItem.jsx
      progress/
        ProgressRing.jsx
        ProgressBar.jsx
        YourProgress.jsx
      help/
        NeedHelp.jsx
        CopilotButton.jsx
      resources/
        ResourcesPanel.jsx
        ResourceLink.jsx
    data/
      mockTasks.json
      mockAgentActivity.json
      mockUserProfile.json
    hooks/
      useTaskProgress.js
      useAgentStatus.js
    App.jsx
    main.jsx
  public/
    logo.svg
  index.html
  package.json
  vite.config.js
  tailwind.config.js
```

### Key Frontend Deliverables (Priority Order)
1. **Layout shell** - Header + 3-column responsive layout
2. **Left sidebar** - Progress ring + task navigation with status badges
3. **Main content** - Task detail card with terminal output display
4. **Right sidebar** - Agent activity feed + progress bars
5. **Interactivity** - Click task items to update main view, "Next Step" advances state
6. **Polish** - Animations, status transitions, color-coded badges

---

## 4. Backend Team 1: API & Data {#backend-api}

### Architecture (Demo-Focused)
Since this is a hackathon demo, the backend serves **mock data via a simple API** that the frontend consumes. No real auth, no real provisioning.

### Tech Stack
- **Runtime:** Node.js + Express (or Python Flask - team preference)
- **Data:** JSON files (no database needed for demo)
- **CORS:** Enabled for local frontend dev

### API Endpoints

```
GET  /api/user/:userId              -> User profile (name, role, day, team)
GET  /api/tasks/:userId             -> All tasks grouped by category
GET  /api/tasks/:userId/:taskId     -> Single task with sub-steps
POST /api/tasks/:userId/:taskId/advance  -> Mark current step complete, advance
GET  /api/agent/activity/:userId    -> Agent activity feed
POST /api/agent/trigger/:taskId     -> Simulate agent running a task
GET  /api/progress/:userId          -> Overall + per-category progress
GET  /api/resources/:taskId         -> Resources relevant to current task
GET  /api/manager/config/:teamId    -> Manager's JSON config for team
POST /api/manager/approve/:taskId   -> Manager approves a blocked task
GET  /api/ai-literacy/:userId       -> AI literacy progress (PL level, recommendations)
```

### Data Models

```json
// User Profile
{
  "userId": "sarah-chen-001",
  "name": "Sarah Chen",
  "role": "Intern",
  "team": "Platform Cloud",
  "startDate": "2026-07-07",
  "currentDay": 3,
  "avatar": "/avatars/sarah.jpg"
}

// Task (within category)
{
  "taskId": "dev-env-01",
  "category": "DEV ENVIRONMENT",
  "title": "Install VS Code & Claude Code",
  "status": "ACTIVE",
  "order": 1,
  "totalSteps": 4,
  "currentStep": 2,
  "steps": [
    { "stepId": "s1", "title": "Download VS Code", "status": "COMPLETE" },
    { "stepId": "s2", "title": "Install Extensions", "status": "ACTIVE",
      "description": "Install the Claude Code and Salesforce Extensions Pack in VS Code.",
      "terminalOutput": "$ code --install-extension Salesforce.salesforcedx-vscode\n✓ Installing Salesforce Extension Pack...\n✓ Installing Claude Code extension...\n✓ All extensions installed successfully",
      "statusChip": { "label": "Extensions installed", "icon": "check" }
    },
    { "stepId": "s3", "title": "Verify Claude Code", "status": "PENDING" },
    { "stepId": "s4", "title": "Open Workspace", "status": "PENDING" }
  ],
  "resources": [
    { "title": "VS Code Download Page", "url": "#", "icon": "link" },
    { "title": "Claude Code Quickstart", "url": "#", "icon": "link" },
    { "title": "Salesforce Extension Pack Docs", "url": "#", "icon": "link" }
  ]
}

// Agent Activity Item
{
  "id": "act-001",
  "timestamp": "2m ago",
  "message": "Agent checking extension compatibility...",
  "status": "in_progress",    // "in_progress" | "complete" | "error"
  "dotColor": "yellow"        // yellow=working, green=done, red=error
}

// Manager Config (defines what tasks get generated)
{
  "teamId": "platform-cloud",
  "role": "software_engineer",
  "configuredBy": "Manager Name",
  "categories": [
    {
      "name": "DEV ENVIRONMENT",
      "tasks": [
        { "title": "Install VS Code & Claude Code", "required": true, "agentCanVerify": true },
        { "title": "Set up OrgFarm extension", "required": true, "agentCanVerify": true },
        { "title": "Clone the Core repo", "required": true, "agentCanVerify": true },
        { "title": "Start and run Core app locally", "required": true, "agentCanVerify": false },
        { "title": "Request permissions", "required": true, "requiresApproval": true }
      ]
    },
    {
      "name": "BLACK TAB (BT)",
      "tasks": [
        { "title": "Complete BT orientation module", "required": true },
        { "title": "Set up BT dev environment", "required": true },
        { "title": "Run first BT build", "required": false },
        { "title": "Submit practice PR", "required": false }
      ]
    },
    {
      "name": "ADMIN / DOCS",
      "tasks": [
        { "title": "Complete compliance training", "required": true },
        { "title": "Set up 1Password vault access", "required": true, "requiresApproval": true },
        { "title": "Review team documentation", "required": true }
      ]
    }
  ],
  "aiLiteracy": {
    "currentLevel": "PL1",
    "targetLevel": "PL2",
    "recommendations": [
      "Complete Claude Code basics module",
      "Try 3 code-assist prompts this week",
      "Explore Agentforce documentation"
    ]
  }
}

// Progress Summary
{
  "overall": { "completed": 1, "total": 12, "percentage": 8 },
  "categories": [
    { "name": "Dev Env", "completed": 1, "total": 5 },
    { "name": "BT", "completed": 0, "total": 4 },
    { "name": "Admin", "completed": 0, "total": 3 }
  ]
}
```

---

## 5. Backend Team 2: Agent & AI Integration {#backend-agent}

### Agent Architecture

The "agent" is an **LLM-powered task generator + monitor** that:
1. Takes manager JSON config as input
2. Generates a personalized, ordered checklist
3. Simulates background verification tasks
4. Reports status back to the dashboard

### Implementation (For Demo)

```
Manager JSON Config
       |
       v
[Claude API Call] -- "Generate personalized onboarding checklist for
       |              {role} on {team} with these requirements: {config}"
       v
Generated Task List (stored as JSON)
       |
       v
[Agent Monitor Loop] -- Periodically checks:
       |                  - Can I verify this step? (e.g., extension installed)
       |                  - Is this blocked? Alert manager.
       |                  - What's the next recommendation?
       v
Agent Activity Feed (pushed to frontend)
```

### Agent Capabilities to Demo
| Capability | Implementation | Faked/Real |
|-----------|---------------|------------|
| Generate checklist from config | Claude API prompt | Real LLM call |
| Verify extension installation | Hardcoded response after delay | Faked |
| Check repo access | Hardcoded response | Faked |
| Surface blockers to manager | Status change in JSON | Faked |
| AI literacy recommendations | Static from config | Faked |
| "Ask Einstein Copilot" | Claude API with context | Real LLM call |

### Key Files (Backend Agent)
```
backend/
  src/
    agent/
      taskGenerator.js     -- Claude API call to generate checklist
      agentMonitor.js      -- Simulates background verification
      activityFeed.js      -- Generates activity events
    api/
      routes/
        user.js
        tasks.js
        agent.js
        progress.js
        manager.js
        aiLiteracy.js
      middleware/
        cors.js
    data/
      managerConfig.json
      generatedTasks.json
      agentActivity.json
      userProfile.json
    config/
      claude.js            -- Claude API configuration
  server.js
  package.json
```

### Human-in-the-Loop Flow (Must Demo This)
```
1. MANAGER sets config:
   POST /api/manager/config  { categories, requirements, team context }
   
2. AGENT generates checklist:
   Triggered automatically -> Claude API -> stores generated tasks
   
3. INTERN sees dashboard:
   GET /api/tasks/:userId -> displays generated checklist
   
4. INTERN completes task:
   POST /api/tasks/:userId/:taskId/advance
   
5. AGENT verifies (background):
   Agent checks if step was actually completed
   -> Updates agent activity feed
   -> If blocked: changes status to AWAITING_APPROVAL
   
6. MANAGER approves:
   POST /api/manager/approve/:taskId
   -> Unblocks intern, advances to next step
   
7. LOOP continues until all tasks complete
```

---

## 6. GitHub Repository Structure {#github-structure}

### Repository Setup
```
pilotforce/
  |-- README.md
  |-- .gitignore
  |-- frontend/
  |    |-- package.json
  |    |-- vite.config.js
  |    |-- tailwind.config.js
  |    |-- postcss.config.js
  |    |-- index.html
  |    |-- public/
  |    |    |-- logo.svg
  |    |    |-- avatars/
  |    |-- src/
  |    |    |-- (see Frontend File Structure above)
  |-- backend/
  |    |-- package.json
  |    |-- server.js
  |    |-- src/
  |    |    |-- (see Backend File Structure above)
  |-- docs/
  |    |-- architecture.md
  |    |-- data-contracts.md
  |-- demo/
  |    |-- screenshots/
  |    |-- video-script.md
```

### Branching Strategy (Simple for Hackathon)
- `main` - stable, deployable
- `frontend/feature-name` - frontend work
- `backend/feature-name` - backend work
- Merge to main via PR (quick review, no blocking)

### Setup Commands
```bash
# Clone
git clone <repo-url>
cd pilotforce

# Frontend
cd frontend
npm install
npm run dev  # starts on localhost:5173

# Backend
cd backend
npm install
npm run dev  # starts on localhost:3001
```

---

## 7. Timeline - Today Through Friday {#timeline}

### THURSDAY July 9 (TODAY - Code Sprint)

| Time | Frontend (Zihan + Taliyah) | Backend API (Kenna + Ayomide) | Backend Agent (Carlos + Sami) |
|------|---------------------------|------------------------------|-------------------------------|
| 9:00 AM | Set up React + Vite + Tailwind, establish layout shell | Set up Express server, define all routes, create mock JSON data | Set up Claude API integration, write task generator prompt |
| 10:00 AM | Build Header + Sidebar (progress ring, task nav) | Implement GET /api/tasks and GET /api/user | Implement agent monitor simulation |
| 11:00 AM | Build MainContent (task detail card, terminal output) | Implement POST /advance and GET /progress | Build activity feed generator |
| 12:00 PM | LUNCH + sync check | LUNCH + sync check | LUNCH + sync check |
| 1:00 PM | Build RightSidebar (agent activity, progress bars) | Implement manager config and approval endpoints | Implement "Ask Copilot" Claude call |
| 2:00 PM | Connect frontend to backend APIs | Test all endpoints, fix CORS | End-to-end flow test |
| 3:00 PM | Add interactivity (click navigation, state transitions) | Add AI literacy endpoint | Polish agent responses |
| 4:00 PM | Polish UI (animations, colors, spacing) | Integration testing with frontend | Integration testing |
| 5:00 PM | Final testing + bug fixes | Final testing + bug fixes | Final testing |
| 6:00 PM | **CODE FREEZE** - everything committed and working | | |

### FRIDAY July 10 (Video + Submission)

| Time | Task | Owner |
|------|------|-------|
| 9:00 AM | Record demo walkthrough (screen capture of dashboard) | All |
| 9:30 AM | Record voiceover narration (problem + solution story) | Designated presenter |
| 10:00 AM | Edit video (Arcade or screen recording tool) | Designated editor |
| 11:00 AM | Review video as team, iterate if needed | All |
| 12:00 PM | Final video polish, ensure under 3 minutes | All |
| 1:00 PM | Buffer time for any last-minute fixes | All |
| 1:45 PM | **SUBMIT VIDEO** via workflow in Slack channel | One team member |

---

## 8. Presentation Plan (3-Min Video) {#presentation}

### Video Script Structure

**[0:00 - 0:30] THE PROBLEM**
- "Day 1 as a new intern at Salesforce. You get a Slack message with 47 links, 5 different systems to set up, and no idea what order to do them in."
- Show the BEFORE: scattered Slack messages, confusing Base Camp UI, multiple browser tabs
- "Onboarding is bureaucracy - a multi-step process where you repeatedly wait, chase, and navigate unclear rules with no single owner."
- Connect to Salesforce FY27 priority: busting bureaucracy

**[0:30 - 1:30] THE SOLUTION**
- "Meet PILOTForce - Proficiency, Integration, Learning & Onboarding Tool"
- Explain the three pillars:
  1. Automated agent generates and manages your personalized checklist
  2. Human-in-the-loop: managers configure, approve, and steer
  3. AI literacy: builds your AI skills from day one
- Show architecture diagram briefly (Manager -> Agent -> Dashboard -> Intern)
- Highlight: "The agent does what it's best at - organization, verification, monitoring. Humans do what they're best at - decisions, context, approval."

**[1:30 - 2:30] THE DEMO**
- Live walkthrough of the dashboard:
  1. Show Sarah Chen's view: progress ring at 20%, active task "Install VS Code"
  2. Show the agent activity panel: "Agent checking extension compatibility..."
  3. Click "Next Step" - show task advancing
  4. Show a blocked task requiring manager approval
  5. Show the manager view approving the request
  6. Show AI literacy panel with PL1->PL2 recommendations
- Narrate the human-agent collaboration happening at each step

**[2:30 - 3:00] THE IMPACT**
- "PILOTForce reduces onboarding time from days to hours"
- "Every intern gets a personalized, guided experience"
- "Managers stay in control without micromanaging"
- "And new hires build AI proficiency from day one"
- Scale potential: "Built for interns today, extensible to any role tomorrow"
- Close with: "PILOTForce - because onboarding shouldn't feel like bureaucracy."

### Video Production Tips
- Use **Arcade** for polished step-by-step demo recording
- Use **ElevenLabs** for professional voiceover if preferred
- Keep transitions smooth, no dead air
- Show the actual working dashboard (not just mockups)

---

## 9. Claude Prompts for Rapid Development {#claude-prompts}

### Frontend Prompts

**Prompt 1: Initial Layout Setup**
```
Create a React + Vite project with Tailwind CSS and Shadcn/ui. Build a 3-column dashboard layout:
- Left sidebar (240px, light gray bg): circular progress ring at top, then a collapsible navigation list with numbered task items showing status badges (ACTIVE in blue, PENDING in gray, COMPLETE with green checkmark)
- Main content (flex-grow, white bg): task detail card with title, status badge, step progress dots, current step instructions panel with dark terminal/code output area, action button "Next Step ->"
- Right sidebar (320px, white bg with border): "Agent Activity" section with timestamped messages and colored status dots, "Your Progress" with labeled progress bars, "Need Help?" with a prominent button

Use this exact color scheme: Blue primary (#2563eb), green for success (#22c55e), yellow for in-progress (#eab308), gray for pending (#6b7280), dark bg for terminal (#1e293b).

The data should come from imported JSON mock files. Here's the data structure: [paste mockTasks.json schema]
```

**Prompt 2: Task Navigation Component**
```
Build a React component TaskNavigation that renders a collapsible sidebar menu. It receives an array of task categories, each with tasks that have: title, status (ACTIVE/PENDING/COMPLETE/AWAITING_APPROVAL/AGENT_RUNNING), and order number.

Requirements:
- Each category is a collapsible group with a header (e.g., "DEV ENVIRONMENT")
- Tasks are numbered within their category
- Status is shown as a colored badge to the right of the task title
- The active task is highlighted with a light blue background
- Clicking a task calls onTaskSelect(taskId)
- Below all categories, show "Next: [next task title] ->" hint

Match this exact visual style: [reference mockup screenshot]
```

**Prompt 3: Agent Activity Feed**
```
Build a React component AgentActivity that shows a real-time activity feed. It receives an array of activity items with: message, timestamp, status (in_progress/complete/error), and dotColor (yellow/green/red).

Requirements:
- Header "Agent Activity" with an info icon
- Each item shows: colored dot (8px circle) + message text + timestamp on right
- Yellow dots pulse/animate for in_progress items
- Green dots are solid for complete items
- Items are ordered newest-first
- Max 5 items shown, older ones scroll
- Powered by footer: "Powered by Einstein Agent" with star icon
```

**Prompt 4: Terminal Output Component**
```
Build a React component TerminalOutput that renders a dark code block similar to a terminal window. Props: commands (array of {text, prefix, isSuccess}).

Requirements:
- Dark background (#1e293b), monospace font, green text for success lines
- Show $ prefix for commands, checkmark for success lines
- Slight padding, rounded corners
- Fixed height with scroll if content overflows
```

**Prompt 5: Full Dashboard Assembly**
```
I have these components built: Header, Sidebar, TaskNavigation, MainContent, CurrentStepCard, TerminalOutput, RightSidebar, AgentActivity, ProgressRing, YourProgress, NeedHelp.

Now wire them together in App.jsx with state management:
- Track currentTaskId in state
- When a task is clicked in sidebar, update main content to show that task's details
- "Next Step" button advances currentStep within a task, or moves to next task when all steps done
- Progress ring and category progress bars update automatically
- Agent activity simulates new items appearing every few seconds (use setInterval)

Import data from these JSON files: [list files]
```

### Backend Prompts

**Prompt 6: Express Server Setup**
```
Create a Node.js Express server with these endpoints:
- GET /api/user/:userId - returns user profile
- GET /api/tasks/:userId - returns all tasks grouped by category  
- GET /api/tasks/:userId/:taskId - returns single task with steps
- POST /api/tasks/:userId/:taskId/advance - advances to next step
- GET /api/agent/activity/:userId - returns agent activity feed
- GET /api/progress/:userId - returns progress summary
- GET /api/manager/config/:teamId - returns manager configuration
- POST /api/manager/approve/:taskId - approves a blocked task

All data is served from JSON files in a /data directory. The POST endpoints modify the JSON in memory (no persistence needed). Enable CORS for localhost:5173.

Here are the data schemas: [paste schemas from section 4]
```

**Prompt 7: Claude API Integration (Agent Task Generator)**
```
Create a Node.js module that calls the Claude API (Anthropic SDK) to generate a personalized onboarding checklist. 

Input: A manager configuration JSON with team name, role, and required categories/tasks.

The prompt to Claude should be:
"You are an onboarding agent for Salesforce. Given this manager configuration for a new {role} on the {team} team, generate a detailed, ordered onboarding checklist. For each task, provide: title, description, estimated time, whether it can be auto-verified, and relevant resources. Group tasks by category. Prioritize by dependency order."

Return the generated checklist as structured JSON matching our task schema.

Also create an endpoint POST /api/agent/generate that triggers this and stores the result.
```

**Prompt 8: Agent Activity Simulator**
```
Create a module that simulates agent background activity. When a task is active, the agent should periodically generate activity messages like:
- "Checking extension compatibility..." (in_progress)
- "Extension pack verified" (complete)  
- "Verifying repo access..." (in_progress)
- "Access confirmed" (complete)
- "Blocked: requires manager approval" (error)

Use setTimeout to space these out by 2-5 seconds. Store them in the activity array and make them available via the GET /api/agent/activity endpoint.
```

### Integration Prompts

**Prompt 9: Connect Frontend to Backend**
```
Update my React frontend to fetch data from the Express backend at localhost:3001 instead of importing JSON directly.

Replace all mock data imports with:
- useEffect + fetch calls on component mount
- Loading states while data fetches
- Error handling for failed requests

Endpoints to connect:
- App init: GET /api/user/sarah-chen-001 and GET /api/tasks/sarah-chen-001
- Task click: GET /api/tasks/sarah-chen-001/{taskId}
- Next step: POST /api/tasks/sarah-chen-001/{taskId}/advance
- Agent feed: GET /api/agent/activity/sarah-chen-001 (poll every 3s)
- Progress: GET /api/progress/sarah-chen-001
```

**Prompt 10: Manager View (Simple)**
```
Create a simple second page/view for the Manager perspective. This is a minimal page showing:
- Header: "Manager Dashboard - Platform Cloud Team"
- A list of pending approval requests with Approve/Deny buttons
- A JSON editor showing the team configuration (read-only for demo)
- When "Approve" is clicked, POST to /api/manager/approve/:taskId

This demonstrates the human-in-the-loop: the manager sees what the agent flagged and makes the decision.
```

### Polish & Demo Prompts

**Prompt 11: Animations and Transitions**
```
Add subtle animations to my PILOTForce dashboard:
- Progress ring: animate fill on mount (0 to current %)
- Task status badges: fade transition when status changes
- Agent activity: new items slide in from top with fade
- "Next Step" button: gentle pulse animation to draw attention
- Terminal output: typewriter effect for new lines appearing
- Sidebar active state: smooth background color transition

Use Tailwind's built-in transitions and CSS animations. Keep it professional, not flashy.
```

**Prompt 12: Final Demo Data Population**
```
Generate realistic mock data for our PILOTForce demo. Create complete JSON files for:

1. Sarah Chen's user profile (Intern, Day 3, Platform Cloud team)
2. Her task list with 12 tasks across 3 categories (Dev Environment: 5 tasks, Black Tab: 4 tasks, Admin/Docs: 3 tasks), with task 1 partially complete (step 2 of 4)
3. Agent activity feed (10 items showing mix of completed verifications and in-progress checks)
4. Manager config for Platform Cloud team
5. AI Literacy data (current PL1, target PL2, with 3 specific recommendations)

Make all content realistic to actual Salesforce intern onboarding. Reference real tools: VS Code, Claude Code, OrgFarm, Core repo, Salesforce Extension Pack, 1Password, Slack channels.
```

---

## Appendix A: Quick Reference - What to Show Judges

For each rubric criterion, here's the ONE thing to make sure is visible in the demo:

| Criterion | Must-Show Moment |
|-----------|-----------------|
| Problem & Business Impact | "Day 1" pain narrative + fragmented systems visual |
| Solution Design | Architecture diagram + working dashboard |
| Agent & AI Literacy | Agent activity panel + AI literacy card + "we built this with Claude Code" |
| Human-Agent Collaboration | Manager approval flow (agent flags -> manager approves -> intern unblocked) |
| Storytelling | Clear before/after, named persona, specific numbers |

---

## Appendix B: Mentor Document Update

The document at `https://docs.google.com/document/d/1ZhPaYUUlU21k4shksnXlJTBYOKItem7gWYztvxiqnk8/edit` should be updated to include:

**Add these sections:**
1. **Rubric Mapping Table** - Show exactly how each feature maps to each criterion (copy from Section 1 above)
2. **Technical Architecture** - Add the human-agent loop diagram from Section 5
3. **Demo Flow** - Add the 6-step flow from Section 5 showing the collaboration loop
4. **AI Tools Used** - List: Claude Code (development), Claude API (agent brain), Claude Design (mockups), Arcade (video)
5. **Business Impact Statement** - "Reduces onboarding friction from 3+ days of confusion to a guided, automated experience. Quantifiable: fewer blocked tickets, faster time-to-productivity, higher intern satisfaction."

---

## Appendix C: Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Backend not ready in time | Frontend works entirely on mock JSON - can demo without live backend |
| Claude API rate limits | Pre-generate and cache the checklist; copilot is nice-to-have |
| Team members unavailable | Each section is independent; anyone can pick up where another left off |
| Video too long | Script is timed at 3:00; practice run before recording |
| Demo crashes during recording | Record in segments, edit together; have screenshot fallback |
