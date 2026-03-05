"use client"

import * as React from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { X, Heart, Star, MapPin, ChevronLeft, MoreHorizontal, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const PROFILES = [
    { id: 1, name: "李梦", age: 22, height: 168, school: "北京电影学院", img: "/images/P70Xp.jpg", tags: ["古典舞", "汉服驾驭", "台词功底强"], credit: 135, distance: "2.5km", match: 98 },
    { id: 2, name: "王俊", age: 24, height: 182, school: "中央戏剧学院", img: "/images/wmyhe.jpg", tags: ["硬汉", "武术指导", "会骑马"], credit: 120, distance: "5.1km", match: 92 },
    { id: 3, name: "张梓涵", age: 21, height: 165, school: "上海戏剧学院", img: "/images/WrezA.jpg", tags: ["甜美", "哭戏爆发", "短发"], credit: 128, distance: "1.2km", match: 95 },
]

export function CrewAppDemo() {
    const [cards, setCards] = React.useState(PROFILES)
    const [history, setHistory] = React.useState<number[]>([]) // stores id of processed

    const handleSwipe = (direction: "left" | "right", id: number) => {
        // In a real app we'd record this. Here we just remove the card.
        setTimeout(() => {
            setCards((prev) => prev.filter((c) => c.id !== id))
            setHistory((prev) => [...prev, id])
        }, 200)
    }

    const reset = () => {
        setCards(PROFILES)
        setHistory([])
    }

    return (
        <div className="flex flex-col h-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
            {/* App Header */}
            <div className="h-14 bg-white flex items-center justify-between px-4 border-b shrink-0 z-20">
                <span className="font-bold text-lg">智能人选推荐</span>
                <div className="flex gap-2 text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500">
                    <span className="text-primary">匹配度优先</span>
                    <ChevronLeft className="w-3 h-3 rotate-180" />
                </div>
            </div>

            {/* Main Content: Card Stack */}
            <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden">
                {cards.length === 0 ? (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="fill-current" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">筛选完成</h3>
                        <p className="text-slate-500 mb-6 text-sm">已处理推荐列表</p>
                        <button onClick={reset} className="text-primary text-sm font-bold">重新加载</button>
                    </div>
                ) : (
                    <div className="relative w-full h-full max-h-[500px]">
                        <AnimatePresence>
                            {cards.map((profile, index) => {
                                const isTop = index === cards.length - 1
                                return (
                                    <Card
                                        key={profile.id}
                                        profile={profile}
                                        active={isTop}
                                        onSwipe={handleSwipe}
                                        style={{
                                            scale: 1 - (cards.length - 1 - index) * 0.05,
                                            y: (cards.length - 1 - index) * 10,
                                            zIndex: index
                                        }}
                                    />
                                )
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Bottom Actions (Only active if cards exist) */}
            <div className="h-20 bg-white border-t flex items-center justify-center gap-8 shrink-0 z-20">
                <button
                    className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                    disabled={cards.length === 0}
                    onClick={() => cards.length > 0 && handleSwipe("left", cards[cards.length - 1].id)}
                >
                    <X className="w-6 h-6" />
                </button>
                <button
                    className="w-14 h-14 rounded-full bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                    disabled={cards.length === 0}
                    onClick={() => cards.length > 0 && handleSwipe("right", cards[cards.length - 1].id)}
                >
                    <Heart className="fill-current w-7 h-7" />
                </button>
                <button
                    className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-primary hover:bg-slate-50 disabled:opacity-50 transition-colors"
                    disabled={cards.length === 0}
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}

function Card({ profile, active, onSwipe, style }: any) {
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-15, 15])
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

    // Color overlays for visual feedback
    const passOpacity = useTransform(x, [20, 100], [0, 1])
    const rejectOpacity = useTransform(x, [-20, -100], [0, 1])

    const handleDragEnd = (e: any, info: any) => {
        if (info.offset.x > 100) {
            onSwipe("right", profile.id)
        } else if (info.offset.x < -100) {
            onSwipe("left", profile.id)
        }
    }

    return (
        <motion.div
            style={{ ...style, x: active ? x : 0, rotate: active ? rotate : 0 }}
            drag={active ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={active ? { x: 0, y: 0, scale: 1 } : style} // Reset position if not swiped far enough
            exit={{ opacity: 0, transition: { duration: 0.2 } }} // Fade out on exit
            className="absolute inset-x-0 top-0 bottom-4 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 origin-bottom select-none cursor-grab active:cursor-grabbing"
        >
            {/* Visual Feedback Overlays */}
            {active && (
                <>
                    <motion.div style={{ opacity: passOpacity }} className="absolute top-8 left-8 z-10 border-4 border-green-500 text-green-500 rounded-lg px-4 py-1 text-2xl font-black rotate-[-15deg] bg-white/20 backdrop-blur-sm">合适</motion.div>
                    <motion.div style={{ opacity: rejectOpacity }} className="absolute top-8 right-8 z-10 border-4 border-red-500 text-red-500 rounded-lg px-4 py-1 text-2xl font-black rotate-[15deg] bg-white/20 backdrop-blur-sm">不合适</motion.div>
                </>
            )}

            {/* Card Content */}
            <div className="h-[70%] bg-slate-200 relative group">
                {/* Mock Image */}
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${profile.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Match Badge */}
                <div className="absolute top-4 right-4 bg-primary/90 text-white rounded-full px-3 py-1 text-xs font-bold shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    匹配度 {profile.match}%
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <div className="flex items-end justify-between mb-1">
                        <h2 className="text-3xl font-bold">{profile.name}</h2>
                        <span className="text-xl font-medium">{profile.age}岁</span>
                    </div>
                    <p className="opacity-90 font-medium mb-3">{profile.school} · {profile.height}cm</p>
                    <div className="flex items-center gap-2 text-xs bg-white/20 w-fit px-2 py-1 rounded backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span>信用分 {profile.credit} (金牌演员)</span>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-4">
                    {profile.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200">{tag}</span>
                    ))}
                </div>
                <div className="flex gap-6 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> 距离 {profile.distance}</span>
                    <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-red-400" /> 128人关注</span>
                </div>
            </div>
        </motion.div>
    )
}
