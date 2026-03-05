"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Bell, Home, User, ChevronLeft, MapPin, Loader2, CheckCircle2, Star } from "lucide-react"

const JOBS = [
    {
        id: 1,
        title: "男一号·古装玄幻剧",
        project: "《长夜破晓》",
        salary: "面议",
        tags: ["S级项目", "一线导演"],
        img: "/images/QKDqy.jpg",
        benefits: ["包餐", "包住宿", "五险一金"],
        crew: { name: "星光传媒", credit: 148, isGold: true },
        distance: "2.5km",
        location: "横店影视城·秦王宫"
    },
    {
        id: 2,
        title: "特约·悬疑短剧",
        project: "《迷雾追踪》",
        salary: "3000/天",
        tags: ["周期短", "现结"],
        img: "/images/ZPANu.jpg",
        benefits: ["车接车送", "工作餐"],
        crew: { name: "新锐工作室", credit: 135, isGold: true },
        distance: "5.0km",
        location: "怀柔影视基地"
    },
    {
        id: 3,
        title: "广告拍摄·运动品牌",
        project: "XX春季TVC",
        salary: "5000/条",
        tags: ["需要滑雪", "阳光"],
        img: "/images/UxmRP.jpg",
        benefits: ["现结", "交通补贴"],
        crew: { name: "奥美广告", credit: 140, isGold: false },
        distance: "8.2km",
        location: "万龙滑雪场"
    },
    {
        id: 4,
        title: "女配角·都市情感",
        project: "《温暖的你》",
        salary: "15000/集",
        tags: ["上星剧", "新人"],
        img: "/images/dHGwH.jpg",
        benefits: ["包食宿", "杀青红包"],
        crew: { name: "橙子映像", credit: 125, isGold: false },
        distance: "12km",
        location: "上海车墩影视乐园"
    },
]

export function ActorAppDemo() {
    const [view, setView] = React.useState<"list" | "detail" | "success">("list")
    const [selectedJob, setSelectedJob] = React.useState<typeof JOBS[0] | null>(null)

    const handleJobClick = (job: any) => {
        setSelectedJob(job)
        setView("detail")
    }

    const handleApply = () => {
        // Mock async loading
        const btn = document.getElementById("apply-btn")
        if (btn) btn.innerHTML = "投递中..."
        setTimeout(() => {
            setView("success")
        }, 800)
    }

    return (
        <div className="flex flex-col h-full bg-slate-50 font-sans text-slate-900 overflow-hidden relative">

            <AnimatePresence mode="popLayout" initial={false}>
                {view === "list" && (
                    <motion.div
                        key="list"
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className="absolute inset-0 flex flex-col bg-slate-50"
                    >
                        {/* Header */}
                        <div className="bg-white px-4 pt-4 pb-2 shadow-sm z-20">
                            <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 text-slate-400 text-sm mb-3">
                                <Search className="w-4 h-4" />
                                <span>搜索角色/剧组</span>
                            </div>
                            <div className="flex gap-2 text-xs font-semibold text-slate-500 overflow-x-auto pb-2 no-scrollbar">
                                <span className="text-primary bg-primary/10 px-3 py-1.5 rounded-full whitespace-nowrap">距离最近</span>
                                <span className="bg-white border text-slate-600 px-3 py-1.5 rounded-full whitespace-nowrap">日薪最高</span>
                                <span className="bg-white border text-slate-600 px-3 py-1.5 rounded-full whitespace-nowrap">信用优选</span>
                                <span className="bg-white border text-slate-600 px-3 py-1.5 rounded-full whitespace-nowrap">包食宿</span>
                            </div>
                        </div>

                        {/* Feed */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 no-scrollbar">
                            {JOBS.map(job => (
                                <div
                                    key={job.id}
                                    onClick={() => handleJobClick(job)}
                                    className="bg-white rounded-xl overflow-hidden shadow-sm active:scale-95 transition-transform border border-slate-100"
                                >
                                    <div className="h-36 bg-slate-200 relative">
                                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${job.img})` }}></div>
                                        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/50 to-transparent"></div>
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-[10px] px-2 py-1 rounded font-bold">{job.tags[0]}</div>
                                        <div className="absolute top-3 left-3 flex items-center gap-1 text-white text-[10px] bg-primary/80 backdrop-blur px-2 py-1 rounded-full font-bold">
                                            <Star className="w-3 h-3 fill-current" /> {job.crew.credit}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-lg leading-tight">{job.title}</h3>
                                            <span className="text-primary font-bold text-lg whitespace-nowrap ml-2">{job.salary}</span>
                                        </div>
                                        <div className="text-sm text-slate-500 mb-3">{job.project} · {job.crew.name}</div>

                                        <div className="flex items-center gap-4 text-xs text-slate-400">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.distance}</span>
                                            <div className="flex gap-1">
                                                {job.benefits.slice(0, 2).map((b: string) => (
                                                    <span key={b} className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{b}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {view === "detail" && selectedJob && (
                    <motion.div
                        key="detail"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0 }}
                        className="absolute inset-0 flex flex-col bg-white z-20"
                    >
                        {/* Detail Header */}
                        <div className="relative h-64 shrink-0">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedJob.img})` }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            <button
                                onClick={() => setView("list")}
                                className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                                <ChevronLeft />
                            </button>
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 bg-primary rounded text-xs font-bold">招募中</span>
                                    <span className="text-xs opacity-80 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3 text-green-400" /> 已认证剧组
                                    </span>
                                </div>
                                <h1 className="text-2xl font-bold mb-1 leading-tight">{selectedJob.title}</h1>
                                <p className="opacity-80 text-sm">{selectedJob.project}</p>
                            </div>
                        </div>

                        {/* Detail Content */}
                        <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
                            {/* Salary & Crew */}
                            <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
                                <div>
                                    <div className="text-2xl font-bold text-primary mb-1">{selectedJob.salary}</div>
                                    <div className="flex items-center gap-1 text-xs text-slate-400">
                                        信用分 <span className="font-bold text-slate-600">{selectedJob.crew.credit}</span>
                                        {selectedJob.crew.isGold && <span className="text-yellow-500 font-bold">· 金牌剧组</span>}
                                    </div>
                                </div>
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white"></div>
                                    ))}
                                    <div className="w-9 h-9 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center border-2 border-white font-bold tracking-tighter">
                                        24人
                                    </div>
                                </div>
                            </div>

                            {/* Location & Safety */}
                            <div className="bg-slate-50 rounded-xl p-4 mb-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-sm mb-1">{selectedJob.location}</div>
                                        <div className="text-xs text-slate-500">距您当前位置 {selectedJob.distance}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>全程轨迹追踪 · 电子围栏保障安全</span>
                                </div>
                            </div>

                            <h3 className="font-bold mb-3 text-lg">福利待遇</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedJob.benefits.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">{tag}</span>
                                ))}
                            </div>

                            <h3 className="font-bold mb-3 text-lg">角色要求</h3>
                            <div className="space-y-4 text-sm text-slate-600 leading-relaxed mb-8">
                                <p>1. 形象气质佳，有古装拍摄经验者优先。</p>
                                <p>2. 要求无不良嗜好，能配合剧组拍摄时间。</p>
                                <p>3. 此角色涉及少量威亚戏份，需无恐高症。</p>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center font-bold text-xs border border-red-100">PDF</div>
                                    <div className="flex-1">
                                        <div className="font-bold text-slate-900 text-sm">试戏片段-第一场.pdf</div>
                                        <div className="text-xs text-slate-400">2.4MB</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="p-4 border-t bg-white safe-area-bottom shrink-0 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-30">
                            <button
                                id="apply-btn"
                                onClick={handleApply}
                                className="w-full h-12 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/30 active:scale-95 transition-transform flex items-center justify-center text-lg"
                            >
                                立即投递
                            </button>
                        </div>
                    </motion.div>
                )}

                {view === "success" && (
                    <motion.div
                        key="success"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-white z-30 p-8 text-center"
                    >
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">投递成功!</h2>
                        <p className="text-slate-500 mb-8">剧组将在3个工作日内查看您的资料。<br />请保持电话畅通。</p>
                        <button
                            onClick={() => setView("list")}
                            className="px-8 py-3 border rounded-full font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            返回首页
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tab Bar (Only show in List view) */}
            {view === "list" && (
                <div className="h-16 bg-white border-t flex justify-around items-center text-xs font-medium text-slate-400 absolute bottom-0 inset-x-0 z-10 safe-area-bottom">
                    <div className="flex flex-col items-center gap-1 text-primary">
                        <Home className="w-5 h-5" />
                        任务
                    </div>
                    <div className="flex flex-col items-center gap-1 hover:text-slate-900 transition-colors">
                        <Bell className="w-5 h-5" />
                        消息
                    </div>
                    <div className="flex flex-col items-center gap-1 hover:text-slate-900 transition-colors">
                        <User className="w-5 h-5" />
                        我的
                    </div>
                </div>
            )}
        </div>
    )
}
