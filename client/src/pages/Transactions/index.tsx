import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store";
import Card from "@/components/ui/Card";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { formatCurrency, formatDate } from "@/utils/formatters";

export default function Transactions() {
  const { t } = useTranslation();
  const { transactions, isLoading } = useAppSelector((s) => s.transaction);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t("transactions.title")}
      </h1>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                {[
                  t("transactions.date"),
                  t("transactions.description"),
                  t("transactions.category"),
                  t("transactions.amount"),
                  t("transactions.type"),
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-3 text-left font-medium text-gray-500 dark:text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    Loading…
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-3 py-3 text-gray-500">{formatDate(tx.date)}</td>
                    <td className="px-3 py-3 font-medium text-gray-900 dark:text-white">
                      {tx.description}
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs">
                        {tx.category}
                      </span>
                    </td>
                    <td
                      className={`px-3 py-3 font-medium ${
                        tx.type === "credit" ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {tx.type === "credit" ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </td>
                    <td className="px-3 py-3">
                      {tx.type === "credit" ? (
                        <ArrowUpCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownCircle className="h-4 w-4 text-red-500" />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
