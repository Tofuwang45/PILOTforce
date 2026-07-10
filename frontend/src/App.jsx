import { useState, useEffect, useCallback, useRef } from 'react';
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
  const activityCounter = useRef(0);
  // Below the `lg` breakpoint the task list and activity feed collapse into
  // off-canvas drawers (toggled from the header) so the main content keeps
  // usable width instead of three fixed-width columns fighting for space.
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  // Push a real activity into the feed. Called by agent-run terminals as they
  // complete each line of work — routes through the server so the feed is a
  // single source of truth shared with manager actions.
  const pushActivity = useCallback(async (activity) => {
    const res = await apiClient.logAgentActivity(activity.message, activity.status);
    if (res?.activities) setActivities({ activities: res.activities });
    activityCounter.current += 1;
  }, []);

  const loadTaskDetail = useCallback(async (taskId) => {
    const detail = await apiClient.getTaskDetail(USER_ID, taskId);
    setTaskDetail(detail);
  }, []);

  useEffect(() => {
    loadInitialData();
    // Poll the activity feed so events raised elsewhere (e.g. a manager
    // approval) surface on the intern dashboard without a manual refresh.
    const interval = setInterval(async () => {
      const data = await apiClient.getAgentActivity(USER_ID);
      setActivities(data);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  const handleSignDocument = async (taskId, stepId, signerName) => {
    const res = await apiClient.signDocument(taskId, stepId, signerName);
    const data = await apiClient.getAgentActivity(USER_ID);
    setActivities(data);
    return res;
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

  const handleTaskApproved = async () => {
    await loadInitialData();
    // Refresh the open task so an approved item shows unblocked on return.
    if (activeTaskId) loadTaskDetail(activeTaskId);
  };

  const nextTaskHint = "Provision your Core workspace →";

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header
        user={user}
        viewMode={viewMode}
        onToggleView={handleToggleView}
        onOpenTasks={() => setLeftDrawerOpen((v) => !v)}
        onOpenActivity={() => setRightDrawerOpen((v) => !v)}
        leftDrawerOpen={leftDrawerOpen}
        rightDrawerOpen={rightDrawerOpen}
      />

      <div className="flex-1 flex overflow-hidden min-w-0">
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
              open={leftDrawerOpen}
              onClose={() => setLeftDrawerOpen(false)}
            />
            <MainContent
              taskDetail={taskDetail}
              onAdvanceStep={handleAdvanceStep}
              onActivity={pushActivity}
              onSign={handleSignDocument}
            />
            <RightSidebar
              activities={activities}
              progress={progress}
              open={rightDrawerOpen}
              onClose={() => setRightDrawerOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
