"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supervisors } from "@/lib/mock-data"
import { Search, Eye, Download, Filter, RotateCcw, Fingerprint, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function TalentSearchPage() {
  const [search, setSearch] = React.useState("")
  const [idNumber, setIdNumber] = React.useState("")
  const [experience, setExperience] = React.useState("all")
  const [heritageType, setHeritageType] = React.useState("all")
  const [workItem, setWorkItem] = React.useState("all")
  const [isFilterOpen, setIsFilterOpen] = React.useState(true)

  const heritageTypes = ["國定古蹟", "直轄市定古蹟", "縣(市)定古蹟", "歷史建築", "紀念建築"]
  const workItems = ["木作", "泥作", "瓦作", "石作", "彩繪", "油漆", "剪黏", "交趾陶"]

  const filtered = supervisors.filter((s) => {
    if (search && !s.name.includes(search) && !s.certNo.includes(search)) return false
    if (idNumber && s.idNumber && !s.idNumber.toLowerCase().includes(idNumber.toLowerCase())) return false
    if (experience !== "all") {
      const years = s.yearsOfExperience
      if (experience === "5" && years > 5) return false
      if (experience === "5-10" && (years < 5 || years > 10)) return false
      if (experience === "10-20" && (years < 10 || years > 20)) return false
      if (experience === "20" && years < 20) return false
    }
    if (heritageType !== "all" && !s.projects.some(p => p.heritageType === heritageType)) return false
    if (workItem !== "all" && !s.workItems.includes(workItem)) return false
    return true
  })

  const resetFilters = () => {
    setSearch("")
    setIdNumber("")
    setExperience("all")
    setHeritageType("all")
    setWorkItem("all")
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-black text-foreground">工地負責人資歷查詢系統</h1>
            <p className="text-sm font-bold text-muted-foreground">提供營造廠及機關進行開標前/開工前之專長與執業狀態審查</p>
          </div>
          <Button variant="outline" size="sm" className="font-black bg-white border-primary text-primary hover:bg-primary hover:text-white">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            匯出篩選名冊 (CSV)
          </Button>
        </div>

        <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base font-black">
                  <Filter className="h-4 w-4" />
                  條件篩選 (資歷與實績)
                </CardTitle>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-black">姓名 / 證書字號</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="關鍵字搜尋..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-card font-bold" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-black">身分證字號 (精確查詢)</Label>
                    <div className="relative">
                      <Fingerprint className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="輸入身分證字號..." value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="pl-9 bg-card font-bold" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-black">曾修復文資類型</Label>
                    <Select value={heritageType} onValueChange={setHeritageType}>
                      <SelectTrigger className="bg-card font-bold">
                        <SelectValue placeholder="全部類別" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">不限類別</SelectItem>
                        {heritageTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-black">總修復年資</Label>
                    <Select value={experience} onValueChange={setExperience}>
                      <SelectTrigger className="bg-card font-bold">
                        <SelectValue placeholder="選擇年資" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部</SelectItem>
                        <SelectItem value="5">5 年以下</SelectItem>
                        <SelectItem value="5-10">5 - 10 年</SelectItem>
                        <SelectItem value="10-20">10 - 20 年</SelectItem>
                        <SelectItem value="20">20 年以上</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-black">工項專長</Label>
                    <Select value={workItem} onValueChange={setWorkItem}>
                      <SelectTrigger className="bg-card font-bold">
                        <SelectValue placeholder="全部工項" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部</SelectItem>
                        {workItems.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs font-black text-muted-foreground hover:text-primary">
                    <RotateCcw className="mr-1.5 h-3 w-3" />
                    重設所有條件
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Card>
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-black">查詢結果</CardTitle>
              <span className="text-xs font-black text-muted-foreground">共找到 {filtered.length} 位人員</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-black w-24 text-sm">姓名</TableHead>
                  <TableHead className="font-black text-sm">證書字號</TableHead>
                  <TableHead className="font-black text-sm">核心實績 (曾修復類型)</TableHead>
                  <TableHead className="text-center font-black text-sm">總年資</TableHead>
                  <TableHead className="font-black text-sm">專長工項</TableHead>
                  <TableHead className="text-center font-black text-sm">效期狀態</TableHead>
                  <TableHead className="text-center font-black text-sm">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground font-bold text-sm">
                      找不到符合篩選條件的人員
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((sup) => {
                    return (
                      <TableRow key={sup.id} className="hover:bg-muted/30">
                        <TableCell className="font-black text-primary underline underline-offset-4 cursor-pointer whitespace-nowrap text-sm">
                          <Link href={`/talent-search/${sup.id}`}>{sup.name}</Link>
                        </TableCell>
                        <TableCell className="font-mono font-bold text-muted-foreground text-sm">
                          {sup.certNo}
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="flex flex-wrap gap-1">
                             {Array.from(new Set(sup.projects.map(p => p.heritageType))).slice(0, 2).map(type => (
                               <Badge key={type} variant="outline" className="text-xs font-bold border-primary/30 text-primary bg-primary/5">
                                 {type}
                               </Badge>
                             ))}
                             {sup.projects.length > 2 && <span className="text-xs font-bold text-muted-foreground">+{sup.projects.length - 2}</span>}
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-black text-sm">
                          {sup.yearsOfExperience}年
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="flex flex-wrap gap-1">
                            {sup.workItems.map(item => (
                              <span key={item} className="font-bold text-foreground">#{item}</span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <StatusBadge status={sup.status} />
                        </TableCell>
                        <TableCell className="text-center">
                          <Link href={`/talent-search/${sup.id}`}>
                            <Button size="sm" variant="ghost" className="h-8 font-black text-xs text-primary">
                              <Eye className="mr-1.5 h-3.5 w-3.5" />
                              資歷預覽
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "有效") {
    return (
      <Badge className="bg-success text-white font-black text-xs gap-1 px-2">
        <CheckCircle2 className="h-3 w-3" /> 有效
      </Badge>
    )
  }
  if (status === "回訓中") {
    return (
      <Badge className="bg-warning text-warning-foreground font-black text-xs gap-1 px-2">
        <AlertCircle className="h-3 w-3" /> 待回訓
      </Badge>
    )
  }
  return (
    <Badge variant="destructive" className="font-black text-xs gap-1 px-2">
      <XCircle className="h-3 w-3" /> 已過期
    </Badge>
  )
}