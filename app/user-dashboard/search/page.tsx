"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Folder, Receipt, FileSpreadsheet, X, User, Home } from "lucide-react"
import Link from "next/link"

export default function SearchResults() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const query = urlParams.get('q')
    if (query) {
      setSearchQuery(query)
      performSearch(query)
    }
  }, [])

  const mockSearchResults = [
    {
      id: "inv-viettel-001",
      name: "Hóa đơn Viettel tháng 8-2025.pdf",
      type: "document",
      icon: Receipt,
      color: "text-green-600",
      bgColor: "bg-green-50",
      size: "2.1 MB",
      status: "approved",
      lastModified: "2 ngày trước",
      createdBy: "Nguyễn Văn A",
      tags: ["Viettel", "Hóa đơn viễn thông", "Tháng 8"],
      folder: "Hóa đơn > Năm 2025 > Quý 3",
      content: "Hóa đơn dịch vụ viễn thông Viettel tháng 8 năm 2025...",
      highlights: [
        { field: "content", text: "Hóa đơn dịch vụ viễn thông <mark>Viettel</mark> tháng 8 năm 2025" }
      ]
    },
    {
      id: "contract-viettel-001",
      name: "Hợp đồng cung cấp dịch vụ Viettel.pdf",
      type: "document",
      icon: FileSpreadsheet,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      size: "3.5 MB",
      status: "approved",
      lastModified: "1 tuần trước",
      createdBy: "Trần Thị B",
      tags: ["Viettel", "Hợp đồng", "Dịch vụ viễn thông"],
      folder: "Hợp đồng > Hợp đồng đang hiệu lực",
      content: "Hợp đồng cung cấp dịch vụ viễn thông giữa công ty và Viettel...",
      highlights: [
        { field: "content", text: "Hợp đồng cung cấp dịch vụ viễn thông giữa công ty và <mark>Viettel</mark>" }
      ]
    }
  ]

  const performSearch = (query: string) => {
    setIsLoading(true)
    setTimeout(() => {
      const results = mockSearchResults.filter(item => {
        const searchTerm = query.toLowerCase()
        const normalizeVietnamese = (str: string) => {
          return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'd')
        }
        
        const normalizedQuery = normalizeVietnamese(searchTerm)
        
        return (
          normalizeVietnamese(item.name).includes(normalizedQuery) ||
          normalizeVietnamese(item.content).includes(normalizedQuery) ||
          item.tags.some((tag: string) => normalizeVietnamese(tag).includes(normalizedQuery))
        )
      })
      
      setSearchResults(results)
      setIsLoading(false)
    }, 1000)
  }

  const handleBackToHome = () => {
    window.location.href = "/user-dashboard"
  }

  const handleGlobalSearch = () => {
    if (globalSearchQuery.trim()) {
      // Chuyển đến trang kết quả tìm kiếm với query
      window.location.href = `/user-dashboard/search?q=${encodeURIComponent(globalSearchQuery.trim())}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={handleBackToHome}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/logo.svg" alt="VHV Office Logo" className="w-full h-full" />
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">VHV Office</span>
                  <div className="text-xs text-gray-500">Kết quả tìm kiếm</div>
                </div>
              </div>
            </div>

            {/* Global Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm thông minh: 'hợp đồng Viettel', 'hóa đơn tháng 8'..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={globalSearchQuery}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && globalSearchQuery.trim()) {
                      handleGlobalSearch()
                    }
                  }}
                />
                {globalSearchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setGlobalSearchQuery('')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Nguyễn Văn A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Search Results Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Kết quả tìm kiếm cho "{searchQuery}"
          </h1>
          <p className="text-gray-500 mt-1">
            Tìm thấy {searchResults.length} kết quả
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400 animate-pulse" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Đang tìm kiếm...</h3>
            <p className="text-gray-500">Hệ thống đang phân tích và tìm kiếm thông minh</p>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {searchResults.map((item) => (
              <Card 
                key={item.id}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-gray-200 hover:border-blue-300 hover:scale-105"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-1 truncate">{item.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{item.folder}</p>
                  <p className="text-xs text-gray-500 mb-2">{item.size}</p>
                  
                  {/* Highlighted content preview */}
                  <div className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {item.highlights[0] && (
                      <span dangerouslySetInnerHTML={{ __html: item.highlights[0].text }} />
                    )}
                  </div>
                  
                  <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border-green-200">
                    Đã duyệt
                  </Badge>
                  
                  <p className="text-xs text-gray-400 mt-2">Cập nhật: {item.lastModified}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && searchResults.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy kết quả</h3>
            <p className="text-gray-500 mb-6">
              Không tìm thấy tài liệu nào chứa "{searchQuery}". Hãy thử từ khóa khác.
            </p>
            <Button onClick={handleBackToHome} variant="outline">
              <Home className="w-4 h-4 mr-2" />
              Về trang chủ
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
