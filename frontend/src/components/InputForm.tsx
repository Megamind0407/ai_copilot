import { useState } from 'react';
import { Terminal, GitBranch, Code2, Zap, X } from 'lucide-react';
import type { AnalyzeRequest } from '../types';

interface InputFormProps {
  darkMode: boolean;
  onSubmit: (request: AnalyzeRequest) => void;
  loading: boolean;
}

const EXAMPLE = {
  log_text: `ERROR 2024-01-15 14:23:01 [main] Application crashed
TypeError: Cannot read properties of undefined (reading 'map')
    at ProductList.render (/app/src/components/ProductList.jsx:42:18)`,
  stack_trace: `TypeError: Cannot read properties of undefined (reading 'map')
    at ProductList.render (/app/src/components/ProductList.jsx:42:18)
    at processChild (/app/node_modules/react-dom/cjs/react-dom-server.node.development.js:3989:14)
    at resolve (/app/node_modules/react-dom/cjs/react-dom-server.node.development.js:4215:5)`,
  code_snippet: `function ProductList({ products }) {
  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}`,
};

export default function InputForm({ darkMode, onSubmit, loading }: InputFormProps) {
  const [logText, setLogText] = useState('');
  const [stackTrace, setStackTrace] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [showCode, setShowCode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logText.trim() || !stackTrace.trim()) return;
    onSubmit({
      log_text: logText,
      stack_trace: stackTrace,
      code_snippet: codeSnippet || undefined,
    });
  };

  const loadExample = () => {
    setLogText(EXAMPLE.log_text);
    setStackTrace(EXAMPLE.stack_trace);
    setCodeSnippet(EXAMPLE.code_snippet);
    setShowCode(true);
  };

  const clearAll = () => {
    setLogText('');
    setStackTrace('');
    setCodeSnippet('');
  };

  const inputBase = `w-full rounded-xl border font-mono text-sm resize-none transition-all duration-200 outline-none focus:ring-2 ${
    darkMode
      ? 'bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-600 focus:ring-blue-500/40 focus:border-blue-500/60'
      : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-blue-500/30 focus:border-blue-400'
  }`;

  const labelClass = `flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2 ${
    darkMode ? 'text-gray-400' : 'text-gray-500'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Error Input
          </h2>
          <p className={`text-sm mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Paste your error log and stack trace to begin analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadExample}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              darkMode
                ? 'border-gray-700 text-gray-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10'
                : 'border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            Load Example
          </button>
          {(logText || stackTrace || codeSnippet) && (
            <button
              type="button"
              onClick={clearAll}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                darkMode
                  ? 'border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10'
                  : 'border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-300 hover:bg-red-50'
              }`}
            >
              <X size={12} className="inline mr-1" />
              Clear
            </button>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>
          <Terminal size={13} />
          Error Log
          <span className="text-red-500 normal-case font-normal tracking-normal ml-1">*</span>
        </label>
        <textarea
          value={logText}
          onChange={e => setLogText(e.target.value)}
          placeholder="Paste your error log here..."
          rows={5}
          className={`${inputBase} p-4`}
          required
        />
      </div>

      <div>
        <label className={labelClass}>
          <GitBranch size={13} />
          Stack Trace
          <span className="text-red-500 normal-case font-normal tracking-normal ml-1">*</span>
        </label>
        <textarea
          value={stackTrace}
          onChange={e => setStackTrace(e.target.value)}
          placeholder="Paste your full stack trace here..."
          rows={6}
          className={`${inputBase} p-4`}
          required
        />
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowCode(v => !v)}
          className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2 transition-colors ${
            darkMode
              ? 'text-gray-500 hover:text-gray-300'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Code2 size={13} />
          Code Snippet
          <span className={`normal-case font-normal tracking-normal ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>(optional)</span>
          <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded ${darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
            {showCode ? 'hide' : 'expand'}
          </span>
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${showCode ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <textarea
            value={codeSnippet}
            onChange={e => setCodeSnippet(e.target.value)}
            placeholder="Paste the relevant code snippet (optional but improves analysis)..."
            rows={6}
            className={`${inputBase} p-4`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !logText.trim() || !stackTrace.trim()}
        className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
          loading || !logText.trim() || !stackTrace.trim()
            ? darkMode
              ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-400/40 active:scale-[0.98]'
        }`}
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing...
          </>
        ) : (
          <>
            <Zap size={16} />
            Analyze Error
          </>
        )}
      </button>
    </form>
  );
}
