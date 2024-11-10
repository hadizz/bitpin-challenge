export interface Currency {
    id: number;
    title: string;
    title_fa: string;
    code: string;
    image: string;
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