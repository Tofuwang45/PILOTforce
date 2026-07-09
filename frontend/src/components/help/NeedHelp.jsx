import { MessageCircle, FileText } from 'lucide-react';

export function NeedHelp() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
      <h3 className="font-semibold text-gray-900">Need Help?</h3>

      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
        <MessageCircle className="w-5 h-5" />
        Ask Einstein Copilot
      </button>

      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors">
        <FileText className="w-4 h-4" />
        View Full Docs
      </button>

      <div className="pt-3 border-t border-gray-200 text-center text-sm text-gray-600">
        Average setup time: <span className="font-semibold">45 min</span>
      </div>
    </div>
  );
}
