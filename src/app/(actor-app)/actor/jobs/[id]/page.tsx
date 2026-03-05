"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart, MapPin, Clock, Users, Star, Shield, CheckCircle,
  UtensilsCrossed, Car, Home, Coffee, Shirt, Sparkles, Navigation,
} from "lucide-react"
import { ActorHeader } from "@/components/layout/actor-tabbar"
import { Button } from "@/components/ui/button"
import { getOrderById } from "@/lib/mock-data"

const benefitIcons: Record<string, React.ElementType> = {
  "包餐": UtensilsCrossed,
  "接送": Car,
  "包住宿": Home,
  "有茶水": Coffee,
  "提供服装": Shirt,
  "提供化妆": Sparkles,
}

export default function JobDetailPage() {
  const params = useParams()
  const order = getOrderById(params.id as string)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [applySuccess, setApplySuccess] = useState(false)

  if (!order) {
    return (
      <div>
        <ActorHeader title="工作详情" />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center text-sm text-gray-400">信息不存在</div>
      </div>
    )
  }

  const handleApply = () => {
    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
      setApplySuccess(true)
    }, 1500)
  }

  return (
    <div className="pb-24">
      <ActorHeader title="工作详情" />

      {/* Poster */}
      <div className="relative h-48 sm:h-64 w-full">
        {order.posterImages.length > 0 ? (
          <img src={order.posterImages[0]} alt={order.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500" />
        )}
        <span className="absolute top-3 right-3 bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
          {order.priceType === "日薪" ? `¥${order.price}/天` : `¥${order.price}/时`}
        </span>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Title section */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-purple-100 text-purple-600 text-xs px-2.5 py-0.5 rounded-full font-medium">{order.type}</span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full">{order.gender} · {order.heightRange[0]}-{order.heightRange[1]}cm</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900 mb-1">{order.title}</h1>
          <p className="text-sm text-gray-500">{order.roleDescription}</p>
        </div>

        {/* Crew info */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold">{order.crewName}</span>
                  {order.crewCredit >= 130 && (
                    <span className="bg-yellow-100 text-yellow-700 text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Shield className="h-2.5 w-2.5" />金牌
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-0.5 text-xs text-gray-400">
                  <Star className="h-3 w-3 text-yellow-400" />
                  信用分 {order.crewCredit}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-100 space-y-2.5">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>集合: {order.gatherTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>开工: {order.workStartTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-gray-400" />
            <span>招募 {order.headcount} 人 · 已申请 {order.applicants.length} 人</span>
          </div>
        </div>

        {/* Skills */}
        {order.skills.length > 0 && (
          <div className="px-4 md:px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">技能要求</h3>
            <div className="flex flex-wrap gap-2">
              {order.skills.map((s) => (
                <span key={s} className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        {order.benefits.length > 0 && (
          <div className="px-4 md:px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">福利待遇</h3>
            <div className="flex flex-wrap gap-2">
              {order.benefits.map((b) => {
                const Icon = benefitIcons[b] || CheckCircle
                return (
                  <span key={b} className="flex items-center gap-1 bg-green-50 text-green-600 text-xs px-2.5 py-1 rounded-lg">
                    <Icon className="h-3.5 w-3.5" />{b}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Location */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">工作地点</h3>
          <div className="bg-gray-100 rounded-lg h-36 flex items-center justify-center mb-2">
            <MapPin className="h-6 w-6 text-gray-300" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{order.location}</span>
            <button className="flex items-center gap-1 text-sm text-purple-500 font-medium">
              <Navigation className="h-4 w-4" />导航
            </button>
          </div>
        </div>

        {/* Applicant count */}
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between bg-purple-50 rounded-lg px-4 py-3">
            <span className="text-sm text-purple-700">当前申请人数</span>
            <span className="text-base font-bold text-purple-600">{order.applicants.length} / {order.headcount}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-14 left-0 right-0 z-30 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="flex flex-col items-center gap-0.5 px-3"
          >
            <Heart className={`h-5 w-5 transition-colors ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
            <span className="text-[10px] text-gray-500">收藏</span>
          </button>
          {applySuccess ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1 h-11 rounded-lg bg-green-500 text-white flex items-center justify-center gap-1.5 text-sm font-medium"
            >
              <CheckCircle className="h-4 w-4" />
              申请已提交
            </motion.div>
          ) : (
            <Button onClick={handleApply} className="flex-1 h-11 rounded-lg text-sm">
              一键申请
            </Button>
          )}
        </div>
      </div>

      {/* Condition check modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 mx-8 text-center max-w-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                className="h-12 w-12 mx-auto mb-3 border-2 border-purple-500 border-t-transparent rounded-full"
              />
              <p className="text-sm font-medium text-gray-700">条件审核中...</p>
              <p className="text-xs text-gray-400 mt-1">正在匹配您的个人信息</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
