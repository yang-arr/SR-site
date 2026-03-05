import { ActorTabbar } from "@/components/layout/actor-tabbar"

export const metadata = {
  title: "SceneReady 演员端",
  description: "演员工作台 - 浏览通告、管理订单、展示模卡",
}

export default function ActorAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="min-h-screen pb-16">
        {children}
      </main>
      <ActorTabbar />
    </div>
  )
}
