import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { Holding } from "@/types/portfolio";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6"];

interface AllocationPieChartProps {
  holdings: Holding[];
}

export function AllocationPieChart({ holdings }: AllocationPieChartProps) {
  if (holdings.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-gray-400">
        No holdings data
      </div>
    );
  }

  const data = holdings.map((h) => ({
    name: h.symbol,
    value: h.currentValue,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(v: number) => [`$${v.toLocaleString()}`, "Value"]}
          contentStyle={{ borderRadius: "0.75rem" }}
        />
        <Legend iconType="circle" iconSize={8} />
      </PieChart>
    </ResponsiveContainer>
  );
}
