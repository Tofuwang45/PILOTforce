// Salesforce Lightning-style global header: the branded blue bar, breadcrumb,
// a view toggle rendered as an SLDS brand button, and an SLDS avatar chip.
export function Header({ user, viewMode, onToggleView }) {
  return (
    <header
      className="slds-global-header_container"
      style={{ background: '#0176d3', color: '#fff' }}
    >
      <div className="slds-global-header slds-grid slds-grid_align-spread" style={{ padding: '0 1rem', height: 56 }}>
        {/* Brand — official Salesforce cloud mark co-branded with PILOTForce */}
        <div className="slds-global-header__item">
          <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 12 }}>
            <img
              src="/logos/sf-cloud-white.svg"
              alt="Salesforce"
              style={{ height: 34, width: 'auto', display: 'block' }}
            />
            <span
              aria-hidden="true"
              style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.35)' }}
            />
            <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', letterSpacing: '0.2px' }}>
              PILOTForce
            </span>
            <span
              className="slds-badge"
              style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', marginLeft: 4 }}
            >
              Onboarding
            </span>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="slds-global-header__item slds-grid slds-grid_vertical-align-center" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem' }}>
          <span>Onboarding</span>
          <span style={{ margin: '0 8px', opacity: 0.6 }}>›</span>
          <span style={{ fontWeight: 600, color: '#fff' }}>Dev Environment Setup</span>
        </div>

        {/* Actions + profile */}
        <div className="slds-global-header__item">
          <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 16 }}>
            <button
              onClick={onToggleView}
              className={
                viewMode === 'manager'
                  ? 'slds-button slds-button_inverse'
                  : 'slds-button slds-button_neutral'
              }
            >
              {viewMode === 'manager' ? 'Manager View' : 'Switch to Manager View'}
            </button>

            {user && (
              <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 10 }}>
                <div style={{ textAlign: 'right', lineHeight: 1.2 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{user.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)' }}>
                    {user.role} · Day {user.currentDay}
                  </div>
                </div>
                <span
                  className="slds-avatar slds-avatar_circle slds-avatar_medium"
                  style={{ background: '#032d60', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}
                >
                  {user.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
