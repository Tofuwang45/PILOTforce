import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ProgressRing } from '@/components/progress/ProgressRing';
import { TaskItem } from '@/components/tasks/TaskItem';

// Task list + overall progress ring.
//
// Responsive behavior:
//  - `lg` and up: a normal in-flow column, fixed width, always visible.
//  - below `lg`: an off-canvas drawer that slides in from the left over a
//    dimming backdrop, controlled by `open`/`onClose` from the header toggle.
//    This keeps the main content full-width on phones/narrow windows instead
//    of three columns squeezing down together.
export function Sidebar({ tasks, progress, activeTaskId, onTaskClick, nextTaskHint, open, onClose }) {
  const [expandedCategories, setExpandedCategories] = useState({
    'DEV ENVIRONMENT': true,
    'BLACK TAB (BT)': false,
    'ADMIN / DOCS': false
  });

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleTaskClick = (taskId) => {
    onTaskClick(taskId);
    onClose?.();
  };

  return (
    <>
      {/* Backdrop, only rendered/interactive when the drawer is open below lg */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-20"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={
          `bg-gray-50 border-r border-gray-200 flex flex-col
           fixed inset-y-0 left-0 z-30 w-72 max-w-[85vw] transform transition-transform duration-200 ease-out
           lg:static lg:z-auto lg:w-60 lg:max-w-none lg:translate-x-0 lg:transform-none
           ${open ? 'translate-x-0' : '-translate-x-full'}`
        }
      >
        <div className="p-6">
          <ProgressRing percentage={progress?.overall?.percentage || 0} />
        </div>

        <nav className="flex-1 px-4 overflow-y-auto">
          {tasks?.categories?.map((category) => (
            <div key={category.name} className="mb-4">
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-gray-700 uppercase tracking-wide hover:bg-gray-100 rounded transition-colors"
              >
                <span>{category.name}</span>
                {expandedCategories[category.name] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {expandedCategories[category.name] && (
                <div className="mt-2 space-y-1">
                  {category.tasks.map((task) => (
                    <TaskItem
                      key={task.taskId}
                      task={task}
                      isActive={task.taskId === activeTaskId}
                      onClick={() => handleTaskClick(task.taskId)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {nextTaskHint && (
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-600">
              <span className="font-medium">Next:</span> {nextTaskHint}
            </div>
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-200 flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wide text-gray-400">Built on</span>
          <img src="/logos/sf-horiz.svg" alt="Salesforce" style={{ height: 16, width: 'auto' }} />
        </div>
      </aside>
    </>
  );
}
