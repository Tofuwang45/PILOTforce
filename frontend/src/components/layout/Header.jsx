import { Menu, Activity, X } from 'lucide-react';

// Salesforce Lightning-style global header: the branded blue bar, breadcrumb,
// a view toggle rendered as an SLDS brand button, and an SLDS avatar chip.
//
// Responsive: below `lg` the task list and activity feed collapse into
// off-canvas drawers, so this header grows a hamburger (open task list) and
// an activity icon (open activity feed) that only render at narrow widths.
// The breadcrumb and user name/role text hide progressively as space runs out.
export function Header({
  user,
  viewMode,
  onToggleView,
  onOpenTasks,
  onOpenActivity,
  leftDrawerOpen,
  rightDrawerOpen
}) {
  return (
    <header
      className="slds-global-header_container"
      style={{ background: '#0176d3', color: '#fff', position: 'relative', top: 'auto', left: 'auto', width: 'auto', zIndex: 'auto', flexShrink: 0 }}
    >
      <div
        className="slds-global-header slds-grid slds-grid_align-spread"
        style={{ padding: '0 0.75rem', height: 56, background: 'transparent', boxShadow: 'none', flexWrap: 'nowrap', minWidth: 0 }}
      >
        {/* Brand — official Salesforce cloud mark co-branded with PILOTForce */}
        <div className="slds-global-header__item" style={{ minWidth: 0, overflow: 'hidden' }}>
          <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 12, minWidth: 0 }}>
            {/* Mobile/tablet: opens the task-list drawer (hidden once the
                sidebar is always visible at lg+). */}
            <button
              onClick={onOpenTasks}
              aria-label={leftDrawerOpen ? 'Close task list' : 'Open task list'}
              className="lg:hidden"
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 6, padding: 6, display: 'flex', color: '#fff', flexShrink: 0 }}
            >
              {leftDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <img
              src="/logos/sf-cloud-white.svg"
              alt="Salesforce"
              style={{ height: 34, width: 'auto', display: 'block', flexShrink: 0 }}
            />
            <span
              aria-hidden="true"
              className="hidden sm:inline-block"
              style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.35)', flexShrink: 0 }}
            />
            <span
              className="hidden sm:inline"
              style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', letterSpacing: '0.2px', whiteSpace: 'nowrap' }}
            >
              PILOTForce
            </span>
            <span
              className="slds-badge hidden md:inline-flex"
              style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', marginLeft: 4, flexShrink: 0 }}
            >
              Onboarding
            </span>
          </div>
        </div>

        {/* Breadcrumb — hidden on narrow screens where there's no room */}
        <div
          className="slds-global-header__item slds-grid slds-grid_vertical-align-center hidden md:flex"
          style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem', minWidth: 0, overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          <span>Onboarding</span>
          <span style={{ margin: '0 8px', opacity: 0.6 }}>›</span>
          <span style={{ fontWeight: 600, color: '#fff' }}>Dev Environment Setup</span>
        </div>

        {/* Actions + profile */}
        <div className="slds-global-header__item" style={{ minWidth: 0 }}>
          <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 10, minWidth: 0 }}>
            <button
              onClick={onToggleView}
              className={
                (viewMode === 'manager'
                  ? 'slds-button slds-button_inverse'
                  : 'slds-button slds-button_neutral') + ' whitespace-nowrap'
              }
            >
              {/* Full label at comfortable widths, short label once tight */}
              <span className="hidden sm:inline">
                {viewMode === 'manager' ? 'Manager View' : 'Switch to Manager View'}
              </span>
              <span className="sm:hidden">
                {viewMode === 'manager' ? 'Manager' : 'Manager View'}
              </span>
            </button>

            {user && (
              <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 10, minWidth: 0 }}>
                <div className="hidden md:block" style={{ textAlign: 'right', lineHeight: 1.2 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>{user.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap' }}>
                    {user.role} · Day {user.currentDay}
                  </div>
                </div>
                <span
                  className="slds-avatar slds-avatar_circle slds-avatar_medium"
                  style={{ background: '#032d60', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, flexShrink: 0 }}
                >
                  {user.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
            )}

            {/* Mobile/tablet: opens the agent activity + progress drawer. */}
            <button
              onClick={onOpenActivity}
              aria-label={rightDrawerOpen ? 'Close activity panel' : 'Open activity panel'}
              className="lg:hidden"
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 6, padding: 6, display: 'flex', color: '#fff', flexShrink: 0 }}
            >
              {rightDrawerOpen ? <X className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
