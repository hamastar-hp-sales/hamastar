"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { trainingClasses } from "@/lib/mock-data"
import { MapPin, Navigation, Clock, GraduationCap, ArrowRight, MousePointer2, Layers, Award } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function TrainingMapSection() {
  const recommendedClass = trainingClasses.find(c => c.location === "台中市" && c.status === "報名中") || trainingClasses[0]

  return (
    <section className="mt-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          全台培訓場次導引
        </h2>
        <div className="h-1 w-20 bg-primary" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Advanced Virtual Map View */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-[#e5e7eb] lg:col-span-8 h-[500px] shadow-inner group">
          {/* Map Grid Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', size: '20px 20px' }} />
          
          {/* Mock Map Features (Roads/Areas) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-[80%] h-[80%] border-[40px] border-white/40 rounded-full blur-3xl opacity-50" />
             <div className="absolute top-1/4 left-1/3 w-32 h-1 bg-white/60 rotate-45" />
             <div className="absolute bottom-1/3 right-1/4 w-48 h-1 bg-white/60 -rotate-12" />
          </div>
          
          {/* Map Controls Overlay */}
          <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="h-9 w-9 rounded-md shadow-md bg-card/90">
              <Layers className="h-4 w-4" />
            </Button>
            <div className="flex flex-col rounded-md border border-border bg-card/90 shadow-md">
              <Button variant="ghost" size="icon" className="h-9 w-9 border-b">+</Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">-</Button>
            </div>
          </div>

          {/* Interactive Markers */}
          {/* North */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
             <MapMarker label="台北場" status="已結束" />
          </div>

          {/* Center (Taichung - Current Location Example) */}
          <div className="absolute top-1/2 left-[45%] -translate-x-1/2">
             <div className="relative">
                <div className="flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-accent text-white shadow-2xl ring-4 ring-accent/30 cursor-pointer">
                  <Navigation className="h-6 w-6" />
                </div>
                <div className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#333] text-white px-3 py-1.5 text-xs font-black shadow-xl">
                  您目前所在地：台中
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-[#333]" />
                </div>
             </div>
          </div>

          {/* South */}
          <div className="absolute bottom-1/4 left-[40%]">
             <MapMarker label="高雄場" status="已結束" />
          </div>
          
          {/* Map Legend Overlay */}
          <div className="absolute left-4 bottom-4 z-10 flex flex-col gap-2 rounded-lg border border-border bg-card/90 p-3 shadow-md backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-success" />
              <span className="text-xs font-bold">目前開放報名</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-info" />
              <span className="text-xs font-bold">預計開班</span>
            </div>
          </div>

          {/* Bottom Prompt */}
          <div className="absolute bottom-4 right-4 z-10 hidden md:flex items-center gap-2 text-[11px] font-bold text-muted-foreground bg-card/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <MousePointer2 className="h-3 w-3" />
            點擊地圖標記查看場次詳情
          </div>
        </div>

        {/* Info Only */}
        <div className="flex flex-col lg:col-span-4 h-[500px]">
          <Card className="flex flex-col h-full border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-black text-primary">當前推薦場次</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 pb-6 gap-4">
              <div className="flex flex-col flex-1 rounded-xl bg-card p-5 shadow-sm border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-success text-success-foreground font-bold px-3">報名中</Badge>
                  <span className="text-[11px] font-mono font-bold text-muted-foreground">{recommendedClass.id}</span>
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-black text-foreground leading-tight">
                    {recommendedClass.name}
                  </h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      地點：{recommendedClass.location} (距離 1.2km)
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      日期：{recommendedClass.startDate} 起
                    </div>
                  </div>
                </div>
                <Link href={`/registration?classId=${recommendedClass.id}`} className="mt-4">
                  <Button className="w-full font-black py-6 text-lg shadow-lg group" size="lg">
                    立即前往報名
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function MapMarker({ label, status, active = false }: { label: string, status: string, active?: boolean }) {
  const color = status === "報名中" ? "bg-success" : "bg-muted-foreground"
  return (
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
       <div className={cn(
         "h-3 w-3 rounded-full ring-4 transition-all",
         active ? "bg-primary ring-primary/30 scale-125" : `${color} ring-white/50 group-hover:scale-110`
       )} />
       <div className={cn(
         "whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-bold shadow-sm",
         active ? "bg-primary text-white" : "bg-white text-foreground"
       )}>
         {label}
       </div>
    </div>
  )
}