import { LayoutDashboard, GraduationCap, FileText, FolderOpen, Clock, User, Search, Users, ClipboardList, Settings, Shield, Key, ScrollText, Home, Megaphone, Briefcase, Award, ClipboardCheck, Scroll, ShieldAlert } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  children?: NavItem[]
  badge?: string
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const frontendNavigation: NavGroup[] = [
  {
    label: "主選單",
    items: [
      { title: "首頁", href: "/", icon: Home },
      { title: "公告區", href: "/announcements", icon: Megaphone, badge: "2" },
      { title: "培訓班線上報名", href: "/training", icon: GraduationCap },
      { title: "錄取及候補查詢", href: "/admission-results", icon: ClipboardCheck },
      { title: "培訓合格名單", href: "/qualified-list", icon: Scroll },
    ],
  },
  {
    label: "個人中心",
    items: [
      { title: "基本資料", href: "/profile", icon: User },
      { title: "工作經歷", href: "/profile/experience", icon: Briefcase },
      { title: "證照管理", href: "/profile/certificates", icon: Award },
      { title: "培訓報名與結果", href: "/profile/registrations", icon: Clock },
      { title: "補件中心", href: "/profile/supplement", icon: FolderOpen, badge: "1" },
      { title: "回訓登錄", href: "/profile/retraining", icon: GraduationCap },
      { title: "機關註記查詢", href: "/profile/remarks", icon: ShieldAlert },
    ],
  },
  {
    label: "查詢",
    items: [
      { title: "人才查詢", href: "/talent-search", icon: Search },
    ],
  },
]

export const adminNavigation: NavGroup[] = [
  {
    label: "後台管理",
    items: [
      { title: "儀表板", href: "/admin/dashboard", icon: LayoutDashboard },
      { title: "培訓班管理", href: "/admin/training", icon: GraduationCap, badge: "3" },
      { title: "人才庫管理", href: "/admin/talent", icon: Users, badge: "47" },
      { title: "查詢與篩選", href: "/admin/search", icon: Search },
    ],
  },
  {
    label: "系統管理",
    items: [
      { title: "帳號管理", href: "/system/accounts", icon: Settings },
      { title: "角色管理", href: "/system/roles", icon: Shield },
      { title: "功能權限管理", href: "/system/permissions", icon: Key },
      { title: "系統日誌", href: "/system/logs", icon: ScrollText },
    ],
  },
]