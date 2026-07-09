import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';
import { TerminalOutput } from './TerminalOutput';

export function CurrentStepCard({ step, onAdvance, isLastStep }) {
  if (!step) return null;

  const isWaitingApproval = step.statusChip?.icon === 'clock';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Current Step — {step.title}
        </h2>
        <p className="text-gray-600">{step.description}</p>
      </div>

      {step.terminalOutput && (
        <TerminalOutput output={step.terminalOutput} />
      )}

      {step.statusChip && (
        <div className="flex items-center gap-2">
          {step.statusChip.icon === 'check' ? (
            <CheckCircle className="w-5 h-5 text-success" />
          ) : step.statusChip.icon === 'clock' ? (
            <Clock className="w-5 h-5 text-warning" />
          ) : null}
          <span className={cn(
            "text-sm font-medium",
            step.statusChip.icon === 'check' && "text-success",
            step.statusChip.icon === 'clock' && "text-warning"
          )}>
            {step.statusChip.label}
          </span>
        </div>
      )}

      {!isWaitingApproval && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onAdvance}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-blue-700 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 animate-pulse"
          >
            {isLastStep ? 'Complete Task' : 'Next Step'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
