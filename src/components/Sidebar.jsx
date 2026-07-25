export default function Sidebar({
  conversations,
  activeConvoId,
  onNewConversation,
  onSelectConversation,
  isOpen,
  onClose,
}) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header-mobile">
        <h3>💬 Chat Navigation</h3>
        <button type="button" className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
          ✕
        </button>
      </div>
      <div className="sidebar-section">
        <button
          type="button"
          className="new-convo-btn"
          onClick={() => {
            onNewConversation();
            if (onClose) onClose();
          }}
        >
          ＋ New conversation
        </button>
      </div>
      <div className="history-label">Conversation history</div>
      <div className="history-list scroll-thin">
        {!conversations.length ? (
          <div className="history-empty">
            Your past questions will appear here so you can find an answer again
            later.
          </div>
        ) : (
          conversations.map((c) => (
            <button
              type="button"
              key={c.id}
              className={`history-item ${c.id === activeConvoId ? "active" : ""}`}
              onClick={() => {
                onSelectConversation(c.id);
                if (onClose) onClose();
              }}
            >
              <div className="q">{c.question}</div>
              <div className="t">
                {new Date(c.timestamp).toLocaleString([], {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
