"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqItems = [
    {
        q: "SceneReady 既然是免费注册，那后续收费吗？",
        a: "目前针对演员用户的基础功能完全免费，包括建立模卡和浏览组讯。剧组发布组讯也是免费的。我们未来可能会推出高级会员增值服务，但基础功能将永久免费。",
    },
    {
        q: "如何保证我的个人隐私安全？",
        a: "我们极其重视隐私保护。对于演员，您的联系方式只有在您主动投递并被剧组查看后才会展示。对于剧组，剧本等敏感资料支持「阅后即焚」和水印保护功能。",
    },
    {
        q: "我没有专业的试戏视频可以投递吗？",
        a: "可以的。SceneReady 提供了在线录制功能，您只需要按照剧组给出的台词片段，使用手机或电脑摄像头在安静环境下录制即可，系统会引导您完成。",
    },
    {
        q: "平台上的组讯真实吗？",
        a: "所有剧组入驻均需要进行实名认证和项目备案审核。一旦发现虚假组讯，我们将立即下架并封禁账号，保障演员权益。",
    },
    {
        q: "什么是信用分？如何提高？",
        a: "信用分是平台对用户的综合评价指标。演员按时到达、完成工作、获得好评都可以增加信用分。信用分达到130以上的剧组将获得「金牌剧组」认证。",
    },
    {
        q: "即时单和预约单有什么区别？",
        a: "即时单指集合时间在2小时以内的紧急信息，预约单是提前预约的常规信息。即时单通常薪资更高，但需要演员能快速响应。",
    },
    {
        q: "如何成为金牌剧组？",
        a: "金牌剧组需要信用分达到130分以上。保持按时发薪、准确描述工作内容、善待演员等行为都会增加信用分。",
    },
    {
        q: "如何联系客服？",
        a: "您可以通过小程序内的在线客服功能联系我们，也可以发送邮件至 support@sceneready.cn。我们的工作时间为周一至周五 9:00-18:00。",
    },
]

export default function FAQPage() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="py-24">
            <Container className="max-w-3xl">
                <FadeIn>
                    <h1 className="text-4xl font-bold mb-12 text-center">常见问题</h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="space-y-4">
                        {faqItems.map((item, i) => {
                            const isOpen = openIndex === i
                            return (
                                <div key={i} className="rounded-xl border bg-card shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => toggle(i)}
                                        className="w-full flex items-center justify-between p-6 text-left"
                                    >
                                        <h3 className="font-semibold text-lg pr-4">{item.q}</h3>
                                        <ChevronDown
                                            className={cn(
                                                "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                                                isOpen && "rotate-180"
                                            )}
                                        />
                                    </button>
                                    <div
                                        className={cn(
                                            "overflow-hidden transition-all duration-200",
                                            isOpen ? "max-h-96 pb-6" : "max-h-0"
                                        )}
                                    >
                                        <p className="px-6 text-muted-foreground leading-relaxed">{item.a}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </FadeIn>
            </Container>
        </div>
    )
}
