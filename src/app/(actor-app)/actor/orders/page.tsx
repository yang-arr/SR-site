"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { ActorHeader } from "@/components/layout/actor-tabbar"
import { cn } from "@/lib/utils"
import { mockOrders } from "@/lib/mock-data"
import type { Order } from "@/lib/mock-data"

const statusTabs = ["全部", "待审核", "进行中", "已完成", "已取消"]

const statusConfig: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  "待接单": { color: "text-orange-600", bg: "bg-orange-50", icon: Clock },
  "进行中": { color: "text-blue-600", bg: "bg-blue-50", icon: Loader2 },
  "已完成": { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle },
  "已取消": { color: "text-gray-500", bg: "bg-gray-50", icon: XCircle },
}

function getActorStatus(order: Order): string {
  if (order.status === "待接单") return "待审核"
  return order.status
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("全部")
  const [cancelledIds, setCancelledIds] = useState<string[]>([])
  const [toastMsg, setToastMsg] = useState("")

  const orders = mockOrders.filter((o) => {
    if (cancelledIds.includes(o.id)) return activeTab === "全部" || activeTab === "已取消"
    if (activeTab === "全部") return true
    return getActorStatus(o) === activeTab
  })

  const handleCancel = (id: string) => {
    setCancelledIds((prev) => [...prev, id])
    setToastMsg("已取消申请")
    setTimeout(() => setToastMsg(""), 2000)
  }

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(""), 2000)
  }

  return (
    <div className="pb-4">
      <ActorHeader title="我的信息" />

      {/* Tabs */}
      <div className="sticky top-14 z-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 md:px-6 flex gap-1 overflow-x-auto py-2">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                activeTab === tab
                  ? "bg-purple-500 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Order cards */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 mt-3 flex flex-col gap-3">
        {orders.length === 0 && (
          <div className="py-20 text-center text-sm text-gray-400">暂无信息</div>
        )}
        {orders.map((order, i) => {
          const isCancelled = cancelledIds.includes(order.id)
          const actorStatus = isCancelled ? "已取消" : getActorStatus(order)
          const config = statusConfig[isCancelled ? "已取消" : order.status] || statusConfig["待接单"]
          const StatusIcon = config.icon

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={`/actor/orders/${order.id}`}>
                <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 hover:shadow-md hover:border-purple-100 active:scale-[0.99] transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 flex-1 mr-2">{order.title}</h3>
                    <span className={cn("flex items-center gap-0.5 text-xs font-medium px-2.5 py-0.5 rounded-full", config.bg, config.color)}>
                      <StatusIcon className="h-3 w-3" />
                      {actorStatus}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1 mb-3">
                    <p>剧组: {order.crewName}</p>
                    <p>时间: {order.gatherTime}</p>
                    <p className="font-medium text-purple-600">
                      {order.priceType === "日薪" ? `¥${order.price}/天` : `¥${order.price}/时`}
                    </p>
                  </div>

                  {/* Actions */}
                  {actorStatus === "待审核" && !isCancelled && (
                    <button
                      onClick={(e) => { e.preventDefault(); handleCancel(order.id) }}
                      className="text-xs text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 transition-colors"
                    >
                      取消申请
                    </button>
                  )}
                  {actorStatus === "进行中" && (
                    <div className="flex items-center gap-1 text-xs text-blue-500">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      进行中...
                    </div>
                  )}
                  {actorStatus === "已完成" && (
                    <button
                      onClick={(e) => { e.preventDefault(); showToast("评价功能请进入详情页") }}
                      className="text-xs text-purple-500 border border-purple-200 rounded-lg px-3 py-1.5 hover:bg-purple-50 transition-colors"
                    >
                      去评价
                    </button>
                  )}
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Toast */}
      {toastMsg && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-4 py-2 rounded-full z-50"
        >
          {toastMsg}
        </motion.div>
      )}
    </div>
  )
}
