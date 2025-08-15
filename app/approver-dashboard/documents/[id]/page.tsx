"use client"

import { useState } from "react"
import { use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText,
  User,
  Calendar,
  DollarSign,
  AlertCircle,
  Check,
  X
} from "lucide-react"
import Image from "next/image"

export default function DocumentReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Unwrap params Promise
  const resolvedParams = use(params)

  // Mock data cho tài liệu
  const document = {
    id: resolvedParams.id,
    name: resolvedParams.id === "1" ? "Hóa đơn giá trị gia tăng - Công ty TNHH Hoàng Anh" : "Hóa đơn ABC Corp - Tháng 12/2024",
    type: "Hóa đơn",
    sender: "Nguyễn Văn A",
    submittedDate: resolvedParams.id === "1" ? "2024-12-15 16:45" : "2024-12-15 14:30",
    amount: resolvedParams.id === "1" ? "26,400,000 VNĐ" : "15,000,000 VNĐ",
    image: resolvedParams.id === "1" ? "/hoa_don_gia_tri_gia_tang.jpg" : "/placeholder.svg?height=400&width=300&text=Invoice+ABC+Corp",
    extractedData: resolvedParams.id === "1" ? {
      "Tên công ty": "Công ty TNHH Hoàng Anh",
      "Địa chỉ công ty": "275 Nguyễn Tuân, Quận Thanh Xuân",
      "Tên đơn vị mua": "Công ty TNHH Bảo An",
      "Ngày hóa đơn": "22/05/2017",
      "Mô tả hàng hóa/dịch vụ": "Điều chỉnh giảm đơn giá, thành tiền và tiền thuế của máy tính ASUS của H",
      "Mã số thuế": "0009836571",
      "Người mua hàng": "Vũ Quang Minh",
      "Mã số thuế mua": "0037291269",
      "Số hóa đơn": "0001235",
      "Đơn vị tính": "Chiếc",
      "Số lượng": "12",
      "Đơn giá": "2,000,000",
      "Tổng tiền trước thuế": "24,000,000",
      "Thuế GTGT": "2,400,000",
      "Tổng tiền thanh toán": "26,400,000"
    } : {
      "Số hóa đơn": "INV-2024-001",
      "Ngày phát hành": "15/12/2024",
      "Tên công ty": "ABC Corporation",
      "Địa chỉ": "123 Đường ABC, Quận 1, TP.HCM",
      "Mã số thuế": "0123456789",
      "Tổng tiền": "15,000,000 VNĐ",
      "Thuế VAT": "1,500,000 VNĐ",
      "Tổng cộng": "16,500,000 VNĐ"
    }
  }

  const handleBack = () => {
    router.back()
  }

  const handleApprove = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Lưu vào sessionStorage để ẩn khỏi danh sách ưu tiên (chỉ trong session hiện tại)
    const approvedDocs = JSON.parse(sessionStorage.getItem('approvedDocuments') || '[]')
    if (!approvedDocs.includes(parseInt(resolvedParams.id))) {
      approvedDocs.push(parseInt(resolvedParams.id))
      sessionStorage.setItem('approvedDocuments', JSON.stringify(approvedDocs))
    }
    
    toast({
      title: "Thành công!",
      description: "Đã phê duyệt thành công tài liệu!",
      variant: "success",
    })
    
    // Delay để toast hiển thị đầy đủ trước khi chuyển trang
    setTimeout(() => {
      handleBack()
    }, 2000)
  }

  const handleReject = () => {
    setShowRejectionModal(true)
  }

  const handleConfirmRejection = async () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng nhập lý do từ chối!",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Lưu vào sessionStorage để ẩn khỏi danh sách ưu tiên (cả từ chối cũng ẩn, chỉ trong session hiện tại)
    const approvedDocs = JSON.parse(sessionStorage.getItem('approvedDocuments') || '[]')
    if (!approvedDocs.includes(parseInt(resolvedParams.id))) {
      approvedDocs.push(parseInt(resolvedParams.id))
      sessionStorage.setItem('approvedDocuments', JSON.stringify(approvedDocs))
    }
    
    toast({
      title: "Thành công!",
      description: "Đã gửi lại tài liệu cho người dùng!",
      variant: "success",
    })
    
    // Delay để toast hiển thị đầy đủ trước khi chuyển trang
    setTimeout(() => {
      handleBack()
    }, 2000)
  }

  const handleCancelRejection = () => {
    setShowRejectionModal(false)
    setRejectionReason("")
  }

  return (
    <div className="space-y-6">
      {/* Document Info Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{document.name}</h1>
          </div>
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertCircle className="w-4 h-4 mr-1" />
            Chờ phê duyệt
          </Badge>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <FileText className="w-4 h-4" />
            <span>{document.type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>Gửi bởi: {document.sender}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{document.submittedDate}</span>
          </div>
          {document.amount !== "N/A" && (
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>{document.amount}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - 2 Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Document Image */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Hình ảnh tài liệu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Image
                  src={document.image}
                  alt={document.name}
                  width={400}
                  height={600}
                  className="w-full h-auto rounded-lg border border-gray-200"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    <FileText className="w-3 h-3 mr-1" />
                    {document.type}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Extracted Data */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Dữ liệu đã xác thực
              </CardTitle>
              <p className="text-sm text-gray-500">
                Dữ liệu đã được User xác thực và không thể chỉnh sửa
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(document.extractedData).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-700">{key}:</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Decision Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Quyết định phê duyệt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Button 
                    onClick={handleApprove}
                    disabled={isProcessing}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-semibold"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    PHÊ DUYỆT
                  </Button>
                  <Button 
                    onClick={handleReject}
                    disabled={isProcessing}
                    variant="outline"
                    className="flex-1 border-red-200 text-red-700 hover:bg-red-50 h-12 text-lg font-semibold"
                  >
                    <X className="w-5 h-5 mr-2" />
                    TỪ CHỐI
                  </Button>
                </div>
                
                {isProcessing && (
                  <div className="text-center text-gray-500">
                    Đang xử lý...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50" style={{backdropFilter: 'blur(20px)'}}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Lý do từ chối
            </h3>
            <Textarea
              placeholder="Nhập lý do từ chối tài liệu này..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full h-32 mb-4"
              required
            />
            <div className="flex space-x-3">
              <Button 
                onClick={handleCancelRejection}
                variant="outline"
                className="flex-1"
              >
                Hủy
              </Button>
              <Button 
                onClick={handleConfirmRejection}
                disabled={isProcessing}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Xác nhận từ chối
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
