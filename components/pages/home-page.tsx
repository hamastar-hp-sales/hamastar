"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { announcements } from "@/lib/mock-data"
import { Megaphone, GraduationCap, ArrowRight, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

// Import new modular sections
import { StatsSection } from "./home-page/StatsSection"
import { TrainingMapSection } from "./home-page/TrainingMapSection"

const banners = [
  {
    image: "/images/banner-heritage.jpg",
    title: "古蹟修復工程工地負責人資料管理系統",
    description: "文化部文化資產局 — 保存文化資產，傳承歷史記憶",
  },
  {
    image: "/images/banner-heritage-02.jpg",
    title: "跨越時空 · 守護文化資產",
    description: "透過專業維修與管理，讓歷史建築重現昔日輝煌",
  }
]

function AnnouncementTypeBadge({ type }: { type: string }) {
  const variants: Record<string, string> = {
    "報名公告": "bg-primary text-primary-foreground",
    "成績公告": "bg-success text-success-foreground",
    "系統通知": "bg-info text-info-foreground",
    "錄取公告": "bg-warning text-warning-foreground",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${variants[type] || "bg-muted text-muted-foreground"}`}>
      {type}
    </span>
  )
}

export function HomePage() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <div className="flex flex-col pb-20">
      {/* Hero Banner Carousel */}
      <section className="relative w-full">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[340px] w-full overflow-hidden sm:h-[420px] lg:h-[480px]">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 sm:pb-14">
                    <h1 className="mb-3 text-center text-2xl font-black text-card drop-shadow-lg sm:text-3xl lg:text-4xl text-balance px-4">
                      {banner.title}
                    </h1>
                    <p className="mb-6 text-center text-sm font-bold text-card/90 drop-shadow sm:text-base px-4">
                      {banner.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Link href="/training">
                        <Button 
                          size="lg" 
                          className="gap-2 shadow-lg font-black bg-[#7B241C] hover:bg-[#641E16] text-white border-none transition-colors"
                        >
                          <GraduationCap className="h-5 w-5" />
                          培訓班報名
                        </Button>
                      </Link>
                      <Link href="/talent-search">
                        <Button 
                          size="lg" 
                          className="gap-2 shadow-lg font-black bg-[#388E3C] hover:bg-[#2E7D32] text-white border-none transition-colors"
                        >
                          <ArrowRight className="h-5 w-5" />
                          人才庫查詢
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden lg:block">
            <CarouselPrevious className="left-4 bg-card/20 text-card border-none hover:bg-card/40" />
            <CarouselNext className="right-4 bg-card/20 text-card border-none hover:bg-card/40" />
          </div>
        </Carousel>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-0 lg:px-6">
        
        {/* 1. Official Statistics Section - Directly under carousel */}
        <StatsSection />

        {/* Latest Announcements Header */}
        <div className="flex flex-col gap-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Megaphone className="h-6 w-6 text-primary" />
                最新公告
              </h2>
              <div className="h-1 w-16 bg-primary" />
            </div>
            <Link href="/announcements">
              <Button variant="ghost" size="sm" className="text-primary font-bold">
                查看全部公告 <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.slice(0, 3).map((ann) => (
              <Card key={ann.id} className="group overflow-hidden flex flex-col border-border/50 hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={ann.imageUrl}
                    alt={ann.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <AnnouncementTypeBadge type={ann.type} />
                    {ann.important && (
                      <Badge variant="destructive" className="h-5 px-1.5 text-[10px] font-black uppercase">重要</Badge>
                    )}
                  </div>
                </div>
                <CardContent className="flex-1 p-5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground mb-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {ann.date}
                  </div>
                  <h3 className="text-base font-black text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {ann.title}
                  </h3>
                </CardContent>
                <CardFooter className="px-5 py-4 pt-0">
                  <Button variant="outline" size="sm" className="w-full font-bold text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    閱讀詳情
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* 2. Map-based Training Section */}
        <TrainingMapSection />

      </div>
    </div>
  )
}