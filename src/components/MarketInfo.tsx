import { Market } from '@/models/market.dto';
import { formatPrice, formatVolume } from '@/utils/numbers';
import Decimal from 'decimal.js';

const MarketInfo = ({ market }: { market: Market }) => {
  return (
    <div className="mb-6 grid grid-cols-5 gap-4 w-full">
      <div className="flex items-center gap-3 col-span-2">
        <img
          src={market.currency1.image}
          className="w-8 h-8 rounded-full"
          alt={market.currency1.code}
        />
        <div>
          <h1 className="text-xl font-medium flex items-center gap-2">
            {market.currency1.title} /{' '}
            <img
              src={market.currency2.image}
              alt={market.currency2.title}
              width={24}
              height={24}
              style={{ backgroundColor: market.currency2.color }}
            />{' '}
            {market.currency2.title} ({market.currency2.code}) Market
          </h1>
          <p className="text-sm text-gray-500">
            {market.currency1.code} / {market.currency2.code}
          </p>
        </div>
      </div>
      <div className="col-span-1">
        <p className="text-sm text-gray-500">Price</p>
        <p className="text-lg font-medium">
          {formatPrice(market.price)} {market.currency2.code}
        </p>
      </div>
      <div className="col-span-1">
        <p className="text-sm text-gray-500 !mb-1">24h Change</p>
        <span
          className={`px-2 py-1 text-sm rounded-full ${
            (market.price_info?.change ?? 0) >= 0
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {(market.price_info?.change ?? 0) >= 0 ? '+' : ''}
          {new Decimal(market.price_info?.change ?? 0).toFixed(2)}%
        </span>
      </div>
      <div className="col-span-1">
        <p className="text-sm text-gray-500">24h Volume</p>
        <p className="text-lg font-medium">
          {formatVolume(market.volume_24h, market.currency2.code)}
        </p>
      </div>
    </div>
  );
};

export default MarketInfo;
