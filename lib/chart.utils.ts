export const PERIOD_DAYS: Record<Period, string | number> = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    '3months': 90,
    '6months': 180,
    yearly: 365,
    max: 'max',
};

export function periodToDays(period: Period): string | number {
    return PERIOD_DAYS[period];
}

export const CHART_PERIODS: Period[] = ['daily', 'weekly', 'monthly', '3months', '6months'];

const VALID_PERIODS = new Set<string>(Object.keys(PERIOD_DAYS));

export function parsePeriod(value: string | string[] | undefined): Period {
    const raw = Array.isArray(value) ? value[0] : value;
    if (raw && VALID_PERIODS.has(raw)) return raw as Period;
    return 'daily';
}

export const PERIOD_LABELS: Record<Period, string> = {
    daily: '1D',
    weekly: '1S',
    monthly: '1M',
    '3months': '3M',
    '6months': '6M',
    yearly: '1A',
    max: 'MAX',
};

/** Fusiona la vela en vivo con el histórico (misma vela → reemplaza; nueva → append). */
export function mergeLiveOhlc(
    historical: OHLCData[],
    liveOhlcv: OHLCData | null | undefined,
): OHLCData[] {
    if (!liveOhlcv || historical.length === 0) return historical;

    const last = historical[historical.length - 1];
    if (last[0] === liveOhlcv[0]) {
        return [...historical.slice(0, -1), liveOhlcv];
    }

    if (liveOhlcv[0] >= last[0]) {
        return [...historical, liveOhlcv];
    }

    return historical;
}
