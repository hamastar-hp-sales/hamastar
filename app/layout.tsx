import React from "react"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_TC } from "next/font/google"

import "./globals.css"

const notoSansTC = Noto_Sans_TC({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "古蹟修復工程工地負責人資料管理系統",
  description: "文化部文化資產局 - 古蹟修復工程工地負責人資料管理系統",
}

export const viewport: Viewport = {
  themeColor: "#5c3a21",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${notoSansTC.className} antialiased font-bold`}>{children}</body>
    </html>
  )
}