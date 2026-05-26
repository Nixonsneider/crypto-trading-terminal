import React from "react";
import Image from "next/image";

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
    </section>

    <section className="w-full mt-7 space-y-4">
      <p>Categorias</p>
    </section>
  </main>
}

export default Page