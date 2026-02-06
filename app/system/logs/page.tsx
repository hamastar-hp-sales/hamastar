"use client"

import { AppShell } from "@/components/app-shell"
import { SystemLogsPage } from "@/components/pages/system-logs-page"

export default function Page() {
  return (
    <AppShell>
      <SystemLogsPage />
    </AppShell>
  )
}
