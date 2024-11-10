import Decimal from 'decimal.js';

export function formatPrice(price: string, decimals: number = 0): string {
  try {
    const value = new Decimal(price);
    return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } catch {
    return '0';
  }
}

export function formatVolume(volume: string, currency: string): string {
  try {
    const value = new Decimal(volume);

    if (value.isZero()) return '0';

    if (value.greaterThanOrEqualTo('1e9')) {
      return `${value.dividedBy('1e9').toFixed(2)}B ${currency}`;
    }
    if (value.greaterThanOrEqualTo('1e6')) {
      return `${value.dividedBy('1e6').toFixed(2)}M ${currency}`;
    }

    return `${value.toFixed(2)} ${currency}`;
  } catch {
    return `0 ${currency}`;
  }
}
