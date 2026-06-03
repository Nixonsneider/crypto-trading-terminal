import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formatea un precio en USD (p. ej. `market_data.current_price.usd`). */
export function formatUsdPrice(
  price: number | null | undefined,
  locale = "en-US",
): string {
  if (price == null || !Number.isFinite(price)) return "—";

  const abs = Math.abs(price);
  let minimumFractionDigits: number;
  let maximumFractionDigits: number;

  if (abs >= 1) {
    minimumFractionDigits = 2;
    maximumFractionDigits = 2;
  } else if (abs >= 0.01) {
    minimumFractionDigits = 2;
    maximumFractionDigits = 4;
  } else if (abs >= 0.0001) {
    minimumFractionDigits = 4;
    maximumFractionDigits = 6;
  } else {
    minimumFractionDigits = 6;
    maximumFractionDigits = 8;
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(price);
}
