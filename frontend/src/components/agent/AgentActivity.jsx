import { Info, Sparkles } from 'lucide-react';
import { ActivityItem } from './ActivityItem';

// Agent Activity rendered as a Lightning card (slds-card) with a live feed of
// what the agent is doing. This is the demo's proof of "you see the agent work."
export function AgentActivity({ activities }) {
  return (
    <article className="slds-card">
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__figure">
            <span className="slds-icon_container" style={{ background: '#0176d3', borderRadius: 6, padding: 4 }}>
              <Sparkles className="w-4 h-4" style={{ color: '#fff' }} />
            </span>
          </div>
          <div className="slds-media__body">
            <h2 className="slds-card__header-title">
              <span className="slds-text-heading_small" style={{ fontWeight: 700 }}>Agent Activity</span>
            </h2>
          </div>
          <div className="slds-no-flex">
            <Info className="w-4 h-4 text-gray-400" />
          </div>
        </header>
      </div>

      <div className="slds-card__body slds-card__body_inner">
        <div className="space-y-3">
          {activities?.activities?.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>

      <footer className="slds-card__footer" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Sparkles className="w-4 h-4 text-yellow-500" />
        <span className="slds-text-body_small">Powered by Einstein Agent</span>
      </footer>
    </article>
  );
}
