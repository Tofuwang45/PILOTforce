import { AgentActivity } from '@/components/agent/AgentActivity';
import { YourProgress } from '@/components/progress/YourProgress';
import { NeedHelp } from '@/components/help/NeedHelp';

export function RightSidebar({ activities, progress }) {
  return (
    <aside className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto space-y-6">
      <AgentActivity activities={activities} />
      <YourProgress progress={progress} />
      <NeedHelp />
    </aside>
  );
}
