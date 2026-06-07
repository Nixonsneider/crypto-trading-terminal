import React from 'react'
import { fetchCoinDetails, fetchCoinOhlc } from '@/lib/coingecko.actions'
import { parsePeriod } from '@/lib/chart.utils'
import ChartSection from '@/components/ChartSection'
import { CoinOverviewFallback } from './fallback'

type CoinOverviewProps = {
    period?: Period;
}

const CoinOverview = async ({ period: periodParam }: CoinOverviewProps) => {
    const period = periodParam ?? 'daily'

    try {
        const [coin, coinOHLCData] = await Promise.all([
            fetchCoinDetails('bitcoin'),
            fetchCoinOhlc('bitcoin', period),
        ])

        return (
            <div id="coin-overview">
                <ChartSection
                    coinData={coin}
                    coinOHLCData={coinOHLCData}
                    coinId="bitcoin"
                    period={period}
                    height={320}
                />
            </div>
        )
    } catch (error) {
        console.error('[CoinOverview] Failed to fetch coin data:', error)
        return <CoinOverviewFallback />
    }

}
export default CoinOverview
