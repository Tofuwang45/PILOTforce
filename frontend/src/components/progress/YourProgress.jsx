import { ProgressBar } from './ProgressBar';

export function YourProgress({ progress }) {
  if (!progress?.categories) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
      <h3 className="font-semibold text-gray-900">Your Progress</h3>
      <div className="space-y-4">
        {progress.categories.map((category) => (
          <ProgressBar
            key={category.name}
            label={category.name}
            completed={category.completed}
            total={category.total}
            percentage={category.percentage}
          />
        ))}
      </div>
    </div>
  );
}
