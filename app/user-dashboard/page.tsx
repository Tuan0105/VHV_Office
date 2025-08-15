"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  FileText, 
  Upload, 
  LogOut,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  User,
  Home,
  Plus,
  Eye,
  Folder,
  Receipt,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  Calendar,
  Search
} from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function UserDashboard() {
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')

  // Mock data - trong thực tế sẽ lấy từ API
  const userData = {
    name: "Nguyễn Văn A",
    greeting: "Chào buổi sáng"
  }

  const personalKPIs = [
    {
      title: "Cần hành động",
      value: "1",
      description: "Tài liệu bị từ chối",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      title: "Đang chờ duyệt",
      value: "5",
      description: "Tài liệu đã gửi",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      title: "Đã xử lý",
      value: "24",
      description: "Tháng này",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: "approved",
      icon: CheckCircle,
      iconColor: "text-green-600",
      title: "Hóa đơn INV-00123 đã được duyệt",
      subtitle: "bởi Nguyễn Thị B",
      time: "2 giờ trước",
      documentId: "INV-00123"
    },
    {
      id: 2,
      type: "rejected",
      icon: X,
      iconColor: "text-red-600",
      title: "Hợp đồng HD-0045 đã bị từ chối",
      subtitle: "Lý do: Sai tổng tiền",
      time: "Hôm qua",
      documentId: "HD-0045"
    },
    {
      id: 3,
      type: "pending",
      icon: Clock,
      iconColor: "text-yellow-600",
      title: "Hóa đơn INV-00124 đang chờ",
      subtitle: "Nguyễn Thị B phê duyệt",
      time: "Hôm qua",
      documentId: "INV-00124"
    },
    {
      id: 4,
      type: "uploaded",
      icon: Upload,
      iconColor: "text-blue-600",
      title: "Bạn đã tải lên tài liệu",
      subtitle: "BaoGia-XYZ.pdf",
      time: "2 ngày trước",
      documentId: "BG-XYZ"
    }
  ]

  // Danh mục gốc - Các thư mục chính
  const rootCategories = [
    {
      id: "invoices",
      name: "Hóa đơn",
      icon: Receipt,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      documentCount: 1234,
      lastUpdated: "2 giờ trước",
      description: "Hóa đơn đầu vào, đầu ra"
    },
    {
      id: "personal-docs",
      name: "Chứng từ cá nhân",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      documentCount: 567,
      lastUpdated: "Hôm qua",
      description: "CMND, sổ hộ khẩu, bằng cấp"
    },
    {
      id: "contracts",
      name: "Hợp đồng",
      icon: FileSpreadsheet,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      documentCount: 89,
      lastUpdated: "3 ngày trước",
      description: "Hợp đồng lao động, kinh doanh"
    },
    {
      id: "receipts",
      name: "Biên lai",
      icon: FileImage,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      documentCount: 234,
      lastUpdated: "1 tuần trước",
      description: "Biên lai thu chi, chứng từ"
    },
    {
      id: "reports",
      name: "Báo cáo",
      icon: FileArchive,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      documentCount: 156,
      lastUpdated: "2 tuần trước",
      description: "Báo cáo định kỳ, thống kê"
    },
    {
      id: "others",
      name: "Tài liệu khác",
      icon: Folder,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      documentCount: 78,
      lastUpdated: "1 tháng trước",
      description: "Tài liệu không phân loại"
    }
  ]

  const handleLogout = () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      window.location.href = "/"
    }
  }

  const handleUploadDocument = () => {
    // Chuyển đến trang upload
    window.location.href = "/user-dashboard/upload"
  }

  const handleViewDocument = (documentId: string) => {
    // Chuyển đến trang chi tiết tài liệu
    window.location.href = `/user-dashboard/documents/${documentId}`
  }

  const handleNavigateToCategory = (categoryId: string) => {
    // Chuyển đến kho tài liệu với thư mục được chọn
    window.location.href = `/user-dashboard/documents?category=${categoryId}`
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
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.svg" alt="VHV Office Logo" className="w-full h-full" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">VHV Office</span>
                <div className="text-xs text-gray-500">User Dashboard</div>
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
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Khu vực 1: Hành động chính */}
        <div className="mb-8">
          <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {userData.greeting}, {userData.name}!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Bạn đã sẵn sàng để số hóa tài liệu hôm nay chưa?
            </p>
            <Button 
              onClick={handleUploadDocument}
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-6 h-6 mr-3" />
              Tải lên tài liệu mới
            </Button>
          </div>
        </div>

        {/* Khu vực 2: Các chỉ số công việc cá nhân */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {personalKPIs.map((kpi, index) => (
            <Card key={index} className={`hover:shadow-lg transition-shadow border-2 ${kpi.borderColor}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                    <p className={`text-3xl font-bold ${kpi.color} mb-1`}>{kpi.value}</p>
                    <p className="text-xs text-gray-500">{kpi.description}</p>
                  </div>
                  <div className={`w-16 h-16 ${kpi.bgColor} rounded-xl flex items-center justify-center`}>
                    <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Khu vực 3: Các danh mục gốc - Thanh điều hướng nhanh */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Folder className="w-6 h-6 mr-2 text-blue-600" />
              Kho tài liệu của bạn
            </h2>
            <Link href="/user-dashboard/documents">
              <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                Xem tất cả
                <Eye className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rootCategories.map((category) => (
              <Card 
                key={category.id}
                className={`hover:shadow-lg transition-all duration-200 cursor-pointer border-2 ${category.borderColor} hover:scale-105`}
                onClick={() => handleNavigateToCategory(category.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      {category.documentCount} tài liệu
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Cập nhật: {category.lastUpdated}</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Xem chi tiết</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Khu vực 4: Hoạt động gần đây */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Hoạt động gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id}
                  onClick={() => handleViewDocument(activity.documentId)}
                  className="flex items-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                >
                  <div className={`w-10 h-10 ${activity.iconColor.replace('text-', 'bg-').replace('-600', '-100')} rounded-full flex items-center justify-center mr-4`}>
                    <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <Eye className="w-4 h-4 text-gray-400 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Navigation - Luôn hiển thị */}
        <TooltipProvider>
          <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50">
            <div className="flex flex-col space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/user-dashboard">
                    <Button variant="ghost" size="icon" className="w-12 h-12 bg-red-50 text-red-600 hover:bg-red-100">
                      <Home className="w-5 h-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Tổng quan</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/user-dashboard/documents">
                    <Button variant="ghost" size="icon" className="w-12 h-12 hover:bg-gray-100">
                      <Folder className="w-5 h-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Kho tài liệu</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/user-dashboard/upload">
                    <Button variant="ghost" size="icon" className="w-12 h-12 hover:bg-gray-100">
                      <Upload className="w-5 h-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Tải lên tài liệu</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/user-dashboard/account">
                    <Button variant="ghost" size="icon" className="w-12 h-12 hover:bg-gray-100">
                      <User className="w-5 h-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Tài khoản</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </div>
  )
}

