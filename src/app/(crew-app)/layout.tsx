import { CrewSidebar } from "@/components/layout/crew-sidebar"

export const metadata = {
  title: "SceneReady 剧组端",
  description: "剧组工作台 - 发布信息、管理演员、追踪进度",
}

export default function CrewAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <CrewSidebar />
      <main className="ml-60 min-h-screen">
        {children}
      </main>
    </div>
  )
}
