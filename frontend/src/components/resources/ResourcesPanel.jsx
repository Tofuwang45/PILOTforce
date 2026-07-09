import { ExternalLink, Book, FileText } from 'lucide-react';

const iconMap = {
  'external-link': ExternalLink,
  'book': Book,
  'file-text': FileText
};

export function ResourcesPanel({ resources }) {
  if (!resources || resources.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources & Docs</h2>
      <div className="space-y-3">
        {resources.map((resource, index) => {
          const Icon = iconMap[resource.icon] || ExternalLink;
          return (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors group"
            >
              <Icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors flex-1">
                {resource.title}
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
