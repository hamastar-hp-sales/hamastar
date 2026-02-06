"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { officialStats } from "@/lib/mock-data"
import { Users, Award, TrendingUp, History } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

export function StatsSection() {
  return (
    <section className="mt-0 flex flex-col gap-6">
      {/* Main Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-3">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex items-center gap-4 py-3 px-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card/20 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm opacity-90 font-bold mb-0.5">工地負責人總數</p>
              <p className="text-2xl font-black leading-tight">{officialStats.total.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-3 px-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-bold mb-0.5">已取得證書</p>
              <p className="text-2xl font-black text-foreground leading-tight">{officialStats.withCert.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-3 px-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning shrink-0">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-bold mb-0.5">培訓/待核發</p>
              <p className="text-2xl font-black text-foreground leading-tight">{officialStats.pending.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-3 px-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10 text-info shrink-0">
              <History className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-bold mb-0.5">年度成長率</p>
              <p className="text-2xl font-black text-foreground leading-tight">+12.5%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Yearly Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-black">歷年工地負責人分佈 (民國 107~115 年)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={officialStats.yearlyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 13, fontWeight: 700, fill: "hsl(var(--foreground))" }} 
                    axisLine={false}
                    tickLine={false}
                    label={{ value: '年度', position: 'insideBottomRight', offset: -5, fontSize: 12, fontWeight: 700 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fontWeight: 700, fill: "hsl(var(--foreground))" }} 
                    axisLine={false}
                    tickLine={false}
                    label={{ value: '人數', angle: -90, position: 'insideLeft', fontSize: 12, fontWeight: 700 }}
                  />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 700
                    }}
                  />
                  <Bar dataKey="count" name="新增人數" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Experience & Status Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-black">證照與年資分佈</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
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
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 700 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">從業年資分佈統計</p>
              <div className="space-y-3">
                {officialStats.experienceDistribution.map((item) => (
                  <div key={item.range} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm font-black">
                      <span>{item.range}</span>
                      <span className="text-primary">{item.count} 人</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${(item.count / officialStats.total) * 100}%`,
                          backgroundColor: item.fill
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}