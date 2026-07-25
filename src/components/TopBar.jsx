import { BrandIcon } from "./icons/BrandIcon.jsx";

export default function TopBar({ isLoggedIn, patient, onSignOut, onToggleDoc, onToggleSettings, onToggleSidebar }) {
  return (
    <div className="topbar">
      <div className="brand">
        {isLoggedIn && (
          <button type="button" className="mobile-menu-btn" onClick={onToggleSidebar} aria-label="Toggle navigation menu">
            ☰
          </button>
        )}
        <div className="brand-mark">
          <BrandIcon />
        </div>
        <div>
          <div className="brand-name">CareBridge</div>
          <div className="brand-tag">Discharge Companion</div>
        </div>
      </div>
      {isLoggedIn && (
        <div className="topbar-right">
          <button type="button" className="doc-toggle" onClick={onToggleDoc}>
            📄 View discharge papers
          </button>
          <div className="patient-chip">
            <span>🔒</span>
            <span className="full">
              {patient.name} · {patient.id}
            </span>
          </div>
          <button type="button" className="settings-btn" onClick={onToggleSettings}>
            ⚙️ Settings
          </button>
          <button type="button" className="signout" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
