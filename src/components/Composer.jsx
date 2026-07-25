import { useEffect, useRef } from "react";
import { SendIcon } from "./icons/BrandIcon.jsx";

export default function Composer({ value, onChange, onSend, disabled }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, [value]);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) {
        onSend();
      }
    }
  }

  return (
    <div className="composer">
      <div className="composer-inner">
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Ask a question about your discharge instructions…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="send-btn"
          onClick={onSend}
          disabled={disabled || !value.trim()}
        >
          <SendIcon />
        </button>
      </div>
      <div className="composer-note">
        Answers are grounded only in your discharge papers. For symptoms or
        emergencies, always contact your care team or call 911.
      </div>
    </div>
  );
}
