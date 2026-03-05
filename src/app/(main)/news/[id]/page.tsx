"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"
import { getNewsById } from "@/lib/mock-data"
import { ArrowLeft } from "lucide-react"

function renderContent(content: string) {
    const lines = content.split("\n")
    const elements: React.ReactNode[] = []

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if (line.startsWith("### ")) {
            elements.push(
                <h3 key={i} className="text-lg font-bold mt-6 mb-3">
                    {line.replace("### ", "")}
                </h3>
            )
        } else if (line.startsWith("## ")) {
            elements.push(
                <h2 key={i} className="text-xl font-bold mt-8 mb-4">
                    {line.replace("## ", "")}
                </h2>
            )
        } else if (line.startsWith("- **")) {
            const match = line.match(/^- \*\*(.+?)\*\*[：:](.+)$/)
            if (match) {
                elements.push(
                    <li key={i} className="ml-4 list-disc text-muted-foreground mb-2">
                        <strong className="text-foreground">{match[1]}</strong>：{match[2]}
                    </li>
                )
            } else {
                const boldMatch = line.match(/^- \*\*(.+?)\*\*$/)
                if (boldMatch) {
                    elements.push(
                        <li key={i} className="ml-4 list-disc text-muted-foreground mb-2">
                            <strong className="text-foreground">{boldMatch[1]}</strong>
                        </li>
                    )
                }
            }
        } else if (line.startsWith("- ")) {
            elements.push(
                <li key={i} className="ml-4 list-disc text-muted-foreground mb-2">
                    {line.replace("- ", "")}
                </li>
            )
        } else if (/^\d+\.\s/.test(line)) {
            elements.push(
                <li key={i} className="ml-4 list-decimal text-muted-foreground mb-2">
                    {line.replace(/^\d+\.\s/, "")}
                </li>
            )
        } else if (line.trim() === "") {
            elements.push(<div key={i} className="h-2" />)
        } else {
            elements.push(
                <p key={i} className="text-muted-foreground leading-relaxed mb-3">
                    {line}
                </p>
            )
        }
    }

    return elements
}

export default function NewsDetailPage() {
    const params = useParams()
    const id = params.id as string
    const news = getNewsById(id)

    if (!news) {
        return (
            <div className="py-24">
                <Container className="max-w-3xl text-center">
                    <h1 className="text-2xl font-bold mb-4">新闻未找到</h1>
                    <p className="text-muted-foreground mb-8">您访问的新闻不存在或已被删除。</p>
                    <Link href="/news" className="text-primary hover:underline inline-flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> 返回新闻列表
                    </Link>
                </Container>
            </div>
        )
    }

    return (
        <div className="py-24">
            <Container className="max-w-3xl">
                <FadeIn>
                    <Link href="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 mb-8">
                        <ArrowLeft className="h-4 w-4" /> 返回新闻列表
                    </Link>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            {news.category}
                        </span>
                        <span className="text-muted-foreground">{news.date}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold mb-8">{news.title}</h1>

                    {news.image && (
                        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 bg-slate-100">
                            <Image
                                src={news.image}
                                alt={news.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="text-foreground">
                        {renderContent(news.content)}
                    </div>
                </FadeIn>
            </Container>
        </div>
    )
}
