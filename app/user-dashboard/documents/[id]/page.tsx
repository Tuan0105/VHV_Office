"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle,
    Clock,
    Download,
    Edit,
    Eye,
    FileText,
    MessageSquare,
    Save,
    Search,
    X
} from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function DocumentDetailPage() {
  const params = useParams()
  const documentId = params.id as string
  
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<any>(null)
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')

  // Mock data - trong thực tế sẽ lấy từ API dựa trên documentId
  const documentData = {
    id: documentId,
    name: "Hợp đồng thuê văn phòng",
    type: "Hợp đồng lao động",
    status: "rejected",
    statusText: "Bị từ chối",
    accuracy: "95%",
    date: "Hôm qua",
    size: "3.1 MB",
    preview: "/placeholder.svg?height=400&width=500&text=Contract+Preview",
    approver: "Trần Văn C",
    rejectionReason: "Sai tổng tiền",
    companyName: "Công ty TNHH XYZ",
    totalAmount: "50,000,000",
    extractedData: {
      contractNumber: "HD-0045",
      contractDate: "15/12/2024",
      startDate: "01/01/2025",
      endDate: "31/12/2025",
      lessorName: "Công ty TNHH XYZ",
      lessorAddress: "123 Đường ABC, Quận 1, TP.HCM",
      lessorTaxCode: "0123456789",
      lesseeName: "Công ty TNHH ABC",
      lesseeAddress: "456 Đường DEF, Quận 2, TP.HCM",
      lesseeTaxCode: "9876543210",
      propertyAddress: "789 Đường GHI, Quận 3, TP.HCM",
      monthlyRent: "50,000,000",
      deposit: "100,000,000",
      totalAmount: "50,000,000"
    },
    history: [
      {
        id: 1,
        action: "Tải lên",
        user: "Nguyễn Văn A",
        time: "Hôm qua 14:30",
        status: "completed"
      },
      {
        id: 2,
        action: "AI xử lý",
        user: "Hệ thống",
        time: "Hôm qua 14:32",
        status: "completed"
      },
      {
        id: 3,
        action: "Gửi duyệt",
        user: "Nguyễn Văn A",
        time: "Hôm qua 14:35",
        status: "completed"
      },
      {
        id: 4,
        action: "Từ chối",
        user: "Trần Văn C",
        time: "Hôm qua 16:20",
        status: "rejected",
        comment: "Sai tổng tiền"
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return CheckCircle
      case "rejected":
        return X
      case "pending":
        return Clock
      default:
        return Clock
    }
  }

  const handleBackToDocuments = () => {
    window.location.href = "/user-dashboard/documents"
  }

  const handleEdit = () => {
    setEditedData({ ...documentData.extractedData })
    setIsEditing(true)
  }

  const handleSave = () => {
    // Simulate saving
    alert("✅ Thông tin đã được cập nhật thành công!")
    setIsEditing(false)
    setEditedData(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedData(null)
  }

  const handleResubmit = () => {
    alert("✅ Tài liệu đã được gửi duyệt lại thành công!")
    window.location.href = "/user-dashboard"
  }

  const handleGlobalSearch = () => {
    if (globalSearchQuery.trim()) {
      // Chuyển đến trang kết quả tìm kiếm với query
      window.location.href = `/user-dashboard/search?q=${encodeURIComponent(globalSearchQuery.trim())}`
    }
  }

  const currentData = isEditing ? editedData : documentData.extractedData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.svg" alt="VOffice Logo" className="w-full h-full" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">VOffice</span>
                <div className="text-xs text-gray-500">Chi tiết tài liệu</div>
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
              <Button variant="ghost" size="icon" onClick={handleBackToDocuments}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Tải xuống
              </Button>
              {documentData.status === "rejected" && !isEditing && (
                <Button onClick={handleEdit} size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Chỉnh sửa
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Document Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{documentData.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Mã: {documentData.id}</span>
                  <span>Loại: {documentData.type}</span>
                  <span>Kích thước: {documentData.size}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Badge className={getStatusColor(documentData.status)}>
                  {documentData.statusText}
                </Badge>
                {documentData.status === "rejected" && (
                  <Badge variant="outline" className="text-red-600 border-red-300">
                    Cần sửa
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Document Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Xem tài liệu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Image
                      src={documentData.preview}
                      alt={documentData.name}
                      width={500}
                      height={400}
                      className="w-full rounded-lg border"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Document Info */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Công ty:</span>
                      <span className="font-medium">{documentData.companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng tiền:</span>
                      <span className="font-medium text-lg">{documentData.totalAmount} VNĐ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Người duyệt:</span>
                      <span className="font-medium">{documentData.approver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Độ chính xác AI:</span>
                      <span className="font-medium">{documentData.accuracy}</span>
                    </div>
                  </div>

                  {/* Rejection Reason */}
                  {documentData.status === "rejected" && documentData.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-900">Lý do từ chối</h4>
                          <p className="text-red-700 mt-1">{documentData.rejectionReason}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Right Column: Extracted Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Thông tin trích xuất
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} size="sm" className="bg-red-600 hover:bg-red-700">
                        <Save className="w-4 h-4 mr-1" />
                        Lưu
                      </Button>
                      <Button onClick={handleCancel} variant="outline" size="sm">
                        <X className="w-4 h-4 mr-1" />
                        Hủy
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Contract Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Số hợp đồng</Label>
                      <Input 
                        value={currentData?.contractNumber || ""} 
                        className="mt-1"
                        readOnly={!isEditing}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Ngày hợp đồng</Label>
                      <Input 
                        value={currentData?.contractDate || ""} 
                        className="mt-1"
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Ngày bắt đầu</Label>
                      <Input 
                        value={currentData?.startDate || ""} 
                        className="mt-1"
                        readOnly={!isEditing}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Ngày kết thúc</Label>
                      <Input 
                        value={currentData?.endDate || ""} 
                        className="mt-1"
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Lessor Information */}
                  <div>
                    <Label className="text-sm font-medium">Thông tin bên cho thuê</Label>
                    <div className="grid grid-cols-1 gap-3 mt-2">
                      <Input 
                        value={currentData?.lessorName || ""} 
                        placeholder="Tên bên cho thuê"
                        className={isEditing ? "" : "bg-gray-50"}
                        readOnly={!isEditing}
                      />
                      <Input 
                        value={currentData?.lessorAddress || ""} 
                        placeholder="Địa chỉ bên cho thuê"
                        className={isEditing ? "" : "bg-gray-50"}
                        readOnly={!isEditing}
                      />
                      <Input 
                        value={currentData?.lessorTaxCode || ""} 
                        placeholder="Mã số thuế bên cho thuê"
                        className={isEditing ? "" : "bg-gray-50"}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Lessee Information */}
                  <div>
                    <Label className="text-sm font-medium">Thông tin bên thuê</Label>
                    <div className="grid grid-cols-1 gap-3 mt-2">
                      <Input 
                        value={currentData?.lesseeName || ""} 
                        placeholder="Tên bên thuê"
                        className={isEditing ? "" : "bg-gray-50"}
                        readOnly={!isEditing}
                      />
                      <Input 
                        value={currentData?.lesseeAddress || ""} 
                        placeholder="Địa chỉ bên thuê"
                        className={isEditing ? "" : "bg-gray-50"}
                        readOnly={!isEditing}
                      />
                      <Input 
                        value={currentData?.lesseeTaxCode || ""} 
                        placeholder="Mã số thuế bên thuê"
                        className={isEditing ? "" : "bg-gray-50"}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Financial Information */}
                  <div>
                    <Label className="text-sm font-medium">Thông tin tài chính</Label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div>
                        <Label className="text-xs text-gray-500">Tiền thuê/tháng</Label>
                        <Input 
                          value={currentData?.monthlyRent || ""} 
                          className="mt-1"
                          readOnly={!isEditing}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Tiền cọc</Label>
                        <Input 
                          value={currentData?.deposit || ""} 
                          className="mt-1"
                          readOnly={!isEditing}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Tổng tiền</Label>
                        <Input 
                          value={currentData?.totalAmount || ""} 
                          className={`mt-1 ${isEditing ? "border-red-300 focus:border-red-500" : ""}`}
                          placeholder={isEditing ? "Nhập lại số tiền chính xác" : ""}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {documentData.status === "rejected" && !isEditing && (
                    <div className="pt-4 border-t">
                      <Button onClick={handleResubmit} className="w-full bg-red-600 hover:bg-red-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Gửi duyệt lại
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document History */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Lịch sử xử lý
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentData.history.map((item, index) => {
                  const StatusIcon = getStatusIcon(item.status)
                  return (
                    <div key={item.id} className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.status === "completed" ? "bg-green-100" :
                        item.status === "rejected" ? "bg-red-100" : "bg-gray-100"
                      }`}>
                        <StatusIcon className={`w-4 h-4 ${
                          item.status === "completed" ? "text-green-600" :
                          item.status === "rejected" ? "text-red-600" : "text-gray-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{item.action}</h4>
                          <span className="text-sm text-gray-500">{item.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">Bởi: {item.user}</p>
                        {item.comment && (
                          <p className="text-sm text-red-600 mt-1">{item.comment}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
