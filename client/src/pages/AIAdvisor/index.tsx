import { useTranslation } from "react-i18next";
import ChatInterface from "@/components/ai/ChatInterface";
import AIInsightCard from "@/components/ai/AIInsightCard";
import { useGetInsightsQuery } from "@/store/api/aiApi";
import { useAppSelector } from "@/store";

export default function AIAdvisor() {
  const { t } = useTranslation();
  const selectedPortfolio = useAppSelector((s) => s.portfolio.selected);
  const { data: insights = [] } = useGetInsightsQuery(selectedPortfolio?.id ?? "", {
    skip: !selectedPortfolio,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("advisor.title")}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your AI-powered financial advisor. Ask anything about markets, portfolios, or
          investment strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChatInterface />
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {t("advisor.insights")}
          </h2>
          {insights.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select a portfolio to see AI insights.
            </p>
          ) : (
            insights.map((insight) => (
              <AIInsightCard key={insight.id} insight={insight} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
