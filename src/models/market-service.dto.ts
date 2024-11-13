import { Order } from '@/models/market.dto';

export interface MarketActivesResponse {
  orders: Order[];
  volume: string;
}
