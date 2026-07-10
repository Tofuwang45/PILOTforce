// API client for PILOTForce.
//
// By default it talks to the in-memory `mockServer`, which behaves like a real
// backend (latency, HTTP-style logging, persisted mutations) so the demo shows
// a natural, stateful workflow with nothing to run. Flip USE_LIVE_API to true
// (or set VITE_USE_LIVE_API=true) to route the same calls at the real Express
// backend in /backend, which exposes identical routes.

import { mockServer } from './mockServer';

const USE_LIVE_API = import.meta.env?.VITE_USE_LIVE_API === 'true';
const API_BASE = '/api';

async function live(path, options) {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return res.json();
}

export const apiClient = {
  getUser(userId) {
    return USE_LIVE_API ? live(`/user/${userId}`) : mockServer.getUser(userId);
  },

  getTasks(userId) {
    return USE_LIVE_API ? live(`/tasks/${userId}`) : mockServer.getTasks(userId);
  },

  getTaskDetail(userId, taskId) {
    return USE_LIVE_API
      ? live(`/tasks/${userId}/${taskId}`)
      : mockServer.getTaskDetail(userId, taskId);
  },

  advanceTask(userId, taskId, stepId) {
    if (USE_LIVE_API) {
      return live(`/tasks/${userId}/${taskId}/advance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepId })
      });
    }
    return mockServer.advanceTask(userId, taskId, stepId);
  },

  getAgentActivity(userId) {
    return USE_LIVE_API
      ? live(`/agent/activity/${userId}`)
      : mockServer.getAgentActivity(userId);
  },

  // Records a live agent event (from the streaming terminal) into the feed.
  logAgentActivity(message, status) {
    if (USE_LIVE_API) {
      return live(`/agent/activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, status })
      });
    }
    return mockServer.logAgentActivity(message, status);
  },

  triggerAgent(taskId, action) {
    if (USE_LIVE_API) {
      return live(`/agent/trigger/${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
    }
    return mockServer.triggerAgent(taskId, action);
  },

  getProgress(userId) {
    return USE_LIVE_API ? live(`/progress/${userId}`) : mockServer.getProgress(userId);
  },

  getManagerConfig(teamId) {
    return USE_LIVE_API
      ? live(`/manager/config/${teamId}`)
      : mockServer.getManagerConfig(teamId);
  },

  approveTask(taskId, approved, comment) {
    if (USE_LIVE_API) {
      return live(`/manager/approve/${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved, comment })
      });
    }
    return mockServer.approveTask(taskId, approved, comment);
  },

  getAiLiteracy(userId) {
    return USE_LIVE_API
      ? live(`/ai-literacy/${userId}`)
      : mockServer.getAiLiteracy(userId);
  },

  signDocument(taskId, stepId, signerName) {
    if (USE_LIVE_API) {
      return live(`/documents/${taskId}/${stepId}/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signerName })
      });
    }
    return mockServer.signDocument(taskId, stepId, signerName);
  },

  requestAccess(taskId, request) {
    if (USE_LIVE_API) {
      return live(`/access/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, request })
      });
    }
    return mockServer.requestAccess(taskId, request);
  }
};
