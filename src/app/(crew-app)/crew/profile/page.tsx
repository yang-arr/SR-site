"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Award,
  Edit,
  Save,
  X,
  ClipboardList,
  CheckCircle2,
  ThumbsUp,
  Users,
  Heart,
  Bell,
  Lock,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockCrew } from "@/lib/mock-data"

const creditHistory = [
  { id: 1, event: "完成订单《综艺节目群演》", change: +3, date: "2026-03-01", balance: 135 },
  { id: 2, event: "获得好评 - 管理有序", change: +2, date: "2026-02-28", balance: 132 },
  { id: 3, event: "准时开拍", change: +1, date: "2026-02-25", balance: 130 },
  { id: 4, event: "演员投诉 - 超时未结算", change: -3, date: "2026-02-20", balance: 129 },
  { id: 5, event: "完成订单《品牌广告拍摄》", change: +3, date: "2026-02-15", balance: 132 },
  { id: 6, event: "注册奖励", change: +100, date: "2026-01-01", balance: 129 },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [companyName, setCompanyName] = useState(mockCrew.companyName)
  const [bio, setBio] = useState(mockCrew.bio)
  const [editName, setEditName] = useState(mockCrew.companyName)
  const [editBio, setEditBio] = useState(mockCrew.bio)
  const [notifications, setNotifications] = useState(true)
  const [privacy, setPrivacy] = useState(false)

  const handleEdit = () => {
    setEditName(companyName)
    setEditBio(bio)
    setIsEditing(true)
  }

  const handleSave = () => {
    setCompanyName(editName)
    setBio(editBio)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="py-6 px-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">剧组资料</h1>
        <p className="text-gray-500 mt-1">管理你的剧组信息和设置</p>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border p-6 shadow-sm mb-6"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-600">
                {companyName.charAt(0)}
              </span>
            </div>
            <div>
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="px-3 py-1.5 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white gap-1">
                      <Save className="w-3.5 h-3.5" /> 保存
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel} className="gap-1">
                      <X className="w-3.5 h-3.5" /> 取消
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-gray-900">{companyName}</h2>
                    {mockCrew.creditScore >= 130 && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        <Award className="w-3.5 h-3.5" /> 金牌剧组
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{bio}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-medium text-purple-600">信用分 {mockCrew.creditScore}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          {!isEditing && (
            <Button variant="outline" size="sm" onClick={handleEdit} className="gap-1">
              <Edit className="w-3.5 h-3.5" /> 编辑
            </Button>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-5 gap-4 mb-6"
      >
        {[
          { icon: <ClipboardList className="w-5 h-5 text-purple-500" />, label: "总订单", value: mockCrew.totalOrders },
          { icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, label: "已完成", value: mockCrew.completedOrders },
          { icon: <ThumbsUp className="w-5 h-5 text-blue-500" />, label: "好评率", value: `${mockCrew.goodRate}%` },
          { icon: <Users className="w-5 h-5 text-orange-500" />, label: "粉丝", value: mockCrew.fans },
          { icon: <Heart className="w-5 h-5 text-red-500" />, label: "关注", value: mockCrew.following },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl border p-4 shadow-sm text-center">
            <div className="flex justify-center mb-2">{item.icon}</div>
            <p className="text-xl font-bold text-gray-900">{item.value}</p>
            <p className="text-xs text-gray-400 mt-1">{item.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Credit History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border p-5 shadow-sm mb-6"
      >
        <h2 className="text-lg font-semibold mb-4">信用记录</h2>
        <div className="space-y-3">
          {creditHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                {item.change > 0 ? (
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-900">{item.event}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${item.change > 0 ? "text-green-600" : "text-red-600"}`}>
                  {item.change > 0 ? "+" : ""}{item.change}
                </p>
                <p className="text-xs text-gray-400">余额 {item.balance}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border p-5 shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-4">设置</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <Bell className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">消息通知</p>
                <p className="text-xs text-gray-400">接收新订单推送和系统通知</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                notifications ? "bg-purple-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  notifications ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">隐私设置</p>
                <p className="text-xs text-gray-400">隐藏联系方式，仅合作演员可见</p>
              </div>
            </div>
            <button
              onClick={() => setPrivacy(!privacy)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                privacy ? "bg-purple-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  privacy ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
