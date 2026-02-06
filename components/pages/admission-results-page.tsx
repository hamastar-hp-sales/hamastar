"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { trainingClasses, registrationApplications } from "@/lib/mock-data"
import { Search, UserCheck, Users, Info } from "lucide-react"

// Helper to mask name (e.g., "張瑞文" -> "張Ｏ文")
const maskName = (name: string) => {
  if (name.length <= 1) return name
  if (name.length === 2) return name[0] + "Ｏ"
  return name[0] + "Ｏ" + name.slice(2)
}

export function AdmissionResultsPage() {
  const [selectedClassId, setSelectedClassId] = React.useState("TC-2026-001")
  const [searchQuery, setSearchQuery] = React.useState("")

  // Filter applications that are "錄取" or "候補" for the selected class
  const filteredList = registrationApplications.filter(app => 
    app.classId === selectedClassId && 
    (app.status === "錄取" || app.status === "候補")
  ).filter(app => 
    !searchQuery || app.applicantName.includes(searchQuery)
  )

  const selectedClass = trainingClasses.find(c => c.id === selectedClassId)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-foreground">培訓班錄取及候補名單查詢</h1>
          <div className="h-1.5 w-24 bg-primary" />
        </div>

        {/* Search & Selection */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-foreground">選擇培訓班別</label>
                <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                  <SelectTrigger className="bg-card">
                    <SelectValue placeholder="請選擇班別" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainingClasses.filter(c => c.status !== "即將開放").map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-foreground">搜尋姓名</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="請輸入完整姓名進行查詢..." 
                    className="pl-9 bg-card"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Result Info */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="h-6 w-6 text-success" />
              <h2 className="text-xl font-black">{selectedClass?.name} - 錄取名單</h2>
            </div>
            <p className="text-sm font-bold text-muted-foreground">公告日期：2026-02-01</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Admission List (Left) */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-20 font-black">序號</TableHead>
                        <TableHead className="font-black">姓名</TableHead>
                        <TableHead className="font-black">結果</TableHead>
                        <TableHead className="font-black">備註</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-32 text-center text-muted-foreground font-bold">
                            尚未發布或無符合資料
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredList.map((app, index) => (
                          <TableRow key={app.id} className={app.applicantName === searchQuery ? "bg-primary/5" : ""}>
                            <TableCell className="font-mono text-sm">{index + 1}</TableCell>
                            <TableCell className="font-black text-base">
                              {maskName(app.applicantName)}
                              {app.applicantName === searchQuery && (
                                <Badge className="ml-2 bg-success text-white">符合查詢</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant={app.status === "錄取" ? "default" : "secondary"} 
                                     className={app.status === "錄取" ? "bg-success" : "bg-warning text-warning-foreground"}>
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground italic">
                              {app.reviewNotes || "-"}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Side Info (Right) */}
            <div className="flex flex-col gap-4">
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-black">
                    <Info className="h-5 w-5 text-primary" />
                    查詢說明
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm font-bold leading-relaxed text-muted-foreground">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>基於個人隱私保護，名單中姓名中間字以遮罩處理。</li>
                    <li>若要確認個人狀態，請使用上方搜尋框輸入「完整姓名」查詢。</li>
                    <li>錄取學員請注意後續公文或電子郵件通知，並依規定時間完成報到。</li>
                    <li>候補學員若有錄取者放棄，將依序位通知遞補。</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                   <CardTitle className="text-base font-black flex items-center gap-2">
                     <Users className="h-5 w-5 text-primary" />
                     統計摘要
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm font-bold">正取名額</span>
                    <span className="text-lg font-black text-success">40 名</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm font-bold">候補人數</span>
                    <span className="text-lg font-black text-warning">10 名</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">報到截止</span>
                    <span className="text-sm font-black text-destructive">2026-02-15</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}