"use client"

import React from "react"
import { useParams } from "next/navigation"
import { AppShell } from "@/components/app-shell"
import { TalentDetailPage } from "@/components/pages/talent-detail-page"

export default function Page() {
  const params = useParams()
  const id = params.id as string

  return (
    <AppShell>
      <TalentDetailPage id={id} />
    </AppShell>
  )
}