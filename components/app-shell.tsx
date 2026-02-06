"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import {
  ChevronRight,
  LogOut,
  Menu,
  ArrowUp,
  ChevronDown,
  X,
  LayoutDashboard,
  User,
  ShieldCheck,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  frontendNavigation,
  adminNavigation,
  type NavGroup,
  type NavItem,
} from "@/lib/navigation"
import { currentUser } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"

/* ───── helpers ───── */

function useFontSize() {
  const [fontSize, setFontSize] = React.useState(24) 
  
  const setLevel = (level: 'small' | 'medium' | 'large') => {
    if (level === 'small') setFontSize(20)
    if (level === 'medium') setFontSize(24)
    if (level === 'large') setFontSize(28)
  }

  React.useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])

  return { fontSize, setLevel }
}

function useBreadcrumb(pathname: string) {
  const labelMap: Record<string, string> = {
    "": "首頁",
    announcements: "公告區",
    training: "培訓班列表",
    registration: "線上報名",
    supplement: "補件中心",
    progress: "報名進度查詢",
    profile: "個人中心",
    experience: "工作經歷",
    certificates: "證照管理",
    retraining: "回訓登錄",
    registrations: "培訓報名與結果",
    "talent-search": "人才查詢",
    "admission-results": "錄取及候補查詢",
    "qualified-list": "培訓合格名單",
    admin: "後台管理",
    dashboard: "儀表板",
    talent: "人才庫管理",
    search: "查詢與篩選",
    system: "系統管理",
    accounts: "帳號管理",
    roles: "角色管理",
    permissions: "功能權限管理",
    logs: "系統日誌",
    remarks: "機關註記查詢",
  }

  const segments = pathname.split("/").filter(Boolean)
  const crumbs = [{ label: "首頁", href: "/" }]

  let path = ""
  for (const seg of segments) {
    path += `/${seg}`
    crumbs.push({
      label: labelMap[seg] || seg,
      href: path,
    })
  }

  return crumbs
}

function useIsSidebarRoute(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/system") ||
    pathname.startsWith("/profile")
  )
}

/* ───── shared: user actions (font size, role switch, user menu) ───── */

function UserActions({
  fontSize,
  onSetLevel,
  activeRole,
  onRoleChange,
}: {
  fontSize: number
  onSetLevel: (level: 'small' | 'medium' | 'large') => void
  activeRole: string
  onRoleChange: (role: string) => void
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="mr-2 hidden items-center gap-1 overflow-hidden rounded-md border border-border bg-muted/50 p-1 md:flex">
        <button
          onClick={() => onSetLevel('small')}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded text-[12px] transition-colors font-bold",
            fontSize === 20 ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"
          )}
          title="小字級"
        >
          a
        </button>
        <button
          onClick={() => onSetLevel('medium')}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded text-[16px] transition-colors font-bold",
            fontSize === 24 ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"
          )}
          title="中字級"
        >
          A
        </button>
        <button
          onClick={() => onSetLevel('large')}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded text-[20px] font-black transition-colors",
            fontSize === 28 ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"
          )}
          title="大字級"
        >
          AA
        </button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-1.5 text-foreground h-10"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {currentUser.avatar}
            </div>
            <div className="hidden flex-col items-start md:flex">
              <span className="text-sm font-bold leading-tight">{currentUser.name}</span>
              <span className="text-[10px] text-muted-foreground">
                {activeRole === 'supervisor' ? '工地負責人' : '管理者'}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-muted-foreground">帳號資訊</DropdownMenuLabel>
          <DropdownMenuItem className="font-bold cursor-pointer text-base p-2.5">
            個人設定
          </DropdownMenuItem>
          <DropdownMenuItem className="font-bold cursor-pointer text-base p-2.5">
            變更密碼
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-muted-foreground">切換身分並跳轉</DropdownMenuLabel>
          <DropdownMenuItem 
            className={cn("font-bold cursor-pointer text-base p-2.5", activeRole === 'supervisor' && "bg-muted text-primary")}
            onClick={() => onRoleChange('supervisor')}
          >
            <User className="mr-2 h-4 w-4" />
            切換為 工地負責人
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={cn("font-bold cursor-pointer text-base p-2.5", activeRole === 'admin' && "bg-muted text-primary")}
            onClick={() => onRoleChange('admin')}
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            切換為 管理者
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-bold text-destructive cursor-pointer text-base p-2.5">
            <LogOut className="mr-2 h-4 w-4" />
            登出
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

/* ───── shared: Common Footer Component ───── */

function FooterContent() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 md:flex-row md:items-start md:gap-10">
      <div className="flex shrink-0 items-center justify-center">
        <div className="relative h-16 w-32 overflow-hidden">
          <Image 
            src="/images/logo.jpg" 
            alt="Bureau of Cultural Heritage" 
            fill 
            className="object-contain grayscale contrast-125"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 text-center text-[13px] text-muted-foreground md:text-left">
        <p className="font-bold">
          文化部文化資產局 · Copyright © 2017 版權所有 隱私權及資訊安全政策宣示 | 網站資料開放宣告
        </p>
        <p className="font-bold">
          電話：(04)2217-7777 · 傳真：(04)22293027 · 地址：40247台中市南區復興路三段362號、700台南市中西區中正路1-1號
        </p>
        <p className="font-bold">
          螢幕解析度 1024x768
        </p>
      </div>

      <div className="flex shrink-0 items-center justify-center">
        <div className="flex h-14 w-44 items-center gap-2 rounded bg-[#5a8024] px-3 py-2 text-white shadow-sm">
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-black italic">無障礙標章 2.1</span>
            <span className="mt-0.5 text-[10px] font-bold tracking-tighter uppercase">Accessibility</span>
          </div>
          <div className="ml-auto flex h-10 w-10 items-center justify-center rounded bg-[#e8c045] p-1">
            <div className="grid grid-cols-3 gap-0.5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#5a8024]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getPublicNavItems(): NavItem[] {
  const mainMenu = frontendNavigation.find((g) => g.label === "主選單")
  const items: NavItem[] = []
  if (mainMenu) items.push(...mainMenu.items)
  return items
}

function PublicTopBar({
  fontSize,
  onSetLevel,
  activeRole,
  onRoleChange,
}: {
  fontSize: number
  onSetLevel: (level: 'small' | 'medium' | 'large') => void
  activeRole: string
  onRoleChange: (role: string) => void
}) {
  const pathname = usePathname()
  const navItems = getPublicNavItems()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-4">
            <div className="relative h-12 w-20 sm:h-14 sm:w-24 overflow-hidden">
              <Image 
                src="/images/logo.jpg" 
                alt="文化部文化資產局" 
                fill 
                className="object-contain object-left"
              />
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-colors whitespace-nowrap rounded-md",
                      isActive
                        ? "bg-primary/5 text-primary"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge className="ml-1 h-4 min-w-4 rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-2 ml-auto">
            <UserActions
              fontSize={fontSize}
              onSetLevel={onSetLevel}
              activeRole={activeRole}
              onRoleChange={onRoleChange}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">開啟選單</span>
            </Button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileMenuOpen(false)}
            onKeyDown={() => {}}
            role="presentation"
          />
          <div className="absolute inset-y-0 right-0 w-80 bg-card shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <span className="text-lg font-bold text-foreground">選單</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col p-3 gap-2">
              {navItems.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 rounded-md px-4 py-4 text-lg font-bold transition-colors",
                      isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                    <span>{item.title}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

function PublicBreadcrumb() {
  const pathname = usePathname()
  const crumbs = useBreadcrumb(pathname)
  if (pathname === "/" || crumbs.length <= 1) return null
  return (
    <div className="border-b border-border bg-muted/30">
      <nav aria-label="breadcrumb" className="mx-auto max-w-7xl px-4 py-2 lg:px-6">
        <ol className="flex items-center gap-2 text-sm">
          {crumbs.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
              {i === crumbs.length - 1 ? (
                <span className="font-bold text-foreground">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="font-bold text-muted-foreground hover:text-primary">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

function PublicFooter() {
  return (
    <footer className="border-t border-border bg-[#b5b5b5] py-8 lg:py-10">
      <FooterContent />
    </footer>
  )
}

function SidebarNavItem({ item, pathname, collapsed }: { item: NavItem; pathname: string; collapsed: boolean }) {
  const isActive = pathname === item.href
  const Icon = item.icon
  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2.5 text-base font-bold transition-colors",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.title}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-auto h-5 min-w-5 shrink-0 rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Link>
    </li>
  )
}

function SidebarNavGroup({ group, pathname, collapsed }: { group: NavGroup; pathname: string; collapsed: boolean }) {
  const [isOpen, setIsOpen] = React.useState(true)
  if (collapsed) {
    return (
      <ul className="flex flex-col gap-2 px-2 py-2">
        {group.items.map((item) => (
          <SidebarNavItem key={item.href} item={item} pathname={pathname} collapsed={collapsed} />
        ))}
      </ul>
    )
  }
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="px-4 py-3">
        <CollapsibleTrigger className="flex w-full items-center justify-between text-[11px] font-bold uppercase tracking-wider text-sidebar-foreground/50 hover:text-sidebar-foreground/70">
          {group.label}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", !isOpen && "-rotate-90")} />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <ul className="flex flex-col gap-1 px-2">
          {group.items.map((item) => (
            <SidebarNavItem key={item.href} item={item} pathname={pathname} collapsed={collapsed} />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

function getSidebarGroups(pathname: string): NavGroup[] {
  if (pathname.startsWith("/profile")) {
    const personalCenter = frontendNavigation.find((g) => g.label === "個人中心")
    return personalCenter ? [personalCenter] : []
  }
  return adminNavigation
}

function DesktopSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname()
  const sidebarGroups = getSidebarGroups(pathname)
  return (
    <aside className={cn("fixed inset-y-0 left-0 z-30 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300", collapsed ? "w-20" : "w-64")}>
      <ScrollArea className="flex-1 py-4">
        <nav className="flex flex-col gap-2">
          {sidebarGroups.map((group) => (
            <SidebarNavGroup key={group.label} group={group} pathname={pathname} collapsed={collapsed} />
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t border-sidebar-border p-3">
        <button type="button" onClick={onToggle} className="flex w-full items-center justify-center rounded-md p-3 text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground">
          <ChevronRight className={cn("h-6 w-6 transition-transform", !collapsed && "rotate-180")} />
        </button>
      </div>
    </aside>
  )
}

function MobileSidebar() {
  const pathname = usePathname()
  const sidebarGroups = getSidebarGroups(pathname)
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="ghost" size="icon" className="h-10 w-10 text-foreground md:hidden" onClick={() => setOpen(true)}>
        <Menu className="h-6 w-6" />
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} role="presentation" />
          <div className="absolute inset-y-0 left-0 w-80 bg-sidebar text-sidebar-foreground shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
              <span className="text-lg font-bold text-sidebar-foreground">選單</span>
              <Button variant="ghost" size="icon" className="h-10 w-10 text-sidebar-foreground/60" onClick={() => setOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <nav className="flex flex-col gap-2 py-4">
                {sidebarGroups.map((group) => (
                  <SidebarNavGroup key={group.label} group={group} pathname={pathname} collapsed={false} />
                ))}
              </nav>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  )
}

function AdminTopNav({ sidebarCollapsed, fontSize, onSetLevel, activeRole, onRoleChange }: { 
  sidebarCollapsed: boolean; 
  fontSize: number; 
  onSetLevel: (level: 'small' | 'medium' | 'large') => void;
  activeRole: string;
  onRoleChange: (role: string) => void;
}) {
  const pathname = usePathname()
  const crumbs = useBreadcrumb(pathname)

  return (
    <header className={cn("sticky top-0 z-20 flex h-14 items-center border-b border-border bg-card transition-all duration-300", sidebarCollapsed ? "md:ml-20" : "md:ml-64")}>
      <div className="flex flex-1 items-center gap-4 px-6">
        <div className="flex items-center gap-4">
          <MobileSidebar />
          <nav aria-label="breadcrumb" className="hidden md:block">
            <ol className="flex items-center gap-2 text-sm">
              {crumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                  {i === crumbs.length - 1 ? (
                    <span className="font-bold text-foreground">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="font-bold text-muted-foreground hover:text-primary">{crumb.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="flex-1" />
        <UserActions 
          fontSize={fontSize} 
          onSetLevel={onSetLevel} 
          activeRole={activeRole} 
          onRoleChange={onRoleChange} 
        />
      </div>
    </header>
  )
}

function AdminFooter({ sidebarCollapsed }: { sidebarCollapsed: boolean }) {
  return (
    <footer className={cn("border-t border-border bg-[#b5b5b5] py-8 lg:py-10 transition-all duration-300", sidebarCollapsed ? "md:ml-20" : "md:ml-64")}>
      <FooterContent />
    </footer>
  )
}

function ScrollToTop() {
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  if (!show) return null
  return (
    <Button variant="outline" size="icon" className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-card shadow-lg" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <ArrowUp className="h-6 w-6" />
    </Button>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isSidebar = useIsSidebarRoute(pathname)
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [activeRole, setActiveRole] = React.useState('supervisor') 
  const { fontSize, setLevel } = useFontSize()

  const handleRoleChange = (role: string) => {
    setActiveRole(role)
    // 根據選擇的角色立即跳轉至對應頁面
    if (role === 'supervisor') {
      router.push('/profile')
    } else if (role === 'admin') {
      router.push('/admin/dashboard')
    }
  }

  React.useEffect(() => {
    if (isSidebar) {
      setLevel('small') 
    } else {
      setLevel('medium') 
    }
  }, [isSidebar, setLevel])

  if (isSidebar) {
    return (
      <div className="min-h-screen">
        <div className="hidden md:block">
          <DesktopSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        </div>
        <AdminTopNav 
          sidebarCollapsed={sidebarCollapsed} 
          fontSize={fontSize} 
          onSetLevel={setLevel} 
          activeRole={activeRole}
          onRoleChange={handleRoleChange}
        />
        <main className={cn("min-h-[calc(100vh-12rem)] p-8 transition-all duration-300", sidebarCollapsed ? "md:ml-20" : "md:ml-64")}>
          {children}
        </main>
        <AdminFooter sidebarCollapsed={sidebarCollapsed} />
        <ScrollToTop />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <PublicTopBar 
        fontSize={fontSize} 
        onSetLevel={setLevel} 
        activeRole={activeRole} 
        onRoleChange={handleRoleChange}
      />
      <PublicBreadcrumb />
      <main className="min-h-[calc(100vh-16rem)]">{children}</main>
      <PublicFooter />
      <ScrollToTop />
    </div>
  )
}