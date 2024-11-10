import { useQuery } from '@tanstack/react-query';
import { MarketActivesResponse } from '../models/market-service.dto';
import { Trade } from '../models/market.dto';
import config from '../utils/config';

export function useMarketDetail(marketId: string) {
  const buyOrders = useQuery({
    queryKey: ['buyOrders', marketId],
    queryFn: async () => {
      const response = await fetch(`${config.baseUrlOrg}v2/mth/actives/${marketId}/?type=buy`);
      return response.json() as Promise<MarketActivesResponse>;
    },
    refetchInterval: 3000,
  });

  const sellOrders = useQuery({
    queryKey: ['sellOrders', marketId],
    queryFn: async () => {
      const response = await fetch(`${config.baseUrlOrg}v2/mth/actives/${marketId}/?type=sell`);
      return response.json() as Promise<MarketActivesResponse>;
    },
    refetchInterval: 3000,
  });

  const trades = useQuery({
    queryKey: ['trades', marketId],
    queryFn: async () => {
      const response = await fetch(`${config.baseUrlOrg}v1/mth/matches/${marketId}/`);
      return response.json() as Promise<Trade[]>;
    },
    refetchInterval: 3000,
  });

  return { buyOrders, sellOrders, trades };
}
