import { cn } from '@/utils/cn';
import { StatusChip } from './StatusChip';

export function TaskItem({ task, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2.5 rounded-md transition-all",
        isActive
          ? "bg-primary text-white shadow-sm"
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <span className={cn(
            "text-xs font-semibold mt-0.5 flex-shrink-0",
            isActive ? "text-white" : "text-gray-500"
          )}>
            {task.order}.
          </span>
          <span className="text-sm font-medium flex-1 break-words">
            {task.title}
          </span>
        </div>
        <StatusChip status={task.status} compact isActive={isActive} />
      </div>
    </button>
  );
}
