"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Check, MapPin, Clock, Star, X } from "lucide-react"
import { ActorHeader } from "@/components/layout/actor-tabbar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getOrderById } from "@/lib/mock-data"

const steps = ["待出发", "追踪中", "已到达", "工作中", "已完成"]

const stepActions: Record<string, string> = {
  "待出发": "我已出发",
  "追踪中": "我已到达",
  "已到达": "上工打卡",
  "工作中": "工作完成",
}

export default function OrderDetailPage() {
  const params = useParams()
  const order = getOrderById(params.id as string)
  const [currentStep, setCurrentStep] = useState(0)
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [reviewContent, setReviewContent] = useState("")
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [toastMsg, setToastMsg] = useState("")

  if (!order) {
    return (
      <div>
        <ActorHeader title="订单详情" />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center text-sm text-gray-400">订单不存在</div>
      </div>
    )
  }

  const handleStepAction = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleSubmitReview = () => {
    if (rating === 0) {
      setToastMsg("请先选择评分")
      setTimeout(() => setToastMsg(""), 2000)
      return
    }
    setReviewSubmitted(true)
    setShowRating(false)
    setToastMsg("评价已提交")
    setTimeout(() => setToastMsg(""), 2000)
  }

  return (
    <div className="pb-24">
      <ActorHeader title="订单详情" />

      <div className="max-w-3xl mx-auto">
        {/* Order info */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-3">{order.title}</h2>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              集合: {order.gatherTime}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              {order.location}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-purple-600">
                {order.priceType === "日薪" ? `¥${order.price}/天` : `¥${order.price}/时`}
              </span>
              <span className="text-gray-400">· {order.crewName}</span>
            </div>
          </div>
        </div>

        {/* Status tracking timeline */}
        <div className="px-4 md:px-6 py-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-5">订单进度</h3>
          <div className="relative pl-8">
            {steps.map((step, i) => {
              const isCompleted = i < currentStep
              const isCurrent = i === currentStep
              return (
                <div key={step} className="relative pb-7 last:pb-0">
                  {/* Vertical line */}
                  {i < steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-[-16px] top-6 w-0.5 h-full",
                        isCompleted ? "bg-purple-500" : "bg-gray-200"
                      )}
                    />
                  )}
                  {/* Dot */}
                  <div
                    className={cn(
                      "absolute left-[-22px] top-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center",
                      isCompleted
                        ? "bg-purple-500 border-purple-500"
                        : isCurrent
                        ? "bg-white border-purple-500"
                        : "bg-white border-gray-300"
                    )}
                  >
                    {isCompleted && <Check className="h-2.5 w-2.5 text-white" />}
                    {isCurrent && <div className="h-2 w-2 bg-purple-500 rounded-full" />}
                  </div>
                  {/* Label */}
                  <span
                    className={cn(
                      "text-sm",
                      isCompleted
                        ? "text-purple-600 font-medium"
                        : isCurrent
                        ? "text-gray-900 font-semibold"
                        : "text-gray-400"
                    )}
                  >
                    {step}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action button */}
        <div className="px-4 md:px-6 mt-2">
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleStepAction} className="w-full h-11 rounded-lg text-sm">
              {stepActions[steps[currentStep]]}
            </Button>
          ) : !reviewSubmitted ? (
            <Button onClick={() => setShowRating(true)} className="w-full h-11 rounded-lg text-sm bg-yellow-500 hover:bg-yellow-600">
              <Star className="h-4 w-4 mr-1" />
              评价剧组
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-1.5 text-sm text-green-600 font-medium py-3">
              <Check className="h-4 w-4" />
              评价已完成
            </div>
          )}
        </div>
      </div>

      {/* Rating modal */}
      <AnimatePresence>
        {showRating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold">评价剧组</h3>
                <button onClick={() => setShowRating(false)}>
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Stars */}
              <div className="flex items-center justify-center gap-2 mb-5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setRating(s)}>
                    <Star
                      className={cn(
                        "h-8 w-8 transition-colors",
                        s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                      )}
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="分享你的工作体验..."
                className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none h-28 outline-none focus:border-purple-300"
              />

              <Button onClick={handleSubmitReview} className="w-full h-11 rounded-lg text-sm mt-4">
                提交评价
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
