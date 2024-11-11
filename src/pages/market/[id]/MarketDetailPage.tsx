import { Box, Container, Tab, Tabs, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Decimal from 'decimal.js';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingCircle from '../../../components/LoadingCircle';
import { ServiceStatusFooter } from '../../../components/ServiceStatusFooter';
import { useMarketDetail } from '../../../hooks/useMarketDetail';
import useMarkets from '../../../hooks/useMarkets';
import { Order, Trade } from '../../../models/market.dto';
import { formatPrice, formatVolume } from '../../../utils/numbers';
import { calculateOrdersByPercentage, calculateOrderSummary } from '../../../utils/orderbook';

export default function MarketDetailPage() {
  const { marketId } = useParams();
  const [tab, setTab] = useState(0);
  const [percentage, setPercentage] = useState<{ buy: number; sell: number }>({
    buy: 100,
    sell: 100,
  });
  const { data: markets } = useMarkets();
  const market = markets?.results?.find((m) => m.id === Number(marketId));
  const { buyOrders, sellOrders, trades } = useMarketDetail(marketId!);

  const orderColumns = useMemo(() => {
    const arr: GridColDef<Order>[] = [
      {
        field: 'remain',
        headerName: 'Remain',
        flex: 1,
      },
      {
        field: 'value',
        headerName: 'Value',
        flex: 1,
      },
      {
        field: 'price',
        headerName: 'Price',
        flex: 1,
        renderCell: (params) => {
          return formatPrice(params.value);
        },
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
        renderCell: (params) => {
          return formatPrice(params.value);
        },
      },
      {
        field: 'match_amount',
        headerName: 'Amount',
        flex: 1,
      },
    ];

    return arr;
  }, []);

  const renderDataWithSummary = (type: 'buy' | 'sell' | 'trade') => {
    let list, columns: GridColDef<any>[], showSummary;
    switch (type) {
      case 'buy':
        list = buyOrders?.data?.orders ?? [];
        columns = orderColumns;
        showSummary = true;
        break;
      case 'sell':
        list = sellOrders?.data?.orders ?? [];
        columns = orderColumns;
        showSummary = true;
        break;
      case 'trade':
        list = trades?.data ?? [];
        columns = tradeColumns;
        showSummary = false;
        break;
    }

    if (!list) return null;

    const slicedList = list.slice(0, 10);
    const summary = showSummary ? calculateOrderSummary(slicedList as Order[]) : null;
    const percentageValue = type === 'buy' ? percentage.buy : percentage.sell;
    const calculatedOrders = showSummary
      ? calculateOrdersByPercentage(slicedList as Order[], percentageValue)
      : null;

    return (
      <Box>
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
          density="compact"
        />

        {showSummary && summary && (
          <>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <p className="text-sm">Total Remain: {formatVolume(summary.totalRemain, '')}</p>
              <p className="text-sm">Total Value: {formatPrice(summary.totalValue)}</p>
              <p className="text-sm">Weighted Price: {formatPrice(summary.weightedPrice)}</p>
            </div>

            {calculatedOrders && (
              <div className="mt-4">
                <TextField
                  type="number"
                  label="Percentage"
                  value={percentageValue}
                  onChange={(e) =>
                    setPercentage(
                      type === 'buy'
                        ? { ...percentage, buy: Number(e.target.value) }
                        : { ...percentage, sell: Number(e.target.value) }
                    )
                  }
                  size="small"
                />
                <div className="mt-1 grid grid-cols-3 gap-4">
                  <p className="text-sm">
                    Selected Amount: {formatVolume(calculatedOrders.totalRemain, '')}
                  </p>
                  <p className="text-sm">
                    Average Price: {formatPrice(calculatedOrders.weightedPrice)}
                  </p>
                  <p className="text-sm">Total Cost: {formatPrice(calculatedOrders.totalValue)}</p>
                </div>
              </div>
            )}
          </>
        )}
      </Box>
    );
  };

  return (
    <>
      <Container maxWidth="xl" className="p-6 pb-20">
        {market && (
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <img
                src={market.currency1.image}
                className="w-8 h-8 rounded-full"
                alt={market.currency1.code}
              />
              <div>
                <h1 className="text-xl font-medium flex items-center gap-2">
                  {market.currency1.title} /{' '}
                  {market.currency2.code === 'IRT' ? (
                    '🇮🇷'
                  ) : (
                    <img src="tether.svg" alt="Tether" className="w-6 h-6" />
                  )}{' '}
                  {market.currency2.code} Market
                </h1>
                <p className="text-sm text-gray-500">
                  {market.currency1.code} / {market.currency2.code}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-lg font-medium">
                  {formatPrice(market.price)} {market.currency2.code}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">24h Change</p>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    (market.price_info?.change ?? 0) >= 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {(market.price_info?.change ?? 0) >= 0 ? '+' : ''}
                  {new Decimal(market.price_info?.change ?? 0).toFixed(2)}%
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">24h Volume</p>
                <p className="text-lg font-medium">
                  {formatVolume(market.volume_24h, market.currency2.code)}
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs value={tab} onChange={(_, value) => setTab(value)}>
          <Tab label="Buy Orders" />
          <Tab label="Sell Orders" />
          <Tab label="Trade History" />
        </Tabs>
        <div className="mt-4">
          {tab === 0 ? (
            buyOrders.isLoading ? (
              <LoadingCircle />
            ) : (
              renderDataWithSummary('buy')
            )
          ) : null}
          {tab === 1 ? (
            sellOrders.isLoading ? (
              <LoadingCircle />
            ) : (
              renderDataWithSummary('sell')
            )
          ) : null}
          {tab === 2 ? trades.isLoading ? <LoadingCircle /> : renderDataWithSummary('trade') : null}
        </div>
      </Container>
      <ServiceStatusFooter buyOrders={buyOrders} sellOrders={sellOrders} trades={trades} />
    </>
  );
}
