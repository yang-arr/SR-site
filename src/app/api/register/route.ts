import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { role, name, phone, password } = await req.json()

    if (!role || !name || !phone || !password) {
      return NextResponse.json({ error: "所有字段均为必填" }, { status: 400 })
    }

    if (!["crew", "actor"].includes(role)) {
      return NextResponse.json({ error: "无效的角色类型" }, { status: 400 })
    }

    if (!/^1\d{10}$/.test(phone)) {
      return NextResponse.json({ error: "请输入有效的手机号" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "密码至少6位" }, { status: 400 })
    }

    const existing = db.prepare("SELECT id FROM users WHERE phone = ?").get(phone)
    if (existing) {
      return NextResponse.json({ error: "该手机号已注册" }, { status: 409 })
    }

    const stmt = db.prepare("INSERT INTO users (role, name, phone, password) VALUES (?, ?, ?, ?)")
    stmt.run(role, name, phone, password)

    return NextResponse.json({ message: "注册成功" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "服务器错误，请稍后重试" }, { status: 500 })
  }
}
