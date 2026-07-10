import { X, Book, FileText, ExternalLink } from 'lucide-react';

const iconMap = {
  'external-link': ExternalLink,
  book: Book,
  'file-text': FileText
};

// Slide-over that renders a resource's content INLINE — no redirect to a new
// tab. Everything the intern needs stays inside PILOTForce.
export function ResourcePanel({ resource, onClose }) {
  if (!resource) return null;
  const Icon = iconMap[resource.icon] || FileText;
  const content = resource.content;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 animate-fadeIn"
        onClick={onClose}
      />

      {/* Panel */}
      <aside className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col animate-fadeIn">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-gray-500">Resource preview</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            {content?.heading || resource.title}
          </h2>
          {content?.body?.map((para, idx) => (
            <p key={idx} className="text-sm text-gray-700 leading-relaxed">
              {para}
            </p>
          ))}
          {!content && (
            <p className="text-sm text-gray-500">
              No inline content available for this resource.
            </p>
          )}
        </div>

        <div className="mt-auto px-6 py-4 border-t border-gray-200 text-xs text-gray-400">
          Shown inline in PILOTForce — no external redirect.
        </div>
      </aside>
    </div>
  );
}
