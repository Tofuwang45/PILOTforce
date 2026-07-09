import { cn } from '@/utils/cn';

export function ActivityItem({ activity }) {
  const dotColorClass = {
    yellow: 'bg-warning',
    green: 'bg-success',
    red: 'bg-red-500'
  }[activity.dotColor] || 'bg-gray-400';

  const isPulsing = activity.status === 'in_progress';

  return (
    <div className="flex items-start gap-3 animate-fadeIn">
      <div className={cn(
        "w-2 h-2 rounded-full mt-2 flex-shrink-0",
        dotColorClass,
        isPulsing && "animate-pulse"
      )} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 break-words">{activity.message}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
      </div>
    </div>
  );
}
