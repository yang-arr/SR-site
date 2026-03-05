"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MessageCircle, X, Send, Plus } from "lucide-react"
import { ActorHeader } from "@/components/layout/actor-tabbar"
import { cn } from "@/lib/utils"
import { getCommunityPosts } from "@/lib/mock-data"
import type { CommunityPost } from "@/lib/mock-data"

const sortTabs = [
  { label: "最新", value: "latest" as const },
  { label: "最热", value: "hot" as const },
  { label: "推荐", value: "recommended" as const },
]

const mockComments = [
  { id: "c1", author: "陈浩然", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=actor2", content: "太棒了！加油！", time: "2小时前" },
  { id: "c2", author: "王诗涵", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=actor3", content: "好羡慕，什么时候能一起合作呀", time: "5小时前" },
  { id: "c3", author: "张子豪", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=actor4", content: "分享得很好，学习了", time: "1天前" },
]

export default function CommunityPage() {
  const [activeSort, setActiveSort] = useState<"latest" | "hot" | "recommended">("latest")
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null)
  const [commentText, setCommentText] = useState("")

  const posts = getCommunityPosts(activeSort)

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const isLiked = (post: CommunityPost) => likedPosts[post.id] ?? post.isLiked

  const imageAspects = [1.2, 0.8, 1.0, 1.4, 0.9, 1.1]

  return (
    <div className="pb-4">
      <ActorHeader title="社区" />

      {/* Sort tabs */}
      <div className="sticky top-14 z-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 md:px-6 flex gap-4 py-2">
          {sortTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveSort(tab.value)}
              className={cn(
                "text-sm font-medium pb-1 transition-colors relative",
                activeSort === tab.value ? "text-purple-600" : "text-gray-500"
              )}
            >
              {tab.label}
              {activeSort === tab.value && (
                <motion.div
                  layoutId="communityTab"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-purple-500 rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 mt-3 columns-2 sm:columns-3 gap-3 space-y-3">
        {posts.map((post, i) => {
          const aspect = imageAspects[i % imageAspects.length]
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="break-inside-avoid"
            >
              <div
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md hover:border-purple-100 active:scale-[0.98] transition-all"
              >
                {post.images.length > 0 ? (
                  <div style={{ aspectRatio: aspect }}>
                    <img src={post.images[0]} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div
                    style={{ aspectRatio: aspect }}
                    className="bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center"
                  >
                    <MessageCircle className="h-6 w-6 text-purple-300" />
                  </div>
                )}

                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">{post.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <img src={post.authorAvatar} alt="" className="h-5 w-5 rounded-full shrink-0" />
                      <span className="text-xs text-gray-500 truncate">{post.authorName}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={(e) => toggleLike(post.id, e)} className="flex items-center gap-0.5">
                        <Heart
                          className={cn("h-3.5 w-3.5 transition-colors", isLiked(post) ? "fill-red-500 text-red-500" : "text-gray-400")}
                        />
                        <span className="text-[11px] text-gray-400">{post.likes + (isLiked(post) && !post.isLiked ? 1 : 0)}</span>
                      </button>
                      <span className="flex items-center gap-0.5">
                        <MessageCircle className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-[11px] text-gray-400">{post.comments}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Floating publish button */}
      <Link
        href="/actor/community/post"
        className="fixed bottom-20 right-6 z-30 h-12 w-12 bg-purple-500 rounded-full shadow-lg shadow-purple-200 flex items-center justify-center text-white hover:bg-purple-600 active:scale-95 transition-all"
      >
        <Plus className="h-6 w-6" />
      </Link>

      {/* Post detail modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-3">
                  <img src={selectedPost.authorAvatar} alt="" className="h-9 w-9 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold">{selectedPost.authorName}</p>
                    <p className="text-xs text-gray-400">{selectedPost.createdAt}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedPost(null)}>
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Modal content */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <h2 className="text-base font-bold text-gray-900 mb-2">{selectedPost.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{selectedPost.content}</p>

                {selectedPost.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {selectedPost.images.map((img, idx) => (
                      <img key={idx} src={img} alt="" className="w-full rounded-lg object-cover aspect-square" />
                    ))}
                  </div>
                )}

                {selectedPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selectedPost.tags.map((tag) => (
                      <span key={tag} className="text-xs text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 pb-3 border-b border-gray-100 mb-4">
                  <button onClick={() => toggleLike(selectedPost.id)} className="flex items-center gap-1">
                    <Heart className={cn("h-4 w-4 transition-colors", isLiked(selectedPost) ? "fill-red-500 text-red-500" : "text-gray-400")} />
                    <span className="text-sm text-gray-500">{selectedPost.likes + (isLiked(selectedPost) && !selectedPost.isLiked ? 1 : 0)}</span>
                  </button>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{selectedPost.comments}</span>
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-gray-700 mb-3">评论</h4>
                <div className="space-y-3">
                  {mockComments.map((c) => (
                    <div key={c.id} className="flex gap-2">
                      <img src={c.avatar} alt="" className="h-7 w-7 rounded-full shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">{c.author}</span>
                          <span className="text-xs text-gray-400">{c.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{c.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment input */}
              <div className="shrink-0 border-t border-gray-100 px-5 py-3 flex items-center gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="写评论..."
                  className="flex-1 bg-gray-50 rounded-full px-4 py-2.5 text-sm outline-none"
                />
                <button className="text-purple-500">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
