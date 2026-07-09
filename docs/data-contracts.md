# API Data Contracts

## User Profile

### GET /api/user/:userId

**Response:**
```json
{
  "userId": "sarah-brown-001",
  "name": "Sarah Brown",
  "role": "Intern",
  "team": "Platform Cloud",
  "startDate": "2026-07-07",
  "currentDay": 3,
  "avatar": "/avatars/sarah.jpg"
}
```

## Tasks

### GET /api/tasks/:userId

**Response:**
```json
{
  "categories": [
    {
      "name": "DEV ENVIRONMENT",
      "tasks": [
        {
          "taskId": "dev-env-01",
          "title": "Install VS Code & Claude Code",
          "status": "ACTIVE",
          "order": 1,
          "totalSteps": 4,
          "currentStep": 2
        }
      ]
    }
  ]
}
```

### GET /api/tasks/:userId/:taskId

**Response:**
```json
{
  "taskId": "dev-env-01",
  "category": "DEV ENVIRONMENT",
  "title": "Install VS Code & Claude Code",
  "status": "ACTIVE",
  "order": 1,
  "totalSteps": 4,
  "currentStep": 2,
  "steps": [
    {
      "stepId": "s1",
      "title": "Download VS Code",
      "status": "COMPLETE",
      "description": "Download and install VS Code from official website.",
      "terminalOutput": null,
      "statusChip": {
        "label": "VS Code installed",
        "icon": "check"
      }
    },
    {
      "stepId": "s2",
      "title": "Install Extensions",
      "status": "ACTIVE",
      "description": "Install the Claude Code and Salesforce Extensions Pack in VS Code.",
      "terminalOutput": "$ code --install-extension Salesforce.salesforcedx-vscode\n✓ Installing Salesforce Extension Pack...\n✓ Installing Claude Code extension...\n✓ All extensions installed successfully",
      "statusChip": {
        "label": "Extensions installed",
        "icon": "check"
      }
    },
    {
      "stepId": "s3",
      "title": "Verify Claude Code",
      "status": "PENDING",
      "description": "Open Claude Code and verify it's working correctly.",
      "terminalOutput": null,
      "statusChip": null
    },
    {
      "stepId": "s4",
      "title": "Open Workspace",
      "status": "PENDING",
      "description": "Open your team's workspace in VS Code.",
      "terminalOutput": null,
      "statusChip": null
    }
  ],
  "resources": [
    {
      "title": "VS Code Download Page",
      "url": "https://code.visualstudio.com/download",
      "icon": "external-link"
    },
    {
      "title": "Claude Code Quickstart",
      "url": "https://claude.ai/code",
      "icon": "book"
    },
    {
      "title": "Salesforce Extension Pack Docs",
      "url": "https://developer.salesforce.com/tools/vscode",
      "icon": "file-text"
    }
  ]
}
```

### POST /api/tasks/:userId/:taskId/advance

**Request:**
```json
{
  "stepId": "s2"
}
```

**Response:**
```json
{
  "success": true,
  "nextStep": "s3",
  "message": "Advanced to next step"
}
```

## Agent Activity

### GET /api/agent/activity/:userId

**Response:**
```json
{
  "activities": [
    {
      "id": "act-001",
      "timestamp": "2m ago",
      "message": "Agent checking extension compatibility...",
      "status": "in_progress",
      "dotColor": "yellow"
    },
    {
      "id": "act-002",
      "timestamp": "5m ago",
      "message": "Extension pack verified",
      "status": "complete",
      "dotColor": "green"
    },
    {
      "id": "act-003",
      "timestamp": "8m ago",
      "message": "Verifying repo access...",
      "status": "complete",
      "dotColor": "green"
    }
  ]
}
```

### POST /api/agent/trigger/:taskId

**Request:**
```json
{
  "action": "verify_environment"
}
```

**Response:**
```json
{
  "success": true,
  "activityId": "act-004",
  "message": "Agent task triggered"
}
```

## Progress

### GET /api/progress/:userId

**Response:**
```json
{
  "overall": {
    "completed": 1,
    "total": 12,
    "percentage": 8
  },
  "categories": [
    {
      "name": "Dev Env",
      "completed": 1,
      "total": 5,
      "percentage": 20
    },
    {
      "name": "BT",
      "completed": 0,
      "total": 4,
      "percentage": 0
    },
    {
      "name": "Admin",
      "completed": 0,
      "total": 3,
      "percentage": 0
    }
  ]
}
```

## Manager

### GET /api/manager/config/:teamId

**Response:**
```json
{
  "teamId": "platform-cloud",
  "role": "software_engineer",
  "configuredBy": "Manager Name",
  "categories": [
    {
      "name": "DEV ENVIRONMENT",
      "tasks": [
        {
          "title": "Install VS Code & Claude Code",
          "required": true,
          "agentCanVerify": true
        }
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
```

### POST /api/manager/approve/:taskId

**Request:**
```json
{
  "approved": true,
  "comment": "Access granted for development environment"
}
```

**Response:**
```json
{
  "success": true,
  "taskId": "dev-env-05",
  "newStatus": "ACTIVE",
  "message": "Task approved and unblocked"
}
```

## AI Literacy

### GET /api/ai-literacy/:userId

**Response:**
```json
{
  "currentLevel": "PL1",
  "targetLevel": "PL2",
  "progress": 25,
  "completedModules": [
    "Introduction to Claude Code"
  ],
  "recommendations": [
    "Complete Claude Code basics module",
    "Try 3 code-assist prompts this week",
    "Explore Agentforce documentation"
  ],
  "nextMilestone": {
    "level": "PL2",
    "requirement": "Complete 5 supervised AI tasks"
  }
}
```

## Status Values

### Task Status
- `ACTIVE` - Currently being worked on
- `PENDING` - Not yet started
- `COMPLETE` - Finished
- `AWAITING_APPROVAL` - Blocked on manager approval
- `AGENT_RUNNING` - Agent is processing

### Step Status
- `COMPLETE` - Done
- `ACTIVE` - Current step
- `PENDING` - Not started

### Agent Activity Status
- `in_progress` - Agent working
- `complete` - Agent finished
- `error` - Agent encountered error
