import React from "react";
import Image from "next/image";
import Link from "next/link";
import DataTable from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

/** Placeholder local asset (public/logo.svg) for thumbs until real CoinGecko URLs are wired. */
const PLACEHOLDER_COIN_IMG = "/logo.svg";

const trendingCoinsData: TrendingCoin[] = [
  {
    item: {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "btc",
      market_cap_rank: 1,
      thumb: PLACEHOLDER_COIN_IMG,
      large: PLACEHOLDER_COIN_IMG,
      data: {
        price: 89133,
        price_change_percentage_24h: { usd: 1.42 },
      },
    },
  },
  {
    item: {
      id: "ethereum",
      name: "Ethereum",
      symbol: "eth",
      market_cap_rank: 2,
      thumb: PLACEHOLDER_COIN_IMG,
      large: PLACEHOLDER_COIN_IMG,
      data: {
        price: 3120.5,
        price_change_percentage_24h: { usd: -0.85 },
      },
    },
  },
  {
    item: {
      id: "solana",
      name: "Solana",
      symbol: "sol",
      market_cap_rank: 5,
      thumb: PLACEHOLDER_COIN_IMG,
      large: PLACEHOLDER_COIN_IMG,
      data: {
        price: 142.8,
        price_change_percentage_24h: { usd: 3.1 },
      },
    },
  },
  {
    item: {
      id: "cardano",
      name: "Cardano",
      symbol: "ada",
      market_cap_rank: 8,
      thumb: PLACEHOLDER_COIN_IMG,
      large: PLACEHOLDER_COIN_IMG,
      data: {
        price: 0.52,
        price_change_percentage_24h: { usd: -2.04 },
      },
    },
  },
];

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Nombre',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      return (
        <Link href={`/coins/${item.id}`} >
          <Image src={item.large} alt={item.name} width={36} height={36} />
          <p>{item.name}</p>
        </Link>

      )
    },
  },
  {
    header: 'Cambio en 24h',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

      return (
        <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
          <p>
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />

            )}
            {Math.abs(item.data.price_change_percentage_24h.usd).toFixed(2)}%
          </p>

        </div>
      )
    }
  },
  {
    header: 'Precio',
    cellClassName: 'price-cell',
    cell: (coin) => coin.item.data.price
  }

]



const Page = () => {
  return <main className="main-container">
    <section className="home-grid">
      <div id="coin-overview">
        <div className="header pt-2">
          <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" alt="Bitcoin" width={56} height={56} />
          <div className="info">
            <p>Bitcoin / BTC</p>
            <h1>$89,133.00</h1>
          </div>
        </div>
      </div>
      <p>Monedas en tendencia</p>
      <DataTable
        data={trendingCoinsData}
        columns={columns}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table" />
    </section>

    <section className="w-full mt-7 space-y-4">
      <p>Categorias</p>
    </section>
  </main>
}

export default Page