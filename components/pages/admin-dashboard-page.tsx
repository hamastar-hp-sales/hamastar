"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { dashboardStats, monthlyData, categoryData, supervisors } from "@/lib/mock-data"
import { Users, UserCheck, GraduationCap, ClipboardCheck, AlertTriangle, Award } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

function StatCard({ title, value, icon: Icon, description, color }: {
  title: string
  value: number
  icon: React.ElementType
  description?: string
  color: string
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value.toLocaleString()}</p>
          {description && <p className="text-[11px] text-muted-foreground">{description}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

export function AdminDashboardPage() {
  const activeCount = supervisors.filter(s => s.status === "有效").length
  const expiredCount = supervisors.filter(s => s.status === "已過期" || s.status === "回訓中").length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">儀表板</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="工地負責人總數" value={dashboardStats.totalSupervisors} icon={Users} color="bg-primary/10 text-primary" />
        <StatCard title="有效人員" value={dashboardStats.activeSupervisors} icon={UserCheck} color="bg-success/10 text-success" />
        <StatCard title="進行中培訓班" value={dashboardStats.trainingClasses} icon={GraduationCap} color="bg-info/10 text-info" />
        <StatCard title="待審查件數" value={dashboardStats.pendingReviews} icon={ClipboardCheck} description="含報名、經歷、回訓審查" color="bg-warning/10 text-warning" />
        <StatCard title="回訓到期提醒" value={dashboardStats.retrainingDue} icon={AlertTriangle} color="bg-destructive/10 text-destructive" />
        <StatCard title="累計核發證書" value={dashboardStats.certificatesIssued} icon={Award} color="bg-accent/20 text-accent" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">近半年培訓與核證趨勢</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="registrations" name="報名人數" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="certificates" name="核發證書" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="retraining" name="回訓完成" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">文資類型分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={{ strokeWidth: 1 }}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">人員狀態總覽</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-3xl font-bold text-success">{activeCount}</p>
              <p className="mt-1 text-xs text-muted-foreground">有效人員</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-3xl font-bold text-warning">{supervisors.filter(s => s.status === "回訓中").length}</p>
              <p className="mt-1 text-xs text-muted-foreground">回訓中</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-3xl font-bold text-destructive">{supervisors.filter(s => s.status === "已過期").length}</p>
              <p className="mt-1 text-xs text-muted-foreground">已過期</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-3xl font-bold text-primary">{supervisors.filter(s => s.projects.some(p => p.status === "進行中")).length}</p>
              <p className="mt-1 text-xs text-muted-foreground">執行中工程</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}