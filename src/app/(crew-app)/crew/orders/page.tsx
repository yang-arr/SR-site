"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Users, MapPin, Clock, ChevronRight, DollarSign } from "lucide-react"
import { getOrders } from "@/lib/mock-data"

const tabs = ["全部", "待接单", "进行中", "已完成", "已取消"] as const

const statusColors: Record<string, { bg: string; text: string }> = {
  待接单: { bg: "bg-yellow-100", text: "text-yellow-700" },
  进行中: { bg: "bg-blue-100", text: "text-blue-700" },
  已完成: { bg: "bg-green-100", text: "text-green-700" },
  已取消: { bg: "bg-gray-100", text: "text-gray-500" },
}

export default function OrderListPage() {
  const [activeTab, setActiveTab] = useState<string>("全部")
  const [search, setSearch] = useState("")

  const orders = getOrders({
    status: activeTab === "全部" ? undefined : activeTab,
    search: search || undefined,
  })

  return (
    <div className="py-6 px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">信息管理</h1>
        <p className="text-gray-500 mt-1">管理你发布的所有信息</p>
      </div>

      {/* Tab Filter */}
      <div className="flex items-center gap-6 mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索信息名称或角色描述..."
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
        />
      </div>

      {/* Order Cards */}
      <div className="space-y-4">
        {orders.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p>暂无相关信息</p>
          </div>
        )}
        {orders.map((order, i) => {
          const sc = statusColors[order.status]
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/crew/orders/${order.id}`}
                className="block bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold text-gray-900 truncate">{order.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}>
                        {order.status}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {order.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-1">{order.roleDescription}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> 需{order.headcount}人
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {order.gatherTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {order.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" /> {order.price}元/{order.priceType === "日薪" ? "天" : "时"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{order.applicants.length}</p>
                      <p className="text-xs text-gray-400">报名</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
