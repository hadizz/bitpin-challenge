import { twMerge } from 'tailwind-merge';

interface StatusDotProps {
  type: 'refreshing' | 'updated' | 'failed';
  name: string;
}

export const StatusDot = ({ type, name }: StatusDotProps) => {
  const dotColorClass =
    type === 'refreshing' ? 'bg-yellow-400' : type === 'updated' ? 'bg-green-500' : 'bg-gray-300';

  return (
    <div className="flex items-center gap-1">
      <div className={twMerge('w-2 h-2 rounded-full', dotColorClass)} />
      <span className="text-xs">{name}</span>
    </div>
  );
};
