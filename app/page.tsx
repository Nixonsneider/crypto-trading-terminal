import React from "react";
import Image from "next/image";
import Link from "next/link";
import DataTable from "@/components/DataTable";
import { cn, formatUsdPrice } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { fetcher } from "@/lib/coingecko.actions";

/** Placeholder local asset (public/logo.svg) for thumbs until real CoinGecko URLs are wired. */
const PLACEHOLDER_COIN_IMG = "/logo.svg";







const Page = async () => {




  return <main className="main-container">


    <section className="w-full mt-7 space-y-4">
      <p>Categorias</p>
    </section>
  </main>
}

export default Page
