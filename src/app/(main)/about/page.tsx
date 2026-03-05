import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"
import { Users, Mail, MapPin } from "lucide-react"
import Image from "next/image"
export default function AboutPage() {
    return (
        <div className="py-24">
            <Container>
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">关于 SceneReady</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            我们致力于通过技术创新，为影视行业带来更高效、更透明的选角体验。
                        </p>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
                    <FadeIn direction="right" className="bg-slate-100 rounded-3xl aspect-video w-full relative overflow-hidden">
                        <Image src="/images/about_meeting.jpg" alt="关于我们" fill className="object-cover" />
                    </FadeIn>
                    <FadeIn direction="left">
                        <h2 className="text-3xl font-bold mb-6">我们的使命</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            在传统的影视制作流程中，选角往往是最耗时、信息最不对称的环节。SceneReady 团队由资深影视制作人和顶尖互联网工程师组成，我们希望打破地域限制，让每一个有才华的演员都能被看见，让每一个剧组都能高效找到最合适的角色。
                        </p>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <ContactCard icon={<Mail />} title="商务合作" info="bd@sceneready.cn" />
                    <ContactCard icon={<Users />} title="加入我们" info="hr@sceneready.cn" />
                    <ContactCard icon={<MapPin />} title="公司地址" info="重庆市北碚区天生路85号" />
                </div>
            </Container>
        </div>
    )
}

function ContactCard({ icon, title, info }: any) {
    return (
        <div className="flex flex-col items-center text-center p-8 border rounded-2xl hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-muted-foreground">{info}</p>
        </div>
    )
}
