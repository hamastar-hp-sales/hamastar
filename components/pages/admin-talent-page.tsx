"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supervisors, officialStats } from "@/lib/mock-data"
import { Search, FileUser, AlertTriangle, Clock, CheckCircle2, XCircle, Mail, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminTalentPage() {
  const [search, setSearch] = React.useState("")
  const [filterType, setFilterType] = React.useState("all")

  const today = new Date()
  const processedData = supervisors.map(s => {
    const expiryDate = new Date(s.certExpiryDate || "2099-12-31")
    const diffDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    let alertStatus = "normal"
    if (diffDays < 0) alertStatus = "expired"
    else if (diffDays < 180 && s.retrainingHours < 36) alertStatus = "warning"

    return { ...s, diffDays, alertStatus }
  })

  const filtered = processedData.filter(s => {
    const matchesSearch = !search || s.name.includes(search) || s.certNo.includes(search)
    const matchesFilter = filterType === "all" || s.alertStatus === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-foreground">人才庫管理系統</h1>
          <p className="text-sm font-bold text-muted-foreground">監控 1,332 位工地負責人之履歷、回訓與機關註記</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-black bg-white"><Mail className="mr-2 h-4 w-4" /> 批次通知</Button>
          <Button variant="outline" className="font-black bg-white"><Download className="mr-2 h-4 w-4" /> 匯出名冊</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card><CardContent className="pt-6"><p className="text-xs font-black text-muted-foreground uppercase">人才總數</p><p className="text-3xl font-black">{officialStats.total.toLocaleString()}</p></CardContent></Card>
        <Card className="border-l-4 border-l-destructive bg-destructive/5"><CardContent className="pt-6"><p className="text-xs font-black text-destructive uppercase flex items-center gap-1"><XCircle className="h-3 w-3" /> 已過期</p><p className="text-3xl font-black text-destructive">100</p></CardContent></Card>
        <Card className="border-l-4 border-l-warning bg-warning/5"><CardContent className="pt-6"><p className="text-xs font-black text-warning uppercase flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> 需回訓</p><p className="text-3xl font-black text-warning">82</p></CardContent></Card>
        <Card className="border-l-4 border-l-success bg-success/5"><CardContent className="pt-6"><p className="text-xs font-black text-success uppercase flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> 狀態正常</p><p className="text-3xl font-black text-success">1150</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
               <CardTitle className="text-lg font-black">工地負責人清冊</CardTitle>
               <div className="flex items-center rounded-lg border bg-muted/50 p-1">
                  <button onClick={() => setFilterType("all")} className={cn("px-3 py-1 text-xs font-bold rounded", filterType === "all" ? "bg-white shadow-sm" : "text-muted-foreground")}>全部</button>
                  <button onClick={() => setFilterType("warning")} className={cn("px-3 py-1 text-xs font-bold rounded", filterType === "warning" ? "bg-warning text-white shadow-sm" : "text-muted-foreground")}>需回訓</button>
                  <button onClick={() => setFilterType("expired")} className={cn("px-3 py-1 text-xs font-bold rounded", filterType === "expired" ? "bg-destructive text-white shadow-sm" : "text-muted-foreground")}>已過期</button>
               </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
               <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="搜尋姓名或證書字號..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 font-bold bg-white" />
               </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-black">姓名</TableHead>
                <TableHead className="font-black">證書字號</TableHead>
                <TableHead className="font-black text-center">總年資</TableHead>
                <TableHead className="font-black text-center">回訓進度</TableHead>
                <TableHead className="font-black text-center">效期狀態</TableHead>
                <TableHead className="text-center font-black">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((sup) => (
                <TableRow key={sup.id} className="hover:bg-muted/30">
                  <TableCell className="font-black text-primary text-base">{sup.name}</TableCell>
                  <TableCell className="text-sm font-mono font-bold">{sup.certNo}</TableCell>
                  <TableCell className="text-center font-black">{sup.yearsOfExperience} 年</TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-bold">{sup.retrainingHours}/36h</span>
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden border">
                        <div className={cn("h-full", sup.retrainingHours >= 36 ? "bg-success" : "bg-warning")} style={{ width: `${Math.min((sup.retrainingHours / 36) * 100, 100)}%` }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={sup.alertStatus === "expired" ? "已過期" : sup.alertStatus === "warning" ? "回訓中" : "有效"} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Link href={`/admin/talent/${sup.id}`}>
                      <Button size="sm" variant="outline" className="h-8 font-black">
                        <FileUser className="mr-1.5 h-3.5 w-3.5" />管理
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "有效": "bg-success text-white",
    "回訓中": "bg-warning text-warning-foreground",
    "已過期": "bg-destructive text-white",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-[11px] font-black ${styles[status] || "bg-muted"}`}>
      {status}
    </span>
  )
}