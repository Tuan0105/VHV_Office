"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText,
  User,
  Calendar,
  DollarSign,
  Search,
  Filter,
  Download
} from "lucide-react"

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Mock data cho lịch sử quyết định
  const historyData = [
    {
      id: 1,
      name: "Hóa đơn ABC Corp - Tháng 12/2024",
      type: "Hóa đơn",
      sender: "Nguyễn Văn A",
      decisionDate: "2024-12-15 16:30",
      decision: "approved",
      amount: "15,000,000 VNĐ",
      processingTime: "2 giờ 15 phút"
    },
    {
      id: 2,
      name: "Hợp đồng thuê văn phòng XYZ",
      type: "Hợp đồng",
      sender: "Trần Thị B",
      decisionDate: "2024-12-15 14:20",
      decision: "rejected",
      amount: "50,000,000 VNĐ",
      processingTime: "1 giờ 30 phút",
      rejectionReason: "Thiếu chữ ký của bên thứ ba"
    },
    {
      id: 3,
      name: "Báo cáo tài chính Q4 - Công ty DEF",
      type: "Báo cáo",
      sender: "Lê Văn C",
      decisionDate: "2024-12-15 11:45",
      decision: "approved",
      amount: "N/A",
      processingTime: "45 phút"
    },
    {
      id: 4,
      name: "CMND - Nguyễn Thị D",
      type: "CMND",
      sender: "Nguyễn Thị D",
      decisionDate: "2024-12-14 17:15",
      decision: "approved",
      amount: "N/A",
      processingTime: "20 phút"
    },
    {
      id: 5,
      name: "Hóa đơn điện nước - Tháng 11/2024",
      type: "Hóa đơn",
      sender: "Phạm Văn E",
      decisionDate: "2024-12-14 15:30",
      decision: "rejected",
      amount: "2,500,000 VNĐ",
      processingTime: "1 giờ",
      rejectionReason: "Sai số tiền, vui lòng kiểm tra lại"
    }
  ]

  const handleBack = () => {
    window.history.back()
  }

  const handleViewDetails = (docId: number) => {
    alert(`Xem chi tiết tài liệu #${docId}`)
  }

  const handleExport = () => {
    alert("Xuất báo cáo lịch sử quyết định")
  }

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sender.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "approved" && item.decision === "approved") ||
                         (selectedFilter === "rejected" && item.decision === "rejected")
    
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: historyData.length,
    approved: historyData.filter(item => item.decision === "approved").length,
    rejected: historyData.filter(item => item.decision === "rejected").length,
    avgProcessingTime: "1 giờ 25 phút"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử quyết định</h1>
          <p className="text-gray-600">Tra cứu lại các tài liệu đã từng duyệt hoặc từ chối</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Xuất báo cáo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng cộng</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đã phê duyệt</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đã từ chối</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Thời gian TB</p>
                <p className="text-xl font-bold text-blue-600">{stats.avgProcessingTime}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Tìm kiếm theo tên tài liệu hoặc người gửi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedFilter === "all" ? "default" : "outline"}
            onClick={() => setSelectedFilter("all")}
            size="sm"
          >
            Tất cả
          </Button>
          <Button 
            variant={selectedFilter === "approved" ? "default" : "outline"}
            onClick={() => setSelectedFilter("approved")}
            size="sm"
          >
            Đã phê duyệt
          </Button>
          <Button 
            variant={selectedFilter === "rejected" ? "default" : "outline"}
            onClick={() => setSelectedFilter("rejected")}
            size="sm"
          >
            Đã từ chối
          </Button>
        </div>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách quyết định</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tài liệu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người gửi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày quyết định
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quyết định
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian xử lý
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.sender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.decisionDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant="secondary" 
                        className={
                          item.decision === "approved" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {item.decision === "approved" ? "Đã phê duyệt" : "Đã từ chối"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.processingTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button 
                        onClick={() => handleViewDetails(item.id)}
                        size="sm"
                        variant="outline"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Xem chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy kết quả nào
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
