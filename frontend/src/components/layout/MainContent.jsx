import { CurrentStepCard } from '@/components/tasks/CurrentStepCard';
import { ResourcesPanel } from '@/components/resources/ResourcesPanel';
import { StepProgressBar } from '@/components/tasks/StepProgressBar';
import { StatusChip } from '@/components/tasks/StatusChip';

export function MainContent({ taskDetail, onAdvanceStep }) {
  if (!taskDetail) {
    return (
      <main className="flex-1 bg-white p-8">
        <div className="text-center text-gray-500 mt-20">
          Select a task to begin
        </div>
      </main>
    );
  }

  const currentStep = taskDetail.steps?.[taskDetail.currentStep - 1];

  return (
    <main className="flex-1 bg-white p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{taskDetail.title}</h1>
              <StatusChip status={taskDetail.status} />
            </div>
            <p className="text-sm text-gray-600">
              Task {taskDetail.order} of {taskDetail.totalSteps * 3}
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
            onAdvance={() => onAdvanceStep(taskDetail.taskId, currentStep.stepId)}
            isLastStep={taskDetail.currentStep === taskDetail.totalSteps}
          />
        )}

        {taskDetail.resources && taskDetail.resources.length > 0 && (
          <ResourcesPanel resources={taskDetail.resources} />
        )}
      </div>
    </main>
  );
}
