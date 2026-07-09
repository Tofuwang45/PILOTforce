# PILOTForce Architecture

## System Overview

PILOTForce is an agentic onboarding system that leverages human-agent collaboration to transform the fragmented new hire experience.

## Architecture Diagram

```
┌─────────────────┐
│   Manager UI    │
│  (JSON Config)  │
└────────┬────────┘
         │
         v
┌─────────────────┐
│  Agent Engine   │
│ (Claude API)    │
│  - Generate     │
│  - Monitor      │
│  - Verify       │
└────────┬────────┘
         │
         v
┌─────────────────┐
│   Backend API   │
│   (Express)     │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Frontend Dashboard │
│    (React)      │
│  - Task View    │
│  - Progress     │
│  - Agent Feed   │
└─────────────────┘
         │
         v
┌─────────────────┐
│   Intern User   │
└─────────────────┘
```

## Data Flow

### 1. Configuration Phase
1. Manager defines team requirements via JSON config
2. Config includes: role, team, required tasks, approval rules
3. Stored in `/backend/src/data/managerConfig.json`

### 2. Generation Phase
1. Agent receives manager config
2. Calls Claude API with structured prompt
3. Generates personalized, ordered checklist
4. Stores as `/backend/src/data/generatedTasks.json`

### 3. Execution Phase
1. Intern views dashboard (frontend)
2. Frontend fetches tasks via API
3. Intern completes tasks step-by-step
4. Agent monitors progress in background

### 4. Verification Phase
1. Agent verifies task completion
2. Updates activity feed
3. Flags blockers requiring approval

### 5. Approval Phase
1. Manager sees blocked tasks
2. Approves/denies via manager view
3. Intern unblocked, continues flow

## Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Components**: Custom + Shadcn/ui patterns
- **Icons**: Lucide React
- **State**: React Context + useState

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express
- **AI**: Claude API (Anthropic SDK)
- **Data**: JSON files (demo)

### Agent
- **Model**: Claude 3.5 Sonnet
- **Capabilities**:
  - Task generation from config
  - Environment verification (simulated)
  - Progress monitoring
  - Resource aggregation
- **Limitations**:
  - No access decisions (human approves)
  - No manager judgment replacement
  - Escalates when blocked

## API Endpoints

See `data-contracts.md` for full specifications.

Key endpoints:
- `GET /api/tasks/:userId` - Fetch all tasks
- `POST /api/tasks/:userId/:taskId/advance` - Advance step
- `GET /api/agent/activity/:userId` - Agent activity feed
- `POST /api/manager/approve/:taskId` - Manager approval

## Security Considerations

**Note**: This is a hackathon demo. Production deployment would require:
- Authentication & authorization
- Encrypted secrets storage
- Rate limiting
- Input validation
- CSRF protection
- Audit logging

## Scalability

Current design is single-user demo. To scale:
- Replace JSON with database (PostgreSQL)
- Add message queue for agent tasks (Redis)
- Implement WebSocket for real-time updates
- Add caching layer
- Deploy frontend/backend separately

## Human-Agent Collaboration Model

### Agent Responsibilities
- Generate checklists from config
- Monitor task completion
- Verify environment setup
- Surface blockers
- Aggregate resources

### Human Responsibilities
- Define requirements
- Make access decisions
- Approve blockers
- Provide context
- Steer priorities

### Collaboration Loop
```
Manager Config → Agent Generate → Intern Execute → 
Agent Monitor → Manager Approve → Loop
```

## AI Literacy Integration

Tracks proficiency levels (PL1-PL4):
- **PL1**: Basic awareness
- **PL2**: Supervised usage
- **PL3**: Independent application
- **PL4**: Expert mastery

Dashboard shows:
- Current level
- Target level
- Recommended next actions
- Progress tracking
