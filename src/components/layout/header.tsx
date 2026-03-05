"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "@/components/ui/container"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const navItems = [
    { name: "首页", href: "/" },
    { name: "剧组端", href: "/crew" },
    { name: "演员端", href: "/actor" },
    { name: "新闻动态", href: "/news" },
    { name: "关于我们", href: "/about" },
    { name: "常见问题", href: "/faq" },
    { name: "合作入驻", href: "/partner" },
]

export function Header() {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
            <Container className="flex h-20 items-center justify-between">
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    <Logo />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-[15px] font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-foreground font-semibold" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-4">
                    <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 rounded-lg text-sm" asChild>
                        <Link href="/miniapp">立即试戏</Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2 -mr-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </Container>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-x-0 top-20 bg-background border-b shadow-lg p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-lg font-medium py-2 border-b border-gray-100 last:border-0"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button className="w-full mt-4 bg-primary text-white" asChild>
                        <Link href="/miniapp">立即试戏</Link>
                    </Button>
                </div>
            )}
        </header>
    )
}
