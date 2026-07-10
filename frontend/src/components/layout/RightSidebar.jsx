import { AgentActivity } from '@/components/agent/AgentActivity';
import { YourProgress } from '@/components/progress/YourProgress';
import { NeedHelp } from '@/components/help/NeedHelp';

// Agent activity feed + progress breakdown.
//
// Responsive behavior mirrors Sidebar: a static column at `lg`+, an
// off-canvas drawer sliding in from the right (over a backdrop) below it,
// toggled from the header's activity icon.
export function RightSidebar({ activities, progress, open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-20"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={
          `bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto space-y-6
           fixed inset-y-0 right-0 z-30 w-80 max-w-[85vw] transform transition-transform duration-200 ease-out
           lg:static lg:z-auto lg:w-80 lg:max-w-none lg:translate-x-0 lg:transform-none
           ${open ? 'translate-x-0' : 'translate-x-full'}`
        }
      >
        <AgentActivity activities={activities} />
        <YourProgress progress={progress} />
        <NeedHelp />
      </aside>
    </>
  );
}
