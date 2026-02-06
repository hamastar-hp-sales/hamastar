"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { registrationApplications } from "@/lib/mock-data"
import { Search, CheckCircle2, Clock, AlertCircle, XCircle, FileCheck, UserCheck } from "lucide-react"
import * as React from "react"

const timelineSteps = [
  { label: "提交報名", icon: FileCheck, done: true, date: "2026-01-15" },
  { label: "初審", icon: Clock, done: true, date: "2026-01-18" },
  { label: "補件", icon: AlertCircle, done: false, active: true, date: null },
  { label: "複審", icon: CheckCircle2, done: false, date: null },
  { label: "錄取公告", icon: UserCheck, done: false, date: null },
]

export function ProgressPage() {
  const [searchId, setSearchId] = React.useState("")

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">報名進度查詢</h1>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="flex items-center gap-3 p-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="請輸入報名編號，例如 REG-2026-001"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button>查詢</Button>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">報名進度時間軸</CardTitle>
          <CardDescription>報名編號：REG-2026-003（劉美珍）</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-0 pl-4">
            {timelineSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.label} className="relative flex gap-4 pb-8 last:pb-0">
                  {/* Connector line */}
                  {i < timelineSteps.length - 1 && (
                    <div className={cn(
                      "absolute left-[15px] top-8 h-full w-0.5",
                      step.done ? "bg-success" : "bg-border"
                    )} />
                  )}
                  {/* Icon */}
                  <div className={cn(
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    step.done ? "bg-success text-success-foreground" :
                    step.active ? "bg-warning text-warning-foreground ring-2 ring-warning/30" :
                    "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={cn(
                        "text-sm font-semibold",
                        step.done || step.active ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {step.label}
                      </p>
                      {step.done && <Badge variant="secondary" className="text-[10px] bg-success/10 text-success">完成</Badge>}
                      {step.active && <Badge variant="secondary" className="text-[10px] bg-warning/10 text-warning">處理中</Badge>}
                    </div>
                    {step.date && <p className="text-xs text-muted-foreground">{step.date}</p>}
                    {step.active && (
                      <p className="mt-1 text-xs text-warning">待補件：工作經歷證明</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* All Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">我的報名紀錄</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-4">
          {registrationApplications.slice(0, 3).map((app) => (
            <div key={app.id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">{app.className}</p>
                <p className="text-xs text-muted-foreground">{app.id} | 申請日期：{app.appliedDate}</p>
              </div>
              <StatusBadge status={app.status} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "待審查": "bg-warning text-warning-foreground",
    "初審通過": "bg-info text-info-foreground",
    "待補件": "bg-destructive/80 text-destructive-foreground",
    "複審通過": "bg-primary text-primary-foreground",
    "錄取": "bg-success text-success-foreground",
    "候補": "bg-accent text-accent-foreground",
    "不通過": "bg-destructive text-destructive-foreground",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${styles[status] || "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  )
}