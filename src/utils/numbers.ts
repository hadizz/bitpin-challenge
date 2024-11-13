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
      const a = decimals === 0 ? value.dividedBy('1e9') : value.dividedBy('1e9').toFixed(decimals);
      return `${a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}B ${currency}`;
    }
    if (value.greaterThanOrEqualTo('1e6')) {
      const a = decimals === 0 ? value.dividedBy('1e6') : value.dividedBy('1e6').toFixed(decimals);
      return `${a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}M ${currency}`;
    }

    const formattedValue = decimals === 0 ? value.toString() : value.toFixed(decimals);
    const [integerPart, decimalPart] = formattedValue.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const result = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    return `${result} ${currency}`;
  } catch {
    return `0 ${currency}`;
  }
}
