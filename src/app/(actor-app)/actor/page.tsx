"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Clock, DollarSign, Gift, Star, Users } from "lucide-react"
import { ActorHeader } from "@/components/layout/actor-tabbar"
import { cn } from "@/lib/utils"
import { mockOrders } from "@/lib/mock-data"

const filterTags = [
  { label: "距离", icon: MapPin },
  { label: "价格", icon: DollarSign },
  { label: "时间", icon: Clock },
  { label: "福利", icon: Gift },
]

const sortOptions = ["综合", "距离优先", "价格优先", "时间优先"]

export default function TaskHallPage() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [activeSort, setActiveSort] = useState("综合")
  const [toastMsg, setToastMsg] = useState("")

  const orders = mockOrders
    .filter((o) => o.status !== "已取消")
    .filter(
      (o) =>
        !search ||
        o.title.toLowerCase().includes(search.toLowerCase()) ||
        o.roleDescription.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (activeSort === "距离优先") return (a.distance ?? 99) - (b.distance ?? 99)
      if (activeSort === "价格优先") return b.price - a.price
      if (activeSort === "时间优先") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      return 0
    })

  const handleLoadMore = () => {
    setToastMsg("没有更多了")
    setTimeout(() => setToastMsg(""), 2000)
  }

  return (
    <div className="pb-4">
      <ActorHeader title="任务大厅" />

      {/* Search bar */}
      <div className="sticky top-14 z-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-2">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5">
            <Search className="h-4 w-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="搜索剧名、角色..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Filter tags */}
        <div className="pt-3 pb-1 overflow-x-auto">
          <div className="flex gap-2">
            {filterTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => setActiveFilter(activeFilter === tag.label ? null : tag.label)}
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors",
                  activeFilter === tag.label
                    ? "bg-purple-50 border-purple-300 text-purple-600"
                    : "bg-white border-gray-200 text-gray-600"
                )}
              >
                <tag.icon className="h-3 w-3" />
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort toggle */}
        <div className="py-2 overflow-x-auto">
          <div className="flex gap-1.5">
            {sortOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveSort(opt)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs transition-colors whitespace-nowrap",
                  activeSort === opt
                    ? "bg-purple-500 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Job card grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
          <AnimatePresence>
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/actor/jobs/${order.id}`}>
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-purple-100 active:scale-[0.98] transition-all">
                    {/* Poster / gradient placeholder */}
                    <div className="relative h-40 w-full">
                      {order.posterImages.length > 0 ? (
                        <img
                          src={order.posterImages[0]}
                          alt={order.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500" />
                      )}
                      <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                        {order.type}
                      </span>
                      <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2.5 py-0.5 rounded-full font-medium">
                        {order.priceType === "日薪" ? `¥${order.price}/天` : `¥${order.price}/时`}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{order.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{order.roleDescription}</p>

                      {/* Benefit tags */}
                      {order.benefits.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {order.benefits.map((b) => (
                            <span key={b} className="bg-green-50 text-green-600 text-[10px] px-1.5 py-0.5 rounded">
                              {b}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Bottom info row */}
                      <div className="flex items-center justify-between text-[11px] text-gray-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="h-3 w-3" />
                            {order.distance ? `${order.distance}km` : "未知"}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Users className="h-3 w-3" />
                            {order.applicants.length}/{order.headcount}人
                          </span>
                        </div>
                        <span className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 text-yellow-400" />
                          <span className="text-gray-600 font-medium">{order.crewCredit}</span>
                          <span className="text-gray-400 ml-0.5">{order.crewName}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load more */}
        <div className="mt-4 mb-4">
          <button
            onClick={handleLoadMore}
            className="w-full py-2.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 transition-colors"
          >
            加载更多
          </button>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-4 py-2 rounded-full z-50"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
