"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supervisors } from "@/lib/mock-data"
import { Search, Download, SlidersHorizontal } from "lucide-react"

export function AdminSearchPage() {
  const [name, setName] = React.useState("")
  const [certNo, setCertNo] = React.useState("")
  const [status, setStatus] = React.useState("all")
  const [minYears, setMinYears] = React.useState("")

  const filtered = supervisors.filter((s) => {
    if (name && !s.name.includes(name)) return false
    if (certNo && !s.certNo.toLowerCase().includes(certNo.toLowerCase())) return false
    if (status !== "all" && s.status !== status) return false
    if (minYears && s.yearsOfExperience < Number(minYears)) return false
    return true
  })

  const handleReset = () => {
    setName("")
    setCertNo("")
    setStatus("all")
    setMinYears("")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">查詢與篩選</h1>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-1.5 h-3.5 w-3.5" />
          匯出報表
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            進階查詢條件
          </CardTitle>
          <CardDescription>可組合多條件進行精確查詢</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">姓名</Label>
              <Input placeholder="輸入姓名" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">證書字號</Label>
              <Input placeholder="輸入證書字號" value={certNo} onChange={(e) => setCertNo(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">證書狀態</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue placeholder="全部狀態" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部狀態</SelectItem>
                  <SelectItem value="有效">有效</SelectItem>
                  <SelectItem value="回訓中">回訓中</SelectItem>
                  <SelectItem value="已過期">已過期</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">最低年資</Label>
              <Input type="number" placeholder="例：5" value={minYears} onChange={(e) => setMinYears(e.target.value)} />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset}>重設條件</Button>
            <Button onClick={() => {}}>
              <Search className="mr-1.5 h-4 w-4" /> 執行查詢
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">查詢結果</CardTitle>
            <span className="text-sm text-muted-foreground">共 {filtered.length} 筆</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">姓名</TableHead>
                <TableHead className="font-bold">資格/工項</TableHead>
                <TableHead className="font-bold">證書字號</TableHead>
                <TableHead className="text-center font-bold">年資</TableHead>
                <TableHead className="text-center font-bold">回訓時數</TableHead>
                <TableHead className="text-center font-bold">狀態</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    無符合條件的資料
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((sup) => (
                  <TableRow key={sup.id}>
                    <TableCell className="font-medium">{sup.name}</TableCell>
                    <TableCell className="text-sm">{sup.qualification}</TableCell>
                    <TableCell className="font-mono text-sm">{sup.certNo}</TableCell>
                    <TableCell className="text-center text-sm">{sup.yearsOfExperience}年</TableCell>
                    <TableCell className="text-center text-sm">{sup.retrainingHours}/{sup.requiredRetrainingHours}h</TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        sup.status === "有效" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"
                      }`}>
                        {sup.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}