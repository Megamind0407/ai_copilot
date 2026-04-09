import { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultDashboard from './components/ResultDashboard';
import { analyzeError } from './lib/api';
import { useDebugHistory } from './hooks/useDebugHistory';
import type { AnalyzeResponse, AnalyzeRequest, HistoryEntry } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored !== null ? stored === 'true' : true;
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [resultTimestamp, setResultTimestamp] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { history, addEntry, clearHistory } = useDebugHistory();

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const handleSubmit = async (request: AnalyzeRequest) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeError(request);
      setResult(data);
      const ts = Date.now();
      setResultTimestamp(ts);
      addEntry(request, data);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { detail?: string }; status?: number } };
        setError(axiosErr.response?.data?.detail || `Server error (${axiosErr.response?.status})`);
      } else if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'ERR_NETWORK') {
        setError('Cannot connect to the API server. Make sure it is running at http://127.0.0.1:8000');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (entry: HistoryEntry) => {
    setResult(entry.response);
    setResultTimestamp(entry.timestamp);
    setError(null);
  };

  const bg = darkMode ? 'min-h-screen bg-gray-950 text-white' : 'min-h-screen bg-gray-50 text-gray-900';

  return (
    <div className={bg}>
      <Header
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(v => !v)}
        history={history}
        onSelectHistory={handleSelectHistory}
        onClearHistory={clearHistory}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[440px,1fr] gap-8 items-start">
          <div className="xl:sticky xl:top-24 space-y-4">
            <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
              <InputForm darkMode={darkMode} onSubmit={handleSubmit} loading={loading} />
            </div>

            {loading && (
              <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-blue-500/20 animate-ping" />
                    <div className="w-12 h-12 rounded-full border-2 border-t-blue-500 border-blue-500/20 animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Analyzing error...
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Running rule engine & LLM router
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce loading-dot"
                        style={{ '--animation-delay': `${i * 0.15}s` } as React.CSSProperties}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className={`rounded-2xl border p-4 ${darkMode ? 'bg-red-950/30 border-red-900/50' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                      Analysis Failed
                    </p>
                    <p className={`text-xs mt-1 break-words ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                      {error}
                    </p>
                  </div>
                  <button
                    onClick={() => setError(null)}
                    className={`shrink-0 transition-colors ${darkMode ? 'text-red-600 hover:text-red-400' : 'text-red-400 hover:text-red-600'}`}
                    title="Close error message"
                    aria-label="Close error message"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="min-w-0">
            {result ? (
              <ResultDashboard
                darkMode={darkMode}
                data={result}
                timestamp={resultTimestamp ?? undefined}
              />
            ) : !loading && (
              <EmptyState darkMode={darkMode} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function EmptyState({ darkMode }: { darkMode: boolean }) {
  const steps = ['Parse', 'Analyze', 'Fix', 'Test'];
  return (
    <div className={`rounded-2xl border flex flex-col items-center justify-center gap-6 py-20 ${
      darkMode ? 'bg-gray-900 border-gray-800 border-dashed' : 'bg-white border-gray-200 border-dashed'
    }`}>
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={darkMode ? 'text-gray-600' : 'text-gray-400'}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <div className="text-center">
        <p className={`text-base font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Ready to debug
        </p>
        <p className={`text-sm mt-1.5 max-w-xs leading-relaxed ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          Paste your error log and stack trace, then click "Analyze Error" to get an AI-powered diagnosis.
        </p>
      </div>
      <div className="flex items-center gap-3">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border ${
                darkMode ? 'border-gray-700 bg-gray-800 text-gray-500' : 'border-gray-200 bg-gray-50 text-gray-400'
              }`}>
                {i + 1}
              </div>
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-6 h-px ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
