import { Info, Sparkles } from 'lucide-react';
import { ActivityItem } from './ActivityItem';

export function AgentActivity({ activities }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Agent Activity</h3>
        <Info className="w-4 h-4 text-gray-400" />
      </div>

      <div className="space-y-3">
        {activities?.activities?.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>

      <div className="pt-3 border-t border-gray-200 flex items-center gap-2 text-xs text-gray-600">
        <Sparkles className="w-4 h-4 text-yellow-500" />
        <span>Powered by Einstein Agent</span>
      </div>
    </div>
  );
}
