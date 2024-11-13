import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Decimal from 'decimal.js';
import { twMerge } from 'tailwind-merge';

interface TrendingChipProps {
  value: number;
  className?: string;
}

const TrendingChip = ({ value, className }: TrendingChipProps) => {
  return (
    <div
      className={twMerge(
        'flex text-sm items-center gap-1',
        value >= 0 ? 'text-green-600' : 'text-red-600',
        className
      )}
    >
      {value >= 0 ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
      {`${value >= 0 ? '+' : ''}${new Decimal(value).toFixed(2)}%`}
    </div>
  );
};

export default TrendingChip;
