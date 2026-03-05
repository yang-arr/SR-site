import Link from "next/link"
import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"
import { Button } from "@/components/ui/button"
import { Smartphone, Zap, Shield, MessageCircle, CreditCard, Monitor, Globe } from "lucide-react"

const features = [
    { icon: Zap, title: "智能匹配", desc: "AI 算法精准推荐，为角色找到最合适的演员" },
    { icon: Shield, title: "信用保障", desc: "双向信用评价体系，打造诚信选角生态" },
    { icon: MessageCircle, title: "即时通讯", desc: "剧组与演员在线沟通，高效确认合作细节" },
    { icon: CreditCard, title: "便捷支付", desc: "安全的薪资结算，到账快速有保障" },
]

export default function MiniAppPage() {
    return (
        <div className="py-24 bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <Container className="grid lg:grid-cols-2 gap-16 items-center">
                <FadeIn direction="right">
                    <div className="relative mx-auto w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden">
                        <div className="absolute top-0 w-full h-8 bg-black z-20 rounded-b-xl"></div>
                        <div className="bg-gray-50 w-full h-full flex flex-col pt-10 overflow-hidden text-[11px]">
                            {/* Status bar */}
                            <div className="px-5 pt-1 pb-2 flex items-center justify-between text-[10px] text-gray-400">
                                <span>9:41</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-3.5 h-2 border border-gray-400 rounded-sm relative"><div className="absolute inset-0.5 bg-gray-400 rounded-[1px]" style={{width:'60%'}}/></div>
                                </div>
                            </div>
                            {/* Header */}
                            <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-100">
                                <span className="font-bold text-sm text-gray-900">SceneReady</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                    </div>
                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                                    </div>
                                </div>
                            </div>
                            {/* Search */}
                            <div className="px-4 py-2 bg-white">
                                <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-2.5 py-1.5">
                                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                    <span className="text-gray-400">搜索剧名、角色...</span>
                                </div>
                            </div>
                            {/* Filter chips */}
                            <div className="px-4 py-1.5 flex gap-1.5 bg-white border-b border-gray-100">
                                <span className="px-2 py-0.5 bg-primary text-white rounded-full text-[9px] font-medium">综合</span>
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-[9px]">距离</span>
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-[9px]">价格</span>
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-[9px]">福利</span>
                            </div>
                            {/* Job cards */}
                            <div className="flex-1 overflow-hidden px-3 py-2 space-y-2">
                                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                                    <div className="h-20 bg-gradient-to-br from-purple-400 to-indigo-500 relative">
                                        <span className="absolute top-1.5 left-1.5 bg-black/40 text-white text-[8px] px-1.5 py-0.5 rounded-full">预约单</span>
                                        <span className="absolute top-1.5 right-1.5 bg-primary text-white text-[8px] px-1.5 py-0.5 rounded-full font-medium">¥500/天</span>
                                    </div>
                                    <div className="p-2.5">
                                        <p className="font-semibold text-gray-900 mb-0.5">微短剧《逆风翻盘》</p>
                                        <p className="text-[9px] text-gray-400 mb-1.5 line-clamp-1">女主角，25岁左右，性格坚韧独立</p>
                                        <div className="flex gap-1 mb-1.5">
                                            <span className="bg-green-50 text-green-600 text-[8px] px-1 py-0.5 rounded">包餐</span>
                                            <span className="bg-green-50 text-green-600 text-[8px] px-1 py-0.5 rounded">接送</span>
                                            <span className="bg-green-50 text-green-600 text-[8px] px-1 py-0.5 rounded">有茶水</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[9px] text-gray-400">
                                            <span>3.2km · 3/2人</span>
                                            <span className="text-yellow-500">★ 135 星辰影业</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                                    <div className="h-20 bg-gradient-to-br from-amber-400 to-orange-500 relative">
                                        <span className="absolute top-1.5 left-1.5 bg-black/40 text-white text-[8px] px-1.5 py-0.5 rounded-full">即时单</span>
                                        <span className="absolute top-1.5 right-1.5 bg-primary text-white text-[8px] px-1.5 py-0.5 rounded-full font-medium">¥80/时</span>
                                    </div>
                                    <div className="p-2.5">
                                        <p className="font-semibold text-gray-900 mb-0.5">品牌广告 TVC 拍摄</p>
                                        <p className="text-[9px] text-gray-400 mb-1.5 line-clamp-1">阳光帅气的男大学生形象</p>
                                        <div className="flex gap-1 mb-1.5">
                                            <span className="bg-green-50 text-green-600 text-[8px] px-1 py-0.5 rounded">包餐</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[9px] text-gray-400">
                                            <span>5.8km · 3/3人</span>
                                            <span className="text-yellow-500">★ 135 星辰影业</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Bottom tab bar */}
                            <div className="bg-white border-t border-gray-200 flex items-center justify-around py-1.5 px-2 shrink-0">
                                <div className="flex flex-col items-center gap-0.5 text-primary">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                    <span className="text-[8px] font-medium">任务</span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    <span className="text-[8px]">社区</span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                                    <span className="text-[8px]">订单</span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                    <span className="text-[8px]">我的</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <div>
                    <FadeIn>
                        <div className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-medium mb-6">
                            <Smartphone className="h-4 w-4 mr-2" /> 微信小程序
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">随时随地，掌握试戏动态</h1>
                        <p className="text-xl text-muted-foreground mb-10">
                            无需下载 App，微信扫一扫即可使用。SceneReady 小程序版为您提供极致轻量的移动端体验。
                        </p>

                        <div className="bg-white p-6 rounded-2xl border shadow-lg inline-block text-center">
                            <img
                                src="/images/miniapp-qrcode.png"
                                alt="SceneReady 小程序二维码"
                                className="w-40 h-40 mb-4 mx-auto object-contain"
                            />
                            <p className="text-sm font-medium text-slate-600">微信扫码体验</p>
                        </div>
                    </FadeIn>
                </div>
            </Container>

            {/* Web Version Section */}
            <Container className="mt-24">
                <FadeIn>
                    <div className="bg-white rounded-2xl border shadow-sm p-10 text-center">
                        <h2 className="text-2xl font-bold mb-3">使用 Web 版</h2>
                        <p className="text-muted-foreground mb-8">除了小程序，您也可以通过网页端使用 SceneReady 的完整功能。</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="h-12 px-8 text-base" asChild>
                                <Link href="/crew">进入剧组端</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                                <Link href="/actor">进入演员端</Link>
                            </Button>
                        </div>
                    </div>
                </FadeIn>
            </Container>

            {/* Feature Highlights */}
            <Container className="mt-24">
                <FadeIn>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">平台核心优势</h2>
                        <p className="text-muted-foreground">为剧组和演员提供全方位的服务保障</p>
                    </div>
                </FadeIn>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className="bg-white rounded-xl border p-6 text-center hover:border-primary/30 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.desc}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </Container>

            {/* Multi-platform Section */}
            <Container className="mt-24">
                <FadeIn>
                    <div className="bg-primary/5 rounded-2xl p-10 text-center">
                        <h2 className="text-2xl font-bold mb-3">多端体验</h2>
                        <p className="text-muted-foreground mb-8">
                            无论您使用哪种设备，都能获得一致的优质体验。
                        </p>
                        <div className="flex justify-center gap-12">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-2xl bg-white border shadow-sm flex items-center justify-center">
                                    <Monitor className="h-8 w-8 text-primary" />
                                </div>
                                <span className="text-sm font-medium">Web 端</span>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-2xl bg-white border shadow-sm flex items-center justify-center">
                                    <Globe className="h-8 w-8 text-primary" />
                                </div>
                                <span className="text-sm font-medium">小程序</span>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </Container>
        </div>
    )
}
