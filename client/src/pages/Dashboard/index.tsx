import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store";
import { useGetPortfoliosQuery } from "@/store/api/portfolioApi";
import Card from "@/components/ui/Card";
import { TrendingUp, DollarSign, Activity, PieChart } from "lucide-react";
import { PortfolioLineChart } from "@/components/charts/LineChart";

export default function Dashboard() {
  const { t } = useTranslation();
  const user = useAppSelector((s) => s.auth.user);
  const { data: portfolios = [] } = useGetPortfoliosQuery();

  const totalValue = portfolios.reduce((sum, p) => sum + (p.totalValue ?? 0), 0);

  const stats = [
    {
      label: t("dashboard.totalValue"),
      value: `$${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      label: t("dashboard.dayChange"),
      value: "+2.34%",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Active Portfolios",
      value: String(portfolios.length),
      icon: PieChart,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      label: "AI Insights",
      value: "12",
      icon: Activity,
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("dashboard.welcomeBack", { name: user?.name ?? "User" })}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Here's what's happening with your finances today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-4">
              <div className={`rounded-xl p-3 ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-white">
          Portfolio Performance
        </h2>
        <PortfolioLineChart />
      </Card>
    </div>
  );
}
