export interface Currency {
  id: number;
  title: string;
  title_fa: string;
  code: string;
  image: string;
  color: string;
}

export interface PriceInfo {
  price: string;
  change: number;
  min: string;
  max: string;
}

export interface Market {
  id: number;
  currency1: Currency;
  currency2: Currency;
  price: string;
  title_fa: string;
  price_info: PriceInfo;
  volume_24h: string;
}

export interface Order {
  amount: string;
  remain: string;
  price: string;
  value: string;
}

export interface Trade {
  time: number;
  price: string;
  value: string;
  match_amount: string;
  type: string;
  match_id: string;
}

export interface OrderSummary {
  totalRemain: string;
  totalValue: string;
  weightedPrice: string;
}
