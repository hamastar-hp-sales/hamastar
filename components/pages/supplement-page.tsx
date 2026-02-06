"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react"

const supplementItems = [
  { id: "SUP-001", regId: "REG-2026-003", name: "劉美珍", className: "第43期培訓班", docName: "工作經歷證明", deadline: "2026-02-15", status: "待補件" as const },
]

export function SupplementPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">補件中心</h1>
      </div>

      {supplementItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <p className="text-sm font-medium text-foreground">目前沒有待補件項目</p>
            <p className="text-xs text-muted-foreground">所有文件已完整繳交</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {supplementItems.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertCircle className="h-4.5 w-4.5 text-warning" />
                      {item.docName}
                    </CardTitle>
                    <CardDescription>
                      {item.className} | 報名編號：{item.regId}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-lg border border-dashed border-border p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">請上傳 {item.docName}</p>
                      <p className="text-xs text-muted-foreground">截止日期：{item.deadline}</p>
                    </div>
                  </div>
                  <Button size="sm">
                    <Upload className="mr-1.5 h-3.5 w-3.5" />
                    上傳文件
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}