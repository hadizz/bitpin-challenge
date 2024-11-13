import { MarketActivesResponse } from '@/models/market-service.dto';
import { Trade } from '@/models/market.dto';
import axios from '@/services/axios';
import config from '@/utils/config';
import { useQuery } from '@tanstack/react-query';

const baseUrl = config.baseUrlIr;
console.log(baseUrl);

const urls = {
  buyOrders: (id: string) => `v2/mth/actives/${id}/?type=buy`,
  sellOrders: (id: string) => `v2/mth/actives/${id}/?type=sell`,
  trades: (id: string) => `v1/mth/matches/${id}/`,
};

export function useMarketDetail(marketId: string) {
  const buyOrders = useQuery<MarketActivesResponse>({
    queryKey: ['buyOrders', marketId],
    queryFn: async () => {
      const response = await axios.get('https://bitpin-challenge.vercel.app/api/actives?type=buy');
      return response.data;
    },
    refetchInterval: 3000,
  });

  const sellOrders = useQuery<MarketActivesResponse>({
    queryKey: ['sellOrders', marketId],
    queryFn: async () => {
      const response = await axios.get('https://bitpin-challenge.vercel.app/api/actives?type=sell');
      return response.data;
    },
    refetchInterval: 3000,
  });

  const trades = useQuery<Trade[]>({
    queryKey: ['trades', marketId],
    queryFn: async () => {
      const response = await axios.get(
        'https://bitpin-challenge.vercel.app/api/matches?id=' + marketId
      );
      return response.data;
    },
    refetchInterval: 3000,
  });

  return { buyOrders, sellOrders, trades };
}
