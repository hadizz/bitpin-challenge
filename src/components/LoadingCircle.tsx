import { CircularProgress } from '@mui/material';
import { twMerge } from 'tailwind-merge';

const LoadingCircle = ({ className = '' }: { className?: string }) => {
  return (
    <div className={twMerge('flex justify-center items-center h-full', className)}>
      <CircularProgress />
    </div>
  );
};

export default LoadingCircle;
