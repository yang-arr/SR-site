import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"

export default function PrivacyPage() {
    return (
        <div className="py-24">
            <Container className="max-w-3xl">
                <FadeIn>
                    <h1 className="text-4xl font-bold mb-3 text-center">隐私政策</h1>
                    <p className="text-center text-muted-foreground mb-16">最后更新：2026年3月1日</p>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="space-y-10 text-foreground leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">一、信息收集</h2>
                            <p className="text-muted-foreground mb-3">
                                为了向您提供优质的服务，我们会收集以下信息：
                            </p>
                            <h3 className="text-lg font-semibold mb-2">1. 注册信息</h3>
                            <p className="text-muted-foreground mb-3">
                                包括您的手机号码、姓名等基本身份信息，用于账号注册和实名认证。
                            </p>
                            <h3 className="text-lg font-semibold mb-2">2. 模卡信息</h3>
                            <p className="text-muted-foreground mb-3">
                                演员用户提交的照片、身高、体重、特长等个人展示信息，用于向剧组展示演员资料。
                            </p>
                            <h3 className="text-lg font-semibold mb-2">3. 位置信息</h3>
                            <p className="text-muted-foreground">
                                在您授权的情况下，我们会获取您的位置信息，用于推荐附近的通告和计算距离。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">二、信息使用</h2>
                            <p className="text-muted-foreground mb-3">我们收集的信息将用于以下目的：</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li><strong>提供服务</strong> - 完成组讯发布、演员匹配、订单管理等核心功能</li>
                                <li><strong>推荐匹配</strong> - 基于您的资料和偏好，智能推荐合适的角色或演员</li>
                                <li><strong>安全保障</strong> - 进行身份验证、风控审核，维护平台安全</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">三、信息共享</h2>
                            <p className="text-muted-foreground mb-3">
                                我们深知个人信息的重要性，并遵循以下原则：
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>演员资料仅在用户主动申请（投递）时向对应剧组展示</li>
                                <li>我们不会将您的个人信息出售给任何第三方</li>
                                <li>除法律法规要求外，未经您的同意不会向第三方披露您的信息</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">四、信息保护</h2>
                            <p className="text-muted-foreground">
                                我们采用业界领先的安全措施保护您的个人信息，包括但不限于：数据加密存储、严格的访问控制机制、定期安全审计和漏洞扫描。所有敏感数据均通过 HTTPS 加密传输。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">五、用户权利</h2>
                            <p className="text-muted-foreground">
                                您有权随时查看、修改或删除您的个人信息。您可以在小程序个人中心管理您的资料，也可以联系客服申请数据导出或账号注销。我们将在15个工作日内处理您的请求。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">六、联系方式</h2>
                            <p className="text-muted-foreground">
                                如您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：
                            </p>
                            <p className="text-muted-foreground mt-2">
                                邮箱：<a href="mailto:privacy@sceneready.cn" className="text-primary hover:underline">privacy@sceneready.cn</a>
                            </p>
                        </section>
                    </div>
                </FadeIn>
            </Container>
        </div>
    )
}
