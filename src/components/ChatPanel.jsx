import { useEffect, useRef } from "react";
import WelcomeBlock, { AssistantMessage, UserMessage } from "./ChatMessages.jsx";
import Composer from "./Composer.jsx";

export default function ChatPanel({
  messages,
  showWelcome,
  patientName,
  questionInput,
  onQuestionChange,
  onAsk,
  onSuggestionClick,
  onCitationClick,
  isSending,
}) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, showWelcome, isSending]);

  return (
    <div className="chat-panel">
      <div className="chat-scroll scroll-thin" ref={scrollRef}>
        <div className="chat-inner">
          {showWelcome && (
            <WelcomeBlock
              patientName={patientName}
              onSuggestionClick={onSuggestionClick}
            />
          )}
          {messages.map((msg, i) =>
            msg.role === "user" ? (
              <UserMessage key={i} text={msg.text} />
            ) : (
              <AssistantMessage
                key={i}
                result={msg.result}
                onCitationClick={onCitationClick}
              />
            ),
          )}
          {isSending && (
            <AssistantMessage
              result={{ pending: true }}
              onCitationClick={onCitationClick}
            />
          )}
        </div>
      </div>
      <Composer
        value={questionInput}
        onChange={onQuestionChange}
        onSend={onAsk}
        disabled={isSending}
      />
    </div>
  );
}
