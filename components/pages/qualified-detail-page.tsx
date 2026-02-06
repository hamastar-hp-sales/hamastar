"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { trainingClasses, supervisors } from "@/lib/mock-data"
import { Award, ArrowLeft, Download, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function QualifiedDetailPage({ classId }: { classId: string }) {
  const cls = trainingClasses.find(c => c.id === classId)
  
  // Mock qualified list based on supervisors data
  const qualifiedStudents = supervisors.slice(0, 32).map((s, i) => ({
    name: s.name,
    certNo: `文授資局蹟字第110300${1000 + i}-05 號`,
    date: cls?.endDate || "2025-12-30"
  }))

  if (!cls) return <div className="p-20 text-center font-bold">班別資料不存在</div>

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/qualified-list">
            <Button variant="ghost" size="sm" className="font-bold -ml-2 text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> 返回列表
            </Button>
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black text-foreground">{cls.name}</h1>
            <p className="text-lg font-bold text-success flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6" />
              合格人員名單公告
            </p>
          </div>
          <div className="h-1.5 w-24 bg-primary" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-black">合格人員清冊</CardTitle>
                  <Button variant="outline" size="sm" className="font-bold">
                    <Download className="mr-2 h-4 w-4" /> 匯出名冊
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-20 font-black">序號</TableHead>
                      <TableHead className="font-black">姓名</TableHead>
                      <TableHead className="font-black">合格證書字號</TableHead>
                      <TableHead className="font-black">核發日期</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {qualifiedStudents.map((student, index) => (
                      <TableRow key={index} className="hover:bg-muted/30">
                        <TableCell className="font-mono text-sm">{index + 1}</TableCell>
                        <TableCell className="font-black text-base">{student.name}</TableCell>
                        <TableCell className="font-mono text-xs text-primary font-bold">{student.certNo}</TableCell>
                        <TableCell className="text-sm font-bold">{student.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card className="border-success/30 bg-success/5">
              <CardHeader>
                <CardTitle className="text-base font-black flex items-center gap-2">
                  <Award className="h-5 w-5 text-success" />
                  結訓統計
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-sm font-bold">參訓人數</span>
                  <span className="text-lg font-black">{cls.enrolled} 名</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-sm font-bold">合格人數</span>
                  <span className="text-lg font-black text-success">{qualifiedStudents.length} 名</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">合格率</span>
                  <span className="text-lg font-black text-primary">
                    {((qualifiedStudents.length / cls.enrolled) * 100).toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
               <CardContent className="pt-6 text-sm font-bold text-muted-foreground leading-relaxed">
                 <p className="text-foreground mb-2">注意事項：</p>
                 <ul className="list-disc pl-4 space-y-1">
                   <li>合格人員證書將於公告後兩週內掛號寄出。</li>
                   <li>若姓名或相關資訊有誤，請儘速聯繫文化資產局。</li>
                   <li>合格人員資料將自動同步至「人才查詢」系統。</li>
                 </ul>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}