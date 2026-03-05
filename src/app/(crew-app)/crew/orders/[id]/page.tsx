"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Edit,
  Ban,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getOrderById } from "@/lib/mock-data"
import type { Applicant } from "@/lib/mock-data"

const statusColors: Record<string, { bg: string; text: string }> = {
  待接单: { bg: "bg-yellow-100", text: "text-yellow-700" },
  进行中: { bg: "bg-blue-100", text: "text-blue-700" },
  已完成: { bg: "bg-green-100", text: "text-green-700" },
  已取消: { bg: "bg-gray-100", text: "text-gray-500" },
}

const applicantStatusColors: Record<string, { bg: string; text: string }> = {
  待审核: { bg: "bg-yellow-100", text: "text-yellow-700" },
  已通过: { bg: "bg-green-100", text: "text-green-700" },
  已拒绝: { bg: "bg-red-100", text: "text-red-600" },
}

const timelineSteps = [
  { label: "信息创建", icon: <AlertCircle className="w-4 h-4" /> },
  { label: "演员报名", icon: <Users className="w-4 h-4" /> },
  { label: "审核通过", icon: <CheckCircle2 className="w-4 h-4" /> },
  { label: "进行中", icon: <Clock className="w-4 h-4" /> },
  { label: "已完成", icon: <CheckCircle2 className="w-4 h-4" /> },
]

function getTimelineIndex(status: string) {
  switch (status) {
    case "待接单": return 1
    case "进行中": return 3
    case "已完成": return 4
    case "已取消": return -1
    default: return 0
  }
}

export default function OrderDetailPage() {
  const params = useParams()
  const order = getOrderById(params.id as string)
  const [applicants, setApplicants] = useState<Applicant[]>(order?.applicants ?? [])
  const [rejectTarget, setRejectTarget] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  if (!order) {
    return (
      <div className="py-6 px-8">
        <div className="text-center py-20">
          <p className="text-gray-400 mb-4">信息不存在</p>
          <Link href="/crew/orders">
            <Button variant="outline">返回信息列表</Button>
          </Link>
        </div>
      </div>
    )
  }

  const sc = statusColors[order.status]
  const tlIndex = getTimelineIndex(order.status)

  const handleApprove = (applicantId: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, status: "已通过" as const } : a))
    )
  }

  const handleReject = () => {
    if (!rejectTarget) return
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === rejectTarget ? { ...a, status: "已拒绝" as const, rejectReason } : a
      )
    )
    setRejectTarget(null)
    setRejectReason("")
  }

  return (
    <div className="py-6 px-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/crew/orders" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{order.title}</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}>
              {order.status}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
              {order.type}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">创建于 {order.createdAt}</p>
        </div>
      </div>

      {/* Status Timeline */}
      {order.status !== "已取消" && (
        <div className="bg-white rounded-xl border p-5 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">信息进度</h2>
          <div className="flex items-center justify-between">
            {timelineSteps.map((step, i) => (
              <div key={step.label} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      i <= tlIndex ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className={`text-xs mt-2 ${i <= tlIndex ? "text-purple-600 font-medium" : "text-gray-400"}`}>
                    {step.label}
                  </span>
                </div>
                {i < timelineSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${i < tlIndex ? "bg-purple-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Info */}
      <div className="bg-white rounded-xl border p-5 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">信息详情</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4 text-gray-400" />
            <span>需要人数：</span>
            <span className="font-medium text-gray-900">{order.headcount}人</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span>薪酬：</span>
            <span className="font-medium text-gray-900">{order.price}元/{order.priceType === "日薪" ? "天" : "时"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>集合地点：</span>
            <span className="font-medium text-gray-900">{order.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>集合时间：</span>
            <span className="font-medium text-gray-900">{order.gatherTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>开工时间：</span>
            <span className="font-medium text-gray-900">{order.workStartTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span>性别要求：</span>
            <span className="font-medium text-gray-900">{order.gender}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t space-y-3 text-sm">
          <div>
            <span className="text-gray-500">身高范围：</span>
            <span className="font-medium text-gray-900">{order.heightRange[0]}cm - {order.heightRange[1]}cm</span>
          </div>
          <div>
            <span className="text-gray-500">体型：</span>
            <span className="font-medium text-gray-900">{order.bodyTypes.join("、") || "不限"}</span>
          </div>
          <div>
            <span className="text-gray-500">特长要求：</span>
            <span className="font-medium text-gray-900">{order.skills.join("、") || "无"}</span>
          </div>
          <div>
            <span className="text-gray-500">福利：</span>
            <div className="inline-flex flex-wrap gap-1.5 ml-1">
              {order.benefits.map((b) => (
                <span key={b} className="px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-700 border border-green-200">
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-gray-500">角色描述：</span>
            <p className="mt-1 text-gray-900">{order.roleDescription}</p>
          </div>
        </div>
      </div>

      {/* Applicants */}
      <div className="bg-white rounded-xl border p-5 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">报名演员 ({applicants.length})</h2>
        {applicants.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">暂无报名</p>
        ) : (
          <div className="space-y-3">
            {applicants.map((ap) => {
              const asc = applicantStatusColors[ap.status]
              return (
                <div key={ap.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <img src={ap.avatar} alt={ap.name} className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{ap.name}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${asc.bg} ${asc.text}`}>
                        {ap.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" /> 信用 {ap.creditScore}
                      </span>
                      <span>身高 {ap.height}cm</span>
                      <span>申请于 {ap.appliedAt}</span>
                    </div>
                    {ap.rejectReason && (
                      <p className="text-xs text-red-500 mt-1">拒绝原因：{ap.rejectReason}</p>
                    )}
                  </div>
                  {ap.status === "待审核" && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(ap.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        通过
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setRejectTarget(ap.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" />
                        拒绝
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline" className="gap-2">
          <Edit className="w-4 h-4" />
          编辑信息
        </Button>
        <Button variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50">
          <Ban className="w-4 h-4" />
          取消信息
        </Button>
      </div>

      {/* Reject Dialog */}
      <AnimatePresence>
        {rejectTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={() => { setRejectTarget(null); setRejectReason("") }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">拒绝原因</h3>
                <button onClick={() => { setRejectTarget(null); setRejectReason("") }} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="请输入拒绝原因（可选）"
                rows={3}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-4"
              />
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => { setRejectTarget(null); setRejectReason("") }}>
                  取消
                </Button>
                <Button onClick={handleReject} className="bg-red-600 hover:bg-red-700 text-white">
                  确认拒绝
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
