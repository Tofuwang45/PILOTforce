import { cn } from '@/utils/cn';

export function ProgressBar({ label, completed, total, percentage }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">{completed} of {total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            percentage > 0 ? "bg-primary" : "bg-gray-200"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
