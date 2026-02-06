"use client"

import { officialStats } from "@/lib/mock-data"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts"

export default function StatsPieChart() {
  return (
    <ResponsiveContainer width="100%" height={176}>
      <PieChart>
        <Pie
          data={officialStats.certStatus}
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={65}
          paddingAngle={5}
          dataKey="value"
        >
          {officialStats.certStatus.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          wrapperStyle={{ fontSize: "13px", fontWeight: 700 }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
