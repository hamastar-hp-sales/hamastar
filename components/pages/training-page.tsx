"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { trainingClasses } from "@/lib/mock-data"
import { Search, GraduationCap, MapPin, Calendar, Users, Info, DollarSign, FileText } from "lucide-react"
import * as React from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "報名中": "bg-success text-success-foreground",
    "即將開放": "bg-info text-info-foreground",
    "審查中": "bg-warning text-warning-foreground",
    "進行中": "bg-primary text-primary-foreground",
    "已結束": "bg-muted text-muted-foreground",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${styles[status] || "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  )
}

export function TrainingPage() {
  const [filter, setFilter] = React.useState("all")
  const [search, setSearch] = React.useState("")
  const [selectedClass, setSelectedClass] = React.useState<any>(null)
  const [showDetail, setShowDetail] = React.useState(false)

  const filtered = trainingClasses.filter((cls) => {
    if (filter !== "all" && cls.status !== filter) return false
    if (search && !cls.name.includes(search) && !cls.id.includes(search) && !cls.location.includes(search)) return false
    return true
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">培訓班線上報名</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{trainingClasses.length}</p>
                <p className="text-xs text-muted-foreground">培訓班總數</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{trainingClasses.filter(c => c.status === "報名中").length}</p>
                <p className="text-xs text-muted-foreground">報名中</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10 text-info">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{trainingClasses.filter(c => c.status === "即將開放").length}</p>
                <p className="text-xs text-muted-foreground">即將開放</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{trainingClasses.reduce((a, c) => a + (c.enrolled || 0), 0)}</p>
                <p className="text-xs text-muted-foreground">總報名人數</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter & Search */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">搜尋與篩選</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="搜尋班別名稱、編號或地點..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 font-bold"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-40 font-bold">
                  <SelectValue placeholder="篩選狀態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部狀態</SelectItem>
                  <SelectItem value="報名中">報名中</SelectItem>
                  <SelectItem value="即將開放">即將開放</SelectItem>
                  <SelectItem value="進行中">進行中</SelectItem>
                  <SelectItem value="已結束">已結束</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32 font-bold">班別編號</TableHead>
                  <TableHead className="font-bold">班別名稱</TableHead>
                  <TableHead className="w-24 font-bold">地點</TableHead>
                  <TableHead className="w-28 font-bold">開課日期</TableHead>
                  <TableHead className="w-28 font-bold">結訓日期</TableHead>
                  <TableHead className="w-24 text-center font-bold">名額</TableHead>
                  <TableHead className="w-24 text-center font-bold">狀態</TableHead>
                  <TableHead className="w-24 text-center font-bold">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground font-bold">
                      無符合條件的培訓班資料
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell className="font-mono text-xs font-bold text-primary">{cls.id}</TableCell>
                      <TableCell className="font-bold">{cls.name}</TableCell>
                      <TableCell className="font-bold">{cls.location}</TableCell>
                      <TableCell className="text-xs font-bold">{cls.startDate}</TableCell>
                      <TableCell className="text-xs font-bold">{cls.endDate}</TableCell>
                      <TableCell className="text-center text-xs font-bold">{cls.enrolled}/{cls.capacity}</TableCell>
                      <TableCell className="text-center"><StatusBadge status={cls.status} /></TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs font-bold bg-transparent"
                            onClick={() => { setSelectedClass(cls); setShowDetail(true); }}
                          >
                            查看
                          </Button>
                          {cls.status === "報名中" && (
                            <Link href={`/registration?classId=${cls.id}`}>
                              <Button size="sm" className="h-7 text-xs font-bold">報名</Button>
                            </Link>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <Info className="h-6 w-6 text-primary" />
              培訓班報名資訊
            </DialogTitle>
            <DialogDescription className="font-bold text-base mt-2 text-foreground">
              {selectedClass?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col gap-1 rounded-lg border bg-muted/30 p-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" /> 培訓期間
                  </div>
                  <p className="text-sm font-black">{selectedClass?.startDate} 至 {selectedClass?.endDate}</p>
               </div>
               <div className="flex flex-col gap-1 rounded-lg border bg-muted/30 p-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> 培訓地點
                  </div>
                  <p className="text-sm font-black">{selectedClass?.location}</p>
               </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                   <FileText className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black">報名資格</p>
                  <p className="text-xs font-bold text-muted-foreground mt-1 leading-relaxed">
                    {selectedClass?.requirement || "依照文化部工地負責人培訓管理辦法辦理。"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                   <DollarSign className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black">培訓費用</p>
                  <p className="text-xs font-bold text-muted-foreground mt-1">
                    新台幣 {selectedClass?.fee || "15,000"} 元整 (含講義及行政費用)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                   <Users className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black">委辦單位</p>
                  <p className="text-xs font-bold text-muted-foreground mt-1">
                    {selectedClass?.organizer || "文化部文化資產局委託專業學術機構辦理"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 p-4">
               <p className="text-xs font-black text-primary text-center">
                 ※ 報名截止後將進行資格審查，錄取名單將於本系統另行公告。
               </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" className="font-bold" onClick={() => setShowDetail(false)}>關閉視窗</Button>
            {selectedClass?.status === "報名中" && (
              <Link href={`/registration?classId=${selectedClass?.id}`} onClick={() => setShowDetail(false)}>
                <Button className="font-black">立即報名</Button>
              </Link>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}