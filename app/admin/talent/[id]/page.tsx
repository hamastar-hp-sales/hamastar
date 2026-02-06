"use client"

import React from "react"
import { useParams } from "next/navigation"
import { AppShell } from "@/components/app-shell"
import { AdminTalentDetailPage } from "@/components/pages/admin-talent-detail-page"

export default function Page() {
  const params = useParams()
  const id = params.id as string

  return (
    <AppShell>
      <AdminTalentDetailPage id={id} />
    </AppShell>
  )
}