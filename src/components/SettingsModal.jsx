import { useState, useEffect } from "react";

export default function SettingsModal({
  isOpen,
  onClose,
  apiKey,
  onSaveKey,
  onClearKey,
  storagePreference,
  onChangeStoragePreference,
}) {
  const [keyInput, setKeyInput] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationWarning, setValidationWarning] = useState("");

  useEffect(() => {
    if (isOpen) {
      setKeyInput(apiKey || "");
      setSaveSuccess(false);
      setValidationWarning("");
    }
  }, [isOpen, apiKey]);

  if (!isOpen) return null;

  const handleKeyChange = (val) => {
    setKeyInput(val);
    const trimmed = val.trim();
    if (trimmed && (!trimmed.startsWith("AIzaSy") && !trimmed.startsWith("AQ.")) || (trimmed && trimmed.length < 25)) {
      setValidationWarning("API keys usually start with 'AIzaSy' or 'AQ.' and are 30+ characters long.");
    } else {
      setValidationWarning("");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveKey(keyInput.trim());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleClear = () => {
    setKeyInput("");
    setValidationWarning("");
    onClearKey();
  };

  const isActive = !!apiKey;

  return (
    <>
      <div className="modal-scrim" onClick={onClose} aria-hidden="true" />
      <div className="modal-container">
        <div className="settings-card">
          <div className="settings-header">
            <h3>⚙️ Assistant Settings</h3>
            <button type="button" className="close-modal-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="settings-body">
            {/* Status Section */}
            <div className="status-section">
              <label>AI Agent Status</label>
              <div className={`status-badge ${isActive ? "active-gemini" : "active-offline"}`}>
                <span className="dot"></span>
                <span>
                  {isActive
                    ? "Gemini AI Agent (System Key Active)"
                    : "Offline Mock Agent (Active)"}
                </span>
              </div>
              <p className="status-desc">
                {isActive
                  ? "Answers are generated dynamically by Gemini using your RAG discharge summary excerpts with high accuracy (System Key pre-configured)."
                  : "Running in zero-config offline mode. It matches keywords and discharge guidelines locally without API costs."}
              </p>
            </div>

            {/* Storage Preference Section */}
            <div className="storage-preference-section">
              <label>API Key Storage Preference</label>
              <div className="preference-options">
                <label className="pref-option">
                  <input
                    type="radio"
                    name="key-storage"
                    value="local"
                    checked={storagePreference === "local"}
                    onChange={() => onChangeStoragePreference("local")}
                  />
                  <div>
                    <span className="pref-title">Save Key in Browser</span>
                    <p className="pref-desc">Persisted in browser local storage. Stays signed in across visits.</p>
                  </div>
                </label>
                <label className="pref-option">
                  <input
                    type="radio"
                    name="key-storage"
                    value="session"
                    checked={storagePreference === "session"}
                    onChange={() => onChangeStoragePreference("session")}
                  />
                  <div>
                    <span className="pref-title">Memory Only (Session)</span>
                    <p className="pref-desc">Key lives only in tab memory. Automatically deleted when tab is closed.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* API Key Form */}
            <form onSubmit={handleSave} className="key-form">
              <div className="field">
                <label htmlFor="gemini-key">Gemini API Key</label>
                <div className="input-group">
                  <input
                    id="gemini-key"
                    type="password"
                    placeholder="Enter your Gemini API key..."
                    value={keyInput}
                    onChange={(e) => handleKeyChange(e.target.value)}
                    autoComplete="off"
                  />
                  {isActive && (
                    <button
                      type="button"
                      className="clear-key-btn"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                  )}
                </div>
                {validationWarning && (
                  <div className="validation-warning">
                    ⚠️ {validationWarning}
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="save-key-btn" disabled={!keyInput.trim()}>
                  {saveSuccess ? "✓ Saved Successfully!" : "Save API Key"}
                </button>
              </div>
            </form>

            {/* Help Guide */}
            <div className="help-guide">
              <h4>How to get a free Gemini API key:</h4>
              <ol>
                <li>
                  Go to the{" "}
                  <a
                    href="https://aistudio.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link"
                  >
                    Google AI Studio
                  </a>{" "}
                  (free to use).
                </li>
                <li>Sign in with your Google account.</li>
                <li>
                  Click the <b>Get API key</b> button in the top left.
                </li>
                <li>
                  Click <b>Create API key</b>, copy the key, and paste it here!
                </li>
              </ol>
              <div className="privacy-note">
                🔒 <b>Privacy Note:</b> Your API key is stored locally in your browser
                and is only sent directly to Google's official API server. It is never
                sent to any intermediate servers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
