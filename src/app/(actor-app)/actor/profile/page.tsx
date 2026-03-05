"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, Star, CreditCard, Image as ImageIcon, Heart, Users, MessageSquare,
  Bell, Settings, Upload, Shield,
} from "lucide-react"
import { ActorHeader } from "@/components/layout/actor-tabbar"
import { cn } from "@/lib/utils"
import { mockActors, mockReviews } from "@/lib/mock-data"

const actor = mockActors[0]

const stats = [
  { label: "完成订单", value: actor.completedOrders },
  { label: "总收入", value: `¥${actor.income.toLocaleString()}` },
  { label: "好评率", value: `${actor.goodRate}%` },
  { label: "粉丝", value: actor.fans.toLocaleString() },
]

type SectionKey = "模卡管理" | "收到的评价" | null

export default function ProfilePage() {
  const [expandedSection, setExpandedSection] = useState<SectionKey>(null)

  const toggleSection = (key: SectionKey) => {
    setExpandedSection((prev) => (prev === key ? null : key))
  }

  const actorReviews = mockReviews.filter((r) => r.type === "crew-to-actor")

  const menuItems: { label: string; icon: React.ElementType; action: "expand" | "link"; key?: SectionKey; href?: string }[] = [
    { label: "模卡管理", icon: CreditCard, action: "expand", key: "模卡管理" },
    { label: "我的收藏", icon: Heart, action: "link", href: "#" },
    { label: "关注列表", icon: Users, action: "link", href: "#" },
    { label: "粉丝列表", icon: Users, action: "link", href: "#" },
    { label: "收到的评价", icon: MessageSquare, action: "expand", key: "收到的评价" },
    { label: "消息通知", icon: Bell, action: "link", href: "/actor/messages" },
    { label: "设置", icon: Settings, action: "link", href: "#" },
  ]

  return (
    <div className="pb-4">
      <ActorHeader title="个人中心" />

      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Profile header */}
        <div className="pt-5 pb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={actor.avatar}
                alt={actor.name}
                className="h-20 w-20 rounded-full border-2 border-purple-200"
              />
              <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <Shield className="h-3 w-3" />
                {actor.creditScore}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{actor.name}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{actor.bio}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Star className="h-3.5 w-3.5 text-yellow-400" />
                <span className="text-xs text-gray-500">信用分 {actor.creditScore}</span>
                {actor.creditScore >= 130 && (
                  <span className="bg-yellow-100 text-yellow-700 text-[10px] px-1.5 py-0.5 rounded-full ml-1">金牌演员</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mb-4">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 grid grid-cols-4 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-base font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu list */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {menuItems.map((item, i) => (
            <div key={item.label}>
              {item.action === "link" ? (
                <Link
                  href={item.href || "#"}
                  className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </Link>
              ) : (
                <button
                  onClick={() => toggleSection(item.key!)}
                  className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 text-gray-300 transition-transform",
                      expandedSection === item.key && "rotate-90"
                    )}
                  />
                </button>
              )}

              {/* Expandable sections */}
              <AnimatePresence>
                {item.key === "模卡管理" && expandedSection === "模卡管理" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-4 bg-gray-50 border-t border-gray-100">
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                        {actor.photos.length > 0 ? (
                          actor.photos.map((photo, idx) => (
                            <img key={idx} src={photo} alt="" className="w-full aspect-square rounded-lg object-cover" />
                          ))
                        ) : (
                          <div className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        {Array.from({ length: Math.max(0, 3 - actor.photos.length) }).map((_, idx) => (
                          <div key={`empty-${idx}`} className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-purple-300">
                            <Upload className="h-5 w-5 text-gray-300" />
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-2.5 rounded-lg border border-purple-200 text-sm text-purple-500 font-medium hover:bg-purple-50 transition-colors">
                        上传照片
                      </button>
                    </div>
                  </motion.div>
                )}

                {item.key === "收到的评价" && expandedSection === "收到的评价" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-4 bg-gray-50 border-t border-gray-100 space-y-3">
                      {actorReviews.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4">暂无评价</p>
                      )}
                      {actorReviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-lg p-4 border border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{review.orderTitle}</span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, si) => (
                                <Star
                                  key={si}
                                  className={cn(
                                    "h-3.5 w-3.5",
                                    si < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{review.content}</p>
                          <div className="flex flex-wrap gap-1">
                            {review.tags.map((tag) => (
                              <span key={tag} className="text-xs bg-purple-50 text-purple-500 px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 mt-2">{review.reviewerName} · {review.createdAt}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {i < menuItems.length - 1 && <div className="mx-4 border-b border-gray-50" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
