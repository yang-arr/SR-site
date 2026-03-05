import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"

export default function TermsPage() {
    return (
        <div className="py-24">
            <Container className="max-w-3xl">
                <FadeIn>
                    <h1 className="text-4xl font-bold mb-3 text-center">用户协议</h1>
                    <p className="text-center text-muted-foreground mb-16">最后更新：2026年3月1日</p>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="space-y-10 text-foreground leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">一、服务概述</h2>
                            <p className="text-muted-foreground">
                                SceneReady 是一个连接剧组与演员的数字化选角平台。我们为剧组提供组讯发布、演员筛选、订单管理等功能，为演员提供通告浏览、在线投递、模卡管理等服务。通过注册和使用本平台，即表示您同意本协议的全部条款。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">二、账号注册</h2>
                            <p className="text-muted-foreground">
                                用户注册时须提供真实、准确的个人信息，并完成实名认证。剧组用户需提供公司或项目相关资质证明。每位用户仅可注册一个账号，不得借用、转让或出售账号。如发现虚假注册信息，平台有权封禁账号。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">三、用户行为规范</h2>
                            <p className="text-muted-foreground mb-3">用户在使用平台时，不得进行以下行为：</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>发布虚假组讯或不实个人信息</li>
                                <li>骚扰、侮辱或威胁其他用户</li>
                                <li>发布违反法律法规的内容</li>
                                <li>利用平台进行与选角无关的商业活动</li>
                                <li>恶意刷单、刷信用分等破坏平台秩序的行为</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">四、订单规则</h2>
                            <p className="text-muted-foreground mb-3">
                                演员接单后应按照约定时间和地点准时到达。如需取消订单，请提前通知剧组。频繁无故取消订单将影响信用分。
                            </p>
                            <p className="text-muted-foreground">
                                剧组发布通告后，应确保信息真实准确。订单完成后，双方均需在48小时内完成互评。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">五、信用体系</h2>
                            <p className="text-muted-foreground">
                                平台采用双向信用评分机制。初始信用分为100分，按时履约、获得好评可增加信用分，违约、差评将扣除信用分。信用分达到130分以上的剧组可获得"金牌剧组"认证。信用分低于60分的用户将受到功能限制。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">六、知识产权</h2>
                            <p className="text-muted-foreground">
                                平台上的所有内容（包括但不限于文字、图片、标识、界面设计等）均受知识产权法保护。用户上传的内容，用户保留其知识产权，但授予平台在服务范围内使用的许可。未经授权，不得复制、传播平台内容。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">七、免责声明</h2>
                            <p className="text-muted-foreground">
                                SceneReady 作为信息中介平台，为剧组和演员提供信息对接服务。平台不参与双方的具体合作事宜，不对剧组和演员之间的纠纷承担直接责任。但我们会尽最大努力通过信用体系和审核机制保障用户权益。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">八、协议修改</h2>
                            <p className="text-muted-foreground">
                                我们保留修改本协议的权利。协议修改后，我们将通过平台通知、短信等方式告知用户。修改后的协议在发布之日起生效。如您不同意修改后的协议，可以选择停止使用平台服务并注销账号。
                            </p>
                        </section>
                    </div>
                </FadeIn>
            </Container>
        </div>
    )
}
