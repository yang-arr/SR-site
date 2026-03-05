"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, CheckCircle, Clock, Star, Bell, ChevronDown } from "lucide-react"
import { ActorHeader } from "@/components/layout/actor-tabbar"
import { cn } from "@/lib/utils"
import { getMessages } from "@/lib/mock-data"
import type { Message } from "@/lib/mock-data"

const typeIcons: Record<Message["type"], React.ElementType> = {
  order_push: Briefcase,
  review_result: CheckCircle,
  departure_reminder: Clock,
  review_reminder: Star,
  system: Bell,
}

const typeColors: Record<Message["type"], string> = {
  order_push: "bg-purple-100 text-purple-600",
  review_result: "bg-green-100 text-green-600",
  departure_reminder: "bg-orange-100 text-orange-600",
  review_reminder: "bg-yellow-100 text-yellow-600",
  system: "bg-gray-100 text-gray-600",
}

export default function MessagesPage() {
  const allMessages = getMessages()
  const [readIds, setReadIds] = useState<Set<string>>(
    new Set(allMessages.filter((m) => m.isRead).map((m) => m.id))
  )
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const unreadCount = allMessages.filter((m) => !readIds.has(m.id)).length

  const handleClick = (msg: Message) => {
    setReadIds((prev) => new Set([...prev, msg.id]))
    setExpandedId((prev) => (prev === msg.id ? null : msg.id))
  }

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffH = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffH < 1) return "刚刚"
    if (diffH < 24) return `${diffH}小时前`
    const diffD = Math.floor(diffH / 24)
    if (diffD < 7) return `${diffD}天前`
    return `${d.getMonth() + 1}/${d.getDate()}`
  }

  return (
    <div className="pb-4">
      <ActorHeader title="消息通知" />

      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Unread badge */}
        {unreadCount > 0 && (
          <div className="pt-3 pb-1">
            <div className="bg-purple-50 rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-purple-700">你有 {unreadCount} 条未读消息</span>
              <button
                onClick={() => setReadIds(new Set(allMessages.map((m) => m.id)))}
                className="text-xs text-purple-500 font-medium"
              >
                全部已读
              </button>
            </div>
          </div>
        )}

        {/* Message list */}
        <div className="mt-3 flex flex-col gap-2">
          {allMessages.map((msg, i) => {
            const Icon = typeIcons[msg.type]
            const isRead = readIds.has(msg.id)
            const isExpanded = expandedId === msg.id

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <div
                  onClick={() => handleClick(msg)}
                  className={cn(
                    "bg-white rounded-xl border p-4 cursor-pointer hover:shadow-sm transition-all",
                    isRead ? "border-gray-100" : "border-purple-200 bg-purple-50/30"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0", typeColors[msg.type])}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1.5">
                          {!isRead && <div className="h-2 w-2 bg-purple-500 rounded-full shrink-0" />}
                          <h3 className={cn("text-sm font-semibold truncate", isRead ? "text-gray-700" : "text-gray-900")}>
                            {msg.title}
                          </h3>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0 ml-2">{formatTime(msg.createdAt)}</span>
                      </div>
                      <p className={cn("text-sm leading-relaxed", isExpanded ? "text-gray-600" : "text-gray-500 line-clamp-1")}>
                        {msg.content}
                      </p>
                    </div>

                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-300 shrink-0 mt-1 transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-sm text-gray-600 leading-relaxed">{msg.content}</p>
                          <p className="text-xs text-gray-400 mt-2">{msg.createdAt}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
