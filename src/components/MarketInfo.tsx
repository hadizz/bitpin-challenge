import { Market } from '@/models/market.dto';
import { formatPrice, formatVolume } from '@/utils/numbers';
import { twMerge } from 'tailwind-merge';
import TrendingChip from './TrendingChip';

interface InfoItemProps {
  label: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const InfoItem = ({ label, id, className, children }: InfoItemProps) => (
  <div className={twMerge('col-span-1 grid grid-cols-2 gap-4 lg:block', className)} id={id}>
    <p className="text-sm text-gray-500">{label}</p>
    <div className="text-right lg:text-left">{children}</div>
  </div>
);

const MarketInfo = ({ market }: { market: Market }) => {
  return (
    <div className="mb-6 grid grid-cols-1 lg:grid-cols-6 gap-4 w-full">
      {/* Row 1 - Market Info */}
      <div className="flex items-center gap-3 col-span-1 lg:col-span-2 order-1">
        <img
          src={market.currency1.image}
          className="w-8 h-8 rounded-full"
          alt={market.currency1.code}
        />
        <div>
          <h1 className="text-lg sm:text-xl font-medium flex items-center gap-2 flex-wrap">
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

      {/* Row 2 - Price and Change */}
      <InfoItem label="Price" id="price" className="lg:order-2 order-3">
        <p className="text-base sm:text-lg font-medium">
          {formatPrice(market.price)} {market.currency2.code}
        </p>
      </InfoItem>

      <div
        className={twMerge('col-span-1 grid grid-cols-2 gap-4 lg:block lg:order-3 order-4')}
        id="change"
      >
        <p className="text-sm text-gray-500">24h Change</p>
        <TrendingChip value={market.price_info?.change ?? 0} className="ml-auto lg:ml-0 lg:mt-1" />
      </div>

      {/* Row 3 - Highest and Lowest */}
      <InfoItem label="Highest" id="highest" className="lg:order-4 order-5">
        <p className="text-base sm:text-lg font-medium">
          {formatVolume(market.price_info?.max ?? '0', '')}
        </p>
      </InfoItem>

      <InfoItem label="Lowest" id="lowest" className="lg:order-5 order-6">
        <p className="text-base sm:text-lg font-medium">
          {formatVolume(market.price_info?.min ?? '0', '')}
        </p>
      </InfoItem>
    </div>
  );
};

export default MarketInfo;
