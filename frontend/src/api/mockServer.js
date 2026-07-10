// ---------------------------------------------------------------------------
// PILOTForce mock server
// ---------------------------------------------------------------------------
// A stateful, in-memory simulation of the PILOTForce backend. It exists so the
// demo behaves like a real deployment even with no server running: requests
// have realistic latency, every call is logged to the console like an HTTP
// access log, and mutations (sign a doc, request access, manager approves)
// actually persist and round-trip across views.
//
// The real backend in /backend exposes the same routes and shapes, so swapping
// this out for `fetch()` later is a drop-in change.
// ---------------------------------------------------------------------------

import { mockUser } from '@/data/mockUser';
import { mockTasks } from '@/data/mockTasks';
import { mockTaskDetails } from '@/data/mockTaskDetails';
import { mockProgress } from '@/data/mockProgress';
import { mockManagerConfig } from '@/data/mockManagerConfig';
import { mockAiLiteracy } from '@/data/mockAiLiteracy';

// deep clone so mutations don't leak back into the source modules
const clone = (v) => JSON.parse(JSON.stringify(v));

// --- in-memory database -----------------------------------------------------
const db = {
  user: clone(mockUser),
  tasks: clone(mockTasks),
  taskDetails: clone(mockTaskDetails),
  progress: clone(mockProgress),
  managerConfig: clone(mockManagerConfig),
  aiLiteracy: clone(mockAiLiteracy),
  activities: [
    { id: 'act-seed-1', message: 'Onboarding session initialized for Sarah Chen', status: 'complete', dotColor: 'green', at: Date.now() - 480000 },
    { id: 'act-seed-2', message: 'Generated personalized checklist (12 tasks)', status: 'complete', dotColor: 'green', at: Date.now() - 300000 },
    { id: 'act-seed-3', message: 'Monitoring environment setup…', status: 'in_progress', dotColor: 'yellow', at: Date.now() - 120000 }
  ],
  signatures: {}, // stepKey -> { signerName, signedAt, hash }
  approvals: {}   // taskId -> { approved, comment, approver, at }
};

let seq = 100;
const nextId = (p) => `${p}-${++seq}`;

// --- helpers ----------------------------------------------------------------

// Simulate variable network latency so the UI shows real loading states.
const latency = (min = 180, max = 520) =>
  new Promise((r) => setTimeout(r, min + Math.floor(Math.random() * (max - min))));

// HTTP-style access log — makes the console read like a real API is serving.
const log = (method, path, status = 200, ms) => {
  const color =
    status >= 500 ? '#ef4444' : status >= 400 ? '#eab308' : '#22c55e';
  console.log(
    `%c PILOTForce API %c ${method} %c ${path} %c ${status}${ms ? ` (${ms}ms)` : ''}`,
    'background:#0176d3;color:#fff;border-radius:3px;padding:1px 4px;font-weight:600',
    'color:#0176d3;font-weight:700',
    'color:#111',
    `color:${color};font-weight:700`
  );
};

// Wrap a handler so every "endpoint" logs + adds latency uniformly.
async function endpoint(method, path, handler) {
  const start = Date.now();
  await latency();
  try {
    const result = await handler();
    log(method, path, 200, Date.now() - start);
    return clone(result);
  } catch (err) {
    log(method, path, err.status || 500, Date.now() - start);
    throw err;
  }
}

const relTime = (at) => {
  const diff = Math.max(0, Date.now() - at);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins === 1) return '1m ago';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
};

const serializeActivities = () =>
  db.activities
    .slice()
    .sort((a, b) => b.at - a.at)
    .slice(0, 6)
    .map((a) => ({
      id: a.id,
      message: a.message,
      status: a.status,
      dotColor: a.dotColor,
      timestamp: relTime(a.at)
    }));

function addActivity(message, status = 'complete') {
  const dotColor =
    status === 'in_progress' ? 'yellow' : status === 'error' ? 'red' : 'green';
  db.activities.push({ id: nextId('act'), message, status, dotColor, at: Date.now() });
}

// Recompute progress from live task statuses so the rings stay honest.
function recomputeProgress() {
  const catMap = { 'DEV ENVIRONMENT': 'Dev Env', 'BLACK TAB (BT)': 'BT', 'ADMIN / DOCS': 'Admin' };
  let completedTotal = 0;
  let grandTotal = 0;
  const categories = db.tasks.categories.map((cat) => {
    const total = cat.tasks.length;
    const completed = cat.tasks.filter((t) => t.status === 'COMPLETE').length;
    completedTotal += completed;
    grandTotal += total;
    return {
      name: catMap[cat.name] || cat.name,
      completed,
      total,
      percentage: total ? Math.round((completed / total) * 100) : 0
    };
  });
  db.progress = {
    overall: {
      completed: completedTotal,
      total: grandTotal,
      percentage: grandTotal ? Math.round((completedTotal / grandTotal) * 100) : 0
    },
    categories
  };
}

// Tiny non-crypto hash so a signed doc has a believable receipt id.
function fauxHash(input) {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

function findTaskInList(taskId) {
  for (const cat of db.tasks.categories) {
    const t = cat.tasks.find((x) => x.taskId === taskId);
    if (t) return t;
  }
  return null;
}

// --- the "API" --------------------------------------------------------------

export const mockServer = {
  getUser(userId) {
    return endpoint('GET', `/api/user/${userId}`, () => db.user);
  },

  getTasks(userId) {
    return endpoint('GET', `/api/tasks/${userId}`, () => db.tasks);
  },

  getTaskDetail(userId, taskId) {
    return endpoint('GET', `/api/tasks/${userId}/${taskId}`, () => {
      const detail = db.taskDetails[taskId];
      if (!detail) {
        const err = new Error('Task not found');
        err.status = 404;
        // fall back to a minimal shape rather than hard-failing the demo
        return {
          taskId, category: 'UNKNOWN', title: taskId, status: 'PENDING',
          order: 0, totalSteps: 1, currentStep: 1, steps: [], resources: []
        };
      }
      return detail;
    });
  },

  advanceTask(userId, taskId, stepId) {
    return endpoint('POST', `/api/tasks/${userId}/${taskId}/advance`, () => {
      const detail = db.taskDetails[taskId];
      if (!detail) return { success: false, message: 'Task not found' };

      const idx = detail.steps.findIndex((s) => s.stepId === stepId);
      if (idx !== -1) detail.steps[idx].status = 'COMPLETE';

      let nextStepId = null;
      if (detail.currentStep < detail.totalSteps) {
        detail.currentStep += 1;
        const ns = detail.steps[detail.currentStep - 1];
        if (ns) {
          ns.status = 'ACTIVE';
          nextStepId = ns.stepId;
        }
        addActivity(`Step complete on "${detail.title}" — advancing`, 'complete');
      } else {
        detail.status = 'COMPLETE';
        const listItem = findTaskInList(taskId);
        if (listItem) listItem.status = 'COMPLETE';
        recomputeProgress();
        addActivity(`Task complete: ${detail.title}`, 'complete');
      }

      return { success: true, nextStep: nextStepId, message: 'Advanced to next step' };
    });
  },

  getAgentActivity() {
    return endpoint('GET', `/api/agent/activity/sarah-chen-001`, () => ({
      activities: serializeActivities()
    }));
  },

  // Records an agent activity event coming from the live terminal stream.
  logAgentActivity(message, status) {
    // no latency/log wrapper — this is a fast internal event sink
    addActivity(message, status);
    return Promise.resolve({ success: true, activities: serializeActivities() });
  },

  triggerAgent(taskId, action) {
    return endpoint('POST', `/api/agent/trigger/${taskId}`, () => {
      addActivity(`Agent running "${action}" on ${taskId}…`, 'in_progress');
      return { success: true, activityId: nextId('act'), message: 'Agent task triggered' };
    });
  },

  getProgress() {
    return endpoint('GET', `/api/progress/sarah-chen-001`, () => db.progress);
  },

  getManagerConfig(teamId) {
    return endpoint('GET', `/api/manager/config/${teamId}`, () => db.managerConfig);
  },

  getAiLiteracy(userId) {
    return endpoint('GET', `/api/ai-literacy/${userId}`, () => db.aiLiteracy);
  },

  // --- document signing (persists) ------------------------------------------
  signDocument(taskId, stepId, signerName) {
    return endpoint('POST', `/api/documents/${taskId}/${stepId}/sign`, () => {
      const key = `${taskId}:${stepId}`;
      const signedAt = new Date().toISOString();
      const hash = fauxHash(`${key}:${signerName}:${signedAt}`);
      db.signatures[key] = { signerName, signedAt, hash };
      addActivity(`Document signed by ${signerName} — receipt #${hash}`, 'complete');
      return {
        success: true,
        receiptId: hash,
        signedAt,
        message: 'Document signed and filed'
      };
    });
  },

  // --- access requests / approvals (persists, drives human-in-the-loop) -----
  requestAccess(taskId, request) {
    return endpoint('POST', `/api/access/request`, () => {
      db.approvals[taskId] = { approved: false, requestedAt: Date.now(), request };
      addActivity(`Access requested: ${request.summary} — awaiting approval`, 'in_progress');
      return { success: true, requestId: nextId('req'), status: 'AWAITING_APPROVAL' };
    });
  },

  approveTask(taskId, approved, comment) {
    return endpoint('POST', `/api/manager/approve/${taskId}`, () => {
      db.approvals[taskId] = {
        approved,
        comment,
        approver: 'Manager — Platform Cloud',
        at: Date.now()
      };

      const listItem = findTaskInList(taskId);
      const detail = db.taskDetails[taskId];
      const newStatus = approved ? 'ACTIVE' : 'PENDING';

      if (listItem) listItem.status = newStatus;
      if (detail) {
        detail.status = newStatus;
        const step = detail.steps[detail.currentStep - 1];
        if (step && approved) step.status = 'ACTIVE';
      }

      addActivity(
        approved
          ? `Manager approved access for ${listItem?.title || taskId}`
          : `Manager denied request for ${listItem?.title || taskId}`,
        approved ? 'complete' : 'error'
      );

      return {
        success: true,
        taskId,
        newStatus,
        message: approved ? 'Task approved and unblocked' : 'Request denied'
      };
    });
  },

  // Read-only view of what the manager needs to act on.
  getApprovals() {
    return endpoint('GET', `/api/manager/approvals`, () =>
      Object.entries(db.approvals).map(([taskId, v]) => ({ taskId, ...v }))
    );
  }
};
