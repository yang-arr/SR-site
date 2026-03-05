import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SceneReady - 专业的试戏平台",
  description: "连接剧组与演员的高效试戏平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
