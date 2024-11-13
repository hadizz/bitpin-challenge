import { MarketActivesResponse } from '@/models/market-service.dto';
import { Trade } from '@/models/market.dto';
import axios from '@/services/axios';
import { useQuery } from '@tanstack/react-query';

const urls = {
  buyOrders: (id: string) => `/api/actives?id=${id}&type=buy`,
  sellOrders: (id: string) => `/api/actives?id=${id}&type=sell`,
  trades: (id: string) => `/api/matches?id=${id}`,
};

export function useMarketDetail(marketId: string) {
  const buyOrders = useQuery<MarketActivesResponse>({
    queryKey: ['buyOrders', marketId],
    queryFn: async () => {
      const response = await axios.get(urls.buyOrders(marketId));
      return response.data;
    },
    refetchInterval: 3000,
  });

  const sellOrders = useQuery<MarketActivesResponse>({
    queryKey: ['sellOrders', marketId],
    queryFn: async () => {
      const response = await axios.get(urls.sellOrders(marketId));
      return response.data;
    },
    refetchInterval: 3000,
  });

  const trades = useQuery<Trade[]>({
    queryKey: ['trades', marketId],
    queryFn: async () => {
      const response = await axios.get(urls.trades(marketId));
      return response.data;
    },
    refetchInterval: 3000,
  });

  return { buyOrders, sellOrders, trades };
}
