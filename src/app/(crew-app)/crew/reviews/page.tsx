"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockOrders, getReviews, reviewTags } from "@/lib/mock-data"

interface PendingReview {
  orderId: string
  orderTitle: string
  actorName: string
  actorAvatar: string
}

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "done">("pending")
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [contents, setContents] = useState<Record<string, string>>({})
  const [selectedTags, setSelectedTags] = useState<Record<string, string[]>>({})
  const [submitted, setSubmitted] = useState<Set<string>>(new Set())
  const [showToast, setShowToast] = useState(false)

  // Pending reviews: completed orders with approved applicants
  const pendingReviews: PendingReview[] = mockOrders
    .filter((o) => o.status === "已完成")
    .flatMap((o) =>
      o.applicants
        .filter((a) => a.status === "已通过")
        .map((a) => ({
          orderId: o.id,
          orderTitle: o.title,
          actorName: a.name,
          actorAvatar: a.avatar,
        }))
    )
    .filter((pr) => !submitted.has(`${pr.orderId}-${pr.actorName}`))

  const doneReviews = getReviews("crew-to-actor")

  const handleSetRating = (key: string, value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }))
  }

  const handleToggleTag = (key: string, tag: string) => {
    setSelectedTags((prev) => {
      const current = prev[key] || []
      return {
        ...prev,
        [key]: current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag],
      }
    })
  }

  const handleSubmitReview = (orderId: string, actorName: string) => {
    const key = `${orderId}-${actorName}`
    setSubmitted((prev) => new Set(prev).add(key))
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  return (
    <div className="py-6 px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">评价管理</h1>
        <p className="text-gray-500 mt-1">对合作过的演员进行评价</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6 border-b">
        {([
          { key: "pending" as const, label: "待评价", count: pendingReviews.length },
          { key: "done" as const, label: "已评价", count: doneReviews.length },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.key
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
              activeTab === tab.key ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-400"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Pending Reviews */}
      {activeTab === "pending" && (
        <div className="space-y-4">
          {pendingReviews.length === 0 && (
            <div className="text-center py-16 text-gray-400">暂无待评价信息</div>
          )}
          {pendingReviews.map((pr, i) => {
            const key = `${pr.orderId}-${pr.actorName}`
            const rating = ratings[key] || 0
            const content = contents[key] || ""
            const tags = selectedTags[key] || []

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={pr.actorAvatar} alt={pr.actorName} className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{pr.actorName}</p>
                    <p className="text-xs text-gray-400">{pr.orderTitle}</p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => handleSetRating(key, s)}>
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && <span className="text-sm text-gray-500 ml-2">{rating}分</span>}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {reviewTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleToggleTag(key, tag)}
                      className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                        tags.includes(tag)
                          ? "bg-purple-50 border-purple-300 text-purple-700"
                          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Text Input */}
                <textarea
                  value={content}
                  onChange={(e) => setContents((prev) => ({ ...prev, [key]: e.target.value }))}
                  placeholder="写下你的评价..."
                  rows={2}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-3"
                />

                <Button
                  onClick={() => handleSubmitReview(pr.orderId, pr.actorName)}
                  disabled={rating === 0}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm disabled:opacity-50"
                >
                  提交评价
                </Button>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Done Reviews */}
      {activeTab === "done" && (
        <div className="space-y-4">
          {doneReviews.length === 0 && (
            <div className="text-center py-16 text-gray-400">暂无已评价记录</div>
          )}
          {doneReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{review.orderTitle}</p>
                  <p className="text-xs text-gray-400">{review.createdAt}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{review.content}</p>
              <div className="flex flex-wrap gap-1.5">
                {review.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-purple-50 text-purple-600">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
          >
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-sm">评价提交成功！</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
