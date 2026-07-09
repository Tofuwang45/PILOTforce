import { mockUser } from '@/data/mockUser';
import { mockTasks } from '@/data/mockTasks';
import { mockTaskDetails } from '@/data/mockTaskDetails';
import { mockAgentActivity } from '@/data/mockAgentActivity';
import { mockProgress } from '@/data/mockProgress';
import { mockManagerConfig } from '@/data/mockManagerConfig';
import { mockAiLiteracy } from '@/data/mockAiLiteracy';

const API_BASE = '/api';

async function fetchWithFallback(url, fallbackData, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.warn(`API call failed: ${url}, falling back to mock data`);
      return fallbackData;
    }
    return await response.json();
  } catch (error) {
    console.warn(`API call error: ${url}, falling back to mock data`, error);
    return fallbackData;
  }
}

export const apiClient = {
  async getUser(userId) {
    return fetchWithFallback(`${API_BASE}/user/${userId}`, mockUser);
  },

  async getTasks(userId) {
    return fetchWithFallback(`${API_BASE}/tasks/${userId}`, mockTasks);
  },

  async getTaskDetail(userId, taskId) {
    const fallback = mockTaskDetails[taskId] || {
      taskId,
      category: "UNKNOWN",
      title: taskId,
      status: "PENDING",
      order: 0,
      totalSteps: 1,
      currentStep: 1,
      steps: [],
      resources: []
    };
    return fetchWithFallback(`${API_BASE}/tasks/${userId}/${taskId}`, fallback);
  },

  async advanceTask(userId, taskId, stepId) {
    try {
      const response = await fetch(`${API_BASE}/tasks/${userId}/${taskId}/advance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepId })
      });
      if (!response.ok) {
        return { success: false, message: 'API unavailable, using optimistic update' };
      }
      return await response.json();
    } catch (error) {
      console.warn('API call error: advance task, using optimistic update', error);
      return { success: false, message: 'API unavailable, using optimistic update' };
    }
  },

  async getAgentActivity(userId) {
    return fetchWithFallback(`${API_BASE}/agent/activity/${userId}`, mockAgentActivity);
  },

  async triggerAgent(taskId, action) {
    try {
      const response = await fetch(`${API_BASE}/agent/trigger/${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      if (!response.ok) {
        return { success: false, message: 'API unavailable' };
      }
      return await response.json();
    } catch (error) {
      console.warn('API call error: trigger agent', error);
      return { success: false, message: 'API unavailable' };
    }
  },

  async getProgress(userId) {
    return fetchWithFallback(`${API_BASE}/progress/${userId}`, mockProgress);
  },

  async getManagerConfig(teamId) {
    return fetchWithFallback(`${API_BASE}/manager/config/${teamId}`, mockManagerConfig);
  },

  async approveTask(taskId, approved, comment) {
    try {
      const response = await fetch(`${API_BASE}/manager/approve/${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved, comment })
      });
      if (!response.ok) {
        return { success: false, message: 'API unavailable' };
      }
      return await response.json();
    } catch (error) {
      console.warn('API call error: approve task', error);
      return { success: false, message: 'API unavailable' };
    }
  },

  async getAiLiteracy(userId) {
    return fetchWithFallback(`${API_BASE}/ai-literacy/${userId}`, mockAiLiteracy);
  }
};
