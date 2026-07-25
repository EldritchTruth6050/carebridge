import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("CareBridge Error Boundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-screen">
          <div className="error-boundary-card">
            <div className="error-icon">⚠️</div>
            <h2>Something went wrong</h2>
            <p className="error-subtitle">
              CareBridge Health encountered an unexpected rendering error. No patient data has been compromised.
            </p>
            {this.state.error && (
              <details className="error-diagnostics">
                <summary>Show Technical Details (Authorized IT Only)</summary>
                <div className="phi-warning-alert">
                  🔒 <b>Compliance Warning:</b> Technical logs may contain Protected Health Information (PHI) like patient names, weights, or doses from your active session. Do not share this information publicly.
                </div>
                <pre className="error-details">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button type="button" className="error-reset-btn" onClick={this.handleReset}>
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
