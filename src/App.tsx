import { Header } from '@/components/Header';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import MarketListPage from '@/pages/market/MarketListPage';
import MarketDetailPage from '@/pages/market/[id]/MarketDetailPage';
import { queryClient } from '@/providers/react-query';
import { getTheme } from '@/providers/theme';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function AppContent() {
  const { mode } = useTheme();
  const theme = getTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<MarketListPage />} />
              <Route path="/:marketId" element={<MarketDetailPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
