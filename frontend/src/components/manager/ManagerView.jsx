import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, Clock, Shield } from 'lucide-react';
import { apiClient } from '@/api/client';

export function ManagerView({ userId, onTaskApproved }) {
  const [tasks, setTasks] = useState([]);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [tasksData, configData] = await Promise.all([
      apiClient.getTasks(userId),
      apiClient.getManagerConfig('platform-cloud')
    ]);

    const awaitingTasks = tasksData.categories
      .flatMap(cat => cat.tasks)
      .filter(task => task.status === 'AWAITING_APPROVAL');

    setTasks(awaitingTasks);
    setConfig(configData);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleApprove = async (taskId, approved) => {
    const comment = approved ? 'Access granted' : 'Request denied';
    await apiClient.approveTask(taskId, approved, comment);
    await loadData();
    if (onTaskApproved) {
      onTaskApproved();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading manager dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 bg-white p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Manager Dashboard</h1>
            <p className="text-gray-600">Review and approve pending intern requests</p>
          </div>
          <img
            src="/logos/sf-horiz.svg"
            alt="Salesforce"
            style={{ height: 32, width: 'auto', flexShrink: 0 }}
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-warning flex-shrink-0" />
            <h2 className="text-xl font-semibold text-gray-900">
              Pending Approvals ({tasks.length})
            </h2>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No pending approval requests
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.taskId}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 break-words">
                          {task.title}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-warning text-white font-medium flex-shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                          Awaiting
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        Task {task.order} • {task.totalSteps} steps
                      </p>
                      <p className="text-sm text-gray-500">
                        Requested by Sarah Chen
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleApprove(task.taskId, true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-success text-white rounded-md font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleApprove(task.taskId, false)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-700 transition-colors whitespace-nowrap"
                      >
                        <XCircle className="w-4 h-4" />
                        Deny
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {config && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-primary flex-shrink-0" />
              <h2 className="text-xl font-semibold text-gray-900">Team Configuration</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Team Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team ID:</span>
                    <span className="font-medium text-gray-900">{config.teamId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role:</span>
                    <span className="font-medium text-gray-900">{config.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Configured by:</span>
                    <span className="font-medium text-gray-900">{config.configuredBy}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">AI Literacy Goals</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Level:</span>
                    <span className="font-medium text-gray-900">{config.aiLiteracy?.currentLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target Level:</span>
                    <span className="font-medium text-gray-900">{config.aiLiteracy?.targetLevel}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="text-xs font-medium text-gray-700 mb-1.5">Recommendations:</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {config.aiLiteracy?.recommendations?.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
