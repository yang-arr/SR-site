"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import {
  LayoutDashboard,
  FilePlus,
  ClipboardList,
  Search,
  Star,
  UserCircle,
  ArrowLeft,
  Smartphone,
} from "lucide-react"

const sidebarItems = [
  { name: "总览", href: "/crew", icon: LayoutDashboard },
  { name: "发布订单", href: "/crew/post", icon: FilePlus },
  { name: "订单管理", href: "/crew/orders", icon: ClipboardList },
  { name: "找演员", href: "/crew/actors", icon: Search },
  { name: "评价管理", href: "/crew/reviews", icon: Star },
  { name: "我的资料", href: "/crew/profile", icon: UserCircle },
]

export function CrewSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-slate-900 text-white flex flex-col z-40">
      {/* Top bar */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Logo />
          <span className="text-xs bg-primary/20 text-primary-foreground px-2 py-0.5 rounded-full font-medium">剧组端</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            返回官网
          </Link>
          <Link href="/miniapp" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
            <Smartphone className="h-3.5 w-3.5" />
            小程序
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/crew" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
            星
          </div>
          <div>
            <p className="text-sm font-medium">星辰影业</p>
            <p className="text-xs text-slate-400">信用分 135</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
