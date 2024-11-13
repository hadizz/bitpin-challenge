import { Market } from '@/models/market.dto';
import { formatVolume } from '@/utils/numbers';
import { Paper } from '@mui/material';
import { RefObject } from 'react';
import { NavigateFunction } from 'react-router-dom';
import TrendingChip from './TrendingChip';

const MarketInfoCard = ({
  market,
  isSwipingRef,
  navigate,
}: {
  market: Market;
  isSwipingRef: RefObject<boolean>;
  navigate: NavigateFunction;
}) => {
  return (
    <Paper
      key={market.id}
      className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => {
        if (!isSwipingRef.current) {
          navigate(`/${market.id}`);
        }
      }}
    >
      <div className="flex flex-row justify-between items-center sm:flex-col sm:items-start gap-2">
        <div className="flex items-center gap-3">
          <img
            src={market.currency1.image}
            className="w-10 h-10 rounded-full"
            alt={market.currency1.code}
          />
          <div>
            <h3 className="font-semibold">{market.currency1.title}</h3>
            <p className="text-sm text-gray-500">
              {market.currency1.code}/{market.currency2.code}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1mb-3">
          <TrendingChip value={market.price_info?.change ?? 0} />
          {formatVolume(market.price, '', 0)}
        </div>
      </div>
    </Paper>
  );
};

export default MarketInfoCard;
