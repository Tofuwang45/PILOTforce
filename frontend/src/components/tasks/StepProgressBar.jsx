import { cn } from '@/utils/cn';
import { CheckCircle, Circle } from 'lucide-react';

export function StepProgressBar({ steps }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isComplete = step.status === 'COMPLETE';
          const isActive = step.status === 'ACTIVE';
          const isPending = step.status === 'PENDING';

          return (
            <div key={step.stepId} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  isComplete && "bg-success text-white",
                  isActive && "bg-primary text-white ring-4 ring-primary/20",
                  isPending && "bg-gray-200 text-gray-500"
                )}>
                  {isComplete ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : isActive ? (
                    <Circle className="w-5 h-5 fill-current" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
                <div className="mt-2 text-xs font-medium text-center max-w-[100px]">
                  {step.title}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-2 transition-colors",
                  isComplete ? "bg-success" : "bg-gray-200"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
