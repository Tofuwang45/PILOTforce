import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ProgressRing } from '@/components/progress/ProgressRing';
import { TaskItem } from '@/components/tasks/TaskItem';

export function Sidebar({ tasks, progress, activeTaskId, onTaskClick, nextTaskHint }) {
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

  return (
    <aside className="w-60 bg-gray-50 border-r border-gray-200 flex flex-col">
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
                    onClick={() => onTaskClick(task.taskId)}
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
    </aside>
  );
}
