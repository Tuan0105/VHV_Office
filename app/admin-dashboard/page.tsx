"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { 
  Home, 
  FileText, 
  BarChart3, 
  Settings, 
  Users, 
  Activity, 
  LogOut,
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Upload,
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  FileCheck,
  FileX,
  FileClock,
  FilePlus,
  Link
} from "lucide-react"
import DocumentsManagement from "./documents/page"
import ReportsPage from "./reports/page"
import SystemConfigPage from "./system-config/page"
import IntegrationPage from "./integration/page"
import AccountPage from "./account/page"

export default function AdminDashboard() {
  const [activeSidebarItem, setActiveSidebarItem] = useState("overview")
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // KPI Data
  const kpiData = [
    { 
      title: "Tổng số tài liệu", 
      value: "1,258", 
      change: "+5%", 
      changeType: "positive",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      title: "Đang chờ xử lý", 
      value: "15", 
      change: "+2", 
      changeType: "neutral",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    { 
      title: "Tài liệu lỗi", 
      value: "3", 
      change: "-1", 
      changeType: "positive",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    { 
      title: "Thời gian xử lý TB", 
      value: "45 phút", 
      change: "-10%", 
      changeType: "positive",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
  ]

  // Chart data - Documents processed in last 30 days
  const chartData = [
    { day: "1", count: 12 },
    { day: "2", count: 15 },
    { day: "3", count: 8 },
    { day: "4", count: 20 },
    { day: "5", count: 18 },
    { day: "6", count: 25 },
    { day: "7", count: 22 },
    { day: "8", count: 16 },
    { day: "9", count: 19 },
    { day: "10", count: 14 },
    { day: "11", count: 21 },
    { day: "12", count: 28 },
    { day: "13", count: 24 },
    { day: "14", count: 17 },
    { day: "15", count: 23 },
    { day: "16", count: 26 },
    { day: "17", count: 20 },
    { day: "18", count: 18 },
    { day: "19", count: 22 },
    { day: "20", count: 25 },
    { day: "21", count: 19 },
    { day: "22", count: 16 },
    { day: "23", count: 21 },
    { day: "24", count: 24 },
    { day: "25", count: 27 },
    { day: "26", count: 23 },
    { day: "27", count: 20 },
    { day: "28", count: 18 },
    { day: "29", count: 22 },
    { day: "30", count: 25 },
  ]

  // Pie chart data - Document status distribution
  const pieChartData = [
    { status: "Đã duyệt", count: 45, color: "#10B981" },
    { status: "Đang chờ duyệt", count: 25, color: "#F59E0B" },
    { status: "Bị từ chối", count: 15, color: "#EF4444" },
    { status: "Mới tải lên", count: 15, color: "#3B82F6" },
  ]

  // Documents requiring attention
  const attentionDocuments = [
    { id: "INV-00123", name: "Hóa đơn ABC Corp", user: "Nguyễn Văn A", status: "Chờ duyệt", time: "2 phút trước" },
    { id: "HD-0045", name: "Hợp đồng XYZ Ltd", user: "Trần Thị B", status: "Bị từ chối", time: "15 phút trước" },
    { id: "INV-00121", name: "Hóa đơn DEF Company", user: "Lê Văn C", status: "Chờ duyệt", time: "1 giờ trước" },
    { id: "CMND-089", name: "CMND Nguyễn Thị D", user: "Phạm Văn E", status: "Bị từ chối", time: "2 giờ trước" },
    { id: "HD-0046", name: "Hợp đồng GHI Corp", user: "Hoàng Thị F", status: "Chờ duyệt", time: "3 giờ trước" },
  ]

  // Recent user activities
  const recentActivities = [
    { user: "Nguyễn Văn A", action: "đã tải lên hóa đơn", document: "INV-00123", time: "2 phút trước" },
    { user: "Trần Thị B", action: "đã duyệt hợp đồng", document: "HD-0045", time: "15 phút trước" },
    { user: "Lê Văn C", action: "đã cập nhật thông tin cho hóa đơn", document: "INV-00121", time: "1 giờ trước" },
    { user: "Phạm Văn E", action: "đã từ chối CMND", document: "CMND-089", time: "2 giờ trước" },
    { user: "Hoàng Thị F", action: "đã tải lên hợp đồng", document: "HD-0046", time: "3 giờ trước" },
    { user: "Vũ Văn G", action: "đã duyệt hóa đơn", document: "INV-00120", time: "4 giờ trước" },
  ]

  const sidebarItems = [
    { id: "overview", label: "Tổng quan", icon: Home },
    { id: "documents", label: "Quản lý Tài liệu", icon: FileText },
    { id: "reports", label: "Báo cáo & Thống kê", icon: BarChart3 },
    { id: "settings", label: "Cấu hình hệ thống", icon: Settings },
    { id: "integrations", label: "Tích hợp", icon: Link },
    { id: "account", label: "Tài khoản", icon: User },
  ]

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const handleConfirmLogout = () => {
    toast({
      title: "Thành công!",
      description: "Đăng xuất thành công!",
      variant: "success",
    })
    
    // Delay để toast hiển thị đầy đủ trước khi chuyển trang
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  const handleCancelLogout = () => {
    setShowLogoutModal(false)
  }

  const handleViewDocument = (documentId: string, documentName: string) => {
    alert(`Xem chi tiết tài liệu: ${documentName} (ID: ${documentId})`)
    // Trong thực tế, có thể mở modal hoặc chuyển đến trang chi tiết
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Chờ duyệt": return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Bị từ chối": return "bg-red-100 text-red-700 border-red-200"
      case "Đã duyệt": return "bg-green-100 text-green-700 border-green-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.svg" alt="VOffice Logo" className="w-full h-full" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">VOffice</span>
              <div className="text-xs text-gray-500">Admin Dashboard</div>
            </div>
          </div>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSidebarItem(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSidebarItem === item.id
                      ? "bg-orange-50 text-orange-700 border border-orange-200"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            className="w-full justify-start hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200" 
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
      </div>

            {/* Main Content */}
      <div className="flex-1 ml-64 overflow-auto">
        {activeSidebarItem === "overview" && (
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Tổng quan</h1>
              <p className="text-gray-600">Theo dõi tình hình hệ thống và hiệu suất xử lý tài liệu</p>
            </div>

            {/* KPI Cards - Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiData.map((kpi, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
                        <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                      </div>
                      <div className={`flex items-center text-sm ${
                        kpi.changeType === "positive" ? "text-green-600" : 
                        kpi.changeType === "negative" ? "text-red-600" : "text-gray-600"
                      }`}>
                        {kpi.changeType === "positive" && <TrendingUp className="w-4 h-4 mr-1" />}
                        {kpi.changeType === "negative" && <TrendingDown className="w-4 h-4 mr-1" />}
                        {kpi.change}
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                      <p className="text-sm text-gray-600">{kpi.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Row - Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Số lượng tài liệu xử lý trong 30 ngày qua
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-1">
                    {chartData.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                          style={{ height: `${(item.count / 30) * 200}px` }}
                          title={`Ngày ${item.day}: ${item.count} tài liệu`}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Phân bổ tài liệu theo trạng thái
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64">
                    <div className="relative w-48 h-48">
                      {/* Pie Chart Visualization */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {pieChartData.map((item, index) => {
                          const total = pieChartData.reduce((sum, d) => sum + d.count, 0)
                          const percentage = (item.count / total) * 100
                          const startAngle = pieChartData
                            .slice(0, index)
                            .reduce((sum, d) => sum + (d.count / total) * 360, 0)
                          const endAngle = startAngle + (percentage * 360) / 100
                          
                          const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                          const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                          const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                          const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
                          
                          const largeArcFlag = percentage > 50 ? 1 : 0
                          
                          return (
                            <path
                              key={index}
                              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                              fill={item.color}
                              className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                          )
                        })}
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {pieChartData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{item.status}</span>
                        <span className="text-sm font-medium">{item.count}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Lists Row - Row 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Documents requiring attention */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                    Tài liệu cần chú ý
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {attentionDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.user} • {doc.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-6 h-6 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            onClick={() => handleViewDocument(doc.id, doc.name)}
                            title="Xem chi tiết tài liệu"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent user activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-orange-600" />
                    Hoạt động gần đây của người dùng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="w-3 h-3 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{activity.user}</span>{" "}
                            {activity.action}{" "}
                            <span className="font-medium text-orange-600">{activity.document}</span>
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSidebarItem === "documents" && <DocumentsManagement />}
        {activeSidebarItem === "reports" && <ReportsPage />}
        {activeSidebarItem === "settings" && <SystemConfigPage />}
        {activeSidebarItem === "integrations" && <IntegrationPage />}
        {activeSidebarItem === "account" && <AccountPage />}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-xl z-50 flex items-center justify-center p-4" style={{backdropFilter: 'blur(20px)'}}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Xác nhận đăng xuất
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={handleCancelLogout}
                variant="outline"
                className="flex-1"
              >
                Hủy
              </Button>
              <Button
                onClick={handleConfirmLogout}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Xác nhận đăng xuất
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

