import { Suspense } from "react";
import CoinOverview from "@/components/home/CoinOverview";
import TrendingCoins from "@/components/home/TrendingCoins";
import { CoinOverviewFallback, TrendingCoinsFallback } from "@/components/home/fallback";
import { parsePeriod } from "@/lib/chart.utils";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ period?: string | string[] }>;
}) => {
  const params = await searchParams;
  const period = parsePeriod(params.period);

  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />} key={period}>
          <CoinOverview period={period} />
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className="w-full mt-7 space-y-4">
        <p>Categorias</p>
      </section>
    </main>
  );
};

export default Page;
