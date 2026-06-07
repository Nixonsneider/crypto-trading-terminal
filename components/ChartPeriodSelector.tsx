'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { CHART_PERIODS, PERIOD_LABELS } from '@/lib/chart.utils';
import { cn } from '@/lib/utils';

const ChartPeriodSelector = ({ activePeriod }: { activePeriod: Period }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <div className="button-group ml-auto self-start">
            {CHART_PERIODS.map((period) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('period', period);

                return (
                    <Link
                        key={period}
                        href={`${pathname}?${params.toString()}`}
                        scroll={false}
                        className={cn(
                            activePeriod === period ? 'config-button-active' : 'config-button',
                        )}
                    >
                        {PERIOD_LABELS[period]}
                    </Link>
                );
            })}
        </div>
    );
};

export default ChartPeriodSelector;
