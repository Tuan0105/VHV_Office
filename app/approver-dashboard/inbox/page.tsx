"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Eye, 
  FileText,
  Search,
  Filter,
  Calendar,
  User,
  DollarSign
} from "lucide-react"

export default function InboxPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Mock data cho hộp thư chờ duyệt
  const inboxData = [
    {
      id: 1,
      name: "Hóa đơn giá trị gia tăng - Công ty TNHH Hoàng Anh",
      type: "Hóa đơn",
      sender: "Nguyễn Văn A",
      submittedDate: "2024-12-15 16:45",
      amount: "26,400,000 VNĐ",
      waitTime: "30 phút",
      image: "/hoa_don_gia_tri_gia_tang.jpg",
      // Thông tin tương ứng với màn xác thực thông tin của user-dashboard
      extractedData: {
        invoiceNumber: "0001235",
        invoiceDate: "22/05/2017",
        sellerName: "Công ty TNHH Hoàng Anh",
        sellerTaxCode: "0009836571",
        sellerAddress: "275 Nguyễn Tuân, Quận Thanh Xuân",
        buyerName: "Công ty TNHH Bảo An",
        buyerTaxCode: "0037291269",
        buyerAddress: "Vũ Quang Minh",
        totalAmount: "26,400,000 VNĐ",
        taxAmount: "2,400,000 VNĐ",
        items: [
          {
            name: "Điều chỉnh giảm đơn giá, thành tiền và tiền thuế của máy tính ASUS của H",
            quantity: 12,
            unitPrice: "2,000,000 VNĐ",
            total: "24,000,000 VNĐ"
          }
        ]
      }
    },
    {
      id: 2,
      name: "Hóa đơn ABC Corp - Tháng 12/2024",
      type: "Hóa đơn",
      sender: "Nguyễn Văn A",
      submittedDate: "2024-12-15 14:30",
      amount: "15,000,000 VNĐ",
      waitTime: "2 ngày"
    },
    {
      id: 3,
      name: "Hợp đồng thuê văn phòng XYZ",
      type: "Hợp đồng",
      sender: "Trần Thị B",
      submittedDate: "2024-12-15 10:20",
      amount: "50,000,000 VNĐ",
      waitTime: "1 ngày"
    },
    {
      id: 4,
      name: "Báo cáo tài chính Q4 - Công ty DEF",
      type: "Báo cáo",
      sender: "Lê Văn C",
      submittedDate: "2024-12-15 09:45",
      amount: "N/A",
      waitTime: "3 giờ"
    },
    {
      id: 5,
      name: "CMND - Nguyễn Thị D",
      type: "CMND",
      sender: "Nguyễn Thị D",
      submittedDate: "2024-12-14 17:15",
      amount: "N/A",
      waitTime: "20 giờ"
    },
    {
      id: 6,
      name: "Hóa đơn điện nước - Tháng 11/2024",
      type: "Hóa đơn",
      sender: "Phạm Văn E",
      submittedDate: "2024-12-14 15:30",
      amount: "2,500,000 VNĐ",
      waitTime: "22 giờ"
    }
  ]

  const handleViewAndApprove = (docId: number) => {
    window.location.href = `/approver-dashboard/documents/${docId}`
  }

  const filteredInbox = inboxData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "invoice" && item.type === "Hóa đơn") ||
                         (selectedFilter === "contract" && item.type === "Hợp đồng") ||
                         (selectedFilter === "report" && item.type === "Báo cáo")
    
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: inboxData.length,
    urgent: inboxData.filter(item => item.waitTime.includes("giờ") || item.waitTime.includes("ngày")).length,
    highValue: inboxData.filter(item => item.amount !== "N/A" && parseInt(item.amount.replace(/[^\d]/g, "")) > 10000000).length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hộp thư chờ duyệt</h1>
          <p className="text-gray-600">Danh sách tất cả các tài liệu đang chờ phê duyệt</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <p className="text-sm font-medium text-gray-600">Cần xử lý gấp</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Giá trị cao</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.highValue}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
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
            placeholder="Tìm kiếm theo tên tài liệu, người gửi hoặc loại..."
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
            variant={selectedFilter === "invoice" ? "default" : "outline"}
            onClick={() => setSelectedFilter("invoice")}
            size="sm"
          >
            Hóa đơn
          </Button>
          <Button 
            variant={selectedFilter === "contract" ? "default" : "outline"}
            onClick={() => setSelectedFilter("contract")}
            size="sm"
          >
            Hợp đồng
          </Button>
          <Button 
            variant={selectedFilter === "report" ? "default" : "outline"}
            onClick={() => setSelectedFilter("report")}
            size="sm"
          >
            Báo cáo
          </Button>
        </div>
      </div>

      {/* Inbox Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách tài liệu chờ duyệt</CardTitle>
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
                    Ngày gửi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian chờ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInbox.map((item) => (
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
                      {item.submittedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant="secondary" 
                        className={
                          item.waitTime.includes("giờ") || item.waitTime.includes("ngày")
                            ? "bg-red-100 text-red-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {item.waitTime}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Chờ duyệt
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button 
                        onClick={() => handleViewAndApprove(item.id)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Xem & Duyệt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInbox.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy tài liệu nào chờ duyệt
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
