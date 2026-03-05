"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ClipboardList,
  Play,
  CheckCircle2,
  XCircle,
  Award,
  Plus,
  Search,
  ChevronRight,
  Users,
  MapPin,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockOrders, mockCrew } from "@/lib/mock-data"

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  待接单: { label: "待接单", icon: <ClipboardList className="w-5 h-5" />, color: "text-yellow-600", bg: "bg-yellow-50" },
  进行中: { label: "进行中", icon: <Play className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-50" },
  已完成: { label: "已完成", icon: <CheckCircle2 className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-50" },
  已取消: { label: "已取消", icon: <XCircle className="w-5 h-5" />, color: "text-gray-500", bg: "bg-gray-50" },
}

export default function CrewDashboard() {
  const counts = {
    待接单: mockOrders.filter((o) => o.status === "待接单").length,
    进行中: mockOrders.filter((o) => o.status === "进行中").length,
    已完成: mockOrders.filter((o) => o.status === "已完成").length,
    已取消: mockOrders.filter((o) => o.status === "已取消").length,
  }

  const recentOrders = mockOrders.slice(0, 5)

  return (
    <div className="py-6 px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">工作台</h1>
        <p className="text-gray-500 mt-1">
          你好，{mockCrew.companyName}！欢迎回到 SceneReady 剧组端
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {(Object.keys(statusConfig) as Array<keyof typeof counts>).map((key, i) => {
          const cfg = statusConfig[key]
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl border p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`p-2 rounded-lg ${cfg.bg}`}>
                  <span className={cfg.color}>{cfg.icon}</span>
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{counts[key]}</p>
              <p className="text-sm text-gray-500 mt-1">{cfg.label}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border p-5 shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">信用评分</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(mockCrew.creditScore / 200) * 264} 264`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-900">{mockCrew.creditScore}</span>
              </div>
            </div>
            <div>
              {mockCrew.creditScore >= 130 && (
                <div className="flex items-center gap-1.5 mb-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-600">金牌剧组</span>
                </div>
              )}
              <p className="text-sm text-gray-500">信用良好，继续保持</p>
              <p className="text-xs text-gray-400 mt-1">满分 200 分</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-xl border p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">最近订单</h2>
            <Link href="/crew/orders" className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1">
              查看全部 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const cfg = statusConfig[order.status]
              return (
                <Link
                  key={order.id}
                  href={`/crew/orders/${order.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{order.title}</p>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {order.headcount}人
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {order.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {order.gatherTime}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </Link>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex gap-4"
      >
        <Link href="/crew/post">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            发布新订单
          </Button>
        </Link>
        <Link href="/crew/actors">
          <Button variant="outline" className="gap-2">
            <Search className="w-4 h-4" />
            搜索演员
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
