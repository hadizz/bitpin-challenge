import { Order } from './market.dto';

export interface MarketActivesResponse {
  orders: Order[];
  volume: string;
}
