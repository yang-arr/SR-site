"use client"

import * as React from "react"
import { X, Clapperboard, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RegisterModalProps {
  open: boolean
  onClose: () => void
}

type Role = "crew" | "actor" | null

export function RegisterModal({ open, onClose }: RegisterModalProps) {
  const [step, setStep] = React.useState<"role" | "form" | "success">("role")
  const [role, setRole] = React.useState<Role>(null)
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const reset = () => {
    setStep("role")
    setRole(null)
    setName("")
    setPhone("")
    setPassword("")
    setError("")
    setLoading(false)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSelectRole = (r: "crew" | "actor") => {
    setRole(r)
    setStep("form")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, phone, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "注册失败")
        setLoading(false)
        return
      }

      setStep("success")
    } catch {
      setError("网络错误，请稍后重试")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {step === "role" && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-2">注册 SceneReady</h2>
            <p className="text-muted-foreground text-center mb-8">请选择你的身份</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSelectRole("crew")}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Clapperboard className="h-10 w-10 text-primary" />
                <span className="font-semibold text-lg">我是剧组</span>
                <span className="text-sm text-muted-foreground">发布通告、选角管理</span>
              </button>
              <button
                onClick={() => handleSelectRole("actor")}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <User className="h-10 w-10 text-primary" />
                <span className="font-semibold text-lg">我是演员</span>
                <span className="text-sm text-muted-foreground">投递简历、接收通告</span>
              </button>
            </div>
          </div>
        )}

        {step === "form" && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-2">
              {role === "crew" ? "剧组注册" : "演员注册"}
            </h2>
            <p className="text-muted-foreground text-center mb-6">填写基本信息完成注册</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  {role === "crew" ? "剧组/公司名称" : "姓名"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === "crew" ? "请输入剧组或公司名称" : "请输入真实姓名"}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">手机号</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入手机号"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">密码</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请设置密码（至少6位）"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-semibold rounded-xl"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "注册"}
              </Button>

              <button
                type="button"
                onClick={() => { setStep("role"); setError("") }}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                返回选择身份
              </button>
            </form>
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">注册成功！</h2>
            <p className="text-muted-foreground mb-6">欢迎加入 SceneReady，开启你的选角之旅。</p>
            <Button onClick={handleClose} className="h-12 px-8 text-base rounded-xl">
              好的
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
