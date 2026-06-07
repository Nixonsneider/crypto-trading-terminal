import { Suspense } from 'react';
import Image from 'next/image';
import { formatUsdPrice } from '@/lib/utils';
import CandlestickChart from '@/components/CandlestickChart';
import ChartPeriodSelector from '@/components/ChartPeriodSelector';

const ChartSection = ({
    coinData,
    coinOHLCData,
    coinId,
    period = 'daily',
    mode = 'historical',
    height = 320,
    liveOhlcv = null,
    liveInterval,
    setLiveInterval,
    chartChildren,
}: ChartSectionProps) => {
    return (
        <section id="chart-section">
            <div className="header pt-4">
                <Image
                    src={coinData.image.large}
                    alt={coinData.name}
                    width={56}
                    height={56}
                />
                <div className="info">
                    <p>{coinData.name} / {coinData.symbol.toUpperCase()}</p>
                    <h1>{formatUsdPrice(coinData.market_data.current_price.usd)}</h1>
                </div>
                <Suspense
                    fallback={<div className="ml-auto self-start h-7 w-36 skeleton rounded-sm" />}
                >
                    <ChartPeriodSelector activePeriod={period} />
                </Suspense>
            </div>

            <CandlestickChart
                data={coinOHLCData}
                liveOhlcv={liveOhlcv}
                coinId={coinId}
                height={height}
                mode={mode}
                initialPeriod={period}
                liveInterval={liveInterval}
                setLiveInterval={setLiveInterval}
            >
                {chartChildren}
            </CandlestickChart>
        </section>
    );
};

export default ChartSection;
