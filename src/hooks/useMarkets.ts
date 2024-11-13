import axios from '@/services/axios';
import { Market } from '@models/market.dto';
import { useQuery } from '@tanstack/react-query';
interface MarketsResponse {
  results: Market[];
}

const urls = {
  markets: '/api/markets',
};

const useMarkets = () => {
  return useQuery<MarketsResponse>({
    queryKey: ['markets'],
    queryFn: async () => {
      const { data } = await axios.get(urls.markets);
      return data;
    },
    retry: true,
  });
};

export default useMarkets;
