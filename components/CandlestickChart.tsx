'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
    CandlestickSeries,
    ColorType,
    createChart,
    type CandlestickData,
    type IChartApi,
    type ISeriesApi,
    type UTCTimestamp,
} from 'lightweight-charts';
import { mergeLiveOhlc } from '@/lib/chart.utils';

function utcSecondsToLocalChartTime(utcSeconds: number): UTCTimestamp {
    const date = new Date(utcSeconds * 1000);
    return Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
    ) / 1000 as UTCTimestamp;
}

function toChartData(data: OHLCData[]): CandlestickData<UTCTimestamp>[] {
    return data.map(([timestamp, open, high, low, close]) => ({
        time: utcSecondsToLocalChartTime(Math.floor(timestamp / 1000)),
        open,
        high,
        low,
        close,
    }));
}

function formatChartTime(time: number): string {
    const date = new Date(time * 1000);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

const CandlestickChart = ({
    data = [],
    liveOhlcv = null,
    coinId,
    height = 320,
    children,
    mode = 'historical',
    initialPeriod = 'daily',
    liveInterval = '1m',
    setLiveInterval,
}: CandlestickChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

    const locale = typeof navigator !== 'undefined' ? navigator.language : 'es';
    const timeZone = useMemo(
        () => Intl.DateTimeFormat().resolvedOptions().timeZone,
        [],
    );

    const seriesData = useMemo(
        () => (mode === 'live' ? mergeLiveOhlc(data, liveOhlcv) : data),
        [data, liveOhlcv, mode],
    );

    useEffect(() => {
        if (!containerRef.current) return;

        const chart = createChart(containerRef.current, {
            autoSize: true,
            height,
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#9ca3af',
            },
            grid: {
                vertLines: { color: 'rgba(147, 51, 234, 0.08)' },
                horzLines: { color: 'rgba(147, 51, 234, 0.08)' },
            },
            rightPriceScale: {
                borderColor: 'rgba(147, 51, 234, 0.2)',
            },
            timeScale: {
                borderColor: 'rgba(147, 51, 234, 0.2)',
                timeVisible: true,
                secondsVisible: mode === 'live' && liveInterval === '1s',
                fixLeftEdge: true,
                fixRightEdge: true,
            },
            crosshair: {
                vertLine: { color: 'rgba(147, 51, 234, 0.4)' },
                horzLine: { color: 'rgba(147, 51, 234, 0.4)' },
            },
            handleScale: {
                mouseWheel: false,
                pinch: false,
                axisPressedMouseMove: false,
                axisDoubleClickReset: false,
            },
            handleScroll: {
                mouseWheel: false,
                pressedMouseMove: false,
                horzTouchDrag: false,
                vertTouchDrag: false,
            },
            localization: {
                locale,
                timeFormatter: (time: number) => formatChartTime(time),
            },
        });

        const series = chart.addSeries(CandlestickSeries, {
            upColor: '#22c55e',
            downColor: '#ef4444',
            borderUpColor: '#22c55e',
            borderDownColor: '#ef4444',
            wickUpColor: '#22c55e',
            wickDownColor: '#ef4444',
        });

        chartRef.current = chart;
        seriesRef.current = series;

        return () => {
            chartRef.current = null;
            seriesRef.current = null;
            chart.remove();
        };
    }, [height, locale, liveInterval, mode]);

    useEffect(() => {
        if (!seriesRef.current || seriesData.length === 0) return;

        seriesRef.current.setData(toChartData(seriesData));
        chartRef.current?.timeScale().fitContent();
    }, [seriesData]);

    const chartId = coinId ? `candlestick-chart-${coinId}` : 'candlestick-chart';
    const showLiveControls = mode === 'live' && setLiveInterval;

    return (
        <div
            id="candlestick-chart"
            data-coin-id={coinId}
            data-chart-id={chartId}
            data-mode={mode}
            data-period={initialPeriod}
        >
            {(children || showLiveControls) ? (
                <div className="chart-header">
                    {children}
                    {showLiveControls ? (
                        <div className="button-group ml-auto">
                            <button
                                type="button"
                                className={liveInterval === '1s' ? 'config-button-active' : 'config-button'}
                                onClick={() => setLiveInterval('1s')}
                            >
                                1s
                            </button>
                            <button
                                type="button"
                                className={liveInterval === '1m' ? 'config-button-active' : 'config-button'}
                                onClick={() => setLiveInterval('1m')}
                            >
                                1m
                            </button>
                        </div>
                    ) : null}
                </div>
            ) : null}
            <div
                ref={containerRef}
                className="chart"
                style={{ height }}
                aria-label={coinId ? `Gráfico OHLC de ${coinId}` : 'Gráfico OHLC'}
            />
            <p className="chart-timezone">
                Horario local: {timeZone}
                {mode === 'live' ? ' · Modo en vivo' : null}
            </p>
        </div>
    );
};

export default CandlestickChart;
