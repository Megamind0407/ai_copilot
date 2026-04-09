import { AlertTriangle, FileCode, Hash, MessageSquare } from 'lucide-react';
import type { ParsedError } from '../types';

interface ParsedErrorCardProps {
  darkMode: boolean;
  data: ParsedError;
}

export default function ParsedErrorCard({ darkMode, data }: ParsedErrorCardProps) {
  const fields = [
    { icon: <AlertTriangle size={14} />, label: 'Error Type', value: data.error_type, accent: true },
    { icon: <MessageSquare size={14} />, label: 'Message', value: data.error_message },
    { icon: <FileCode size={14} />, label: 'File', value: data.file_name },
    { icon: <Hash size={14} />, label: 'Line', value: data.line_number },
  ];

  return (
    <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className={`px-5 py-4 border-b flex items-center gap-3 ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/15">
          <AlertTriangle size={15} className="text-orange-400" />
        </div>
        <div>
          <h3 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Parsed Error</h3>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Structured error details</p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {fields.map(field => (
          <div key={field.label}>
            <div className={`flex items-center gap-1.5 mb-1.5 text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <span className={darkMode ? 'text-gray-600' : 'text-gray-300'}>{field.icon}</span>
              {field.label}
            </div>
            <div className={`px-3 py-2.5 rounded-lg font-mono text-sm break-all ${
              field.accent
                ? darkMode
                  ? 'bg-orange-500/10 text-orange-300 border border-orange-500/20'
                  : 'bg-orange-50 text-orange-700 border border-orange-200'
                : darkMode
                  ? 'bg-gray-800 text-gray-200'
                  : 'bg-gray-50 text-gray-700'
            }`}>
              {field.value || <span className={`italic ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>N/A</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
