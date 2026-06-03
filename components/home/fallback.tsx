import React from "react";
import DataTable from "@/components/DataTable";

const TRENDING_SKELETON_ROWS = Array.from({ length: 6 }, (_, id) => ({ id }));

const trendingSkeletonColumns: DataTableColumn<{ id: number }>[] = [
    {
        header: "Nombre",
        cellClassName: "name-cell",
        cell: () => (
            <div className="name-link">
                <div className="skeleton name-image" />
                <div className="skeleton name-line" />
            </div>
        ),
    },
    {
        header: "Cambio en 24h",
        cellClassName: "change-cell",
        cell: () => (
            <div className="price-change">
                <div className="skeleton change-icon" />
                <div className="skeleton change-line" />
            </div>
        ),
    },
    {
        header: "Precio",
        cellClassName: "price-cell",
        cell: () => <div className="skeleton price-line" />,
    },
];

export const CoinOverviewFallback = () => (
    <div id="coin-overview-fallback">
        <div className="header pt-2">
            <div className="skeleton header-image" />
            <div className="info">
                <div className="skeleton header-line-sm" />
                <div className="skeleton header-line-lg" />
            </div>
            <div className="flex gap-1 md:gap-2 ml-auto self-start">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="skeleton period-button-skeleton" />
                ))}
            </div>
        </div>
        <div className="chart">
            <div className="skeleton chart-skeleton" />
        </div>
    </div>
);

export const TrendingCoinsFallback = () => (
    <div id="trending-coins-fallback">
        <h4>Monedas en tendencia</h4>
        <DataTable
            data={TRENDING_SKELETON_ROWS}
            columns={trendingSkeletonColumns}
            rowKey={(row) => row.id}
            tableClassName="trending-coins-table"
            headerCellClassName="py-3!"
            bodyCellClassName="py-2!"
        />
    </div>
);
