"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { permissionModules, systemRoles, rolePermissions as initialRolePermissions } from "@/lib/mock-data"
import { Save, RotateCcw, ShieldCheck, CheckSquare, Square } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function SystemPermissionsPage() {
  // 建立權限狀態矩陣: { [roleName]: string[] }
  const [matrix, setMatrix] = React.useState<Record<string, string[]>>(initialRolePermissions)

  // 取得所有權限 Key 清單用於計算全選
  const allPermissionKeys = React.useMemo(() => 
    permissionModules.flatMap(m => m.items.map(i => i.key)), 
  [])

  // 切換單個單元格
  const toggleCell = (roleName: string, permKey: string) => {
    setMatrix(prev => {
      const currentRolePerms = prev[roleName] || []
      const newPerms = currentRolePerms.includes(permKey)
        ? currentRolePerms.filter(k => k !== permKey)
        : [...currentRolePerms, permKey]
      
      return { ...prev, [roleName]: newPerms }
    })
  }

  // 角色列全選切換
  const toggleRoleAll = (roleName: string) => {
    const isAllSelected = allPermissionKeys.every(k => (matrix[roleName] || []).includes(k))
    setMatrix(prev => ({
      ...prev,
      [roleName]: isAllSelected ? [] : [...allPermissionKeys]
    }))
  }

  const handleSave = () => {
    toast.success("權限矩陣設定已成功儲存至系統。")
  }

  const handleReset = () => {
    setMatrix(initialRolePermissions)
    toast.info("已還原至預設權限設定。")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">功能權限管理矩陣</h1>
          <p className="text-sm font-bold text-muted-foreground">透過矩陣表格設定各角色之功能存取權限</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="font-bold" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />重設
          </Button>
          <Button className="font-black px-8 bg-primary text-white" onClick={handleSave}>
            <Save className="mr-2 h-4.5 w-4.5" />儲存變更
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="relative overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader className="bg-muted/50">
                {/* 第一行：功能項目與角色名稱 */}
                <TableRow className="hover:bg-transparent border-b">
                  <TableHead className="w-[300px] font-black text-foreground border-r bg-muted/30">
                    功能模組 / 權限項目
                  </TableHead>
                  {systemRoles.map(role => (
                    <TableHead key={role.id} className="text-center font-black text-foreground min-w-[140px] border-r">
                      {role.name}
                    </TableHead>
                  ))}
                </TableRow>
                {/* 第二行：角色全選勾選框 */}
                <TableRow className="hover:bg-transparent bg-white">
                  <TableCell className="border-r bg-muted/10" />
                  {systemRoles.map(role => {
                    const isAllSelected = allPermissionKeys.every(k => (matrix[role.name] || []).includes(k))
                    return (
                      <TableCell key={role.id} className="text-center border-r py-2">
                        <div className="flex items-center justify-center gap-2">
                          <Checkbox 
                            id={`all-${role.id}`}
                            checked={isAllSelected}
                            onCheckedChange={() => toggleRoleAll(role.name)}
                          />
                          <label htmlFor={`all-${role.id}`} className="text-xs font-bold text-muted-foreground cursor-pointer">全選</label>
                        </div>
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableHeader>

              <TableBody>
                {permissionModules.map((module) => (
                  <React.Fragment key={module.group}>
                    {/* 模組標題行 */}
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableCell colSpan={systemRoles.length + 1} className="font-black text-sm py-2 px-4">
                        {module.group}
                      </TableCell>
                    </TableRow>

                    {/* 功能項目行 */}
                    {module.items.map((item) => (
                      <TableRow key={item.key} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-bold text-sm pl-8 border-r">
                          <div className="flex items-center gap-2">
                            {/* 項目本身的勾選框 (僅示意，以單元格為主) */}
                            <div className="h-4 w-4 rounded border border-primary flex items-center justify-center bg-primary text-white">
                               <ShieldCheck className="h-3 w-3" />
                            </div>
                            {item.name}
                          </div>
                        </TableCell>
                        {systemRoles.map(role => {
                          const isChecked = (matrix[role.name] || []).includes(item.key)
                          return (
                            <TableCell 
                              key={role.id} 
                              className="text-center border-r cursor-pointer"
                              onClick={() => toggleCell(role.name, item.key)}
                            >
                              <Checkbox 
                                checked={isChecked}
                                onCheckedChange={() => toggleCell(role.name, item.key)}
                                className="h-5 w-5 data-[state=checked]:bg-primary"
                              />
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground px-2">
         <div className="h-3 w-3 rounded bg-primary" />
         <span>提示：勾選藍色項目代表該角色具備此項功能的完整存取權限。</span>
      </div>
    </div>
  )
}