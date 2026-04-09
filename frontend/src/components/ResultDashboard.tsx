import { CheckCircle2, Clock } from 'lucide-react';
import ParsedErrorCard from './ParsedErrorCard';
import AnalysisCard from './AnalysisCard';
import ValidationCard from './ValidationCard';
import TestResultCard from './TestResultCard';
import type { AnalyzeResponse } from '../types';

interface ResultDashboardProps {
  darkMode: boolean;
  data: AnalyzeResponse;
  timestamp?: number;
}

export default function ResultDashboard({ darkMode, data, timestamp }: ResultDashboardProps) {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
        darkMode ? 'bg-emerald-950/30 border-emerald-900/50' : 'bg-emerald-50 border-emerald-100'
      }`}>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={15} className="text-emerald-400" />
          <span className={`text-sm font-medium ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
            Analysis Complete
          </span>
          <span className={`text-xs ${darkMode ? 'text-emerald-600' : 'text-emerald-500'}`}>
            — Status: {data?.status ?? 'unknown'}
          </span>
        </div>

        {timestamp && (
          <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-emerald-600' : 'text-emerald-500'}`}>
            <Clock size={12} />
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {data?.parsed_error && (
          <ParsedErrorCard darkMode={darkMode} data={data.parsed_error} />
        )}

        {data?.validation ? (
          <ValidationCard darkMode={darkMode} data={data.validation} />
        ) : (
          <EmptyCard title="Validation" darkMode={darkMode} />
        )}
      </div>

      {/* Analysis */}
      {data?.analysis ? (
        <AnalysisCard darkMode={darkMode} data={data.analysis} />
      ) : (
        <EmptyCard title="Analysis" darkMode={darkMode} />
      )}

      {/* Testing */}
      {data?.testing ? (
        <TestResultCard darkMode={darkMode} data={data.testing} />
      ) : (
        <EmptyCard title="Testing" darkMode={darkMode} />
      )}
    </div>
  );
}

/* 🔹 Reusable Empty UI */
function EmptyCard({ title, darkMode }: { title: string; darkMode: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 text-sm ${
      darkMode ? 'bg-gray-900 border-gray-800 text-gray-500' : 'bg-white border-gray-200 text-gray-400'
    }`}>
      No {title} data available
    </div>
  );
}