import LoadingCircle from '@/components/LoadingCircle';
import MarketInfoCard from '@/components/MarketInfoCard';
import useMarkets from '@/hooks/useMarkets';
import { Box, Container, Pagination, Paper, Tab, Tabs } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

export default function MarketListPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [pages, setPages] = useState({ 0: 1, 1: 1 }); // Store page number for each tab
  const { data: markets, isLoading } = useMarkets();

  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const isSwipingRef = useRef(false);

  const handlers = useSwipeable({
    onSwipeStart: (event) => {
      // Store initial touch position
      swipeStartRef.current = { x: event.initial[0], y: event.initial[1] };
    },
    onSwiping: (event) => {
      if (!swipeStartRef.current) return;

      const deltaX = Math.abs(event.deltaX);
      const deltaY = Math.abs(event.deltaY);

      if (deltaX > deltaY && deltaX > 200) {
        isSwipingRef.current = true;
      }
    },
    onSwipedLeft: () => {
      if (isSwipingRef.current && tab === 0) {
        setTab(1);
      }
      isSwipingRef.current = false;
      swipeStartRef.current = null;
    },
    onSwipedRight: () => {
      if (isSwipingRef.current && tab === 1) {
        setTab(0);
      }
      isSwipingRef.current = false;
      swipeStartRef.current = null;
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
    trackTouch: true,
    delta: 200,
    swipeDuration: 500,
  });

  const filteredMarkets =
    markets?.results?.filter((m) =>
      tab === 0 ? m.currency2.code === 'IRT' : m.currency2.code === 'USDT'
    ) || [];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredMarkets.length / itemsPerPage);
  const startIndex = (pages[tab] - 1) * itemsPerPage;
  const paginatedMarkets = filteredMarkets.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPages((prev) => ({ ...prev, [tab]: value }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="xl" className="p-1">
      <Box p={1} {...handlers}>
        <Paper sx={{ mb: 2 }}>
          <Tabs
            value={tab}
            onChange={(_, value) => {
              setTab(value);
            }}
            centered
            aria-label="Currency Markets List"
          >
            <Tab
              icon={<img src="/ir-bit.svg" alt="IRT" width={20} height={20} />}
              label="IRT Markets"
            />
            <Tab
              icon={<img src="/tether-bit.svg" alt="USDT" width={20} height={20} />}
              label="USDT Markets"
            />
          </Tabs>
        </Paper>

        <div className="overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <LoadingCircle className="mt-16" />
              <div className="text-sm dark:text-white text-gray-500 mt-4">
                Loading list of markets, please wait...
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {paginatedMarkets.map((market) => (
                  <MarketInfoCard market={market} isSwipingRef={isSwipingRef} navigate={navigate} />
                ))}
              </div>
              {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={4} mb={2}>
                  <Pagination
                    count={totalPages}
                    page={pages[tab]}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    siblingCount={0}
                    boundaryCount={1}
                  />
                </Box>
              )}
            </>
          )}
        </div>
      </Box>
    </Container>
  );
}
