import { Box, Paper, Tab, Tabs } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMarkets from '../../hooks/useMarkets';
import { Market } from '../../models/market.dto';
import { formatPrice, formatVolume } from '../../utils/numbers';

export default function MarketListPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const { data: markets, isLoading } = useMarkets();

  const filteredMarkets =
    markets?.results?.filter((m) =>
      tab === 0 ? m.currency2.code === 'IRT' : m.currency2.code === 'USDT'
    ) || [];

  const columns = useMemo(() => {
    const arr: GridColDef<Market>[] = [
      {
        field: 'currency',
        headerName: 'Asset',
        width: 180,
        renderCell: (params) => (
          <div className="flex items-center gap-1">
            <img
              src={params.row.currency1.image}
              className="w-6 h-6 rounded-full"
              alt={params.row.currency1.code}
            />
            <div>
              <p className="text-sm font-medium">{params.row.currency1.title}</p>
              <p className="text-xs text-gray-500">{params.row.currency1.code}</p>
            </div>
          </div>
        ),
      },
      {
        field: 'price',
        headerName: 'Price',
        width: 180,
        renderCell: (params) => {
          const decimals = params.row.currency2.code === 'IRT' ? 0 : 2;
          return (
            <p className="text-sm">
              {formatPrice(params.row.price, decimals)} {params.row.currency2.code}
            </p>
          );
        },
      },
      {
        field: 'change',
        headerName: '24h Change',
        width: 130,
        renderCell: (params) => {
          const change = params.row.price_info?.change ?? 0;
          return (
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {change >= 0 ? '+' : ''}
              {change.toFixed(2)}%
            </span>
          );
        },
      },
      {
        field: 'volume',
        headerName: '24h Volume',
        width: 150,
        renderCell: (params) => (
          <p className="text-sm">
            {formatVolume(params.row.volume_24h, params.row.currency2.code)}
          </p>
        ),
      },
    ];

    return arr;
  }, []);

  return (
    <Box p={3}>
      <Paper sx={{ mb: 2 }}>
        <Tabs value={tab} onChange={(_, value) => setTab(value)} centered>
          <Tab label="IRT Markets" />
          <Tab label="USDT Markets" />
        </Tabs>
      </Paper>

      <DataGrid
        rows={filteredMarkets}
        columns={columns}
        loading={isLoading}
        autoHeight
        disableColumnMenu
        disableRowSelectionOnClick
        onRowClick={(params) => navigate(`/${params.row.id}`)}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: { sortModel: [{ field: 'volume', sort: 'desc' }] },
        }}
        sx={{
          '& .MuiDataGrid-cell': { cursor: 'pointer' },
          '& .MuiDataGrid-columnHeaders': { bgcolor: 'action.hover' },
        }}
      />
    </Box>
  );
}
