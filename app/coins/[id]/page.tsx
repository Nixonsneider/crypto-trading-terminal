import { notFound } from 'next/navigation';
import ChartSection from '@/components/ChartSection';
import { fetchCoinDetails, fetchCoinOhlc } from '@/lib/coingecko.actions';
import { parsePeriod } from '@/lib/chart.utils';

type CoinPageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ period?: string | string[] }>;
};

export default async function CoinPage({ params, searchParams }: CoinPageProps) {
    const { id } = await params;
    const query = await searchParams;
    const period = parsePeriod(query.period);

    try {
        const [coin, coinOHLCData] = await Promise.all([
            fetchCoinDetails(id),
            fetchCoinOhlc(id, period),
        ]);

        return (
            <main className="main-container">
                <ChartSection
                    coinData={coin}
                    coinOHLCData={coinOHLCData}
                    coinId={id}
                    period={period}
                    height={400}
                />
            </main>
        );
    } catch (error) {
        console.error(`[CoinPage] Failed to fetch coin "${id}":`, error);
        notFound();
    }
}
