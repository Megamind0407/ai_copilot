import type { Validation } from '../types';

interface Props {
  darkMode: boolean;
  data?: Validation;
}

export default function ValidationCard({ data }: Props) {
  if (!data) return null;

  const approved = data?.approved ?? false;

  return (
    <div className="p-5 border rounded-2xl">
      <h3>Validation</h3>

      <p className={approved ? 'text-green-500' : 'text-red-500'}>
        {approved ? 'Approved' : 'Failed'}
      </p>

      <p className="text-sm mt-2">
        {data?.reason ?? 'No reason provided'}
      </p>
    </div>
  );
}