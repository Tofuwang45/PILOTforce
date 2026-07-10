# PILOTForce

**Proficiency, Integration, Learning & Onboarding Tool**

Team 23 - Future Force Hackathon 2026
by: Kenna Nyuga-Galega, Ayomide Isinkaye

## Overview

PILOTForce is an agentic onboarding system that transforms the fragmented, bureaucratic new hire experience into a guided, personalized dashboard. Built with human-agent collaboration at its core, PILOTForce generates customized checklists, monitors progress, and builds AI literacy from day one.

## Key Features

- **Agentic Task Generation**: Managers configure requirements via JSON; AI agent generates personalized onboarding checklists
- **Human-in-the-Loop**: Agents handle verification and monitoring; humans make decisions and approvals
- **Single-Page Dashboard**: Minimal cognitive load with all information in one view
- **Real-time Agent Activity**: See what the agent is doing in the background
- **AI Literacy Integration**: Track and build AI proficiency (PL1-PL4) from day one

## Architecture

```
Manager JSON Config → Agent Generation → Guided Dashboard → Human Approval Loop
```

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Shadcn/ui components
- Lucide React icons

### Backend
- Node.js + Express
- Claude API (Anthropic SDK)
- JSON-based data storage (demo)

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Opens on localhost:5173
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
# Runs on localhost:3001
```

## Project Structure

```
pilotforce/
├── frontend/          # React dashboard UI
├── backend/           # Express API + Agent logic
├── docs/             # Architecture & data contracts
└── demo/             # Screenshots & video assets
```

## Rubric Alignment

This project addresses all 5 hackathon criteria:

1. **Problem & Business Impact**: Tackles onboarding bureaucracy (FY27 priority)
2. **Solution Design**: Agentic system with personalized generation
3. **Agent & AI Literacy**: Demonstrates agent capabilities + PL-level tracking
4. **Human-Agent Collaboration**: Clear division of labor with approval loops
5. **Storytelling**: Named persona (Sarah Chen), before/after narrative

## Demo Flow

1. Manager sets team configuration
2. Agent generates personalized checklist
3. Intern sees dashboard with ordered tasks
4. Intern completes tasks; agent verifies
5. Agent flags blockers requiring approval
6. Manager approves; intern continues
7. Progress tracked across categories

## Team

- Zihan Wang - Frontend
- Taliyah - Frontend
- Kenna - Backend API
- Ayomide - Backend API
- Carlos - Backend Agent
- Sami - Backend Agent

## Timeline

- **Thursday July 9**: Code sprint (9 AM - 6 PM code freeze)
- **Friday July 10**: Video production & submission (due 2:00 PM PT)

## Documentation

See `/docs` for:
- Architecture diagrams
- API contracts
- Data schemas

## License

Hackathon project - Salesforce Future Force 2026
