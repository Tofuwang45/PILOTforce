import { Cloud, User } from 'lucide-react';
import { cn } from '@/utils/cn';

export function Header({ user, viewMode, onToggleView }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cloud className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-gray-900">PILOTForce</span>
        </div>

        <div className="flex items-center gap-6">
          <nav className="text-sm text-gray-600">
            <span>Onboarding</span>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-gray-900 font-medium">Dev Environment Setup</span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onToggleView}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              viewMode === 'manager'
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {viewMode === 'manager' ? 'Manager View' : 'Switch to Manager View'}
          </button>

          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.role} - Day {user.currentDay}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
