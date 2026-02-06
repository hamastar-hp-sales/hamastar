"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { systemRoles } from "@/lib/mock-data"
import { Plus, Edit2, Shield, Users, Key, ChevronRight, MoreVertical, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription as UIDialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SystemRolesPage() {
  const [showAdd, setShowAdd] = React.useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">角色管理</h1>
          <p className="text-sm font-bold text-muted-foreground">定義系統存取角色，並設定其功能存取權限範疇</p>
        </div>
        <Button className="font-black" onClick={() => setShowAdd(true)}>
          <Plus className="mr-2 h-4.5 w-4.5" />
          新增權限角色
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="text-base font-black">角色清單</CardTitle>
          <CardDescription className="font-bold">目前系統共配置 {systemRoles.length} 種權限角色</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col divide-y">
            {systemRoles.map((role) => (
              <div key={role.id} className="flex flex-col md:flex-row md:items-center gap-4 p-5 hover:bg-muted/30 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-foreground">{role.name}</h3>
                    <Badge variant="secondary" className="font-bold text-[10px] bg-primary/5 text-primary border-primary/20">
                      <Users className="mr-1 h-3 w-3" /> {role.userCount} 位成員
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground leading-relaxed">{role.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                   <div className="hidden lg:flex flex-wrap gap-1 max-w-[300px] justify-end">
                      {role.permissions.map((p) => (
                        <Badge key={p} variant="outline" className="text-[10px] font-bold py-0">{p}</Badge>
                      ))}
                   </div>
                   
                   <div className="flex items-center gap-1 border-l pl-3">
                      <Button size="sm" variant="ghost" className="font-black h-9 text-primary hover:bg-primary/10">
                        <Edit2 className="mr-1.5 h-3.5 w-3.5" />編輯
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuItem className="font-bold"><Key className="mr-2 h-4 w-4" /> 設定權限矩陣</DropdownMenuItem>
                           <DropdownMenuItem className="font-bold text-destructive"><Trash2 className="mr-2 h-4 w-4" /> 刪除角色</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Role Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">新增系統角色</DialogTitle>
            <UIDialogDescription className="font-bold">角色建立後，可至「功能權限管理」設定其細部功能開關。</UIDialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-1.5">
              <Label className="font-bold">角色名稱 <span className="text-destructive">*</span></Label>
              <Input placeholder="例如：北區審核人員" className="font-bold" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="font-bold">功能描述</Label>
              <Textarea placeholder="請描述此角色的職責範圍..." rows={3} className="font-bold text-sm" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" className="font-bold" onClick={() => setShowAdd(false)}>取消</Button>
            <Button className="font-black px-8" onClick={() => setShowAdd(false)}>確認新增</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}