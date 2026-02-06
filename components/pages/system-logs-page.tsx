"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { systemLogs } from "@/lib/mock-data"
import { Search, Download, Filter, Calendar, History, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

export function SystemLogsPage() {
  const [searchUser, setSearchUser] = React.useState("")
  const [startDate, setStartDate] = React.useState("")
  const [endDate, setEndDate] = React.useState("")
  const [page, setPage] = React.useState(1)
  const pageSize = 10

  // 實作篩選邏輯
  const filtered = systemLogs.filter((log) => {
    // 帳號模糊搜尋
    if (searchUser && !log.username.toLowerCase().includes(searchUser.toLowerCase())) return false
    
    // 日期解析與比對 (格式 YYYY-MM-DD)
    const logDateStr = log.loginAt.split(" ")[0]
    if (startDate && logDateStr < startDate) return false
    if (endDate && logDateStr > endDate) return false
    
    return true
  })

  // 分頁邏輯
  const totalPages = Math.ceil(filtered.length / pageSize) || 1
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  const handleReset = () => {
    setSearchUser("")
    setStartDate("")
    setEndDate("")
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">系統操作日誌</h1>
          <p className="text-sm font-bold text-muted-foreground">追蹤所有管理員與學員的登入/登出行為紀錄</p>
        </div>
        <Button variant="outline" size="sm" className="font-black bg-white border-primary text-primary hover:bg-primary hover:text-white">
          <Download className="mr-1.5 h-4 w-4" />
          匯出日誌紀錄
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-black">
            <Filter className="h-4 w-4" />
            日誌篩選條件
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label className="text-xs font-black">帳號搜尋 (Username)</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="輸入登入帳號關鍵字..."
                  value={searchUser}
                  onChange={(e) => { setSearchUser(e.target.value); setPage(1) }}
                  className="pl-9 font-bold bg-card"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-black">起始日期</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => { setStartDate(e.target.value); setPage(1) }}
                  className="pl-9 font-bold bg-card"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-black">結束日期</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => { setEndDate(e.target.value); setPage(1) }}
                  className="pl-9 font-bold bg-card"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
             <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs font-black text-muted-foreground hover:text-primary">
                <RotateCcw className="mr-1.5 h-3 w-3" />重設篩選
             </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-black flex items-center gap-2">
               <History className="h-5 w-5 text-primary" />
               登入活動流水帳
            </CardTitle>
            <span className="text-xs font-black text-muted-foreground">
               檢索結果：{filtered.length} 筆
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-black">執行帳號</TableHead>
                <TableHead className="font-black">登入時間</TableHead>
                <TableHead className="font-black">登出時間</TableHead>
                <TableHead className="font-black">來源 IP</TableHead>
                <TableHead className="text-center font-black">驗證結果</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground font-black italic">
                    找不到符合篩選條件的日誌紀錄
                  </TableCell>
                </TableRow>
              ) : (
                paged.map((log) => (
                  <TableRow key={log.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono text-sm font-bold text-primary">{log.username}</TableCell>
                    <TableCell className="text-xs font-bold">{log.loginAt}</TableCell>
                    <TableCell className="text-xs font-bold text-muted-foreground">
                       {log.logoutAt || <span className="italic opacity-50">--- (自動逾時)</span>}
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold">{log.ip}</TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                        log.result === "success" ? "bg-success text-white" : "bg-destructive text-white"
                      }`}>
                        {log.result === "success" ? "登入成功" : "驗證失敗"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4 bg-muted/10">
          <p className="text-xs font-black text-muted-foreground">
            顯示第 {(page - 1) * pageSize + 1} 至 {Math.min(page * pageSize, filtered.length)} 筆，共 {filtered.length} 筆
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 font-black bg-white"
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              上一頁
            </Button>
            <div className="flex items-center px-4 h-8 rounded border border-border bg-white text-sm font-black">
               {page} / {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 font-black bg-white"
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              下一頁
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}