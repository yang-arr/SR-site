"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Award,
  MapPin,
  X,
  Heart,
  ChevronDown,
  Star,
  Briefcase,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getActors, bodyTypeOptions, skillOptions } from "@/lib/mock-data"
import type { Actor } from "@/lib/mock-data"

export default function ActorSearchPage() {
  const [search, setSearch] = useState("")
  const [genderFilter, setGenderFilter] = useState("不限")
  const [heightMin, setHeightMin] = useState("")
  const [heightMax, setHeightMax] = useState("")
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [sort, setSort] = useState("distance")
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null)
  const [followed, setFollowed] = useState<Set<string>>(new Set())

  const actors = getActors({
    gender: genderFilter !== "不限" ? genderFilter : undefined,
    heightMin: heightMin ? Number(heightMin) : undefined,
    heightMax: heightMax ? Number(heightMax) : undefined,
    bodyTypes: selectedBodyTypes.length ? selectedBodyTypes : undefined,
    skills: selectedSkills.length ? selectedSkills : undefined,
    search: search || undefined,
    sort: sort === "distance" ? "distance" : "credit",
  })

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item])
  }

  const toggleFollow = (actorId: string) => {
    setFollowed((prev) => {
      const next = new Set(prev)
      if (next.has(actorId)) next.delete(actorId)
      else next.add(actorId)
      return next
    })
  }

  return (
    <div className="py-6 px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">搜索演员</h1>
        <p className="text-gray-500 mt-1">浏览和筛选平台上的演员</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索演员姓名或技能..."
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
        />
      </div>

      {/* Filter Panel */}
      <div className="bg-white rounded-xl border p-5 shadow-sm mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">筛选条件</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">排序：</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="distance">距离优先</option>
              <option value="credit">信用分优先</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">性别：</span>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="不限">不限</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">身高：</span>
            <input
              type="number"
              value={heightMin}
              onChange={(e) => setHeightMin(e.target.value)}
              placeholder="最低"
              className="w-20 px-2 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-gray-400">~</span>
            <input
              type="number"
              value={heightMax}
              onChange={(e) => setHeightMax(e.target.value)}
              placeholder="最高"
              className="w-20 px-2 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <span className="text-xs text-gray-500 mr-2">体型：</span>
          <div className="inline-flex flex-wrap gap-1.5 mt-1">
            {bodyTypeOptions.map((bt) => (
              <label
                key={bt}
                className={`px-2.5 py-1 rounded-md border text-xs cursor-pointer transition-colors ${
                  selectedBodyTypes.includes(bt)
                    ? "bg-purple-50 border-purple-300 text-purple-700"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
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
          <span className="text-xs text-gray-500 mr-2">特长：</span>
          <div className="inline-flex flex-wrap gap-1.5 mt-1">
            {skillOptions.map((sk) => (
              <label
                key={sk}
                className={`px-2.5 py-1 rounded-md border text-xs cursor-pointer transition-colors ${
                  selectedSkills.includes(sk)
                    ? "bg-purple-50 border-purple-300 text-purple-700"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
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

      {/* Actor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {actors.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400">暂无匹配演员</div>
        )}
        {actors.map((actor, i) => (
          <motion.div
            key={actor.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedActor(actor)}
            className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <img src={actor.avatar} alt={actor.name} className="w-14 h-14 rounded-full bg-gray-200 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">{actor.name}</h3>
                  {actor.creditScore >= 130 && (
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-yellow-100 text-yellow-700">
                      <Award className="w-3 h-3" /> 金牌
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span>{actor.gender}</span>
                  <span>{actor.height}cm</span>
                  <span>{actor.bodyType}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Award className="w-3 h-3 text-purple-500" /> {actor.creditScore}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {actor.distance}km
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" /> {actor.completedOrders}单
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {actor.skills.slice(0, 4).map((sk) => (
                <span key={sk} className="px-2 py-0.5 rounded-full text-[10px] bg-gray-100 text-gray-600">
                  {sk}
                </span>
              ))}
              {actor.skills.length > 4 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-gray-100 text-gray-400">
                  +{actor.skills.length - 4}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Actor Detail Modal */}
      <AnimatePresence>
        {selectedActor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedActor(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-lg font-semibold text-gray-900">演员详情</h3>
                <button onClick={() => setSelectedActor(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile */}
                <div className="flex items-start gap-4">
                  <img src={selectedActor.avatar} alt={selectedActor.name} className="w-20 h-20 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-semibold text-gray-900">{selectedActor.name}</h4>
                      {selectedActor.creditScore >= 130 && (
                        <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          <Award className="w-3.5 h-3.5" /> 金牌演员
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{selectedActor.bio}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>{selectedActor.gender} / {selectedActor.age}岁</span>
                      <span>{selectedActor.height}cm / {selectedActor.weight}kg</span>
                      <span>{selectedActor.bodyType}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "信用分", value: selectedActor.creditScore },
                    { label: "完成信息", value: selectedActor.completedOrders },
                    { label: "好评率", value: `${selectedActor.goodRate}%` },
                    { label: "粉丝", value: selectedActor.fans },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-gray-900">{item.value}</p>
                      <p className="text-xs text-gray-400">{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">特长技能</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedActor.skills.map((sk) => (
                      <span key={sk} className="px-3 py-1 rounded-full text-xs bg-purple-50 text-purple-700 border border-purple-200">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Photos */}
                {selectedActor.photos.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">照片集</h5>
                    <div className="flex gap-2 overflow-x-auto">
                      {selectedActor.photos.map((photo, i) => (
                        <img key={i} src={photo} alt={`照片${i + 1}`} className="w-32 h-40 object-cover rounded-lg bg-gray-100 shrink-0" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Distance */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>距你 {selectedActor.distance}km</span>
                </div>

                {/* Follow Button */}
                <Button
                  onClick={() => toggleFollow(selectedActor.id)}
                  className={`w-full gap-2 ${
                    followed.has(selectedActor.id)
                      ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                  variant={followed.has(selectedActor.id) ? "outline" : "default"}
                >
                  <Heart className={`w-4 h-4 ${followed.has(selectedActor.id) ? "fill-red-500 text-red-500" : ""}`} />
                  {followed.has(selectedActor.id) ? "已关注" : "关注"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
