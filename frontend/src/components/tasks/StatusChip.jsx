import { cn } from '@/utils/cn';
import { Clock, CheckCircle, Circle, AlertCircle } from 'lucide-react';

const statusConfig = {
  ACTIVE: {
    label: 'Active',
    color: 'bg-primary text-white',
    icon: Circle
  },
  PENDING: {
    label: 'Pending',
    color: 'bg-pending text-white',
    icon: Circle
  },
  COMPLETE: {
    label: 'Complete',
    color: 'bg-success text-white',
    icon: CheckCircle
  },
  AWAITING_APPROVAL: {
    label: 'Awaiting',
    color: 'bg-warning text-white',
    icon: Clock
  },
  AGENT_RUNNING: {
    label: 'Agent',
    color: 'bg-purple-500 text-white',
    icon: AlertCircle
  }
};

export function StatusChip({ status, compact = false, isActive = false }) {
  const config = statusConfig[status] || statusConfig.PENDING;
  const Icon = config.icon;

  if (compact) {
    return (
      <span className={cn(
        "text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0",
        isActive ? "bg-white/20 text-white" : config.color
      )}>
        {config.label}
      </span>
    );
  }

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium",
      config.color
    )}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}
