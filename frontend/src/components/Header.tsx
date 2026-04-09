import { Bug, Moon, Sun, History, Trash2 } from 'lucide-react';
import type { HistoryEntry } from '../types';

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
  history: HistoryEntry[];
  onSelectHistory: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
}

export default function Header({ darkMode, onToggleDark, history, onSelectHistory, onClearHistory }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-md ${darkMode ? 'bg-gray-950/90 border-gray-800' : 'bg-white/90 border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500 shadow-lg shadow-blue-500/30">
            <Bug size={18} className="text-white" />
          </div>
          <div>
            <h1 className={`text-base font-semibold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Debug System
            </h1>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Powered by LLM + Rule Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <div className="relative group">
              <button
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  darkMode
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <History size={15} />
                <span className="hidden sm:inline">History</span>
                <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  {history.length}
                </span>
              </button>

              <div className={`absolute right-0 top-full mt-2 w-80 rounded-xl shadow-2xl border overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className={`flex items-center justify-between px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Recent Analyses
                  </span>
                  <button
                    onClick={onClearHistory}
                    className={`flex items-center gap-1 text-xs transition-colors ${darkMode ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}
                  >
                    <Trash2 size={12} />
                    Clear
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {history.map(entry => (
                    <button
                      key={entry.id}
                      onClick={() => onSelectHistory(entry)}
                      className={`w-full text-left px-4 py-3 border-b last:border-0 transition-colors ${
                        darkMode
                          ? 'border-gray-800 hover:bg-gray-800 text-gray-300'
                          : 'border-gray-50 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="text-xs font-medium truncate">{entry.response.parsed_error.error_type}</div>
                      <div className={`text-[11px] truncate mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {new Date(entry.timestamp).toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={onToggleDark}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'text-gray-400 hover:text-yellow-400 hover:bg-gray-800'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
