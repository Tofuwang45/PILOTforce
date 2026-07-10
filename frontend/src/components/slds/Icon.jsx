// Renders a Salesforce Lightning Design System icon from the SVG sprite sheets
// served out of /public/slds/icons. Usage:
//   <SldsIcon sprite="utility" name="check" className="slds-icon slds-icon_x-small" />
export function SldsIcon({ sprite = 'utility', name, className = 'slds-icon', title }) {
  return (
    <svg className={className} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title && <title>{title}</title>}
      <use xlinkHref={`/slds/icons/${sprite}-sprite/svg/symbols.svg#${name}`} />
    </svg>
  );
}
