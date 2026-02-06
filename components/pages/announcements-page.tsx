"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { announcements } from "@/lib/mock-data"
import { Megaphone, Calendar, ChevronRight } from "lucide-react"

function AnnouncementTypeBadge({ type }: { type: string }) {
  const variants: Record<string, string> = {
    "報名公告": "bg-primary text-primary-foreground",
    "成績公告": "bg-success text-success-foreground",
    "系統通知": "bg-info text-info-foreground",
    "錄取公告": "bg-warning text-warning-foreground",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${variants[type] || "bg-muted text-muted-foreground"}`}>
      {type}
    </span>
  )
}

export function AnnouncementsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">公告區</h1>
      </div>

      <div className="flex flex-col gap-3">
        {announcements.map((ann) => (
          <Card key={ann.id} className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Megaphone className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <AnnouncementTypeBadge type={ann.type} />
                  {ann.important && (
                    <Badge variant="destructive" className="h-4 px-1 text-[10px]">重要</Badge>
                  )}
                </div>
                <p className="mt-1.5 text-sm font-semibold text-foreground">{ann.title}</p>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {ann.date}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  )
}