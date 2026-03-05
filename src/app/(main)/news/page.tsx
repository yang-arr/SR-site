import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"
import Link from "next/link"
import { mockNews } from "@/lib/mock-data"

export default function NewsPage() {
    return (
        <div className="py-24">
            <Container>
                <h1 className="text-4xl font-bold mb-12">新闻动态</h1>
                <div className="grid gap-8">
                    {mockNews.map((item, i) => (
                        <FadeIn key={item.id} delay={i * 0.1}>
                            <Link href={`/news/${item.id}`} className="block">
                                <div className="group flex flex-col md:flex-row gap-8 items-start md:items-center p-6 rounded-2xl border hover:border-primary/50 transition-colors bg-white">
                                    <div className="h-48 w-full md:w-72 bg-slate-100 rounded-xl shrink-0 overflow-hidden relative">
                                        {item.image ? (
                                            <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200 group-hover:scale-105 transition-transform duration-500"></div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-3 text-sm">
                                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{item.category}</span>
                                            <span className="text-muted-foreground">{item.date}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{item.title}</h2>
                                        <p className="text-muted-foreground line-clamp-2">
                                            {item.summary || "更多详细内容点击查看..."}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>
            </Container>
        </div>
    )
}
