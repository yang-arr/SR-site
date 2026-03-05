import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"

const productLinks = [
    { name: "剧组端", href: "/crew" },
    { name: "演员端", href: "/actor" },
]

const companyLinks = [
    { name: "关于我们", href: "/about" },
    { name: "新闻动态", href: "/news" },
    { name: "合作入驻", href: "/partner" },
]

const legalLinks = [
    { name: "隐私政策", href: "/privacy" },
    { name: "用户协议", href: "/terms" },
    { name: "常见问题", href: "/faq" },
]

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-background pt-16 pb-8">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Column 1: Logo + Description */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-md shrink-0">
                                <Image
                                    src="/logo.jpg"
                                    alt="SceneReady Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="font-semibold text-lg font-roboto text-foreground">SceneReady</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            为剧组与演员打造的高效选角平台。在线投递、智能匹配、信用保障，让每一个角色找到最佳人选。
                        </p>
                        <p className="text-xs text-muted-foreground">
                            &copy; {new Date().getFullYear()} SceneReady. All rights reserved.
                        </p>
                    </div>

                    {/* Column 2: 产品 */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">产品</h3>
                        <ul className="space-y-3">
                            {productLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: 公司 */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">公司</h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: 法律 */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">法律</h3>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <span>联系邮箱：bd@sceneready.cn</span>
                    <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        渝ICP备2026001779号-2
                    </a>
                    <span>重庆市北碚区天生路85号</span>
                </div>
            </Container>
        </footer>
    )
}
