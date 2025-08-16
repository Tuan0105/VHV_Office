import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "VOffice - Số hóa, lưu trữ, quản lý thông minh | VOffice",
  description:
    "Giải pháp số hóa tài liệu toàn diện với AI OCR 98% chính xác, lưu trữ cấu trúc thông minh và quản lý tài liệu hiệu quả cho doanh nghiệp Việt Nam.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-inter antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
