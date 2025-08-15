"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { 
  Home, 
  Inbox, 
  History, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  LogOut,
  ArrowRight,
  AlertCircle,
  FileText,
  Calendar,
  TrendingUp,
  Bell
} from "lucide-react"
import Image from "next/image"

export default function ApproverDashboard() {
  const router = useRouter()
  const [pendingCount, setPendingCount] = useState(5)
  const [processedToday] = useState(12)
  const [avgProcessingTime] = useState("2 giờ 15 phút")

  // Mock data cho các tài liệu cần xử lý ngay
  const allUrgentDocuments = [
    {
      id: 1,
      name: "Hóa đơn giá trị gia tăng - Công ty TNHH Hoàng Anh",
      sender: "Nguyễn Văn A",
      waitTime: "30 phút",
      amount: "26,400,000 VNĐ",
      type: "Hóa đơn"
    },
    {
      id: 2,
      name: "Hóa đơn ABC Corp - Tháng 12/2024",
      sender: "Nguyễn Văn A",
      waitTime: "2 ngày",
      amount: "15,000,000 VNĐ",
      type: "Hóa đơn"
    },
    {
      id: 3,
      name: "Hợp đồng thuê văn phòng XYZ",
      sender: "Trần Thị B", 
      waitTime: "1 ngày",
      amount: "50,000,000 VNĐ",
      type: "Hợp đồng"
    },
    {
      id: 4,
      name: "Báo cáo tài chính Q4 - Công ty DEF",
      sender: "Lê Văn C",
      waitTime: "3 giờ",
      amount: "N/A",
      type: "Báo cáo"
    }
  ]

  // Khởi tạo state với tất cả tài liệu
  const [urgentDocuments, setUrgentDocuments] = useState(allUrgentDocuments)
  const [isLoaded, setIsLoaded] = useState(false)

  // Cập nhật state sau khi component mount để tránh hydration error
  useEffect(() => {
    // Kiểm tra xem có phải là reload trang không
    const isReload = !sessionStorage.getItem('hasVisited')
    
    if (isReload) {
      // Nếu là reload trang, hiển thị tất cả tài liệu và xóa dữ liệu đã phê duyệt
      setUrgentDocuments(allUrgentDocuments)
      setPendingCount(5)
      sessionStorage.removeItem('approvedDocuments')
      sessionStorage.setItem('hasVisited', 'true')
    } else {
      // Nếu không phải reload, kiểm tra có tài liệu đã phê duyệt không
      const approvedDocs = JSON.parse(sessionStorage.getItem('approvedDocuments') || '[]')
      if (approvedDocs.length > 0) {
        setUrgentDocuments(allUrgentDocuments.filter(doc => !approvedDocs.includes(doc.id)))
        setPendingCount(5 - approvedDocs.length)
      }
    }
    
    // Đánh dấu đã load xong
    setIsLoaded(true)
  }, [])

  // Xử lý khi user refresh trang hoặc đóng tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('hasVisited')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const handleLogout = () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      window.location.href = "/"
    }
  }

  const handleGoToInbox = () => {
    // Chuyển đến trang inbox riêng biệt
    router.push("/approver-dashboard/inbox")
  }

  const handleViewAndApprove = (docId: number) => {
    // Chuyển đến màn hình xem và duyệt
    router.push(`/approver-dashboard/documents/${docId}`)
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Khu vực 1: Lời chào và Hành động chính */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Chào Nguyễn Văn Approver,
        </h1>
        <div 
          className="text-lg text-blue-700 cursor-pointer hover:text-blue-800 transition-colors"
          onClick={handleGoToInbox}
        >
          Bạn có <span className="text-red-600 font-bold text-xl">{pendingCount}</span> tài liệu mới đang chờ phê duyệt.
          <ArrowRight className="inline ml-2 w-5 h-5" />
        </div>
      </div>

      {/* Khu vực 2: Các chỉ số ra quyết định */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chờ duyệt</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Inbox className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đã xử lý (Hôm nay)</p>
                <p className="text-3xl font-bold text-green-600">{processedToday}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Thời gian duyệt TB</p>
                <p className="text-2xl font-bold text-blue-600">{avgProcessingTime}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Khu vực 3: Danh sách "Cần xử lý ngay" */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
            Ưu tiên xử lý
          </CardTitle>
        </CardHeader>
                 <CardContent>
           {!isLoaded ? (
             <div className="space-y-4">
               <div className="animate-pulse">
                 <div className="h-16 bg-gray-200 rounded-lg"></div>
               </div>
               <div className="animate-pulse">
                 <div className="h-16 bg-gray-200 rounded-lg"></div>
               </div>
               <div className="animate-pulse">
                 <div className="h-16 bg-gray-200 rounded-lg"></div>
               </div>
             </div>
           ) : (
             <div className="space-y-4">
               {urgentDocuments.map((doc) => (
                 <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                   <div className="flex-1">
                     <div className="flex items-center space-x-3">
                       <FileText className="w-5 h-5 text-gray-400" />
                       <div>
                         <h4 className="font-medium text-gray-900">{doc.name}</h4>
                         <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                           <span>Người gửi: {doc.sender}</span>
                           <span>Loại: {doc.type}</span>
                           {doc.amount !== "N/A" && <span>Số tiền: {doc.amount}</span>}
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="flex items-center space-x-3">
                     <Badge variant="destructive" className="text-xs">
                       Đã chờ {doc.waitTime}
                     </Badge>
                     <Button 
                       onClick={() => handleViewAndApprove(doc.id)}
                       size="sm"
                       className="bg-blue-600 hover:bg-blue-700"
                     >
                       <Eye className="w-4 h-4 mr-1" />
                       Xem & Duyệt
                     </Button>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </CardContent>
      </Card>
    </div>
  )





  return (
    <div className="space-y-6">
      {renderDashboard()}
    </div>
  )
}

