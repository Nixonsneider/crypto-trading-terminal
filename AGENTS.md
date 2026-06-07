<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# NixTrade Terminal — Contexto del proyecto

Terminal de trading y análisis crypto. UI en español. Datos vía **CoinGecko API v3 (plan Demo/Gratuito)**.

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript, Tailwind CSS v4, shadcn/ui |
| Gráficos | `lightweight-charts` v5 (TradingView) |
| Datos | Server Actions en `lib/coingecko.actions.ts` |
| Tipos globales | `type.d.ts` (interfaces sin import) |

## Variables de entorno requeridas

- `COINGECKO_BASE_URL` — URL base de la API (demo)
- `COINGECKO_API_KEY` — clave demo; el fetcher usa header `x-cg-demo-api-key`

## Convenciones del código

- **Server Components** para fetch de datos (`CoinOverview`, `TrendingCoins`).
- **Client Components** (`'use client'`) solo donde hace falta DOM/browser (`CandlestickChart`, `Header`).
- Fetch centralizado con `fetcher<T>(endpoint, params?, revalidate?)` en `lib/coingecko.actions.ts`.
- Errores de API: try/catch en el componente + fallback de skeleton (`components/home/fallback.tsx`).
- Estilos por sección con IDs semánticos en `app/globals.css` (`#coin-overview`, `#candlestick-chart`, `#trending-coins`, etc.).
- Utilidades compartidas en `lib/utils.ts` (`cn`, `formatUsdPrice`).

## Estructura relevante

```
app/
  layout.tsx          # Root layout, tema dark, Header global
  page.tsx            # Home: CoinOverview + TrendingCoins en Suspense
  globals.css         # Design system completo (skeletons, chart, tablas)
components/
  CandlestickChart.tsx   # Gráfico de velas (client)
  DataTable.tsx          # Tabla genérica reutilizable
  Header.tsx             # Nav (Inicio, Todas las monedas — /coins aún no existe)
  home/
    CoinOverview.tsx     # Overview de Bitcoin en home
    TrendingCoins.tsx    # Top 6 trending
    fallback.tsx         # Skeletons de carga
lib/
  coingecko.actions.ts   # fetcher server-side
type.d.ts                # Tipos globales (OHLCData, CandlestickChartProps, etc.)
```

## Lo que ya funciona

### Home (`app/page.tsx`)

- Grid con `Suspense` y fallbacks por sección.
- **CoinOverview**: fetch paralelo de detalle + OHLC de Bitcoin; muestra precio e imagen.
- **TrendingCoins**: `/search/trending`, tabla con nombre, cambio 24h y precio (top 6).

### Capa de datos

- `fetcher` con revalidación ISR (`next.revalidate`, default 60s).
- Manejo de errores HTTP con mensaje de CoinGecko (`CoinGeckoErrorBody`).

### Gráfico de velas — estado base (implementado)

- `components/CandlestickChart.tsx` renderiza velas con `lightweight-charts` v5.
- API v5: `createChart` + `chart.addSeries(CandlestickSeries, options)` (no usar `addCandlestickSeries` de v4).
- Conversión OHLC CoinGecko → chart: tupla `[timestamp_ms, open, high, low, close]` → `{ time: seconds as UTCTimestamp, open, high, low, close }`.
- Estilo acorde al tema oscuro/púrpura del proyecto.
- `CoinOverview` pasa `data={coinOHLCData}`, `coinId="bitcoin"`, `height={320}`.

### Restricción crítica de CoinGecko (plan Demo)

**No enviar `interval=daily` ni `interval=hourly`** en `/coins/{id}/ohlc`. Es exclusivo de planes de pago y devuelve `400: invalid interval parameter`.

Sin `interval`, la granularidad es automática según `days`:

| `days` | Granularidad |
|--------|--------------|
| 1–2    | 30 min       |
| 3–30   | 4 h          |
| 31+    | 4 días       |

Actualmente `CoinOverview` usa `days: 1` → velas de 30 min.

### Zona horaria (OHLC)

- CoinGecko **no expone parámetro de zona horaria** en plan Demo; los timestamps vienen en **UTC** (epoch ms).
- `lightweight-charts` tampoco tiene selector de TZ nativo.
- El gráfico convierte UTC → **hora local del navegador** (`timeToLocal` de la doc oficial) y muestra la IANA TZ (`Intl.DateTimeFormat().resolvedOptions().timeZone`) en una leyenda bajo el chart.
- Zoom/scroll deshabilitado: con solo 1 día de datos, expandir dejaba el canvas vacío.

---

## Paso actual: terminar bien el gráfico de velas

El gráfico **renderiza datos históricos básicos**, pero falta completar la experiencia prevista en tipos, CSS y fallbacks.

### Pendiente (prioridad)

- WebSocket en vivo (`UseCoinGeckoWebSocket*`), explorador `/coins`, categorías, search modal.

### Hecho recientemente

- **Selector de periodos** — Botones 1D/1S/1M/3M/6M vía `?period=` + refetch OHLC con `days` de CoinGecko Demo.

### Mapa periodo → `days` (sugerido para implementar)

| Period   | `days` en API |
|----------|---------------|
| daily    | 1             |
| weekly   | 7             |
| monthly  | 30            |
| 3months  | 90            |
| 6months  | 180           |
| yearly   | 365           |
| max      | `max`         |

### Notas técnicas para el gráfico

- `CandlestickChart` es client component; el fetch OHLC debe seguir en server (Server Action o props desde padre async).
- Para cambio de periodo en cliente: wrapper client que llame server action, o mover chart a página con `searchParams`.
- `lightweight-charts` v5 requiere import explícito de series: `import { createChart, CandlestickSeries } from 'lightweight-charts'`.
- No confundir con el icono `CandlestickChart` de `lucide-react` (bug previo que mostraba un icono negro).

## Roadmap general (aún no implementado)

- Explorador `/coins` con paginación server-side
- Categorías (placeholder en home: `<p>Categorias</p>`)
- WebSocket CoinGecko para precio/OHLCV en vivo
- Search modal en Header
- `LiveDataProps`, `LiveCoinHeaderProps` en `type.d.ts` apuntan a vistas de detalle en vivo

## Comandos

```bash
npm run dev    # desarrollo
npm run build  # verificar tipos y compilación
```
