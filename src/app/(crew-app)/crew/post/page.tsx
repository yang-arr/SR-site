"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Clock,
  Upload,
  X,
  CheckCircle2,
  Image as ImageIcon,
  Zap,
  CalendarClock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { bodyTypeOptions, skillOptions, benefitOptions } from "@/lib/mock-data"

export default function PostOrderPage() {
  const [title, setTitle] = useState("")
  const [headcount, setHeadcount] = useState(1)
  const [location, setLocation] = useState("")
  const [gatherTime, setGatherTime] = useState("")
  const [workStartTime, setWorkStartTime] = useState("")
  const [roleDescription, setRoleDescription] = useState("")
  const [posterFiles, setPosterFiles] = useState<string[]>([])
  const [gender, setGender] = useState<"男" | "女" | "不限">("不限")
  const [heightMin, setHeightMin] = useState(155)
  const [heightMax, setHeightMax] = useState(185)
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([])
  const [customBenefit, setCustomBenefit] = useState("")
  const [priceType, setPriceType] = useState<"日薪" | "时薪">("日薪")
  const [price, setPrice] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const orderType = useMemo(() => {
    if (!gatherTime || !workStartTime) return null
    const gather = new Date(gatherTime)
    const work = new Date(workStartTime)
    const diffHours = (work.getTime() - gather.getTime()) / (1000 * 60 * 60)
    return diffHours < 2 ? "即时单" : "预约单"
  }, [gatherTime, workStartTime])

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item])
  }

  const handleMockUpload = () => {
    setPosterFiles((prev) => [...prev, `/images/poster_${prev.length + 1}.jpg`])
  }

  const handleAddCustomBenefit = () => {
    if (customBenefit.trim() && !selectedBenefits.includes(customBenefit.trim())) {
      setSelectedBenefits((prev) => [...prev, customBenefit.trim()])
      setCustomBenefit("")
    }
  }

  const handleSubmit = () => {
    setShowSuccess(true)
  }

  return (
    <div className="py-6 px-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">发布订单</h1>
        <p className="text-gray-500 mt-1">填写订单信息，发布后演员即可接单</p>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border p-5 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold">基本信息</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">剧名/项目名称</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入剧名或项目名称"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">需要人数</label>
            <input
              type="number"
              min={1}
              value={headcount}
              onChange={(e) => setHeadcount(Number(e.target.value))}
              className="w-32 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <MapPin className="w-4 h-4 inline mr-1" />
              集合地点
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="请输入集合地点"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
            />
            <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300">
              <MapPin className="w-5 h-5 mr-2" />
              地图定位区域（示意）
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <Clock className="w-4 h-4 inline mr-1" />
                集合时间
              </label>
              <input
                type="datetime-local"
                value={gatherTime}
                onChange={(e) => setGatherTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <Clock className="w-4 h-4 inline mr-1" />
                工作开始时间
              </label>
              <input
                type="datetime-local"
                value={workStartTime}
                onChange={(e) => setWorkStartTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {orderType && (
            <div className="flex items-center gap-2">
              {orderType === "即时单" ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                  <Zap className="w-3 h-3" /> 即时单
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  <CalendarClock className="w-3 h-3" /> 预约单
                </span>
              )}
              <span className="text-xs text-gray-400">根据集合时间和工作开始时间自动判断</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">角色描述</label>
            <textarea
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              placeholder="请描述角色要求、拍摄内容等"
              rows={4}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">海报上传</label>
            <div className="flex flex-wrap gap-3">
              {posterFiles.map((file, i) => (
                <div key={i} className="relative w-24 h-24 bg-gray-100 rounded-lg border flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-300" />
                  <span className="absolute bottom-1 text-[10px] text-gray-400">海报{i + 1}</span>
                  <button
                    onClick={() => setPosterFiles((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleMockUpload}
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-purple-400 hover:text-purple-500 transition-colors"
              >
                <Upload className="w-6 h-6 mb-1" />
                <span className="text-xs">上传</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Criteria */}
        <div className="bg-white rounded-xl border p-5 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold">筛选条件</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
            <div className="flex gap-3">
              {(["男", "女", "不限"] as const).map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === g}
                    onChange={() => setGender(g)}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{g}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">身高范围 (cm)</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={heightMin}
                onChange={(e) => setHeightMin(Number(e.target.value))}
                className="w-24 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="text-gray-400">~</span>
              <input
                type="number"
                value={heightMax}
                onChange={(e) => setHeightMax(Number(e.target.value))}
                className="w-24 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">体型</label>
            <div className="flex flex-wrap gap-2">
              {bodyTypeOptions.map((bt) => (
                <label
                  key={bt}
                  className={`px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-colors ${
                    selectedBodyTypes.includes(bt)
                      ? "bg-purple-50 border-purple-300 text-purple-700"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedBodyTypes.includes(bt)}
                    onChange={() => toggleItem(selectedBodyTypes, setSelectedBodyTypes, bt)}
                    className="sr-only"
                  />
                  {bt}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">特长</label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((sk) => (
                <label
                  key={sk}
                  className={`px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-colors ${
                    selectedSkills.includes(sk)
                      ? "bg-purple-50 border-purple-300 text-purple-700"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(sk)}
                    onChange={() => toggleItem(selectedSkills, setSelectedSkills, sk)}
                    className="sr-only"
                  />
                  {sk}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl border p-5 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold">福利标签</h2>
          <div className="flex flex-wrap gap-2">
            {benefitOptions.map((b) => (
              <label
                key={b}
                className={`px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-colors ${
                  selectedBenefits.includes(b)
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedBenefits.includes(b)}
                  onChange={() => toggleItem(selectedBenefits, setSelectedBenefits, b)}
                  className="sr-only"
                />
                {b}
              </label>
            ))}
            {selectedBenefits
              .filter((b) => !benefitOptions.includes(b))
              .map((b) => (
                <span
                  key={b}
                  className="px-3 py-1.5 rounded-lg border text-sm bg-green-50 border-green-300 text-green-700 flex items-center gap-1"
                >
                  {b}
                  <button onClick={() => setSelectedBenefits((prev) => prev.filter((x) => x !== b))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={customBenefit}
              onChange={(e) => setCustomBenefit(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCustomBenefit()}
              placeholder="自定义福利标签"
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Button variant="outline" onClick={handleAddCustomBenefit} className="text-sm">
              添加
            </Button>
          </div>
        </div>

        {/* Price */}
        <div className="bg-white rounded-xl border p-5 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold">价格设置</h2>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(["日薪", "时薪"] as const).map((pt) => (
                <button
                  key={pt}
                  onClick={() => setPriceType(pt)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    priceType === pt ? "bg-white text-purple-700 shadow-sm" : "text-gray-500"
                  }`}
                >
                  {pt}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">¥</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="输入金额"
                className="w-32 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="text-gray-400 text-sm">/{priceType === "日薪" ? "天" : "小时"}</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
          >
            发布订单
          </Button>
          <Button variant="outline">保存草稿</Button>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-xl"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">发布成功！</h3>
              <p className="text-sm text-gray-500 mb-6">你的订单已成功发布，等待演员接单中</p>
              <Button
                onClick={() => setShowSuccess(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white w-full"
              >
                确定
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
