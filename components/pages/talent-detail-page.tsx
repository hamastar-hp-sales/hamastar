"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supervisors } from "@/lib/mock-data"
import { ArrowLeft, Award, Clock, Briefcase, User, CheckCircle2, AlertTriangle, XCircle, Download, FileText, Printer } from "lucide-react"
import { cn } from "@/lib/utils"

export function TalentDetailPage({ id }: { id: string }) {
  const router = useRouter()
  const selectedSup = supervisors.find(s => s.id === id) || supervisors[0]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-6">
      <div className="mb-6 flex items-center justify-between no-print">
        <Button variant="ghost" onClick={() => router.back()} className="font-bold -ml-2 text-muted-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回查詢列表
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="font-black" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> 列印資歷表
          </Button>
          <Button className="font-black bg-primary">
            <Download className="mr-2 h-4 w-4" /> 匯出 PDF
          </Button>
        </div>
      </div>

      {/* 履歷表主體 */}
      <div className="bg-white border-2 border-primary/20 shadow-sm rounded-lg overflow-hidden">
        {/* 履歷表標頭 */}
        <div className="bg-muted/30 border-b-2 border-primary/10 p-8 text-center">
          <h1 className="text-2xl font-black text-foreground tracking-widest uppercase">古蹟修復工程工地負責人個人資歷表</h1>
          <p className="text-sm font-bold text-muted-foreground mt-2">系統產製日期：2026-02-06</p>
        </div>

        <div className="p-8 space-y-10">
          
          {/* 一、基本資料與證照狀態 */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-l-4 border-primary pl-3">
              <h2 className="text-lg font-black text-foreground">一、基本資料與執業狀態</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 border rounded-md overflow-hidden">
              <div className="bg-muted/50 p-3 border-r border-b font-black text-sm">姓名</div>
              <div className="p-3 border-b font-bold text-sm">{selectedSup.name}</div>
              <div className="bg-muted/50 p-3 border-r border-b font-black text-sm">總修復年資</div>
              <div className="p-3 border-b font-bold text-sm text-primary">{selectedSup.yearsOfExperience} 年</div>
              
              <div className="bg-muted/50 p-3 border-r border-b font-black text-sm">核心證書字號</div>
              <div className="p-3 border-b font-mono font-bold text-sm md:col-span-3 text-foreground/80">
                {selectedSup.certNo}
              </div>

              <div className="bg-muted/50 p-3 border-r border-b font-black text-sm">證書效期</div>
              <div className="p-3 border-b font-bold text-sm md:col-span-1">
                {selectedSup.certExpiryDate}
              </div>
              <div className="bg-muted/50 p-3 border-r border-b font-black text-sm">目前狀態</div>
              <div className="p-3 border-b md:col-span-1">
                <StatusBadge status={selectedSup.status} />
              </div>

              <div className="bg-muted/50 p-3 border-r font-black text-sm">最高學歷</div>
              <div className="p-3 font-bold text-sm md:col-span-3">{selectedSup.education}</div>
            </div>
          </section>

          {/* 二、核定專長工項 */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-l-4 border-primary pl-3">
              <h2 className="text-lg font-black text-foreground">二、核定專長工項</h2>
            </div>
            <div className="p-4 border rounded-md bg-primary/5 flex flex-wrap gap-2">
              {selectedSup.workItems.map(item => (
                <Badge key={item} variant="outline" className="bg-white text-primary border-primary/30 font-black px-4 py-1.5 text-sm">
                  {item}
                </Badge>
              ))}
            </div>
          </section>

          {/* 三、古蹟修復工程參與實績 */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-l-4 border-primary pl-3">
              <h2 className="text-lg font-black text-foreground">三、古蹟修復工程參與實績</h2>
            </div>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-black text-foreground">工程名稱</TableHead>
                    <TableHead className="font-black text-foreground">文資類型</TableHead>
                    <TableHead className="font-black text-foreground">擔任職務</TableHead>
                    <TableHead className="font-black text-foreground">參與期間</TableHead>
                    <TableHead className="text-center font-black text-foreground">工程狀態</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSup.projects?.map((p: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell className="font-black py-4 text-sm">{p.projectName}</TableCell>
                      <TableCell><Badge variant="outline" className="font-bold text-xs">{p.heritageType}</Badge></TableCell>
                      <TableCell className="font-bold text-sm">{p.role || "工地負責人"}</TableCell>
                      <TableCell className="font-mono text-xs font-bold text-muted-foreground">{p.period || "---"}</TableCell>
                      <TableCell className="text-center">
                        <span className={cn("text-[11px] font-black", p.status === "進行中" ? "text-success" : "text-muted-foreground")}>
                          {p.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* 四、其它相關專業證照 */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-l-4 border-primary pl-3">
              <h2 className="text-lg font-black text-foreground">四、其它相關專業證照</h2>
            </div>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-black text-foreground">證照名稱</TableHead>
                    <TableHead className="font-black text-foreground">核發單位/證號</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSup.secondaryCerts?.map((sc: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell className="font-bold text-sm py-4">{sc.name}</TableCell>
                      <TableCell className="font-mono text-xs font-bold text-muted-foreground">{sc.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* 聲明註記 */}
          <div className="mt-12 pt-6 border-t border-dashed border-muted-foreground/30">
            <p className="text-[11px] font-bold text-muted-foreground italic leading-relaxed">
              ※ 本資歷表內容由「文化部文化資產局 - 古蹟修復工程工地負責人資料管理系統」自動產製，內容包含學員申報及主管機關核定之最新實績。
              <br />
              ※ 查詢人應遵守個人資料保護法相關規定，僅得於採購、審標或工程管理之合法目的範圍內使用。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "有效") {
    return (
      <Badge className="bg-success text-white font-black text-xs gap-1">
        <CheckCircle2 className="h-3 w-3" /> 證書有效
      </Badge>
    )
  }
  if (status === "回訓中") {
    return (
      <Badge className="bg-warning text-warning-foreground font-black text-xs gap-1">
        <AlertCircle className="h-3 w-3" /> 需補足回訓時數
      </Badge>
    )
  }
  return (
    <Badge variant="destructive" className="font-black text-xs gap-1">
      <XCircle className="h-3 w-3" /> 證書已逾期
    </Badge>
  )
}