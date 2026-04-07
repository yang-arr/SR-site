"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ArrowRight, Clapperboard, User, Video, Shield, Clock, Search, X } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { RegisterModal } from "@/components/register-modal"

export default function Home() {
  const [showRoleModal, setShowRoleModal] = React.useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <RegisterModal open={showRoleModal} onClose={() => setShowRoleModal(false)} />
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-44 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <Container className="flex flex-col items-center text-center">
          <FadeIn>
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-background/50 backdrop-blur-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              全新 SceneReady 2.0 上线
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6">
              连接<span className="text-primary">人才</span>与<span className="text-primary">机遇</span><br />
              重新定义试戏流程
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
              SceneReady 是为剧组与演员打造的高效选角平台。在线投递、视频面试、智能管理，让每一个角色找到最佳人选。
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20" asChild>
              <Link href="/crew">我是剧组 <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
              <Link href="/actor">我是演员 <User className="ml-2 h-4 w-4" /></Link>
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* Interactive App Demo Section */}
      <AppDemoSection />

      <section className="py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">全流程数字化选角体验</h2>
            <p className="text-muted-foreground text-lg">从组讯发布到最终定角，SceneReady 覆盖每一个环节，提升 50% 以上的工作效率。</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Search, title: "智能匹配", desc: "基于 AI 算法，为角色精准推荐最匹配的演员人选。" },
              { icon: Video, title: "云端试戏", desc: "高清流畅的视频连线，支持实时录制与回放笔记。" },
              { icon: Shield, title: "隐私保护", desc: "剧本阅后即焚，联系方式加密，全方位保障项目安全。" },
              { icon: Clock, title: "进度管理", desc: "看板式管理试戏进度，团队成员实时同步状态。" },
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.1} className="bg-muted/20 p-6 rounded-xl border hover:border-primary/30 transition-colors">
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>


      <section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">精选通告与合作案例</h2>
            <p className="text-muted-foreground">每天都有数百个优质剧组在这里找到心仪的演员</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: "case1", src: "/images/UxmRP.jpg", title: "院线电影《长夜破晓》", tag: "正在热招" },
              { id: "case2", src: "/images/dHGwH.jpg", title: "古装剧《锦绣未央2》", tag: "角色海选" },
              { id: "case3", src: "/images/ZPANu.jpg", title: "品牌广告 TVC", tag: "急招" },
            ].map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.1} className="group cursor-pointer">
                <Link href="/actor">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                      {item.tag}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <FadeIn className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 text-center text-white shadow-2xl">
            <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
              <Image
                src="/images/QKDqy.jpg"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">准备好开始了吗？</h2>
              <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10">
                立即加入 SceneReady，开启高效专业的选角之旅。免费注册，尽享好机会。
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-10 text-lg font-semibold text-primary hover:bg-white hover:scale-105 transition-all"
                onClick={() => setShowRoleModal(true)}
              >
                立即注册账号
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}

function AppDemoSection() {
  const [activeTab, setActiveTab] = React.useState<"crew" | "actor">("crew")

  return (
    <section className="py-24 bg-muted/30 scroll-mt-20" id="demo">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">真实的产品体验</h2>
            <p className="text-xl text-muted-foreground">流畅的原生体验，让选角随时随地。</p>
          </FadeIn>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left: Controls & Context */}
          <div className="flex-1 w-full max-w-lg">
            <FadeIn direction="right">
              <div className="bg-white p-2 rounded-2xl shadow-sm border inline-flex gap-2 mb-10 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab("crew")}
                  className={cn(
                    "flex-1 sm:flex-none px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2",
                    activeTab === "crew" ? "bg-primary text-white shadow-md" : "hover:bg-gray-50 text-muted-foreground"
                  )}
                >
                  <Clapperboard className="h-4 w-4" /> 我是剧组
                </button>
                <button
                  onClick={() => setActiveTab("actor")}
                  className={cn(
                    "flex-1 sm:flex-none px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2",
                    activeTab === "actor" ? "bg-primary text-white shadow-md" : "hover:bg-gray-50 text-muted-foreground"
                  )}
                >
                  <User className="h-4 w-4" /> 我是演员
                </button>
              </div>

              <div className="space-y-8 min-h-[300px]">
                {activeTab === "crew" ? (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <h3 className="text-3xl font-bold mb-4">剧组端：掌上选角工作室</h3>
                    <p className="text-lg text-muted-foreground mb-8">
                      随时随地发布通告，实时接收报名通知。
                    </p>
                    <ul className="space-y-4">
                      {[
                        { title: "发布组讯", desc: "极简表单，3分钟完成发布" },
                        { title: "简历筛选", desc: "卡片式浏览，左滑淘汰右滑收藏" },
                        { title: "消息中心", desc: "与演员在线沟通，预约面试时间" }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 pt-8 border-t">
                      <Button asChild size="lg" className="rounded-full">
                        <Link href="/crew">了解剧组端详情 <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-3xl font-bold mb-4">演员端：你的随身经纪人</h3>
                    <p className="text-lg text-muted-foreground mb-8">
                      不错过任何一个好角色，资料一键生成。
                    </p>
                    <ul className="space-y-4">
                      {[
                        { title: "电子模卡", desc: "上传照片自动生成专业模卡" },
                        { title: "职位推荐", desc: "AI 匹配最适合你的角色机会" },
                        { title: "投递记录", desc: "实时查看被查看状态，心中有数" }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 pt-8 border-t">
                      <Button asChild size="lg" className="rounded-full">
                        <Link href="/actor">了解演员端详情 <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Right: Image Showcase */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <FadeIn className="relative w-full max-w-lg">
              {/* Background Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-3xl rounded-full -z-10 animate-pulse"></div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)]">
                <div className={cn("absolute inset-0 transition-opacity duration-500", activeTab === "crew" ? "opacity-100 z-10" : "opacity-0 z-0")}>
                  <Image
                    src="/images/crew-showcase.jpg"
                    alt="剧组选角场景"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={cn("absolute inset-0 transition-opacity duration-500", activeTab === "actor" ? "opacity-100 z-10" : "opacity-0 z-0")}>
                  <Image
                    src="/images/actor-showcase.jpg"
                    alt="演员试戏场景"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  )
}
