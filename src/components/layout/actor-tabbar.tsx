"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Briefcase, Users, ClipboardList, UserCircle, ArrowLeft, Bell } from "lucide-react"

const tabItems = [
  { name: "任务", href: "/actor", icon: Briefcase },
  { name: "社区", href: "/actor/community", icon: Users },
  { name: "订单", href: "/actor/orders", icon: ClipboardList },
  { name: "我的", href: "/actor/profile", icon: UserCircle },
]

export function ActorTabbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border z-40">
      <div className="max-w-3xl mx-auto flex items-center justify-around h-14">
        {tabItems.map((item) => {
          const isActive = item.href === "/actor"
            ? pathname === "/actor"
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-4 py-1 min-w-[72px] transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "scale-110")} />
              <span className={cn("text-xs", isActive ? "font-semibold" : "font-medium")}>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export function ActorHeader({ title, showBack = false }: { title?: string; showBack?: boolean }) {
  const pathname = usePathname()
  const isSubPage = showBack || (pathname.split("/").length > 2 && !tabItems.some(t => t.href === pathname))

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="max-w-3xl mx-auto flex items-center h-14 px-4 md:px-6">
        {isSubPage ? (
          <Link href="/actor" className="flex items-center gap-1 text-muted-foreground hover:text-foreground mr-3 -ml-1 p-1">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        ) : null}
        <h1 className="text-lg font-semibold flex-1">{title || "SceneReady"}</h1>
        <div className="flex items-center gap-3">
          <Link href="/actor/messages" className="text-muted-foreground hover:text-foreground p-1">
            <Bell className="h-5 w-5" />
          </Link>
          <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors hidden sm:block">
            返回官网
          </Link>
        </div>
      </div>
    </header>
  )
}
