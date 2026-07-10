import { CurrentStepCard } from '@/components/tasks/CurrentStepCard';
import { ResourcesPanel } from '@/components/resources/ResourcesPanel';
import { StepProgressBar } from '@/components/tasks/StepProgressBar';
import { StatusChip } from '@/components/tasks/StatusChip';

export function MainContent({ taskDetail, onAdvanceStep, onActivity, onSign }) {
  if (!taskDetail) {
    return (
      <main className="flex-1 min-w-0 p-4 sm:p-8" style={{ background: '#f3f3f3' }}>
        <div className="text-center text-gray-500 mt-20">
          Select a task to begin
        </div>
      </main>
    );
  }

  const currentStep = taskDetail.steps?.[taskDetail.currentStep - 1];

  return (
    <main className="flex-1 min-w-0 p-4 sm:p-8 overflow-y-auto" style={{ background: '#f3f3f3' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{taskDetail.title}</h1>
              <StatusChip status={taskDetail.status} />
            </div>
            <p className="text-sm text-gray-600">
              {taskDetail.category ? `${taskDetail.category} · ` : ''}
              Step {taskDetail.currentStep} of {taskDetail.totalSteps}
            </p>
          </div>
        </div>

        {taskDetail.steps && (
          <StepProgressBar
            steps={taskDetail.steps}
          />
        )}

        {currentStep && (
          <CurrentStepCard
            step={currentStep}
            taskId={taskDetail.taskId}
            onAdvance={() => onAdvanceStep(taskDetail.taskId, currentStep.stepId)}
            isLastStep={taskDetail.currentStep === taskDetail.totalSteps}
            isApproved={taskDetail.status !== 'AWAITING_APPROVAL'}
            onActivity={onActivity}
            onSign={onSign}
          />
        )}

        {taskDetail.resources && taskDetail.resources.length > 0 && (
          <ResourcesPanel resources={taskDetail.resources} />
        )}
      </div>
    </main>
  );
}
