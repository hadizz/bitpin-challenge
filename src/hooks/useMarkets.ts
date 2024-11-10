import { useQuery } from "@tanstack/react-query";
import { Market } from "../models/Market.dto";

interface MarketsResponse {
    results: Market[];
}

const fetchMarkets = async (): Promise<MarketsResponse> => {
    const response = await fetch('https://api.bitpin.org/v1/mkt/markets/')
    return response.json()
}   

const useMarkets = () => {
    return useQuery<MarketsResponse>({
        queryKey: ['markets'],
        queryFn: () => fetchMarkets(),
    })
}   

export default useMarkets;