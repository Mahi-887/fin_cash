import { useTranslation } from "react-i18next";
import { useGetPortfoliosQuery, useGetHoldingsQuery } from "@/store/api/portfolioApi";
import { useAppSelector } from "@/store";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";
import { AllocationPieChart } from "@/components/charts/PieChart";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function Portfolio() {
  const { t } = useTranslation();
  const selectedPortfolio = useAppSelector((s) => s.portfolio.selected);
  const { data: portfolios = [], isLoading } = useGetPortfoliosQuery();
  const { data: holdings = [] } = useGetHoldingsQuery(selectedPortfolio?.id ?? "", {
    skip: !selectedPortfolio,
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t("portfolio.title")}
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <h2 className="mb-4 font-semibold text-gray-900 dark:text-white">
              {t("portfolio.holdings")}
            </h2>
            {holdings.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No holdings found. Select a portfolio or add assets.
              </p>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {holdings.map((h) => (
                  <div key={h.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {h.symbol}
                      </p>
                      <p className="text-xs text-gray-500">{h.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${h.currentValue.toLocaleString()}
                      </p>
                      <p
                        className={`flex items-center gap-1 text-xs ${
                          h.gainLossPercent >= 0 ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {h.gainLossPercent >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {h.gainLossPercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h2 className="mb-4 font-semibold text-gray-900 dark:text-white">
              {t("portfolio.allocation")}
            </h2>
            <AllocationPieChart holdings={holdings} />
          </Card>

          <Card>
            <h2 className="mb-2 font-semibold text-gray-900 dark:text-white">
              Portfolios
            </h2>
            <ul className="space-y-2">
              {portfolios.map((p) => (
                <li
                  key={p.id}
                  className="cursor-pointer rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    ${p.totalValue?.toLocaleString() ?? 0}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
