"use client"

import { AppShell } from "@/components/app-shell"
import { QualifiedListPage } from "@/components/pages/qualified-list-page"

export default function Page() {
  return (
    <AppShell>
      <QualifiedListPage />
    </AppShell>
  )
}