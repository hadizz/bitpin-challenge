import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketListPage from "./pages/market/MarketListPage";
import MarketDetailPage from "./pages/market/[id]/MarketDetailPage";
import { queryClient } from "./providers/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MarketListPage />} />
          <Route path="/:marketId" element={<MarketDetailPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
