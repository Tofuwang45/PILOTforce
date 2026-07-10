import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';
import { TerminalOutput } from './TerminalOutput';
import { AgentTerminal } from './AgentTerminal';
import { DocumentSign } from './DocumentSign';
import { AccessRequestCard } from './AccessRequestCard';

export function CurrentStepCard({ step, taskId, onAdvance, isLastStep, isApproved, onActivity, onSign }) {
  // Tracks whether the interactive gate for this step is satisfied (agent
  // finished running / document signed). Reset whenever the step changes.
  const [gateCleared, setGateCleared] = useState(false);

  useEffect(() => {
    setGateCleared(false);
  }, [step?.stepId]);

  if (!step) return null;

  const type = step.type || 'standard';

  // Approval steps: the intern can't advance — the manager unblocks them.
  if (type === 'approval') {
    return (
      <div className="space-y-4">
        <AccessRequestCard request={step.request} approved={isApproved} />
        {isApproved && (
          <div className="flex justify-end">
            <button
              onClick={onAdvance}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-blue-700 transition-all hover:shadow-md"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Document signing step.
  if (type === 'document-sign') {
    return (
      <div className="space-y-4">
        <DocumentSign
          document={step.document}
          onSign={(signerName) => onSign?.(taskId, step.stepId, signerName)}
          onSigned={() => setGateCleared(true)}
        />
        {gateCleared && (
          <div className="flex justify-end">
            <button
              onClick={onAdvance}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-blue-700 transition-all hover:shadow-md"
            >
              {isLastStep ? 'Complete Task' : 'Next Step'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Agent-run step: live streaming terminal, then unlock advance.
  if (type === 'agent-run') {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Current Step — {step.title}
          </h2>
          <p className="text-gray-600">{step.description}</p>
        </div>

        <AgentTerminal
          script={step.agentScript}
          onActivity={onActivity}
          onComplete={() => setGateCleared(true)}
        />

        {gateCleared && step.completeChip && (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-success">
              {step.completeChip.label}
            </span>
          </div>
        )}

        {gateCleared && (
          <div className="flex justify-end pt-2">
            <button
              onClick={onAdvance}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-blue-700 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isLastStep ? 'Complete Task' : 'Next Step'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Standard step (default).
  const isWaitingApproval = step.statusChip?.icon === 'clock';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Current Step — {step.title}
        </h2>
        <p className="text-gray-600">{step.description}</p>
      </div>

      {step.terminalOutput && <TerminalOutput output={step.terminalOutput} />}

      {step.statusChip && (
        <div className="flex items-center gap-2">
          {step.statusChip.icon === 'check' ? (
            <CheckCircle className="w-5 h-5 text-success" />
          ) : step.statusChip.icon === 'clock' ? (
            <Clock className="w-5 h-5 text-warning" />
          ) : null}
          <span
            className={cn(
              'text-sm font-medium',
              step.statusChip.icon === 'check' && 'text-success',
              step.statusChip.icon === 'clock' && 'text-warning'
            )}
          >
            {step.statusChip.label}
          </span>
        </div>
      )}

      {!isWaitingApproval && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onAdvance}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-blue-700 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {isLastStep ? 'Complete Task' : 'Next Step'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
