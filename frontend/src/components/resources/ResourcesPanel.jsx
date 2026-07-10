import { useState } from 'react';
import { ExternalLink, Book, FileText, Eye } from 'lucide-react';
import { ResourcePanel } from './ResourcePanel';

const iconMap = {
  'external-link': ExternalLink,
  'book': Book,
  'file-text': FileText
};

export function ResourcesPanel({ resources }) {
  const [openResource, setOpenResource] = useState(null);

  if (!resources || resources.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources & Docs</h2>
      <div className="space-y-3">
        {resources.map((resource, index) => {
          const Icon = iconMap[resource.icon] || FileText;
          return (
            <button
              key={index}
              onClick={() => setOpenResource(resource)}
              className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors group text-left"
            >
              <Icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors flex-1">
                {resource.title}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-400 group-hover:text-primary transition-colors">
                <Eye className="w-4 h-4" />
                Preview
              </span>
            </button>
          );
        })}
      </div>

      <ResourcePanel
        resource={openResource}
        onClose={() => setOpenResource(null)}
      />
    </div>
  );
}
