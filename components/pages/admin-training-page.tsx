"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { trainingClasses as initialClasses, registrationApplications as initialApps, supervisors } from "@/lib/mock-data"
import { Plus, Search, CheckCircle2, FileText, Megaphone, Save, Filter, CheckCircle, ClipboardCheck, Award, MapPin, DollarSign, Users, Eye, GraduationCap } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "報名中": "bg-success text-success-foreground",
    "即將開放": "bg-info text-info-foreground",
    "審查中": "bg-warning text-warning-foreground",
    "進行中": "bg-primary text-primary-foreground",
    "已結束": "bg-muted text-muted-foreground",
    "待審查": "bg-warning/20 text-warning border border-warning/30",
    "初審通過": "bg-info/20 text-info border border-info/30",
    "待補件": "bg-destructive/20 text-destructive border border-destructive/30",
    "複審通過": "bg-primary/20 text-primary border border-primary/30",
    "錄取": "bg-success text-success-foreground",
    "候補": "bg-accent text-accent-foreground",
    "不通過": "bg-muted text-muted-foreground",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black ${styles[status] || "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  )
}

export function AdminTrainingPage() {
  const [classes, setClasses] = React.useState(initialClasses)
  const [apps, setApps] = React.useState(initialApps)
  const [selectedApp, setSelectedApp] = React.useState<any>(null)
  const [showReview, setShowReview] = React.useState(false)
  const [showAddClass, setShowAddClass] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("classes")

  // Mock pending retraining declarations
  const [retrainingApps, setRetrainingApps] = React.useState([
    { id: "RET-001", name: "張瑞文", course: "文化資產數位保存技術講座", type: "專題講座", hours: 3, date: "2026-01-20", doc: "證明文件.pdf" },
    { id: "RET-002", name: "林志誠", course: "114年度木構造維護研習", type: "實務研習", hours: 8, date: "2025-11-05", doc: "研習證書.jpg" },
  ])

  // Form State for new class
  const [newClass, setNewClass] = React.useState({
    year: "114",
    region: "中區",
    startDate: "",
    endDate: "",
    location: "",
    capacity: "40",
    fee: "15,000"
  })

  // Handlers
  const handleApprove = (id: string, currentStatus: string) => {
    let nextStatus = currentStatus
    if (currentStatus === "待審查") nextStatus = "初審通過"
    else if (currentStatus === "初審通過") nextStatus = "複審通過"
    else if (currentStatus === "複審通過") nextStatus = "錄取"

    setApps(prev => prev.map(a => a.id === id ? { ...a, status: nextStatus, reviewNotes: `審核通過於 ${new Date().toLocaleDateString()}` } : a))
    setShowReview(false)
    toast.success(`申請單 ${id} 已變更為 ${nextStatus}`)
  }

  const handleRetrainingApprove = (id: string) => {
    setRetrainingApps(prev => prev.filter(a => a.id !== id))
    toast.success("回訓時數已成功核備並彙整至人才資料庫")
  }

  const handleRequestSupplement = (id: string) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: "待補件", reviewNotes: "請補齊工作經歷證明掃描檔" } : a))
    setShowReview(false)
    toast.info(`申請單 ${id} 已通知學員補件`)
  }

  const handleCreateClass = () => {
    const className = `${newClass.year} 年度「古蹟修復工程工地負責人培訓班(${newClass.region})」`
    const classId = `TC-${newClass.year}-${(classes.length + 1).toString().padStart(3, '0')}`
    
    const item = {
      id: classId,
      name: className,
      startDate: newClass.startDate || "2025-06-01",
      endDate: newClass.endDate || "2025-08-30",
      location: newClass.location || "未定",
      capacity: parseInt(newClass.capacity),
      enrolled: 0,
      status: "即將開放" as const,
      fee: newClass.fee,
      organizer: "文化部文化資產局",
      requirement: "具備營造業五年以上經驗或大專以上相關科系畢業",
    }

    setClasses(prev => [item, ...prev])
    setShowAddClass(false)
    toast.success("成功建立新班別場次")
  }

  const handleScoreUpdate = (id: string, field: 'theory' | 'practice', value: string) => {
    setApps(prev => prev.map(a => {
      if (a.id !== id || !a.scores) return a
      const newScores = { ...a.scores, [field]: parseInt(value) || 0 }
      const total = Math.round((newScores.theory + newScores.practice) / 2)
      return { 
        ...a, 
        scores: { 
          ...newScores, 
          total, 
          result: total >= 60 ? "及格" : "不及格" 
        } 
      }
    }))
  }

  const studentsNeedingReview = apps.filter(a => ["待審查", "初審通過", "複審通過", "待補件"].includes(a.status))
  const studentsInClass = apps.filter(a => a.status === "錄取")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-foreground">培訓班與回訓審核系統</h1>
          <p className="text-sm font-bold text-muted-foreground">管理培訓場次、報名審查及外部回訓時數核備</p>
        </div>
        <Button className="font-black" onClick={() => setShowAddClass(true)}>
          <Plus className="mr-2 h-5 w-5" />
          建立新班別
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-muted p-1 h-12 w-full justify-start gap-2 overflow-x-auto">
          <TabsTrigger value="classes" className="font-black px-6">班別管理</TabsTrigger>
          <TabsTrigger value="review" className="font-black px-6">
            資格審核 
            <Badge variant="destructive" className="ml-2 h-5 px-1.5 text-[10px] font-black">
              {studentsNeedingReview.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="retraining_review" className="font-black px-6">
            回訓時數審查
            <Badge className="ml-2 h-5 px-1.5 text-[10px] font-black bg-orange-500">
              {retrainingApps.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="scores" className="font-black px-6">成績判定</TabsTrigger>
          <TabsTrigger value="announcements" className="font-black px-6">結果公告</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="mt-6">
          <Card>
            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-black">開班清冊</CardTitle>
                <CardDescription className="font-bold">管理歷史與進行中之培訓課程</CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="搜尋班別編號或名稱..." className="pl-9 font-bold" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-black">班別編號</TableHead>
                    <TableHead className="font-black">班別名稱</TableHead>
                    <TableHead className="font-black">地點</TableHead>
                    <TableHead className="font-black">訓期</TableHead>
                    <TableHead className="text-center font-black">名額</TableHead>
                    <TableHead className="text-center font-black">狀態</TableHead>
                    <TableHead className="text-center font-black">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classes.slice(0, 10).map((cls) => (
                    <TableRow key={cls.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs font-bold text-primary">{cls.id}</TableCell>
                      <TableCell className="font-black">{cls.name}</TableCell>
                      <TableCell className="font-bold">{cls.location}</TableCell>
                      <TableCell className="text-xs font-bold">{cls.startDate} ~ {cls.endDate}</TableCell>
                      <TableCell className="text-center font-bold">{cls.enrolled}/{cls.capacity}</TableCell>
                      <TableCell className="text-center"><StatusBadge status={cls.status} /></TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" variant="outline" className="h-8 font-black text-xs">編輯</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="mt-6">
          <Card>
            <CardHeader className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-black">學員資格審查 (初審/複審)</CardTitle>
                  <CardDescription className="font-bold">請依序檢查學員繳交之身分與學經歷證明文件</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="font-bold"><Filter className="mr-2 h-4 w-4" />篩選待辦</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-black">報名編號</TableHead>
                    <TableHead className="font-black">學員姓名</TableHead>
                    <TableHead className="font-black">申請班別</TableHead>
                    <TableHead className="font-black">目前狀態</TableHead>
                    <TableHead className="font-black">審理意見</TableHead>
                    <TableHead className="text-center font-black">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsNeedingReview.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground font-bold">目前無待審查申請</TableCell>
                    </TableRow>
                  ) : (
                    studentsNeedingReview.map((reg) => (
                      <TableRow key={reg.id} className="hover:bg-muted/30">
                        <TableCell className="font-mono text-xs font-bold">{reg.id}</TableCell>
                        <TableCell className="font-black text-base">{reg.applicantName}</TableCell>
                        <TableCell className="text-sm font-bold">{reg.className}</TableCell>
                        <TableCell><StatusBadge status={reg.status} /></TableCell>
                        <TableCell className="text-xs text-muted-foreground font-bold italic truncate max-w-[200px]">
                          {reg.reviewNotes || "尚無意見"}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button size="sm" className="h-8 font-black bg-primary text-white" onClick={() => { setSelectedApp(reg); setShowReview(true); }}>
                            <ClipboardCheck className="mr-2 h-4 w-4" />開始審理
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retraining_review" className="mt-6">
           <Card>
              <CardHeader className="pb-4 border-b">
                 <div>
                    <CardTitle className="text-lg font-black">外部回訓時數申報審查</CardTitle>
                    <CardDescription className="font-bold">審核學員於外部機構參與之課程，核准後時數將自動彙整至其個人資歷中。</CardDescription>
                 </div>
              </CardHeader>
              <CardContent className="p-0">
                 <Table>
                    <TableHeader className="bg-muted/50">
                       <TableRow>
                          <TableHead className="font-black">申請人員</TableHead>
                          <TableHead className="font-black">課程名稱</TableHead>
                          <TableHead className="font-black">回訓方式</TableHead>
                          <TableHead className="text-center font-black">申請時數</TableHead>
                          <TableHead className="text-center font-black">佐證檔案</TableHead>
                          <TableHead className="text-center font-black">操作</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       {retrainingApps.map((app) => (
                          <TableRow key={app.id}>
                             <TableCell className="font-black text-base">{app.name}</TableCell>
                             <TableCell className="font-bold text-sm">{app.course}</TableCell>
                             <TableCell><Badge variant="outline" className="font-bold">{app.type}</Badge></TableCell>
                             <TableCell className="text-center font-black text-primary">{app.hours}h</TableCell>
                             <TableCell className="text-center">
                                <Button variant="ghost" size="sm" className="font-bold text-xs"><Eye className="mr-1 h-3 w-3" /> 檢視</Button>
                             </TableCell>
                             <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                   <Button size="sm" className="h-8 bg-success text-white font-black" onClick={() => handleRetrainingApprove(app.id)}>准予核備</Button>
                                   <Button size="sm" variant="ghost" className="h-8 text-destructive font-bold">駁回</Button>
                                </div>
                             </TableCell>
                          </TableRow>
                       ))}
                    </TableBody>
                 </Table>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="scores" className="mt-6">
          <Card>
            <CardHeader className="pb-4 border-b flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-black">成績登打與結訓判定</CardTitle>
                <CardDescription className="font-bold">輸入學員學科及術科成績，系統自動計算平均分</CardDescription>
              </div>
              <Button className="font-black" variant="outline"><Save className="mr-2 h-4 w-4" /> 批次存檔</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-black">姓名</TableHead>
                    <TableHead className="text-center font-black">學科成績</TableHead>
                    <TableHead className="text-center font-black">術科成績</TableHead>
                    <TableHead className="text-center font-black">平均總分</TableHead>
                    <TableHead className="text-center font-black">判定結果</TableHead>
                    <TableHead className="text-center font-black">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsInClass.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-black">{s.applicantName}</TableCell>
                      <TableCell className="text-center">
                        <Input type="number" className="mx-auto h-9 w-20 text-center font-black" value={s.scores?.theory} onChange={(e) => handleScoreUpdate(s.id, 'theory', e.target.value)} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input type="number" className="mx-auto h-9 w-20 text-center font-black" value={s.scores?.practice} onChange={(e) => handleScoreUpdate(s.id, 'practice', e.target.value)} />
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={cn("text-lg font-black", (s.scores?.total || 0) >= 60 ? "text-success" : "text-destructive")}>{s.scores?.total || 0}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={(s.scores?.total || 0) >= 60 ? "default" : "destructive"} className={(s.scores?.total || 0) >= 60 ? "bg-success font-black" : "font-black"}>
                          {(s.scores?.total || 0) >= 60 ? "合格" : "不合格"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" variant="ghost" className="h-8 font-bold">詳情</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="border-primary/20">
               <CardHeader>
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2"><Megaphone className="h-6 w-6" /></div>
                 <CardTitle className="text-xl font-black">發布錄取/候補名單</CardTitle>
                 <CardDescription className="font-bold">正式公告第 43 期培訓班錄取結果至前台</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="rounded-lg bg-muted/30 p-4 border border-border">
                   <div className="flex justify-between text-sm font-bold mb-2"><span>複審通過人數：</span><span className="text-primary">35 人</span></div>
                   <div className="flex justify-between text-sm font-bold"><span>候補排序人數：</span><span className="text-accent">5 人</span></div>
                 </div>
                 <Button className="w-full font-black py-6 text-lg shadow-lg">生成錄取公告並同步前台</Button>
               </CardContent>
            </Card>
            <Card className="border-success/20">
               <CardHeader>
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success mb-2"><Award className="h-6 w-6" /></div>
                 <CardTitle className="text-xl font-black">發布結訓合格名單</CardTitle>
                 <CardDescription className="font-bold">將成績合格學員正式納入文化部工地負責人資料庫</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="rounded-lg bg-muted/30 p-4 border border-border">
                   <div className="flex justify-between text-sm font-bold mb-2"><span>已登打成績人數：</span><span className="text-foreground">12 人</span></div>
                   <div className="flex justify-between text-sm font-bold"><span>判定合格人數：</span><span className="text-success">11 人</span></div>
                 </div>
                 <Button className="w-full font-black py-6 text-lg shadow-lg" variant="outline">發布合格名單與證書字號</Button>
               </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog open={showAddClass} onOpenChange={setShowAddClass}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black flex items-center gap-2"><Plus className="h-6 w-6 text-primary" />建立新培訓班場次</DialogTitle>
            <DialogDescription className="font-bold">請輸入班別基礎資訊，建立後狀態預設為「即將開放」。</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 py-4">
            <div className="space-y-4">
               <div className="space-y-2">
                  <Label className="font-black">開課年度 (民國)</Label>
                  <Select value={newClass.year} onValueChange={(v) => setNewClass(prev => ({ ...prev, year: v }))}>
                    <SelectTrigger className="font-bold"><SelectValue placeholder="選擇年度" /></SelectTrigger>
                    <SelectContent><SelectItem value="114">114 年度</SelectItem><SelectItem value="115">115 年度</SelectItem></SelectContent>
                  </Select>
               </div>
               <div className="space-y-2">
                  <Label className="font-black">區域分組</Label>
                  <Select value={newClass.region} onValueChange={(v) => setNewClass(prev => ({ ...prev, region: v }))}>
                    <SelectTrigger className="font-bold"><SelectValue placeholder="選擇區域" /></SelectTrigger>
                    <SelectContent><SelectItem value="北區">北區</SelectItem><SelectItem value="中區">中區</SelectItem><SelectItem value="南區">南區</SelectItem><SelectItem value="東區">東區</SelectItem></SelectContent>
                  </Select>
               </div>
               <div className="space-y-2">
                  <Label className="font-black">具體培訓地點</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="例：台中市、雲林縣" className="pl-9 font-bold" value={newClass.location} onChange={(e) => setNewClass(prev => ({ ...prev, location: e.target.value }))} />
                  </div>
               </div>
            </div>
            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2"><Label className="font-black text-xs">開課日期</Label><Input type="date" className="font-bold" value={newClass.startDate} onChange={(e) => setNewClass(prev => ({ ...prev, startDate: e.target.value }))} /></div>
                  <div className="space-y-2"><Label className="font-black text-xs">結訓日期</Label><Input type="date" className="font-bold" value={newClass.endDate} onChange={(e) => setNewClass(prev => ({ ...prev, endDate: e.target.value }))} /></div>
               </div>
               <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2"><Label className="font-black text-xs">名額限制</Label><Input type="number" className="font-bold" value={newClass.capacity} onChange={(e) => setNewClass(prev => ({ ...prev, capacity: e.target.value }))} /></div>
                  <div className="space-y-2"><Label className="font-black text-xs">培訓費用</Label><Input className="font-bold" value={newClass.fee} onChange={(e) => setNewClass(prev => ({ ...prev, fee: e.target.value }))} /></div>
               </div>
            </div>
          </div>
          <DialogFooter className="border-t pt-4">
             <Button variant="ghost" className="font-bold" onClick={() => setShowAddClass(false)}>取消</Button>
             <Button className="font-black px-8" onClick={handleCreateClass}>確認建立班別</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showReview} onOpenChange={setShowReview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black flex items-center gap-2"><ClipboardCheck className="h-6 w-6 text-primary" />報名資格審查 - {selectedApp?.applicantName}</DialogTitle>
            <DialogDescription className="font-bold">申請單：{selectedApp?.id} | 班別：{selectedApp?.className}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 py-4">
            <div className="space-y-4">
               <h3 className="text-sm font-black border-b pb-2 uppercase tracking-widest">附件證明文件</h3>
               <div className="space-y-2">
                 {selectedApp?.documents.map((doc: string) => (
                   <div key={doc} className="flex items-center justify-between rounded-lg border bg-muted/20 p-3 hover:bg-muted/40 cursor-pointer group">
                      <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary" /><span className="text-sm font-bold">{doc}</span></div>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                   </div>
                 ))}
               </div>
            </div>
            <div className="space-y-5">
               <h3 className="text-sm font-black border-b pb-2 uppercase tracking-widest">審查判定與意見</h3>
               <div className="space-y-3">
                  <div className="flex flex-col gap-2"><Label className="font-bold">內部審核意見</Label><textarea className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm font-bold" placeholder="請輸入審核意見..." defaultValue={selectedApp?.reviewNotes} /></div>
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    <Button className="w-full bg-success text-white font-black py-6 h-auto" onClick={() => handleApprove(selectedApp?.id, selectedApp?.status)}><CheckCircle className="mr-2 h-5 w-5" />核准通過</Button>
                    <Button variant="outline" className="font-black border-warning text-warning" onClick={() => handleRequestSupplement(selectedApp?.id)}>通知補件</Button>
                  </div>
               </div>
            </div>
          </div>
          <DialogFooter className="border-t pt-4"><Button variant="ghost" className="font-bold" onClick={() => setShowReview(false)}>關閉</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}