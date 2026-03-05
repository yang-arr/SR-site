"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function PartnerPage() {
    const [formData, setFormData] = useState({
        companyName: "",
        contactName: "",
        phone: "",
        email: "",
        companyType: "",
        notes: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        alert("申请已提交，我们将在1-3个工作日内与您联系！")
    }

    const steps = [
        { num: "1", title: "提交申请", desc: "填写公司信息\n上传资质文件" },
        { num: "2", title: "资质审核", desc: "1-3个工作日\n审核公司资质" },
        { num: "3", title: "签约入驻", desc: "签订合作协议\n开通企业账户" },
        { num: "4", title: "开始使用", desc: "发布订单\n高效匹配人才" },
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-20 bg-background">
                <Container className="text-center">
                    <FadeIn>
                        <span className="text-primary font-semibold text-sm tracking-wider">PARTNERSHIP</span>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
                            成为合作伙伴
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            加入SceneReady生态，共同开拓短剧行业新市场
                        </p>
                    </FadeIn>
                </Container>
            </section>

            <section className="py-20 bg-muted/30">
                <Container>
                    <FadeIn className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground">入驻流程</h2>
                    </FadeIn>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <FadeIn key={step.num} delay={index * 0.1}>
                                <motion.div
                                    className="flex flex-col items-center text-center"
                                    whileHover={{ y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/25">
                                        <span className="text-white text-2xl font-bold">{step.num}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground whitespace-pre-line">{step.desc}</p>
                                </motion.div>
                            </FadeIn>
                        ))}
                    </div>

                    <div className="hidden md:flex justify-center mt-8">
                        <div className="flex items-center gap-4 w-full max-w-3xl">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex-1 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 rounded"></div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-20 bg-background">
                <Container className="max-w-2xl">
                    <FadeIn className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-foreground mb-4">立即申请入驻</h2>
                        <p className="text-muted-foreground">填写以下信息，我们将在1-3个工作日内与您联系</p>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <form onSubmit={handleSubmit} className="bg-muted/30 rounded-2xl p-8 md:p-10 space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">公司名称 *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full h-12 px-4 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="请输入公司全称"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">联系人 *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full h-12 px-4 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="请输入联系人姓名"
                                        value={formData.contactName}
                                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">联系电话 *</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full h-12 px-4 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="请输入联系电话"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">电子邮箱 *</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full h-12 px-4 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="请输入电子邮箱"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">公司类型 *</label>
                                <select
                                    required
                                    className="w-full h-12 px-4 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                                    value={formData.companyType}
                                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                                >
                                    <option value="">请选择公司类型</option>
                                    <option value="production">影视制作公司</option>
                                    <option value="agency">经纪公司</option>
                                    <option value="casting">选角公司</option>
                                    <option value="studio">工作室</option>
                                    <option value="platform">平台方</option>
                                    <option value="other">其他</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">备注信息</label>
                                <textarea
                                    className="w-full h-32 px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    placeholder="请简要描述您的合作需求（选填）"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full h-14 text-lg font-semibold"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        提交中...
                                    </span>
                                ) : (
                                    "提交申请"
                                )}
                            </Button>

                            <p className="text-center text-xs text-muted-foreground">
                                提交即表示您同意我们的服务条款和隐私政策
                            </p>
                        </form>
                    </FadeIn>
                </Container>
            </section>
        </div>
    )
}
