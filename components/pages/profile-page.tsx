"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supervisors, registrationApplications, currentUser } from "@/lib/mock-data"
import { Save, Clock, FileText, AlertCircle, GraduationCap, Award, Upload, CheckCircle2, History, Plus, CreditCard, ClipboardList, ChevronRight, FileCheck, Search, RotateCcw, ShieldAlert, Trophy, AlertTriangle, Info, CalendarDays, User, Mail, Phone, MapPin, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription as UIDialogDescription } from "@/components/ui/dialog"
import { toast } from "sonner"

const currentSupervisor = supervisors[0] // 張瑞文

export function ProfilePage() {
  const pathname = usePathname()
  
  const myRegistrations = [
    {
      id: "REG-2026-003",
      className: "114 年度「古蹟修復工程工地負責人培訓班(中區)」",
      status: "錄取",
      appliedDate: "2026-01-15",
      reviewNotes: "",
      scores: null
    },
    {
      id: "REG-2025-082",
      className: "113 年度「古蹟修復工程工地負責人培訓班(北區)」",
      status: "已結訓",
      appliedDate: "2024-12-10",
      reviewNotes: "",
      scores: { theory: 85, practice: 78, total: 82, result: "及格" }
    }
  ]

  const renderContent = () => {
    switch (pathname) {
      case "/profile/experience":
        return <ExperienceSection />
      case "/profile/certificates":
        return <CertificatesSection />
      case "/profile/registrations":
        return <RegistrationResultsSection registrations={myRegistrations} />
      case "/profile/supplement":
        return <SupplementCenterSection registrations={myRegistrations} />
      case "/profile/retraining":
        return <RetrainingSection />
      case "/profile/remarks":
        return <OfficialRemarksSection />
      case "/profile":
      default:
        return <BasicInfoSection />
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">個人中心</h1>
        <div className="flex items-center gap-2">
           <Badge variant="outline" className="bg-success/10 text-success border-success/30 font-bold">
              合格證書：{currentSupervisor.certNo !== "---" ? "已取得" : "尚未取得"}
           </Badge>
        </div>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-5 p-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground shadow-lg">
            {currentSupervisor.name[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
               <h2 className="text-xl font-black text-foreground">{currentSupervisor.name}</h2>
               <StatusBadge status={currentSupervisor.status} />
            </div>
            <p className="mt-1 text-sm font-bold text-muted-foreground">
              {currentSupervisor.certNo !== "---" ? `證書字號：${currentSupervisor.certNo}` : "身分：培訓人員 / 報名學員"}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-2">
        {renderContent()}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "有效": "bg-success text-success-foreground",
    "回訓中": "bg-warning text-warning-foreground",
    "已過期": "bg-destructive text-destructive-foreground",
    "待審查": "bg-warning text-warning-foreground",
    "錄取": "bg-success text-success-foreground",
    "已結訓": "bg-primary text-primary-foreground",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${styles[status] || "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  )
}

function BasicInfoSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* 個人基本資訊 */}
      <Card className="lg:col-span-2">
        <CardHeader className="border-b">
          <CardTitle className="text-base font-black flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            詳細個資維護
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-1.5"><Label className="font-bold">姓名</Label><Input defaultValue={currentUser.name} className="font-bold" /></div>
            <div className="flex flex-col gap-1.5"><Label className="font-bold">身分證字號</Label><Input defaultValue={currentSupervisor.idNumber} disabled className="font-bold bg-muted/50" /></div>
            <div className="flex flex-col gap-1.5"><Label className="font-bold">性別</Label><Input defaultValue={currentUser.gender} className="font-bold" /></div>
            <div className="flex flex-col gap-1.5"><Label className="font-bold">出生日期</Label><Input type="date" defaultValue={currentUser.birthDate} className="font-bold" /></div>
            <div className="flex flex-col gap-1.5"><Label className="font-bold">聯絡電話</Label><Input defaultValue={currentUser.phone} className="font-bold" /></div>
            <div className="flex flex-col gap-1.5"><Label className="font-bold">電子信箱</Label><Input defaultValue={currentUser.email} className="font-bold" /></div>
            <div className="flex flex-col gap-1.5 md:col-span-2"><Label className="font-bold">通訊地址</Label><Input defaultValue={currentUser.address} className="font-bold" /></div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button className="font-black px-8"><Save className="mr-2 h-4.5 w-4.5" />儲存變更</Button>
          </div>
        </CardContent>
      </Card>

      {/* 學歷資訊 */}
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base font-black flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              最高學歷
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-muted-foreground uppercase">學校名稱</span>
                <p className="text-base font-black">{currentUser.education.school}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-muted-foreground uppercase">系所專業</span>
                <p className="text-base font-bold">{currentUser.education.major}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase">學位</span>
                  <p className="text-sm font-bold">{currentUser.education.degree}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase">畢業年度</span>
                  <p className="text-sm font-bold">民國 {parseInt(currentUser.education.gradYear) - 1911} 年</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 專長工項 */}
        <Card>
           <CardHeader className="border-b">
             <CardTitle className="text-base font-black flex items-center gap-2">
               <Briefcase className="h-5 w-5 text-primary" />
               核定專長工項
             </CardTitle>
           </CardHeader>
           <CardContent className="pt-6">
             <div className="flex flex-wrap gap-2">
                {currentSupervisor.workItems.map(item => (
                  <Badge key={item} variant="secondary" className="font-bold px-3 py-1 bg-primary/5 text-primary border-primary/20">
                    {item}
                  </Badge>
                ))}
             </div>
             <p className="mt-4 text-[11px] font-bold text-muted-foreground italic">
               ※ 專長工項依據結訓合格證書及實績核定。
             </p>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ExperienceSection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div>
          <CardTitle className="text-base font-black flex items-center gap-2">
             <History className="h-5 w-5 text-primary" />
             古蹟修復工程參與履歷
          </CardTitle>
          <CardDescription className="font-bold">正式納入系統之歷史修復實績紀錄</CardDescription>
        </div>
        <Button size="sm" variant="outline" className="font-black">
          <Plus className="mr-1.5 h-4 w-4" /> 新增補錄申請
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-black">工程名稱</TableHead>
              <TableHead className="font-black">文資類型</TableHead>
              <TableHead className="font-black">擔任職務</TableHead>
              <TableHead className="font-black">參與期間</TableHead>
              <TableHead className="text-center font-black">狀態</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentSupervisor.projects.map((exp: any) => (
              <TableRow key={exp.id} className="hover:bg-muted/30">
                <TableCell className="font-black text-sm text-foreground py-4">{exp.projectName}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-bold text-[10px]">{exp.heritageType}</Badge>
                </TableCell>
                <TableCell className="font-bold text-sm">{exp.role}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-muted-foreground">{exp.period}</TableCell>
                <TableCell className="text-center">
                  <Badge className={cn("font-black text-[10px]", exp.status === "進行中" ? "bg-success" : "bg-muted")}>
                    {exp.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function CertificatesSection() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="text-base font-black flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            核心證照管理
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg border-4 border-white/20">
                <FileCheck className="h-9 w-9" />
              </div>
              <div>
                <h3 className="text-xl font-black text-foreground leading-tight">古蹟修復工程工地負責人合格證書</h3>
                <p className="text-sm font-mono font-black text-primary mt-1">{currentSupervisor.certNo}</p>
                <div className="flex items-center gap-4 mt-2 text-xs font-bold text-muted-foreground">
                   <span>核發：{currentSupervisor.certDate}</span>
                   <span>效期：{currentSupervisor.certExpiryDate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <Button variant="outline" className="font-black">檢視正本</Button>
               <Button className="font-black bg-primary">下載電子證書 (PDF)</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-base font-black flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            其他專業證照
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
           <Table>
              <TableHeader className="bg-muted/50"><TableRow><TableHead className="font-black">證照名稱</TableHead><TableHead className="font-black">證號</TableHead><TableHead className="text-center font-black">操作</TableHead></TableRow></TableHeader>
              <TableBody>
                 {currentSupervisor.secondaryCerts?.map((sc, i) => (
                   <TableRow key={i}>
                      <TableCell className="font-bold text-sm py-4">{sc.name}</TableCell>
                      <TableCell className="font-mono text-xs font-bold">{sc.id}</TableCell>
                      <TableCell className="text-center"><Button variant="ghost" size="sm" className="font-black text-primary">檢視</Button></TableCell>
                   </TableRow>
                 ))}
              </TableBody>
           </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function RegistrationResultsSection({ registrations }: { registrations: any[] }) {
  const activeReg = registrations.find(r => r.status === "錄取" || r.status === "待審查" || r.status === "待補件") || registrations[0]

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-primary/20 shadow-md">
        <CardHeader className="bg-muted/30 border-b">
           <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-black text-primary">當前受訓流程監控</CardTitle>
                <CardDescription className="font-bold mt-1">{activeReg?.className}</CardDescription>
              </div>
              <StatusBadge status={activeReg?.status} />
           </div>
        </CardHeader>
        <CardContent className="py-8">
           <div className="flex items-start justify-between relative px-4">
              <div className="absolute top-5 left-10 right-10 h-0.5 bg-muted z-0" />
              {[
                { label: "報名審查", done: true },
                { label: "錄取公告", done: activeReg?.status === "錄取" || activeReg?.status === "已結訓" },
                { label: "繳費報到", done: activeReg?.status === "已結訓" },
                { label: "結訓考試", done: activeReg?.status === "已結訓" },
                { label: "領取證書", done: currentSupervisor.certNo !== "---" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-3 relative z-10 w-24">
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all shadow-sm",
                    step.done ? "bg-success border-success text-white" : "bg-white border-muted text-muted-foreground"
                  )}>
                    {step.done ? <CheckCircle2 className="h-5 w-5" /> : <span className="font-black text-sm">{i+1}</span>}
                  </div>
                  <span className={cn("text-[11px] font-black text-center whitespace-nowrap", step.done ? "text-foreground" : "text-muted-foreground")}>
                    {step.label}
                  </span>
                </div>
              ))}
           </div>

           <div className="mt-10 rounded-xl bg-primary/5 border border-primary/10 p-6">
              {activeReg?.status === "錄取" && (
                <div className="flex flex-col md:flex-row items-center gap-6">
                   <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success shrink-0">
                      <CreditCard className="h-8 w-8" />
                   </div>
                   <div className="flex-1 space-y-1">
                      <h4 className="text-base font-black text-foreground">錄取公告：恭喜您已獲得正取資格</h4>
                      <p className="text-sm font-bold text-muted-foreground leading-relaxed">
                        請於 <span className="text-destructive">2026-02-15</span> 前完成繳費，逾期將由候補人員遞補。
                      </p>
                   </div>
                   <div className="flex flex-col gap-2 shrink-0">
                      <Button className="font-black px-8 bg-[#7B241C] hover:bg-[#641E16]">
                        <CreditCard className="mr-2 h-4 w-4" /> 立即線上繳費
                      </Button>
                   </div>
                </div>
              )}
           </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-base font-black flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            培訓成績檢視
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
           <Table>
              <TableHeader className="bg-muted/50">
                 <TableRow>
                    <TableHead className="font-bold">班別名稱</TableHead>
                    <TableHead className="text-center font-bold">總平均</TableHead>
                    <TableHead className="text-center font-bold">判定結果</TableHead>
                 </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.filter(r => r.scores).map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="py-4">
                       <div className="flex flex-col">
                          <span className="font-black text-sm text-foreground">{reg.className}</span>
                       </div>
                    </TableCell>
                    <TableCell className="text-center font-black text-lg">
                       <span className={reg.scores.total >= 60 ? "text-success" : "text-destructive"}>
                         {reg.scores.total}
                       </span>
                    </TableCell>
                    <TableCell className="text-center">
                       <Badge className={cn("font-black", reg.scores.total >= 60 ? "bg-success" : "bg-destructive")}>
                         {reg.scores.result}
                       </Badge>
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

function RetrainingSection() {
  const [showDeclare, setShowDeclare] = React.useState(false)

  const expiryDate = new Date(currentSupervisor.certExpiryDate || "2026-06-14")
  const today = new Date()
  const diffTime = expiryDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  const isUrgent = diffDays < 180 && currentSupervisor.retrainingHours < 36

  return (
    <div className="flex flex-col gap-6">
      <Card className={cn(
        "border-2 transition-all",
        isUrgent ? "border-destructive bg-destructive/5" : "border-primary/20 bg-primary/5"
      )}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className={cn(
                 "flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md",
                 isUrgent ? "bg-destructive" : "bg-primary"
               )}>
                 <CalendarDays className="h-6 w-6" />
               </div>
               <div>
                  <CardTitle className="text-lg font-black">回訓週期自動監控</CardTitle>
                  <CardDescription className="font-bold">
                    週期：{currentSupervisor.certDate} ～ {currentSupervisor.certExpiryDate}
                  </CardDescription>
               </div>
             </div>
             <div className="text-right">
                <p className="text-xs font-black text-muted-foreground uppercase">效期剩餘</p>
                <p className={cn("text-2xl font-black", isUrgent ? "text-destructive" : "text-primary")}>
                  {diffDays} 天
                </p>
             </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3">
             <div className="flex justify-between items-end">
                <div className="space-y-1">
                   <p className="text-sm font-black text-foreground">時數累積進度</p>
                   <p className="text-xs font-bold text-muted-foreground">法規要求：每 4 年須滿 36 小時</p>
                </div>
                <div className="text-right">
                   <span className="text-2xl font-black text-primary">{currentSupervisor.retrainingHours}</span>
                   <span className="text-sm font-bold text-muted-foreground"> / 36 h</span>
                </div>
             </div>
             <div className="h-4 w-full rounded-full bg-muted overflow-hidden border border-border shadow-inner">
                <div 
                  className={cn(
                    "h-full transition-all duration-1000 flex items-center justify-end pr-2 text-[10px] font-black text-white",
                    isUrgent ? "bg-destructive" : "bg-success"
                  )}
                  style={{ width: `${(currentSupervisor.retrainingHours / 36) * 100}%` }} 
                >
                  {Math.round((currentSupervisor.retrainingHours / 36) * 100)}%
                </div>
             </div>
          </div>

          <div className={cn(
            "rounded-lg p-4 flex items-start gap-3 border",
            isUrgent ? "bg-white border-destructive/30" : "bg-white border-primary/10"
          )}>
             {isUrgent ? (
               <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
             ) : (
               <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
             )}
             <div>
                <p className="text-sm font-black text-foreground">系統判定：{isUrgent ? "急需補足時數" : "效期內狀態正常"}</p>
                <p className="text-xs font-bold text-muted-foreground mt-1 leading-relaxed">
                  {isUrgent 
                    ? "您的證書即將於半年內到期，目前時數尚不足 12 小時。請儘速參加回訓課程並完成申報，以免證書失效。"
                    : "您目前的修復參與及回訓紀錄良好，請持續維持並定期確認申報進度。"}
                </p>
             </div>
          </div>

          <Button className="w-full font-black py-7 text-lg shadow-lg group" onClick={() => setShowDeclare(true)}>
             <Plus className="mr-2 h-6 w-6 group-hover:rotate-90 transition-transform" /> 申報外部回訓課程
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b bg-muted/20">
           <CardTitle className="text-base font-black flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              時數異動明細
           </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-black">課程名稱</TableHead>
                <TableHead className="font-black">來源</TableHead>
                <TableHead className="text-center font-black">時數</TableHead>
                <TableHead className="text-center font-black">審核狀態</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSupervisor.retrainingLogs?.map((log: any) => (
                <TableRow key={log.id}>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-black text-sm text-foreground">{log.name}</span>
                      <span className="text-[10px] font-bold text-muted-foreground">日期：{log.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] font-bold">
                       {log.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-black text-primary">{log.hours}h</TableCell>
                  <TableCell className="text-center">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black",
                      log.status === "已核備" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    )}>
                      {log.status === "已核備" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {log.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showDeclare} onOpenChange={setShowDeclare}>
         <DialogContent className="max-w-md">
            <DialogHeader>
               <DialogTitle className="text-xl font-black">外部回訓時數申報</DialogTitle>
               <UIDialogDescription className="font-bold">請輸入於其他學術或專業機構參與之課程資訊。</UIDialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
               <div className="space-y-1.5">
                  <Label className="font-black">課程/活動名稱</Label>
                  <Input placeholder="請輸入完整名稱" className="font-bold" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="font-black">回訓方式</Label>
                    <Select>
                       <SelectTrigger className="font-bold">
                          <SelectValue placeholder="請選擇" />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="workshop">實務研習</SelectItem>
                          <SelectItem value="lecture">專題講座</SelectItem>
                          <SelectItem value="online">線上課程</SelectItem>
                       </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-black">申請時數</Label>
                    <Input type="number" placeholder="時數" className="font-bold" />
                  </div>
               </div>
               <div className="space-y-1.5">
                  <Label className="font-black">上傳佐證文件 (PDF/JPG)</Label>
                  <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                     <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-xs font-bold text-muted-foreground">點擊選擇檔案</span>
                     </div>
                  </div>
               </div>
            </div>
            <DialogFooter>
               <Button variant="ghost" className="font-bold" onClick={() => setShowDeclare(false)}>取消</Button>
               <Button className="font-black px-8" onClick={() => {
                 setShowDeclare(false);
                 toast.success("申報已送出，機關核備後將併入累積時數。");
               }}>送出申報</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  )
}

function OfficialRemarksSection() {
  const remarks = currentSupervisor.officialRemarks || []
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-black flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-primary" />機關註記查詢</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {remarks.map((rem, i) => (
            <div key={i} className={cn("relative rounded-xl border p-5 pl-14 shadow-sm", rem.type === "獎勵" ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20")}>
               <div className="absolute left-5 top-6">{rem.type === "獎勵" ? <Trophy className="h-6 w-6 text-success" /> : <AlertTriangle className="h-6 w-6 text-destructive" />}</div>
               <div className="flex items-center justify-between mb-2">
                  <Badge variant={rem.type === "獎勵" ? "default" : "destructive"} className={cn("font-black", rem.type === "獎勵" && "bg-success")}>{rem.type}</Badge>
                  <span className="text-xs font-bold text-muted-foreground">{rem.date}</span>
               </div>
               <p className="text-sm font-bold text-foreground">{rem.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SupplementCenterSection({ registrations }: { registrations: any[] }) {
  return (
    <Card><CardHeader><CardTitle className="text-base font-black">補件中心</CardTitle></CardHeader><CardContent className="py-12 text-center text-muted-foreground font-bold italic">目前無待補件項目</CardContent></Card>
  )
}