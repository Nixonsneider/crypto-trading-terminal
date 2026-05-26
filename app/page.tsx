import React from "react";
import Image from "next/image";
import DataTable from "@/components/DataTable";
import { Link } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

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
    header: 'Cambio en 24',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

      return (
        <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
          <p>
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) :

              <TrendingDown width={16} height={16} />
            }
          </p>

        </div>
      )
    }
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
        data={[]}
        columns={[{ header: 'Titulo' }, { header: 'Precio' }]} />
    </section>

    <section className="w-full mt-7 space-y-4">
      <p>Categorias</p>
    </section>
  </main>
}

export default Page