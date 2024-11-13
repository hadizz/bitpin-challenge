import MarketInfo from '@/components/MarketInfo';
import { Box, Container, Skeleton, Slider, Tab, Tabs } from '@mui/material';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingCircle from '../../../components/LoadingCircle';
import { PercentageField } from '../../../components/PercentageField';
import Table, { Column } from '../../../components/Table';
import { TradeChart } from '../../../components/TradeChart';
import { useMarketDetail } from '../../../hooks/useMarketDetail';
import useMarkets from '../../../hooks/useMarkets';
import { Order } from '../../../models/market.dto';
import { formatPrice, formatVolume } from '../../../utils/numbers';
import { calculateOrdersByPercentage, calculateOrderSummary } from '../../../utils/orderbook';

export default function MarketDetailPage() {
  const { marketId } = useParams();
  const [percentage, setPercentage] = useState<{ buy: number; sell: number }>({
    buy: 100,
    sell: 100,
  });
  const { data: markets, isLoading: marketsLoading } = useMarkets();
  const market = markets?.results?.find((m) => m.id === Number(marketId));
  const { buyOrders, sellOrders, trades } = useMarketDetail(marketId!);
  const [tab, setTab] = useState<'sell' | 'buy'>('sell');
  const marketBasedCurrencyCode = market?.currency2?.code ?? '';

  const orderColumns = useMemo(() => {
    const arr: Column[] = [
      {
        field: 'remain',
        headerName: 'Remain',
        renderCell: (val) => formatVolume(val, ''),
      },
      {
        field: 'value',
        headerName: 'Value',
        renderCell: (val) => formatPrice(val),
      },
      {
        field: 'price',
        headerName: `Price (${marketBasedCurrencyCode})`,
        renderCell: (val) => formatPrice(val),
      },
    ];

    return arr;
  }, [marketBasedCurrencyCode]);

  const tradeColumns = useMemo(() => {
    const arr: Column[] = [
      {
        field: 'time',
        headerName: 'Time',
        renderCell: (val) => new Date(val * 1000).toLocaleTimeString(),
      },
      {
        field: 'price',
        headerName: `Price (${marketBasedCurrencyCode})`,
        renderCell: (val) => formatPrice(val),
      },
      {
        field: 'match_amount',
        headerName: 'Amount',
      },
    ];

    return arr;
  }, [marketBasedCurrencyCode]);

  const renderTrade = () => {
    return (
      <>
        <div className="mb-4 h-[300px]">
          {trades.isLoading ? <LoadingCircle /> : trades.data && <TradeChart data={trades.data} />}
        </div>
        <Box
          sx={{
            display: 'flex',
            flex: '1',
            flexDirection: { xs: 'row', lg: 'column' },
            gap: 2,
            p: 2,
            borderRadius: 1,
            bgcolor: 'background.paper',
          }}
        >
          <h4>Trade History</h4>
          {trades.isLoading ? (
            <LoadingCircle />
          ) : (
            <div className="flex-1 overflow-auto">
              <Table columns={tradeColumns} data={trades.data?.slice(0, 10) ?? []} />
            </div>
          )}
        </Box>
      </>
    );
  };

  const renderOrderTable = (type: 'buy' | 'sell') => {
    let list, columns: Column[], loading;
    switch (type) {
      case 'buy':
        list = buyOrders?.data?.orders ?? [];
        columns = orderColumns;
        loading = buyOrders.isLoading;
        break;
      case 'sell':
        list = sellOrders?.data?.orders ?? [];
        columns = orderColumns;
        loading = sellOrders.isLoading;
        break;
    }

    if (loading) return <LoadingCircle />;
    if (!list || list.length === 0) return null;

    const slicedList = list.slice(0, 10);
    const summary = calculateOrderSummary(slicedList as Order[]);

    return (
      <section aria-label="Order List">
        <Table data={slicedList} columns={columns} type={type} />
        <div className="mt-1 grid grid-cols-3 gap-1 dark:bg-gray-800 bg-gray-100">
          <p className="text-xs p-1">{formatVolume(summary.totalRemain, '')}</p>
          <p className="text-xs p-1">{formatPrice(summary.totalValue)}</p>
          <p className="text-xs p-1">{formatPrice(summary.weightedPrice)}</p>
        </div>
      </section>
    );
  };

  const renderOrderBook = () => {
    let list;
    switch (tab) {
      case 'buy':
        list = buyOrders?.data?.orders ?? [];
        break;
      case 'sell':
        list = sellOrders?.data?.orders ?? [];
        break;
    }
    const slicedList = list.slice(0, 10);
    const percentageValue = tab === 'buy' ? percentage.buy : percentage.sell;
    const calculatedOrders = calculateOrdersByPercentage(slicedList as Order[], percentageValue);

    return (
      <section aria-label="Orde Book">
        <Tabs value={tab} onChange={(_, val) => setTab(val)} centered>
          <Tab value="sell" label="Sell" />
          <Tab value="buy" label="Buy" />
        </Tabs>
        <Box height={24} />
        <div className="flex flex-col gap-1">
          <PercentageField
            label="Percentage"
            value={percentage[tab]}
            onChange={(value) => {
              setPercentage({ ...percentage, [tab]: value });
            }}
          />
          <div className="mr-5 ml-2">
            <Slider
              value={percentage[tab]}
              onChange={(_, value) => {
                setPercentage({ ...percentage, [tab]: value as number });
              }}
              min={0}
              max={100}
              step={1}
              marks={[
                { value: 0, label: '0%' },
                { value: 25, label: '25%' },
                { value: 50, label: '50%' },
                { value: 75, label: '75%' },
                { value: 100, label: '100%' },
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
              sx={{ flex: 1 }}
            />
          </div>
        </div>
        {slicedList.length > 0 && (
          <div className="flex flex-col gap-1 mt-4 text-center">
            <div className="flex gap-1">
              <div className="w-1/3 p-2 rounded bg-gray-100 dark:bg-gray-900">
                <p className="text-xs">Amount</p>
                <p className="text-base">{formatVolume(calculatedOrders.totalRemain, '')}</p>
              </div>
              <div className="w-2/3 p-2 rounded bg-gray-100 dark:bg-gray-900">
                <p className="text-xs">Average Price</p>
                <p className="text-base">
                  {formatPrice(calculatedOrders.weightedPrice)}{' '}
                  <span className="text-xs">{marketBasedCurrencyCode}</span>
                </p>
              </div>
            </div>
            <div className="p-2 rounded bg-gray-100 dark:bg-gray-900">
              <p className="text-xs">Total Cost</p>
              <p className="text-base">
                {formatPrice(calculatedOrders.totalValue)}{' '}
                <span className="text-xs">{marketBasedCurrencyCode}</span>
              </p>
            </div>
          </div>
        )}
      </section>
    );
  };

  const renderMarketInfo = () => {
    if (marketsLoading) return <Skeleton variant="rectangular" height={56} />;
    if (!market) return null;
    return <MarketInfo market={market} />;
  };

  return (
    <>
      <Container maxWidth="xl" className="p-6 pb-20">
        {renderMarketInfo()}
        <div className="mt-4 flex flex-col lg:flex-row gap-4 h-full">
          <div className="w-full lg:flex-1 flex flex-col">{renderTrade()}</div>
          <div className="w-full flex lg:flex-1 flex-col lg:flex-row gap-3">
            <Box
              sx={{
                display: 'flex',
                flex: '1',
                flexDirection: { xs: 'row', lg: 'column' },
                gap: 2,
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.paper',
              }}
            >
              <h4 className="!mb-0">Order List</h4>
              {renderOrderTable('buy')}
              {renderOrderTable('sell')}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', lg: 'column' },
                flex: '1',
                gap: 2,
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.paper',
              }}
            >
              {renderOrderBook()}
            </Box>
          </div>
        </div>
      </Container>
    </>
  );
}
