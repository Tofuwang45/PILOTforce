import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MainContent } from '@/components/layout/MainContent';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { ManagerView } from '@/components/manager/ManagerView';
import { apiClient } from '@/api/client';

const USER_ID = 'sarah-chen-001';

function App() {
  const [viewMode, setViewMode] = useState('intern');
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState('dev-env-01');
  const [taskDetail, setTaskDetail] = useState(null);
  const [activities, setActivities] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activityCounter, setActivityCounter] = useState(0);

  const loadActivities = useCallback(async () => {
    const activitiesData = await apiClient.getAgentActivity(USER_ID);

    const newActivity = {
      id: `act-${Date.now()}-${activityCounter}`,
      timestamp: 'Just now',
      message: generateRandomActivity(),
      status: Math.random() > 0.5 ? 'in_progress' : 'complete',
      dotColor: Math.random() > 0.5 ? 'yellow' : 'green'
    };

    setActivities(prev => ({
      activities: [newActivity, ...(prev?.activities || activitiesData.activities).slice(0, 4)]
    }));
    setActivityCounter(prev => prev + 1);
  }, [activityCounter]);

  const loadTaskDetail = useCallback(async (taskId) => {
    const detail = await apiClient.getTaskDetail(USER_ID, taskId);
    setTaskDetail(detail);
  }, []);

  useEffect(() => {
    loadInitialData();
    const activityInterval = setInterval(() => {
      loadActivities();
    }, 3000);

    return () => clearInterval(activityInterval);
  }, [loadActivities]);

  useEffect(() => {
    if (activeTaskId) {
      loadTaskDetail(activeTaskId);
    }
  }, [activeTaskId, loadTaskDetail]);

  const loadInitialData = async () => {
    const [userData, tasksData, activitiesData, progressData] = await Promise.all([
      apiClient.getUser(USER_ID),
      apiClient.getTasks(USER_ID),
      apiClient.getAgentActivity(USER_ID),
      apiClient.getProgress(USER_ID)
    ]);

    setUser(userData);
    setTasks(tasksData);
    setActivities(activitiesData);
    setProgress(progressData);

    const firstTask = tasksData?.categories?.[0]?.tasks?.[0];
    if (firstTask) {
      setActiveTaskId(firstTask.taskId);
    }
  };

  const generateRandomActivity = () => {
    const messages = [
      'Checking system requirements...',
      'Validating configuration files...',
      'Syncing with repository...',
      'Verifying access permissions...',
      'Running automated tests...',
      'Agent monitoring progress...',
      'Checking dependencies...'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleAdvanceStep = async (taskId, stepId) => {
    await apiClient.advanceTask(USER_ID, taskId, stepId);

    const updatedDetail = { ...taskDetail };
    const currentStepIndex = taskDetail.currentStep - 1;

    if (currentStepIndex < updatedDetail.steps.length) {
      updatedDetail.steps[currentStepIndex].status = 'COMPLETE';

      if (taskDetail.currentStep < taskDetail.totalSteps) {
        updatedDetail.currentStep = taskDetail.currentStep + 1;
        updatedDetail.steps[updatedDetail.currentStep - 1].status = 'ACTIVE';
      } else {
        updatedDetail.status = 'COMPLETE';

        const nextTask = findNextTask(taskId);
        if (nextTask) {
          setActiveTaskId(nextTask.taskId);
        }
      }

      setTaskDetail(updatedDetail);

      const [updatedTasks, updatedProgress] = await Promise.all([
        apiClient.getTasks(USER_ID),
        apiClient.getProgress(USER_ID)
      ]);
      setTasks(updatedTasks);
      setProgress(updatedProgress);
    }
  };

  const findNextTask = (currentTaskId) => {
    if (!tasks?.categories) return null;

    for (const category of tasks.categories) {
      const currentIndex = category.tasks.findIndex(t => t.taskId === currentTaskId);
      if (currentIndex !== -1 && currentIndex < category.tasks.length - 1) {
        return category.tasks[currentIndex + 1];
      }
    }
    return null;
  };

  const handleToggleView = () => {
    setViewMode(prev => prev === 'intern' ? 'manager' : 'intern');
  };

  const handleTaskApproved = () => {
    loadInitialData();
  };

  const nextTaskHint = "Set up OrgFarm extension →";

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header user={user} viewMode={viewMode} onToggleView={handleToggleView} />

      <div className="flex-1 flex overflow-hidden">
        {viewMode === 'manager' ? (
          <ManagerView userId={USER_ID} onTaskApproved={handleTaskApproved} />
        ) : (
          <>
            <Sidebar
              tasks={tasks}
              progress={progress}
              activeTaskId={activeTaskId}
              onTaskClick={setActiveTaskId}
              nextTaskHint={nextTaskHint}
            />
            <MainContent
              taskDetail={taskDetail}
              onAdvanceStep={handleAdvanceStep}
            />
            <RightSidebar
              activities={activities}
              progress={progress}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
