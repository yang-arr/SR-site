"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Star, UserCircle2, Clock } from "lucide-react"

export function CrewVideoDemo() {
    const [showNote, setShowNote] = React.useState(false)
    const [time, setTime] = React.useState(12)

    React.useEffect(() => {
        const t = setInterval(() => {
            setTime(p => p + 1)
        }, 1000)
        return () => clearInterval(t)
    }, [])

    const handleAddNote = () => {
        setShowNote(true)
        setTimeout(() => setShowNote(false), 2000)
    }

    const formatTime = (s: number) => {
        const min = Math.floor(s / 60)
        const sec = s % 60
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }

    return (
        <div className="flex flex-col h-full bg-slate-900 font-sans text-white overflow-hidden relative">
            {/* Video Area (Mock Actor) */}
            <div className="absolute inset-0 bg-slate-800">
                <div
                    className="w-full h-full bg-cover bg-center opacity-80"
                    style={{ backgroundImage: 'url(/images/P70Xp.jpg)' }}
                ></div>

                {/* Interviewer PiP */}
                <div className="absolute top-4 right-4 w-24 h-32 bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-xl z-20">
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <UserCircle2 className="w-8 h-8 text-slate-500" />
                    </div>
                </div>

                {/* Time Badge */}
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur px-3 py-1 rounded-full text-xs font-mono flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    REC {formatTime(time)}
                </div>

                {/* AI Analysis Overlay (Mock) */}
                <div className="absolute top-16 left-4 bg-black/40 backdrop-blur p-2 rounded-lg text-[10px] w-32 space-y-1 border border-white/10">
                    <div className="text-slate-400">实时表情分析</div>
                    <div className="flex justify-between">
                        <span>自信</span>
                        <span className="text-green-400">92%</span>
                    </div>
                    <div className="flex justify-between">
                        <span>台词准确</span>
                        <span className="text-green-400">98%</span>
                    </div>
                </div>
            </div>

            {/* Controls Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-20">
                <AnimatePresence>
                    {showNote && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mb-6 bg-white/10 backdrop-blur p-3 rounded-lg border border-white/20 flex items-center gap-3 text-sm"
                        >
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold">
                                <Star className="w-4 h-4 fill-current" />
                            </div>
                            <div>
                                <div className="font-bold">标记精彩时刻</div>
                                <div className="text-xs text-slate-300">已添加至时间轴 00:{time}</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-end">
                    <div className="space-y-4">
                        <div className="text-xl font-bold">李梦 - 试戏中</div>
                        <div className="text-sm opacity-70">《长夜破晓》 / 女一号</div>
                    </div>

                    <button
                        onClick={handleAddNote}
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center active:bg-primary transition-colors"
                    >
                        <Star className="w-6 h-6" />
                    </button>
                </div>

                <div className="mt-8 flex justify-center gap-6">
                    <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20">
                        <MicOff className="w-5 h-5" />
                    </button>
                    <button className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30 hover:scale-105 transition-transform">
                        <PhoneOff className="w-8 h-8 fill-current" />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20">
                        <VideoOff className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
