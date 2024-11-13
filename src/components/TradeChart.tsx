import { useTheme } from '@/contexts/ThemeContext';
import { Trade } from '@/models/market.dto';
import { ColorType, createChart, IChartApi, UTCTimestamp } from 'lightweight-charts';
import { useEffect, useMemo, useRef } from 'react';

interface ChartProps {
  data: Trade[];
}

export function TradeChart({ data }: ChartProps) {
  const { mode } = useTheme();
  const isDarkMode = mode === 'dark';

  const colors = useMemo(() => {
    return {
      backgroundColor: isDarkMode ? '#1a1a1a' : 'white',
      lineColor: '#2962FF',
      textColor: isDarkMode ? 'white' : 'black',
      buyColor: isDarkMode ? '#4caf50' : '#26a69a',
      sellColor: isDarkMode ? '#f44336' : '#ef5350',
    };
  }, [isDarkMode]);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chartRef.current?.applyOptions({
        width: chartContainerRef.current?.clientWidth,
      });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
      grid: {
        vertLines: {
          color: isDarkMode ? '#2c2c2c' : '#e6e6e6',
        },
        horzLines: {
          color: isDarkMode ? '#2c2c2c' : '#e6e6e6',
        },
      },
    });
    chartRef.current = chart;

    // Add line series for price
    const lineSeries = chart.addLineSeries({
      color: colors.lineColor,
      lineWidth: 2,
      priceScaleId: 'right',
    });

    // Add volume histogram
    const volumeSeries = chart.addHistogramSeries({
      color: colors.buyColor,
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: 'left',
    });

    // Configure price scales
    chart.priceScale('right').applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.3, // Leave space for volume
      },
      borderColor: isDarkMode ? '#2c2c2c' : '#e6e6e6',
    });

    chart.priceScale('left').applyOptions({
      scaleMargins: {
        top: 0.7, // Start volume from 70% of the chart
        bottom: 0,
      },
      visible: false,
      borderColor: isDarkMode ? '#2c2c2c' : '#e6e6e6',
    });

    // Sort trades by time
    const sortedData = [...data].sort((a, b) => a.time - b.time);

    // Set price data
    lineSeries.setData(
      sortedData.map((trade) => ({
        time: trade.time as UTCTimestamp,
        value: Number(trade.price),
      }))
    );

    // Set volume data
    volumeSeries.setData(
      sortedData.map((trade) => ({
        time: trade.time as UTCTimestamp,
        value: Number(trade.match_amount),
        color: trade.type === 'buy' ? colors.buyColor : colors.sellColor,
      }))
    );

    chart.timeScale().fitContent();
    chart.timeScale().applyOptions({
      borderColor: isDarkMode ? '#2c2c2c' : '#e6e6e6',
    });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, colors, isDarkMode]);

  return <div ref={chartContainerRef} />;
}
