"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Check, Upload, ChevronLeft, ChevronRight } from "lucide-react"
import { trainingClasses } from "@/lib/mock-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const steps = [
  { id: 1, label: "選擇班別" },
  { id: 2, label: "填寫基本資料" },
  { id: 3, label: "上傳佐證文件" },
  { id: 4, label: "確認送出" },
]

export function RegistrationPage() {
  const searchParams = useSearchParams()
  const classIdFromUrl = searchParams.get("classId")
  
  // Initial step is 2 if a classId is provided in the URL, otherwise 1
  const [currentStep, setCurrentStep] = React.useState(classIdFromUrl ? 2 : 1)
  const [selectedClassId, setSelectedClassId] = React.useState(classIdFromUrl || "")
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)

  const selectedClass = trainingClasses.find(c => c.id === selectedClassId)

  const handleNext = () => {
    if (currentStep === 4) {
      setShowConfirm(true)
    } else {
      setCurrentStep((s) => Math.min(s + 1, 4))
    }
  }

  const handleSubmit = () => {
    setShowConfirm(false)
    setShowSuccess(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">線上報名</h1>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-0">
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  currentStep > step.id
                    ? "bg-success text-success-foreground"
                    : currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <span className={cn(
                "text-[11px] font-medium",
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                "mx-2 mb-5 h-0.5 w-12 sm:w-20",
                currentStep > step.id ? "bg-success" : "bg-muted"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <StepSelectClass 
              selectedId={selectedClassId} 
              onSelect={(id) => setSelectedClassId(id)} 
            />
          )}
          {currentStep === 2 && <StepBasicInfo selectedClass={selectedClass} />}
          {currentStep === 3 && <StepUploadDocuments />}
          {currentStep === 4 && <StepConfirm selectedClass={selectedClass} />}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((s) => Math.max(s - 1, 1))}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          上一步
        </Button>
        <span className="text-sm text-muted-foreground">
          步驟 {currentStep} / {steps.length}
        </span>
        <Button onClick={handleNext} disabled={currentStep === 1 && !selectedClassId}>
          {currentStep === 4 ? "送出報名" : "下一步"}
          {currentStep < 4 && <ChevronRight className="ml-1 h-4 w-4" />}
        </Button>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認送出報名</DialogTitle>
            <DialogDescription>
              請確認您的報名資料是否正確，送出後將進入審查流程。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)}>返回修改</Button>
            <Button onClick={handleSubmit}>確認送出</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>報名成功</DialogTitle>
            <DialogDescription>
              您的報名已成功送出，報名編號為 REG-2026-006。請至「報名進度查詢」追蹤審核狀態。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => { setShowSuccess(false); setCurrentStep(1) }}>確定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  )
}

function StepSelectClass({ selectedId, onSelect }: { selectedId: string, onSelect: (id: string) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-base">選擇培訓班別</CardTitle>
        <CardDescription>請選擇您要報名的培訓班</CardDescription>
      </CardHeader>
      <div className="flex flex-col gap-3">
        {trainingClasses.filter(c => c.status === "報名中").map(cls => (
          <div 
            key={cls.id}
            onClick={() => onSelect(cls.id)}
            className={cn(
              "cursor-pointer rounded-lg border-2 p-4 transition-all",
              selectedId === cls.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{cls.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{cls.id} | {cls.location} | {cls.startDate} ~ {cls.endDate}</p>
              </div>
              {selectedId === cls.id && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StepBasicInfo({ selectedClass }: { selectedClass: any }) {
  return (
    <div className="flex flex-col gap-4">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
           <div>
              <CardTitle className="text-base">基本資料</CardTitle>
              <CardDescription>請填寫報名所需的基本個人資料</CardDescription>
           </div>
           {selectedClass && (
             <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
               已選班別：{selectedClass.name}
             </Badge>
           )}
        </div>
      </CardHeader>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">
            姓名 <span className="text-destructive">*</span>
          </Label>
          <Input id="name" placeholder="請輸入姓名" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="idNumber">
            身分證字號 <span className="text-destructive">*</span>
          </Label>
          <Input id="idNumber" placeholder="請輸入身分證字號" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">
            聯絡電話 <span className="text-destructive">*</span>
          </Label>
          <Input id="phone" placeholder="例：0912-345-678" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">
            電子信箱 <span className="text-destructive">*</span>
          </Label>
          <Input id="email" type="email" placeholder="example@email.com" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="education">
            最高學歷 <span className="text-destructive">*</span>
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="請選擇學歷" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highschool">高中/高職</SelectItem>
              <SelectItem value="college">專科</SelectItem>
              <SelectItem value="university">大學</SelectItem>
              <SelectItem value="master">碩士</SelectItem>
              <SelectItem value="phd">博士</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company">
            服務單位
          </Label>
          <Input id="company" placeholder="請輸入目前服務的營造廠或單位名稱" />
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <Label htmlFor="experience">
            相關經歷說明
          </Label>
          <Textarea id="experience" placeholder="請簡述您的文化資產修復相關經歷..." rows={3} />
          <p className="text-[11px] text-muted-foreground">可描述曾參與之古蹟修復工程經驗</p>
        </div>
      </div>
    </div>
  )
}

function StepUploadDocuments() {
  return (
    <div className="flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-base">上傳佐證文件</CardTitle>
        <CardDescription>請上傳報名所需之佐證資料（PDF或圖片格式）</CardDescription>
      </CardHeader>
      <div className="flex flex-col gap-4">
        {[
          { id: "id-card", label: "身分證正反面影本", required: true, uploaded: true },
          { id: "edu-cert", label: "最高學歷證明", required: true, uploaded: true },
          { id: "exp-cert", label: "工作經歷證明", required: true, uploaded: false },
          { id: "other-cert", label: "相關證照影本", required: false, uploaded: false },
        ].map((doc) => (
          <div key={doc.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {doc.label}
                {doc.required && <span className="text-destructive"> *</span>}
              </p>
              {doc.uploaded ? (
                <p className="mt-0.5 text-xs text-success">已上傳</p>
              ) : (
                <p className="mt-0.5 text-xs text-muted-foreground">尚未上傳</p>
              )}
            </div>
            <Button variant={doc.uploaded ? "outline" : "default"} size="sm">
              <Upload className="mr-1.5 h-3.5 w-3.5" />
              {doc.uploaded ? "重新上傳" : "選擇檔案"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

function StepConfirm({ selectedClass }: { selectedClass: any }) {
  return (
    <div className="flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-base">確認報名資訊</CardTitle>
        <CardDescription>請確認以下資訊是否正確</CardDescription>
      </CardHeader>
      <div className="rounded-lg border border-border divide-y divide-border">
        <div className="flex items-start gap-4 p-4">
          <span className="w-28 shrink-0 text-sm text-muted-foreground">報名班別</span>
          <span className="text-sm font-medium text-foreground">
            {selectedClass ? selectedClass.name : "（未選擇）"}
          </span>
        </div>
        <div className="flex items-start gap-4 p-4">
          <span className="w-28 shrink-0 text-sm text-muted-foreground">姓名</span>
          <span className="text-sm text-foreground">（待填寫）</span>
        </div>
        <div className="flex items-start gap-4 p-4">
          <span className="w-28 shrink-0 text-sm text-muted-foreground">身分證字號</span>
          <span className="text-sm text-foreground">（待填寫）</span>
        </div>
        <div className="flex items-start gap-4 p-4">
          <span className="w-28 shrink-0 text-sm text-muted-foreground">上傳文件</span>
          <div className="flex flex-col gap-1 text-sm text-foreground">
            <span>身分證正反面影本 - 已上傳</span>
            <span>最高學歷證明 - 已上傳</span>
            <span className="text-destructive">工作經歷證明 - 尚未上傳</span>
          </div>
        </div>
      </div>
    </div>
  )
}