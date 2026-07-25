import { useCallback, useEffect, useState } from "react";

function storageKey(patientId) {
  return `carebridge:conversations:${patientId}`;
}

export function useConversations(patientId) {
  const [conversations, setConversations] = useState([]);
  const [activeConvoId, setActiveConvoId] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey(patientId));
      setConversations(stored ? JSON.parse(stored) : []);
    } catch {
      setConversations([]);
    }
  }, [patientId]);

  const saveConversations = useCallback(
    (updater) => {
      setConversations((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        try {
          localStorage.setItem(storageKey(patientId), JSON.stringify(next));
        } catch {
          /* non-fatal */
        }
        return next;
      });
    },
    [patientId],
  );

  const addConversation = useCallback(
    (entry) => {
      setActiveConvoId(entry.id);
      saveConversations((prev) => [entry, ...prev]);
    },
    [saveConversations],
  );

  const startNewConversation = useCallback(() => {
    setActiveConvoId(null);
  }, []);

  const selectConversation = useCallback((id) => {
    setActiveConvoId(id);
  }, []);

  return {
    conversations,
    activeConvoId,
    addConversation,
    startNewConversation,
    selectConversation,
  };
}
