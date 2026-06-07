import Link from 'next/link';

export default function CoinNotFound() {
    return (
        <main className="main-container py-10 text-center space-y-4">
            <h1 className="text-2xl font-semibold">Moneda no encontrada</h1>
            <p className="text-gray-400">No pudimos cargar los datos de esta moneda.</p>
            <Link href="/" className="text-green-500 hover:underline">
                Volver al inicio
            </Link>
        </main>
    );
}
