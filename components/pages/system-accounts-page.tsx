"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { systemAccounts } from "@/lib/mock-data"
import { Search, Edit2, Trash2, UserPlus, Shield } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription as UIDialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SystemAccountsPage() {
  const [search, setSearch] = React.useState("")
  const [showAdd, setShowAdd] = React.useState(false)
  const [showDelete, setShowDelete] = React.useState(false)

  const filtered = systemAccounts.filter(
    (a) => !search || a.username.includes(search) || a.name.includes(search) || a.email.includes(search)
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">帳號管理</h1>
          <p className="text-sm font-bold text-muted-foreground">管理系統登入帳號及其所屬角色狀態</p>
        </div>
        <Button className="font-black" onClick={() => setShowAdd(true)}>
          <UserPlus className="mr-2 h-4.5 w-4.5" />
          新增管理帳號
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
          <CardTitle className="text-base font-black">所有帳號清冊</CardTitle>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜尋帳號、姓名、信箱..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 font-bold"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-black">登入帳號</TableHead>
                <TableHead className="font-black">使用者姓名</TableHead>
                <TableHead className="font-black">所屬角色</TableHead>
                <TableHead className="font-black">狀態</TableHead>
                <TableHead className="font-black">最後登入時間</TableHead>
                <TableHead className="text-center font-black">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((acc) => (
                <TableRow key={acc.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-sm font-bold text-primary">{acc.username}</TableCell>
                  <TableCell className="font-black">{acc.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-bold border-primary/30 text-primary">
                      <Shield className="mr-1 h-3 w-3" />
                      {acc.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-black ${
                      acc.status === "啟用" ? "bg-success text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      {acc.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-muted-foreground">{acc.lastLogin}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button size="sm" variant="ghost" className="h-8 font-black">
                        <Edit2 className="mr-1.5 h-3.5 w-3.5" />編輯
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 font-black text-destructive" onClick={() => setShowDelete(true)}>
                        <Trash2 className="mr-1.5 h-3.5 w-3.5" />刪除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">新增系統帳號</DialogTitle>
            <UIDialogDescription className="font-bold">請填寫帳號基本資訊與指派角色。</UIDialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                  <Label className="font-bold">帳號名稱</Label>
                  <Input placeholder="建議使用英文" className="font-bold" />
               </div>
               <div className="space-y-1.5">
                  <Label className="font-bold">使用者姓名</Label>
                  <Input placeholder="請輸入姓名" className="font-bold" />
               </div>
            </div>
            <div className="space-y-1.5">
              <Label className="font-bold">電子信箱</Label>
              <Input type="email" placeholder="example@boch.gov.tw" className="font-bold" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-bold">指派角色</Label>
              <Select>
                <SelectTrigger className="font-bold"><SelectValue placeholder="請選擇權限角色" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">系統管理者</SelectItem>
                  <SelectItem value="reviewer">主管機關人員</SelectItem>
                  <SelectItem value="query">一般查詢人員</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" className="font-bold" onClick={() => setShowAdd(false)}>取消</Button>
            <Button className="font-black px-8" onClick={() => setShowAdd(false)}>確認建立</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-black">確認刪除帳號？</DialogTitle>
            <UIDialogDescription className="font-bold text-destructive">此操作將永久移除該帳號的所有登入權限，且無法復原。</UIDialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" className="font-bold" onClick={() => setShowDelete(false)}>取消</Button>
            <Button variant="destructive" className="font-black px-8" onClick={() => setShowDelete(false)}>確認刪除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}