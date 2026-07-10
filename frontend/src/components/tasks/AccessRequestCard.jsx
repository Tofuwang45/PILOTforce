import { ShieldQuestion, Clock, Bot, CheckCircle } from 'lucide-react';

// Shows an access request the agent raised on the intern's behalf. While the
// manager hasn't approved, it sits in "awaiting approval". Once approved
// (status flips to ACTIVE/COMPLETE via the manager view), it shows granted.
export function AccessRequestCard({ request, approved }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-6 py-3 bg-blue-50 border-b border-blue-100">
        <Bot className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">
          Requested by {request.requestedBy}
        </span>
      </div>

      <div className="px-6 py-5 space-y-4">
        <div className="flex items-start gap-3">
          <ShieldQuestion className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900">{request.summary}</h3>
            <p className="text-sm text-gray-600 mt-1">{request.justification}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Requested scope
          </p>
          <ul className="space-y-1.5">
            {request.scope.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-gray-100">
          {approved ? (
            <div className="flex items-center gap-2 text-success font-medium">
              <CheckCircle className="w-5 h-5" />
              Approved by {request.approver} — access granted
            </div>
          ) : (
            <div className="flex items-center gap-2 text-warning font-medium">
              <Clock className="w-5 h-5" />
              Awaiting approval from {request.approver}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
