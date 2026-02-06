"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { trainingClasses } from "@/lib/mock-data"
import { Search, MapPin, Calendar, Award, ChevronRight } from "lucide-react"

export function QualifiedListPage() {
  const [search, setSearch] = React.useState("")
  
  // Get the last 10 finished classes
  const finishedClasses = trainingClasses
    .filter(c => c.status === "已結束")
    .slice(0, 10)
    .filter(c => !search || c.name.includes(search) || c.id.includes(search))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-foreground">培訓合格名單公告</h1>
          <div className="h-1.5 w-24 bg-primary" />
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="搜尋班別名稱或編號..." 
                className="pl-10 h-12 text-lg bg-card"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {finishedClasses.map((cls) => (
            <Card key={cls.id} className="group hover:shadow-lg transition-all border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                    {cls.id}
                  </span>
                  <Award className="h-5 w-5 text-success" />
                </div>
                <CardTitle className="text-lg font-black mt-2 leading-tight group-hover:text-primary transition-colors">
                  {cls.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex flex-col gap-2 text-sm font-bold text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    地點：{cls.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-accent" />
                    結訓日期：{cls.endDate}
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-6 pt-0">
                <Link href={`/qualified-list/${cls.id}`}>
                  <Button className="w-full font-black group-hover:shadow-md" variant="outline">
                    檢視合格人員名單
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}