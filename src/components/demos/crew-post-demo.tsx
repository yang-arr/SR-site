"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wand2, Check, ChevronRight, Mic, MapPin, Calendar, Clock } from "lucide-react"

export function CrewPostDemo() {
    const [step, setStep] = React.useState(0)
    const [analyzing, setAnalyzing] = React.useState(false)

    const handleAIAnalyze = () => {
        setAnalyzing(true)
        setTimeout(() => {
            setAnalyzing(false)
            setStep(1)
        }, 1500)
    }

    const handlePublish = () => {
        setStep(2)
        setTimeout(() => {
            setStep(0)
        }, 3000)
    }

    return (
        <div className="flex flex-col h-full bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
            <div className="bg-white p-4 pt-10 border-b flex items-center justify-between">
                <h2 className="font-bold text-lg">发布组讯</h2>
                <span className="text-primary text-sm font-bold">草稿箱 (2)</span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                {step === 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <label className="text-xs font-bold text-slate-400 mb-1 block">剧组/项目名称</label>
                            <div className="font-medium">《长夜破晓》</div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                <Wand2 className="w-12 h-12" />
                            </div>
                            <label className="text-xs font-bold text-slate-400 mb-2 block">角色描述 (可语音输入)</label>
                            <div className="text-sm leading-relaxed mb-4 text-slate-600">
                                需要一名20-25岁的女演员，身高165以上，要会跳古典舞，长相甜美。有一场雨中哭戏，需要爆发力强。
                            </div>

                            <button
                                onClick={handleAIAnalyze}
                                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg py-3 font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-95 transition-transform"
                            >
                                {analyzing ? (
                                    <>分析中...</>
                                ) : (
                                    <>
                                        <Wand2 className="w-4 h-4" /> AI 智能解析需求
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="flex gap-4 opacity-50 pointer-events-none grayscale">
                            <div className="flex-1 bg-white p-3 rounded-lg border">
                                <MapPin className="w-4 h-4 mb-2 text-slate-400" />
                                <div className="h-2 w-12 bg-slate-100 rounded"></div>
                            </div>
                            <div className="flex-1 bg-white p-3 rounded-lg border">
                                <Calendar className="w-4 h-4 mb-2 text-slate-400" />
                                <div className="h-2 w-12 bg-slate-100 rounded"></div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg text-sm font-medium mb-2">
                            <Check className="w-4 h-4" /> 解析完成，已自动填充标签
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-violet-100 shadow-sm ring-2 ring-violet-500/20">
                            <h3 className="font-bold text-sm mb-3 text-slate-500">解析结果</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1">年龄/身高</label>
                                    <div className="flex gap-2">
                                        <span className="bg-slate-100 px-2 py-1 rounded text-sm font-medium">20-25岁</span>
                                        <span className="bg-slate-100 px-2 py-1 rounded text-sm font-medium">165cm+</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1">核心标签</label>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-violet-100 text-violet-700 px-2 py-1 rounded text-sm font-bold">古典舞</span>
                                        <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded text-sm font-bold">甜美</span>
                                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm font-bold">哭戏爆发力</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePublish}
                            className="w-full bg-primary text-white rounded-lg py-3 font-bold shadow-lg shadow-primary/30 mt-8"
                        >
                            一键发布
                        </button>
                        <button
                            onClick={() => setStep(0)}
                            className="w-full py-2 text-slate-400 text-sm font-medium"
                        >
                            返回修改
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center -mt-20">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl mb-6 shadow-green-200">
                            <Check className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">发布成功！</h3>
                        <p className="text-slate-500 text-center text-sm px-8">正在基于LBS为您推送给附近5km内的匹配演员...</p>

                        <div className="mt-8 flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                            <span className="text-xs text-primary font-bold">已推送 128 人</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
