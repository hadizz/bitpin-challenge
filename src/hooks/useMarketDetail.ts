import { useQuery } from '@tanstack/react-query';
import { MarketActivesResponse } from '../models/market-service.dto';
import { Trade } from '../models/market.dto';
import config from '../utils/config';

export function useMarketDetail(marketId: string) {
  const buyOrders = useQuery({
    queryKey: ['buyOrders', marketId],
    queryFn: async () => {
      try {
        const response = await fetch(`${config.baseUrlOrg}v2/mth/actives/${marketId}/?type=buy`);
        return response.json() as Promise<MarketActivesResponse>;
      } catch (error) {
        if (error instanceof Error && error.message.includes('5')) {
          const response = await fetch(`${config.baseUrlIr}v2/mth/actives/${marketId}/?type=buy`);
          return response.json() as Promise<MarketActivesResponse>;
        }
        throw error;
      }
    },
    refetchInterval: 3000,
  });

  const sellOrders = useQuery({
    queryKey: ['sellOrders', marketId],
    queryFn: async () => {
      try {
        const response = await fetch(`${config.baseUrlOrg}v2/mth/actives/${marketId}/?type=sell`);
        return response.json() as Promise<MarketActivesResponse>;
      } catch (error) {
        if (error instanceof Error && error.message.includes('5')) {
          const response = await fetch(`${config.baseUrlIr}v2/mth/actives/${marketId}/?type=sell`);
          return response.json() as Promise<MarketActivesResponse>;
        }
        throw error;
      }
    },
    refetchInterval: 3000,
  });

  const trades = useQuery({
    queryKey: ['trades', marketId],
    queryFn: async () => {
      try {
        const response = await fetch(`${config.baseUrlOrg}v1/mth/matches/${marketId}/`);
        return response.json() as Promise<Trade[]>;
      } catch (error) {
        if (error instanceof Error && error.message.includes('5')) {
          const response = await fetch(`${config.baseUrlIr}v1/mth/matches/${marketId}/`);
          return response.json() as Promise<Trade[]>;
        }
        throw error;
      }
    },
    refetchInterval: 3000,
  });

  return { buyOrders, sellOrders, trades };
}
