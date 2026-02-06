"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supervisors } from "@/lib/mock-data"
import { ArrowLeft, Award, Clock, Briefcase, Plus, Save, ShieldAlert, Trophy, User, Upload, CheckCircle2, AlertTriangle, FileText, Mail, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function AdminTalentDetailPage({ id }: { id: string }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState("basic")
  const [newRemark, setNewRemark] = React.useState({ type: "警告", content: "" })
  
  const selectedSup = supervisors.find(s => s.id === id) || supervisors[0]

  const handleAddRemark = () => {
    if (!newRemark.content) return toast.error("請輸入註記內容")
    toast.success(`已成功新增一筆 ${newRemark.type} 註記`)
    setNewRemark({ type: "警告", content: "" })
  }

  const handleSave = () => {
    toast.success("資料已成功儲存並同步至人才資料庫")
    router.push("/admin/talent")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header / Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-10 w-10">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-foreground">管理工地負責人資歷</h1>
            <p className="text-sm font-bold text-muted-foreground flex items-center gap-2">
              系統編號：{selectedSup.id} <span className="opacity-30">|</span> 最後更新：2026-02-01
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="font-black bg-white"><Mail className="mr-2 h-4 w-4" /> 發送通知</Button>
          <Button variant="outline" className="font-black bg-white"><Download className="mr-2 h-4 w-4" /> 匯出個人履歷</Button>
          <Button className="font-black px-8 shadow-lg" onClick={handleSave}>
            <Save className="mr-2 h-4.5 w-4.5" /> 儲存所有變更
          </Button>
        </div>
      </div>

      {/* Profile Summary Hero */}
      <Card className="border-none bg-primary text-primary-foreground overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="h-28 w-28 rounded-full bg-white/20 flex items-center justify-center text-4xl font-black border-4 border-white/30 shadow-2xl shrink-0">
              {selectedSup.name[0]}
            </div>
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <h2 className="text-4xl font-black tracking-tight">{selectedSup.name}</h2>
                <Badge className="bg-white text-primary font-black px-4 py-1 text-base shadow-sm">
                  總年資：{selectedSup.yearsOfExperience} 年
                </Badge>
              </div>
              <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-2 text-primary-foreground/90 font-bold">
                 <div className="flex items-center gap-2"><Award className="h-5 w-5" /> 證號：{selectedSup.certNo}</div>
                 <div className="flex items-center gap-2"><Clock className="h-5 w-5" /> 效期：{selectedSup.certDate} ~ {selectedSup.certExpiryDate}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-muted p-1 h-14 w-full justify-start gap-2 border-b-0 rounded-b-none mb-0">
          <TabsTrigger value="basic" className="px-8 font-black text-base h-12">基本資料</TabsTrigger>
          <TabsTrigger value="experience" className="px-8 font-black text-base h-12">工作經歷</TabsTrigger>
          <TabsTrigger value="certificates" className="px-8 font-black text-base h-12">證照與回訓</TabsTrigger>
          <TabsTrigger value="remarks" className="px-8 font-black text-base h-12 text-destructive data-[state=active]:text-destructive">機關註記</TabsTrigger>
        </TabsList>

        <div className="bg-card border rounded-b-xl border-t-0 p-8 shadow-sm min-h-[500px]">
          <TabsContent value="basic" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               <div className="space-y-2">
                  <Label className="font-black text-muted-foreground uppercase tracking-widest text-xs">姓名</Label>
                  <p className="text-xl font-black">{selectedSup.name}</p>
               </div>
               <div className="space-y-2">
                  <Label className="font-black text-muted-foreground uppercase tracking-widest text-xs">身分證字號</Label>
                  <p className="text-xl font-black">{selectedSup.idNumber}</p>
               </div>
               <div className="space-y-2">
                  <Label className="font-black text-muted-foreground uppercase tracking-widest text-xs">出生日期</Label>
                  <p className="text-xl font-black">{selectedSup.birthDate || "---"}</p>
               </div>
               <div className="space-y-2 lg:col-span-2">
                  <Label className="font-black text-muted-foreground uppercase tracking-widest text-xs">最高學歷</Label>
                  <p className="text-xl font-black text-primary">{selectedSup.education || "---"}</p>
               </div>
               <div className="space-y-2">
                  <Label className="font-black text-muted-foreground uppercase tracking-widest text-xs">聯絡電話</Label>
                  <Input defaultValue={selectedSup.phone || "0912-345-678"} className="font-bold text-lg h-12" />
               </div>
               <div className="space-y-2 lg:col-span-2">
                  <Label className="font-black text-muted-foreground uppercase tracking-widest text-xs">電子信箱</Label>
                  <Input defaultValue={selectedSup.email || "user@example.com"} className="font-bold text-lg h-12" />
               </div>
               <div className="space-y-2 lg:col-span-3">
                  <Label className="font-black text-muted-foreground uppercase tracking-widest text-xs">通訊地址</Label>
                  <Input defaultValue="台北市大安區新生南路三段..." className="font-bold text-lg h-12" />
               </div>
            </div>
          </TabsContent>

          <TabsContent value="experience" className="mt-0 space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-black flex items-center gap-2 text-primary"><Briefcase className="h-6 w-6" /> 修復工程履歷清單</h3>
               <Button className="font-black"><Plus className="mr-2 h-4 w-4" /> 補錄修復經歷</Button>
            </div>
            <Table className="border rounded-lg">
               <TableHeader className="bg-muted/50">
                  <TableRow>
                     <TableHead className="font-black text-base py-4">工程名稱</TableHead>
                     <TableHead className="font-black text-base">文資類型</TableHead>
                     <TableHead className="font-black text-base">擔任職務</TableHead>
                     <TableHead className="font-black text-base">參與期間</TableHead>
                     <TableHead className="font-black text-base text-center">狀態</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {selectedSup.projects?.map((p: any, i: number) => (
                    <TableRow key={i} className="hover:bg-muted/20">
                       <TableCell className="font-black text-lg py-5">{p.projectName}</TableCell>
                       <TableCell><Badge variant="outline" className="font-bold px-3 py-1">{p.heritageType}</Badge></TableCell>
                       <TableCell className="font-bold text-base">{p.role || "工地負責人"}</TableCell>
                       <TableCell className="font-mono font-bold text-muted-foreground">{p.period || "---"}</TableCell>
                       <TableCell className="text-center">
                          <Badge className={cn("font-black px-3 py-1", p.status === "進行中" ? "bg-success text-white shadow-sm" : "bg-muted")}>
                             {p.status}
                          </Badge>
                       </TableCell>
                    </TableRow>
                  ))}
               </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="certificates" className="mt-0 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               {/* Cert Progress */}
               <div className="space-y-6">
                  <div className="flex justify-between items-end">
                     <h4 className="text-xl font-black">回訓教育累積 (36 小時制)</h4>
                     <span className="text-3xl font-black text-primary">{selectedSup.retrainingHours} <span className="text-sm text-muted-foreground font-bold">/ 36h</span></span>
                  </div>
                  <div className="h-6 w-full rounded-full bg-muted overflow-hidden border shadow-inner">
                     <div className="h-full bg-success transition-all duration-1000 flex items-center justify-end pr-4 text-white font-black text-xs" style={{ width: `${Math.min((selectedSup.retrainingHours / 36) * 100, 100)}%` }}>
                        {Math.round((selectedSup.retrainingHours / 36) * 100)}%
                     </div>
                  </div>
                  <div className="rounded-xl border border-dashed border-primary/30 p-6 bg-primary/5">
                     <p className="text-sm font-bold text-primary leading-relaxed">
                       ※ 系統提醒：該員證書效期尚有半年以上。目前累積時數已達 {selectedSup.retrainingHours} 小時，建議於效期結束前補足剩餘時數。
                     </p>
                  </div>
               </div>

               {/* Other Certs */}
               <div className="space-y-4">
                  <h4 className="text-sm font-black text-muted-foreground uppercase tracking-widest">其他專業證照明細</h4>
                  <div className="grid grid-cols-1 gap-3">
                     {selectedSup.secondaryCerts?.map((sc: any, i: number) => (
                       <div key={i} className="flex items-center gap-4 p-4 rounded-xl border bg-white shadow-sm">
                          <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary"><Award className="h-6 w-6" /></div>
                          <div>
                            <p className="text-base font-black">{sc.name}</p>
                            <p className="text-xs font-mono font-bold text-muted-foreground mt-0.5">證號：{sc.id}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-xl font-black flex items-center gap-2"><Clock className="h-6 w-6 text-primary" /> 近期回訓課程核備紀錄</h4>
               <Table className="border rounded-lg">
                  <TableHeader className="bg-muted/50"><TableRow><TableHead className="font-black text-base">回訓項目名稱</TableHead><TableHead className="font-black text-base">課程類型</TableHead><TableHead className="font-black text-base text-center">核定時數</TableHead><TableHead className="font-black text-base text-center">審核狀態</TableHead></TableRow></TableHeader>
                  <TableBody>
                     {selectedSup.retrainingLogs?.map((log: any, i: number) => (
                       <TableRow key={i}>
                          <TableCell className="font-bold text-base py-4">{log.name}</TableCell>
                          <TableCell><Badge variant="secondary" className="font-bold">{log.type}</Badge></TableCell>
                          <TableCell className="text-center font-black text-primary text-lg">{log.hours}h</TableCell>
                          <TableCell className="text-center"><Badge variant="outline" className="bg-success/10 text-success border-success/30 font-black px-3 py-1">{log.status}</Badge></TableCell>
                       </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
          </TabsContent>

          <TabsContent value="remarks" className="mt-0 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               {/* Left: History */}
               <div className="space-y-6">
                  <h4 className="text-xl font-black flex items-center gap-2 text-destructive"><ShieldAlert className="h-6 w-6" /> 歷史行政處分與獎勵註記</h4>
                  <div className="space-y-4">
                    {selectedSup.officialRemarks?.map((rem: any, i: number) => (
                       <div key={i} className={cn("relative rounded-xl border p-6 pl-16 shadow-sm", rem.type === "獎勵" ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20")}>
                          <div className="absolute left-6 top-7">{rem.type === "獎勵" ? <Trophy className="h-7 w-7 text-success" /> : <ShieldAlert className="h-7 w-7 text-destructive" />}</div>
                          <div className="flex items-center justify-between mb-3">
                             <Badge className={cn("font-black px-3 py-1", rem.type === "獎勵" ? "bg-success" : "bg-destructive")}>{rem.type}</Badge>
                             <span className="text-sm font-bold text-muted-foreground">{rem.date}</span>
                          </div>
                          <p className="text-base font-bold text-foreground leading-relaxed">{rem.content}</p>
                       </div>
                    ))}
                    {(!selectedSup.officialRemarks || selectedSup.officialRemarks.length === 0) && (
                      <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-xl text-muted-foreground font-bold">
                        目前尚無任何註記紀錄
                      </div>
                    )}
                  </div>
               </div>

               {/* Right: Add New */}
               <div className="space-y-6">
                  <div className="rounded-2xl border bg-muted/30 p-8 space-y-6 shadow-inner">
                     <h5 className="text-lg font-black uppercase tracking-tight text-foreground flex items-center gap-2"><Plus className="h-5 w-5 text-primary" /> 發布新官方註記</h5>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <Label className="font-black">註記類別</Label>
                           <Select value={newRemark.type} onValueChange={(v) => setNewRemark(prev => ({ ...prev, type: v }))}>
                              <SelectTrigger className="font-bold bg-white h-12 text-base"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="獎勵">曾獲獎勵</SelectItem>
                                 <SelectItem value="回訓">回訓提醒</SelectItem>
                                 <SelectItem value="警告">行政警告</SelectItem>
                                 <SelectItem value="停止執行業務">停止執行業務</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2">
                           <Label className="font-black">公告日期</Label>
                           <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="font-bold bg-white h-12 text-base" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label className="font-black">註記詳細說明 (含文號)</Label>
                        <Textarea placeholder="請輸入詳細說明與相關機關文號..." className="font-bold text-base bg-white min-h-[150px] leading-relaxed" value={newRemark.content} onChange={(e) => setNewRemark(prev => ({ ...prev, content: e.target.value }))} />
                     </div>
                     <Button className="w-full font-black bg-destructive hover:bg-destructive/90 py-8 text-xl shadow-lg" onClick={handleAddRemark}>
                        <ShieldAlert className="mr-2 h-6 w-6" /> 確認發布行政註記
                     </Button>
                  </div>
               </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}