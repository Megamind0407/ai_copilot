import { useState } from 'react';
import { Brain,Copy, Check, Cpu, Bot } from 'lucide-react';
import type { Analysis } from '../types';

interface AnalysisCardProps {
  darkMode: boolean;
  data?: Analysis; // ✅ optional
}

export default function AnalysisCard({ darkMode, data }: AnalysisCardProps) {
  const [copied, setCopied] = useState(false);

  if (!data) return null; // ✅ safety

  const handleCopy = async () => {
    if (!data?.fix_suggestion) return;
    await navigator.clipboard.writeText(data.fix_suggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confidence = Math.round((data?.confidence ?? 0) * 100);

  const confidenceColor =
    confidence >= 80 ? 'bg-emerald-500'
    : confidence >= 60 ? 'bg-yellow-500'
    : 'bg-red-500';

  const sourceLabel =
    data?.source === 'rule_engine' ? 'Rule Engine' : 'LLM Router';

  const SourceIcon =
    data?.source === 'rule_engine' ? Cpu : Bot;

  return (
    <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      
      {/* Header */}
      <div className={`px-5 py-4 border-b flex items-center justify-between ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/15">
            <Brain size={15} className="text-blue-400" />
          </div>
          <h3 className="text-sm font-semibold">AI Analysis</h3>
        </div>

        <div className="text-xs flex items-center gap-1">
          <SourceIcon size={12} />
          {sourceLabel}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">

        {/* Root Cause */}
        <div>
          <p className="text-xs mb-1">Root Cause</p>
          <div className="text-sm">
            {data?.root_cause ?? 'No root cause available'}
          </div>
        </div>

        {/* Fix */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs">Fix Suggestion</p>
            <button onClick={handleCopy} className="text-xs">
              {copied ? <Check size={12}/> : <Copy size={12}/>}
            </button>
          </div>

          <pre className="text-xs bg-gray-800 p-3 rounded">
            {data?.fix_suggestion ?? 'No fix available'}
          </pre>
        </div>

        {/* Confidence */}
        <div>
          <p className="text-xs mb-1">Confidence: {confidence}%</p>
          <div className="w-full h-2 bg-gray-700 rounded">
            <div
              className={`h-2 rounded ${confidenceColor}`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}