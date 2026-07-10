import { cn } from '@/utils/cn';

// SLDS badge variants for each task status. SLDS ships themed badges
// (success/warning/inverse); we add light inline color for the states SLDS
// doesn't theme by default so the Lightning look stays consistent.
const statusConfig = {
  ACTIVE: { label: 'Active', className: 'slds-badge', style: { background: '#0176d3', color: '#fff' } },
  PENDING: { label: 'Pending', className: 'slds-badge', style: {} },
  COMPLETE: { label: 'Complete', className: 'slds-badge slds-theme_success', style: {} },
  AWAITING_APPROVAL: { label: 'Awaiting', className: 'slds-badge slds-theme_warning', style: {} },
  AGENT_RUNNING: { label: 'Agent', className: 'slds-badge', style: { background: '#9050e9', color: '#fff' } }
};

export function StatusChip({ status, compact = false, isActive = false }) {
  const config = statusConfig[status] || statusConfig.PENDING;

  // Inside the active (blue) sidebar row, use the inverse badge for contrast.
  if (compact && isActive) {
    return <span className="slds-badge slds-badge_inverse">{config.label}</span>;
  }

  return (
    <span className={cn(config.className, 'slds-truncate')} style={config.style}>
      {config.label}
    </span>
  );
}
