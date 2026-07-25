import { useEffect, useRef } from "react";
import { DOC_SECTIONS } from "../data/docSections.js";
import { PATIENT } from "../data/patient.js";

export default function DocumentPanel({
  highlightedIds,
  isOpen,
  onClose,
}) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!highlightedIds.length) return;
    const first = document.getElementById(`doc-${highlightedIds[0]}`);
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightedIds]);

  return (
    <>
      <div
        className={`doc-scrim ${isOpen ? "open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`doc-panel ${isOpen ? "open" : ""}`}>
        <div className="doc-head">
          <div className="doc-head-main">
            <div>
              <div className="eyebrow">Approved discharge record</div>
              <h3>Congestive Heart Failure — Discharge Summary</h3>
            </div>
            <button type="button" className="doc-close-btn" onClick={onClose} aria-label="Close document panel">
              ✕
            </button>
          </div>
          <div className="meta">
            {PATIENT.name} · {PATIENT.id} · Discharged 07/10/2026
          </div>
        </div>
        <div className="doc-scroll scroll-thin" ref={scrollRef}>
          {DOC_SECTIONS.map((section, i) => (
            <div
              key={section.id}
              id={`doc-${section.id}`}
              className={`doc-section ${highlightedIds.includes(section.id) ? "highlight" : ""}`}
            >
              <h4>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>{" "}
                {section.title}
              </h4>
              <p>{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
