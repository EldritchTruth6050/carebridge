import { useCallback, useState } from "react";
import TopBar from "./components/TopBar.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import MainLayout from "./components/MainLayout.jsx";
import { PATIENT } from "./data/patient.js";
import { useConversations } from "./hooks/useConversations.js";
import { FALLBACK_ANSWER, getAIAnswer } from "./services/aiAnswer.js";
import { semanticSearch } from "./services/semanticSearch.js";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [questionInput, setQuestionInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [highlightedIds, setHighlightedIds] = useState([]);
  const [docOpen, setDocOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Responsive mobile menu state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Settings & API Key states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [storagePreference, setStoragePreference] = useState(() => {
    return localStorage.getItem("carebridge:key_storage_preference") || "local";
  });
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("carebridge:gemini_api_key") || "";
  });

  const {
    conversations,
    activeConvoId,
    addConversation,
    startNewConversation,
    selectConversation,
  } = useConversations(PATIENT.id);

  const handleSaveKey = useCallback((newKey) => {
    setApiKey(newKey);
    if (storagePreference === "local") {
      localStorage.setItem("carebridge:gemini_api_key", newKey);
    } else {
      localStorage.removeItem("carebridge:gemini_api_key");
    }
  }, [storagePreference]);

  const handleClearKey = useCallback(() => {
    localStorage.removeItem("carebridge:gemini_api_key");
    setApiKey("");
  }, []);

  const handleChangeStoragePreference = useCallback((pref) => {
    localStorage.setItem("carebridge:key_storage_preference", pref);
    setStoragePreference(pref);
    if (pref === "local" && apiKey) {
      localStorage.setItem("carebridge:gemini_api_key", apiKey);
    } else if (pref === "session") {
      localStorage.removeItem("carebridge:gemini_api_key");
    }
  }, [apiKey]);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleSignOut = useCallback(() => {
    setIsLoggedIn(false);
    setMessages([]);
    setShowWelcome(true);
    setHighlightedIds([]);
    setQuestionInput("");
    setSidebarOpen(false);
    startNewConversation();
  }, [startNewConversation]);

  const handleCitationClick = useCallback((ids) => {
    setHighlightedIds(ids);
    setDocOpen(true);
  }, []);

  const handleAsk = useCallback(
    async (questionOverride) => {
      const question = (questionOverride ?? questionInput).trim();
      if (!question || isSending) return;

      setQuestionInput("");
      setShowWelcome(false);
      setIsSending(true);
      setMessages((prev) => [...prev, { role: "user", text: question }]);

      const retrieved = semanticSearch(question, 4);
      setHighlightedIds(retrieved.map((r) => r.section.id));

      let result;
      try {
        result = await getAIAnswer(question, retrieved, apiKey);
      } catch {
        result = FALLBACK_ANSWER;
      }

      setMessages((prev) => [...prev, { role: "assistant", result }]);
      setIsSending(false);

      addConversation({
        id: "c" + Date.now(),
        question,
        answer: result.answer,
        citedSectionIds: result.citedSectionIds || [],
        needsProvider: !!result.needsProvider,
        usedFallback: !!result.usedFallback,
        timestamp: new Date().toISOString(),
      });
    },
    [questionInput, isSending, addConversation],
  );

  const handleSuggestionClick = useCallback(
    (q) => {
      setQuestionInput(q);
      handleAsk(q);
    },
    [handleAsk],
  );

  const handleSelectConversation = useCallback(
    (id) => {
      selectConversation(id);
      const c = conversations.find((x) => x.id === id);
      if (!c) return;

      setShowWelcome(false);
      setMessages([
        { role: "user", text: c.question },
        {
          role: "assistant",
          result: {
            answer: c.answer,
            citedSectionIds: c.citedSectionIds,
            needsProvider: c.needsProvider,
            usedFallback: c.usedFallback,
          },
        },
      ]);
      setHighlightedIds(c.citedSectionIds || []);
    },
    [conversations, selectConversation],
  );

  const handleNewConversation = useCallback(() => {
    startNewConversation();
    setMessages([]);
    setShowWelcome(true);
    setHighlightedIds([]);
    setQuestionInput("");
  }, [startNewConversation]);

  return (
    <div id="app">
      <TopBar
        isLoggedIn={isLoggedIn}
        patient={PATIENT}
        onSignOut={handleSignOut}
        onToggleDoc={() => setDocOpen(true)}
        onToggleSettings={() => setIsSettingsOpen(true)}
        onToggleSidebar={() => setSidebarOpen(true)}
      />
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <MainLayout
          conversations={conversations}
          activeConvoId={activeConvoId}
          messages={messages}
          showWelcome={showWelcome}
          patientName={PATIENT.name}
          questionInput={questionInput}
          highlightedIds={highlightedIds}
          docOpen={docOpen}
          isSending={isSending}
          onNewConversation={handleNewConversation}
          onSelectConversation={handleSelectConversation}
          onQuestionChange={setQuestionInput}
          onAsk={() => handleAsk()}
          onSuggestionClick={handleSuggestionClick}
          onCitationClick={handleCitationClick}
          onCloseDoc={() => setDocOpen(false)}
          isSettingsOpen={isSettingsOpen}
          onCloseSettings={() => setIsSettingsOpen(false)}
          apiKey={apiKey}
          onSaveKey={handleSaveKey}
          onClearKey={handleClearKey}
          sidebarOpen={sidebarOpen}
          onCloseSidebar={() => setSidebarOpen(false)}
          storagePreference={storagePreference}
          onChangeStoragePreference={handleChangeStoragePreference}
        />
      )}
    </div>
  );
}
