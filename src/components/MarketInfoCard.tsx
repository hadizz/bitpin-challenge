import { Market } from '@/models/market.dto';
import { formatPrice, formatVolume } from '@/utils/numbers';
import { Paper } from '@mui/material';
import Decimal from 'decimal.js';
import { RefObject } from 'react';
import { NavigateFunction } from 'react-router-dom';

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
      <div className="flex items-center gap-3 mb-4">
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

      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500">Price</span>
        <span className="text-lg font-medium">
          {formatPrice(market.price, market.currency2.code === 'IRT' ? 0 : 2)}{' '}
          {market.currency2.code}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">24h Change</span>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            (market.price_info?.change ?? 0) >= 0
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {(market.price_info?.change ?? 0) >= 0 ? '+' : ''}
          {new Decimal(market.price_info?.change ?? 0).toFixed(2)}%
        </span>
      </div>

      <div className="mt-3 pt-3 border-t">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">24h Volume</span>
          <span className="text-sm font-medium">
            {formatVolume(market.volume_24h, market.currency2.code)}
          </span>
        </div>
      </div>
    </Paper>
  );
};

export default MarketInfoCard;
