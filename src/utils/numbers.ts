import Decimal from 'decimal.js';

export function formatPrice(price: string, decimals: number = 0): string {
  try {
    const value = new Decimal(price);
    return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } catch {
    return '0';
  }
}

export function formatVolume(volume: string, currency: string, decimals: number = 2): string {
  try {
    const value = new Decimal(volume);

    if (value.isZero()) return `0 ${currency}`;

    if (value.greaterThanOrEqualTo('1e9')) {
      const a = value
        .dividedBy('1e9')
        .toFixed(decimals)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `${a}B ${currency}`;
    }
    if (value.greaterThanOrEqualTo('1e6')) {
      const a = value
        .dividedBy('1e6')
        .toFixed(decimals)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `${a}M ${currency}`;
    }

    return `${value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${currency}`;
  } catch {
    return `0 ${currency}`;
  }
}
