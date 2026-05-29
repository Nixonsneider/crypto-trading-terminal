import React from "react";
import { fetcher } from "@/lib/coingecko.actions";
import Image from "next/image";
import Link from "next/link";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn, formatUsdPrice } from "@/lib/utils";
import DataTable from "../DataTable";

const TrendingCoins = async () => {

    const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>('/search/trending', undefined, 300);
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
            cell: (coin) => formatUsdPrice(coin.item.data.price)
        }

    ]
    return (
        <div id='trending-coins'>

            <h4>Monedas en tendencia</h4>
            <div id="trending-coins">
                <DataTable
                    data={trendingCoins.coins.slice(0, 6) || []}
                    columns={columns}
                    rowKey={(coin) => coin.item.id}
                    tableClassName="trending-coins-table" />
            </div>
        </div>
    )
}

export default TrendingCoins