import { DOC_SECTIONS } from "../data/docSections.js";
import { SUGGESTIONS } from "../data/patient.js";

export default function WelcomeBlock({ patientName, onSuggestionClick }) {
  return (
    <div className="welcome">
      <h2>Hi {patientName.split(" ")[0]}, welcome back.</h2>
      <p>
        Ask anything about your discharge instructions — medications, diet,
        follow-up visits, or warning signs. I&apos;ll only answer from your approved
        discharge papers, and I&apos;ll always show you exactly where the answer came
        from.
      </p>
      <div className="suggestions">
        {SUGGESTIONS.map((q) => (
          <button
            type="button"
            key={q}
            className="suggestion-btn"
            onClick={() => onSuggestionClick(q)}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AssistantMessage({ result, onCitationClick }) {
  const citedSections = (result.citedSectionIds || [])
    .map((id) => DOC_SECTIONS.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className="msg assistant">
      <div className={`bubble ${result.pending ? "pending" : ""}`}>
        {result.pending ? (
          "Reading your discharge instructions…"
        ) : (
          <>
            <div>{result.answer}</div>
            {result.usedFallback && (
              <div className="fallback-notice">
                ℹ️ Note: Gemini API was unreachable or returned an error; using offline instructions backup.
              </div>
            )}
            {citedSections.length > 0 && (
              <div className="citations">
                {citedSections.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    className="citation-flag"
                    onClick={() => onCitationClick([s.id])}
                  >
                    📎 {s.title}
                  </button>
                ))}
              </div>
            )}
            {result.needsProvider && (
              <div className="provider-flag">
                ⚠️ This may need clinical judgment. Please call your care team (or
                911 for emergency symptoms) rather than relying on this answer alone.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function UserMessage({ text }) {
  return (
    <div className="msg user">
      <div className="bubble">{text}</div>
    </div>
  );
}
