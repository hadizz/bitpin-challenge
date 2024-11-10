import Decimal from 'decimal.js';
import { Order, OrderSummary } from '../models/market.dto';

export function calculateOrderSummary(orders: Order[]): OrderSummary {
  const totalRemain = orders.reduce((sum, order) => sum.plus(order.remain), new Decimal(0));

  const totalValue = orders.reduce((sum, order) => sum.plus(order.value), new Decimal(0));

  const weightedPrice = orders
    .reduce((sum, order) => sum.plus(new Decimal(order.price).times(order.remain)), new Decimal(0))
    .dividedBy(totalRemain);

  return {
    totalRemain: totalRemain.toString(),
    totalValue: totalValue.toString(),
    weightedPrice: weightedPrice.toString(),
  };
}

export function calculateOrdersByPercentage(orders: Order[], percentage: number): OrderSummary {
  const summary = calculateOrderSummary(orders);
  const targetRemain = new Decimal(summary.totalRemain).times(percentage).dividedBy(100);

  let currentRemain = new Decimal(0);
  let currentValue = new Decimal(0);
  let weightedSum = new Decimal(0);

  for (const order of orders) {
    const remain = new Decimal(order.remain);
    const newTotal = currentRemain.plus(remain);

    if (newTotal.lessThanOrEqualTo(targetRemain)) {
      currentRemain = newTotal;
      currentValue = currentValue.plus(order.value);
      weightedSum = weightedSum.plus(new Decimal(order.price).times(order.remain));
    } else {
      const difference = targetRemain.minus(currentRemain);
      currentRemain = targetRemain;
      currentValue = currentValue.plus(
        new Decimal(order.value).times(difference).dividedBy(remain)
      );
      weightedSum = weightedSum.plus(new Decimal(order.price).times(difference));
      break;
    }
  }

  return {
    totalRemain: currentRemain.toString(),
    totalValue: currentValue.toString(),
    weightedPrice: weightedSum.dividedBy(currentRemain).toString(),
  };
}
