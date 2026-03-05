"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, ImagePlus } from "lucide-react"
import { ActorHeader } from "@/components/layout/actor-tabbar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const topicTags = ["片场日常", "幕后花絮", "模卡", "造型", "面试技巧", "经验分享", "新人日记", "转型"]

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [imageSlots] = useState<(string | null)[]>(Array(9).fill(null))
  const [toastMsg, setToastMsg] = useState("")

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handlePublish = () => {
    if (!title.trim()) {
      setToastMsg("请输入标题")
      setTimeout(() => setToastMsg(""), 2000)
      return
    }
    setToastMsg("发布成功，审核中")
    setTimeout(() => setToastMsg(""), 2000)
  }

  return (
    <div className="pb-4">
      <ActorHeader title="发布动态" />

      <div className="max-w-3xl mx-auto px-4 md:px-6 mt-4">
        {/* Image upload area */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">添加图片 (最多9张)</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {imageSlots.map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                {i === 0 ? (
                  <>
                    <ImagePlus className="h-6 w-6 text-gray-400 mb-0.5" />
                    <span className="text-xs text-gray-400">上传</span>
                  </>
                ) : (
                  <Plus className="h-5 w-5 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Title input */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">标题</h3>
            <span className={cn("text-xs", title.length > 100 ? "text-red-500" : "text-gray-400")}>
              {title.length}/100
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 100))}
            placeholder="给你的动态起个标题吧"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-300 transition-colors"
          />
        </div>

        {/* Content textarea */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">内容</h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享你的故事、经验或日常..."
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-300 transition-colors resize-none h-36"
          />
        </div>

        {/* Topic tags */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">话题标签</h3>
          <div className="flex flex-wrap gap-2">
            {topicTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                  selectedTags.includes(tag)
                    ? "bg-purple-500 text-white border-purple-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-purple-300"
                )}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Publish button */}
        <Button onClick={handlePublish} className="w-full h-11 rounded-lg text-sm">
          发布
        </Button>
      </div>

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
