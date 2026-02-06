"use client"

import { officialStats } from "@/lib/mock-data"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function StatsBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={officialStats.yearlyDistribution}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--border))"
          vertical={false}
        />
        <XAxis
          dataKey="year"
          tick={{
            fontSize: 13,
            fontWeight: 700,
            fill: "hsl(var(--foreground))",
          }}
          axisLine={false}
          tickLine={false}
          label={{
            value: "年度",
            position: "insideBottomRight",
            offset: -5,
            fontSize: 12,
            fontWeight: 700,
          }}
        />
        <YAxis
          tick={{
            fontSize: 12,
            fontWeight: 700,
            fill: "hsl(var(--foreground))",
          }}
          axisLine={false}
          tickLine={false}
          label={{
            value: "人數",
            angle: -90,
            position: "insideLeft",
            fontSize: 12,
            fontWeight: 700,
          }}
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
          }}
        />
        <Bar
          dataKey="count"
          name="新增人數"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
          barSize={32}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
