import { TrendingUp, TrendingDown, AlertTriangle, Info } from "lucide-react";
import type { AIInsight } from "@/types/ai";
import { clsx } from "clsx";

const icons = {
  positive: TrendingUp,
  negative: TrendingDown,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  positive: "text-green-600 bg-green-50 dark:bg-green-900/20",
  negative: "text-red-600 bg-red-50 dark:bg-red-900/20",
  warning: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
  info: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
};

interface AIInsightCardProps {
  insight: AIInsight;
}

export default function AIInsightCard({ insight }: AIInsightCardProps) {
  const Icon = icons[insight.type];
  const colorClass = colors[insight.type];

  return (
    <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <div className="flex items-start gap-3">
        <div className={clsx("rounded-lg p-2 flex-shrink-0", colorClass)}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {insight.title}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {insight.description}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {new Date(insight.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
