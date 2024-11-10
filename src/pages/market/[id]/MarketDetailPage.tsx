import { Box, Skeleton, Tab, Tabs } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMarketDetail } from '../../../hooks/useMarketDetail';
import { Order, Trade } from '../../../models/market.dto';

export default function MarketDetailPage() {
  const { marketId } = useParams();
  const [tab, setTab] = useState(0);
  const [percentage, setPercentage] = useState(100);
  const { buyOrders, sellOrders, trades } = useMarketDetail(marketId!);
  console.log({ trades });

  const orderColumns = useMemo(() => {
    const arr: GridColDef<Order>[] = [
      {
        field: 'price',
        headerName: 'Price',
        flex: 1,
      },
      {
        field: 'amount',
        headerName: 'Amount',
        flex: 1,
      },
      {
        field: 'value',
        headerName: 'Total',
        flex: 1,
      },
    ];

    return arr;
  }, []);

  const tradeColumns = useMemo(() => {
    const arr: GridColDef<Trade>[] = [
      {
        field: 'time',
        headerName: 'Time',
        flex: 1,
        valueGetter: (value) => {
          return new Date(value * 1000).toLocaleTimeString();
        },
      },
      {
        field: 'price',
        headerName: 'Price',
        flex: 1,
      },
      {
        field: 'match_amount',
        headerName: 'Amount',
        flex: 1,
      },
    ];

    return arr;
  }, []);

  const renderDataWithSummary = <T extends Order | Trade>(
    list: T[] | undefined,
    columns: GridColDef<T>[],
    showSummary: boolean = false
  ) => {
    console.log({ list });

    if (!list) return null;

    const slicedList = list.slice(0, 10);
    console.log({ slicedList });
    // const summary = showSummary ? calculateOrderSummary(slicedList as Order[]) : null;
    // const calculatedOrders = showSummary
    //   ? calculateOrdersByPercentage(slicedList as Order[], percentage)
    //   : null;

    return (
      <Box>
        <Box height={400}>
          <DataGrid
            rows={
              !slicedList
                ? []
                : slicedList.map((item, index) => ({
                    id: index,
                    ...item,
                  }))
            }
            columns={columns}
            hideFooter
            disableRowSelectionOnClick
          />
        </Box>

        {/* {showSummary && summary && calculatedOrders && (
          <>
            <div className="mt-4">
              <h6 className="text-sm font-medium text-gray-600">Summary:</h6>
              <p className="text-sm">Total Amount: {formatVolume(summary.totalRemain, '')}</p>
              <p className="text-sm">Total Value: {formatPrice(summary.totalValue)}</p>
              <p className="text-sm">Weighted Price: {formatPrice(summary.weightedPrice)}</p>
            </div>

            <div className="mt-4">
              <TextField
                type="number"
                label="Percentage"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                size="small"
              />
              <div className="mt-2">
                <p className="text-sm">
                  Selected Amount: {formatVolume(calculatedOrders.totalRemain, '')}
                </p>
                <p className="text-sm">
                  Average Price: {formatPrice(calculatedOrders.weightedPrice)}
                </p>
                <p className="text-sm">Total Cost: {formatPrice(calculatedOrders.totalValue)}</p>
              </div>
            </div>
          </>
        )} */}
      </Box>
    );
  };

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-4">
        <div className="flex items-center gap-1">
          <div
            className={`w-2 h-2 rounded-full ${
              buyOrders.isFetching
                ? 'bg-yellow-400'
                : buyOrders.isSuccess
                  ? 'bg-green-500'
                  : 'bg-gray-300'
            }`}
          />
          <span className="text-xs text-gray-500">Buy Orders</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className={`w-2 h-2 rounded-full ${
              sellOrders.isFetching
                ? 'bg-yellow-400'
                : sellOrders.isSuccess
                  ? 'bg-green-500'
                  : 'bg-gray-300'
            }`}
          />
          <span className="text-xs text-gray-500">Sell Orders</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className={`w-2 h-2 rounded-full ${
              trades.isFetching
                ? 'bg-yellow-400'
                : trades.isSuccess
                  ? 'bg-green-500'
                  : 'bg-gray-300'
            }`}
          />
          <span className="text-xs text-gray-500">Trades</span>
        </div>
      </div>

      <Tabs value={tab} onChange={(_, value) => setTab(value)}>
        <Tab label="Buy Orders" />
        <Tab label="Sell Orders" />
        <Tab label="Trade History" />
      </Tabs>

      <div className="mt-4">
        {tab === 0 ? (
          buyOrders.isLoading ? (
            <Skeleton />
          ) : (
            renderDataWithSummary(buyOrders.data?.orders, orderColumns, true)
          )
        ) : null}
        {tab === 1 ? (
          sellOrders.isLoading ? (
            <Skeleton />
          ) : (
            renderDataWithSummary(sellOrders.data?.orders, orderColumns, true)
          )
        ) : null}
        {tab === 2 ? (
          trades.isLoading ? (
            <Skeleton />
          ) : (
            renderDataWithSummary(trades.data, tradeColumns)
          )
        ) : null}
      </div>
    </div>
  );
}
