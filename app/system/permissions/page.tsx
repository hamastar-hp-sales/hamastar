"use client"

import { AppShell } from "@/components/app-shell"
import { SystemPermissionsPage } from "@/components/pages/system-permissions-page"

export default function Page() {
  return (
    <AppShell>
      <SystemPermissionsPage />
    </AppShell>
  )
}
