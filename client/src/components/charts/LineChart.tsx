import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { month: "Jan", value: 42000 },
  { month: "Feb", value: 44500 },
  { month: "Mar", value: 43200 },
  { month: "Apr", value: 47800 },
  { month: "May", value: 50100 },
  { month: "Jun", value: 49300 },
  { month: "Jul", value: 53400 },
  { month: "Aug", value: 55700 },
  { month: "Sep", value: 54200 },
  { month: "Oct", value: 58900 },
  { month: "Nov", value: 61200 },
  { month: "Dec", value: 63500 },
];

interface PortfolioLineChartProps {
  data?: { month: string; value: number }[];
}

export function PortfolioLineChart({ data = mockData }: PortfolioLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-gray-500" />
        <YAxis
          tick={{ fontSize: 12 }}
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(v: number) => [`$${v.toLocaleString()}`, "Portfolio Value"]}
          contentStyle={{
            borderRadius: "0.75rem",
            border: "1px solid #e5e7eb",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#6366f1"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
