import axios from '@/services/axios';
import { Market } from '@models/market.dto';
import { useQuery } from '@tanstack/react-query';
import config from '@utils/config';
interface MarketsResponse {
  results: Market[];
}

const urls = {
  markets: 'v1/mkt/markets/',
};

const useMarkets = () => {
  return useQuery<MarketsResponse>({
    queryKey: ['markets'],
    queryFn: async () => {
      const { data } = await axios.get(config.baseUrlIr + urls.markets);
      return data;
    },
    retry: true,
  });
};

export default useMarkets;
