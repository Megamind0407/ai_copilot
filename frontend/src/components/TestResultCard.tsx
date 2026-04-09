import type { Testing } from '../types';

interface Props {
  darkMode: boolean;
  data?: Testing; // ✅ optional
}

export default function TestResultCard({ data }: Props) {
  if (!data || !data.test_result) return null; // ✅ FIX

  const passed = data?.test_result?.passed ?? false;

  return (
    <div className="p-5 border rounded-2xl">
      <h3 className="mb-3">Test Results</h3>

      <p className={passed ? 'text-green-500' : 'text-red-500'}>
        {passed ? 'Passed' : 'Failed'}
      </p>

      {data?.test_code && (
        <pre className="text-xs mt-2 bg-gray-900 p-3 rounded">
          {data.test_code}
        </pre>
      )}

      {data?.test_result?.output && (
        <pre className="text-xs mt-2">
          {data.test_result.output}
        </pre>
      )}

      {data?.test_result?.error && (
        <pre className="text-xs text-red-400 mt-2">
          {data.test_result.error}
        </pre>
      )}
    </div>
  );
}