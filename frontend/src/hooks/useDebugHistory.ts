import { useState, useEffect } from 'react';
import type { HistoryEntry, AnalyzeRequest, AnalyzeResponse } from '../types';

const STORAGE_KEY = 'debug_history';
const MAX_ENTRIES = 10;

export function useDebugHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addEntry = (request: AnalyzeRequest, response: AnalyzeResponse) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      request,
      response,
    };
    setHistory(prev => [entry, ...prev].slice(0, MAX_ENTRIES));
  };

  const clearHistory = () => setHistory([]);

  return { history, addEntry, clearHistory };
}
