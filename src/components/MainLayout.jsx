import Sidebar from "./Sidebar.jsx";
import ChatPanel from "./ChatPanel.jsx";
import DocumentPanel from "./DocumentPanel.jsx";
import SettingsModal from "./SettingsModal.jsx";

export default function MainLayout({
  conversations,
  activeConvoId,
  messages,
  showWelcome,
  patientName,
  questionInput,
  highlightedIds,
  docOpen,
  isSending,
  onNewConversation,
  onSelectConversation,
  onQuestionChange,
  onAsk,
  onSuggestionClick,
  onCitationClick,
  onCloseDoc,
  isSettingsOpen,
  onCloseSettings,
  apiKey,
  onSaveKey,
  onClearKey,
  sidebarOpen,
  onCloseSidebar,
  storagePreference,
  onChangeStoragePreference,
}) {
  return (
    <div id="main-screen">
      <div className="layout">
        {sidebarOpen && (
          <div className="sidebar-scrim" onClick={onCloseSidebar} aria-hidden="true" />
        )}
        <Sidebar
          conversations={conversations}
          activeConvoId={activeConvoId}
          onNewConversation={onNewConversation}
          onSelectConversation={onSelectConversation}
          isOpen={sidebarOpen}
          onClose={onCloseSidebar}
        />
        <ChatPanel
          messages={messages}
          showWelcome={showWelcome}
          patientName={patientName}
          questionInput={questionInput}
          onQuestionChange={onQuestionChange}
          onAsk={onAsk}
          onSuggestionClick={onSuggestionClick}
          onCitationClick={onCitationClick}
          isSending={isSending}
        />
        <DocumentPanel
          highlightedIds={highlightedIds}
          isOpen={docOpen}
          onClose={onCloseDoc}
        />
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={onCloseSettings}
        apiKey={apiKey}
        onSaveKey={onSaveKey}
        onClearKey={onClearKey}
        storagePreference={storagePreference}
        onChangeStoragePreference={onChangeStoragePreference}
      />
    </div>
  );
}
