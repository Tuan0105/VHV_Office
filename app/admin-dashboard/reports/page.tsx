"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  FileText,
  BarChart3,
  Activity,
  Loader2,
  ChevronDown,
  ChevronUp
} from "lucide-react"

// Mock data cho các khoảng thời gian khác nhau
const mockData = {
  "30days": {
    performanceTrend: [
      { month: "T1", avgTime: 120, totalDocs: 150 },
      { month: "T2", avgTime: 110, totalDocs: 180 },
      { month: "T3", avgTime: 95, totalDocs: 220 },
      { month: "T4", avgTime: 85, totalDocs: 280 },
      { month: "T5", avgTime: 75, totalDocs: 320 },
      { month: "T6", avgTime: 65, totalDocs: 380 },
      { month: "T7", avgTime: 55, totalDocs: 420 },
      { month: "T8", avgTime: 45, totalDocs: 480 },
      { month: "T9", avgTime: 40, totalDocs: 520 },
      { month: "T10", avgTime: 35, totalDocs: 580 },
      { month: "T11", avgTime: 30, totalDocs: 650 },
      { month: "T12", avgTime: 25, totalDocs: 720 },
    ],
    bottlenecks: [
      { stage: "Bóc tách (AI)", avgTime: 8 },
      { stage: "Xác thực (User)", avgTime: 12 },
      { stage: "Phê duyệt (Approver)", avgTime: 25 },
    ],
    userPerformance: [
      { name: "Nguyễn Văn A", uploaded: 45, processed: 42, avgTime: 28, rejectionRate: 6.7 },
      { name: "Trần Thị B", uploaded: 38, processed: 35, avgTime: 35, rejectionRate: 7.9 },
      { name: "Lê Văn C", uploaded: 52, processed: 48, avgTime: 22, rejectionRate: 7.7 },
      { name: "Phạm Văn D", uploaded: 41, processed: 39, avgTime: 32, rejectionRate: 4.9 },
      { name: "Hoàng Thị E", uploaded: 35, processed: 33, avgTime: 38, rejectionRate: 5.7 },
    ],
    documentTypes: [
      { type: "Hóa đơn GTGT", percentage: 35 },
      { type: "Hợp đồng pháp lý", percentage: 40 },
      { type: "CMND/CCCD", percentage: 15 },
      { type: "Giấy phép kinh doanh", percentage: 10 },
    ]
  },
  "quarter": {
    performanceTrend: [
      { month: "T1", avgTime: 120, totalDocs: 150 },
      { month: "T2", avgTime: 110, totalDocs: 180 },
      { month: "T3", avgTime: 95, totalDocs: 220 },
    ],
    bottlenecks: [
      { stage: "Bóc tách (AI)", avgTime: 10 },
      { stage: "Xác thực (User)", avgTime: 15 },
      { stage: "Phê duyệt (Approver)", avgTime: 35 },
    ],
    userPerformance: [
      { name: "Nguyễn Văn A", uploaded: 120, processed: 115, avgTime: 32, rejectionRate: 4.2 },
      { name: "Trần Thị B", uploaded: 98, processed: 92, avgTime: 38, rejectionRate: 6.1 },
      { name: "Lê Văn C", uploaded: 145, processed: 138, avgTime: 28, rejectionRate: 4.8 },
      { name: "Phạm Văn D", uploaded: 112, processed: 108, avgTime: 35, rejectionRate: 3.6 },
      { name: "Hoàng Thị E", uploaded: 88, processed: 84, avgTime: 42, rejectionRate: 4.5 },
    ],
    documentTypes: [
      { type: "Hóa đơn GTGT", percentage: 30 },
      { type: "Hợp đồng pháp lý", percentage: 45 },
      { type: "CMND/CCCD", percentage: 15 },
      { type: "Giấy phép kinh doanh", percentage: 10 },
    ]
  },
  "year": {
    performanceTrend: [
      { month: "Q1", avgTime: 120, totalDocs: 550 },
      { month: "Q2", avgTime: 95, totalDocs: 720 },
      { month: "Q3", avgTime: 75, totalDocs: 920 },
      { month: "Q4", avgTime: 55, totalDocs: 1150 },
    ],
    bottlenecks: [
      { stage: "Bóc tách (AI)", avgTime: 12 },
      { stage: "Xác thực (User)", avgTime: 18 },
      { stage: "Phê duyệt (Approver)", avgTime: 45 },
    ],
    userPerformance: [
      { name: "Nguyễn Văn A", uploaded: 480, processed: 465, avgTime: 28, rejectionRate: 3.1 },
      { name: "Trần Thị B", uploaded: 420, processed: 405, avgTime: 35, rejectionRate: 3.6 },
      { name: "Lê Văn C", uploaded: 580, processed: 562, avgTime: 25, rejectionRate: 3.1 },
      { name: "Phạm Văn D", uploaded: 450, processed: 438, avgTime: 32, rejectionRate: 2.7 },
      { name: "Hoàng Thị E", uploaded: 380, processed: 368, avgTime: 38, rejectionRate: 3.2 },
    ],
    documentTypes: [
      { type: "Hóa đơn GTGT", percentage: 32 },
      { type: "Hợp đồng pháp lý", percentage: 42 },
      { type: "CMND/CCCD", percentage: 16 },
      { type: "Giấy phép kinh doanh", percentage: 10 },
    ]
  }
}

export default function ReportsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30days")
  const [selectedDocumentType, setSelectedDocumentType] = useState("all")
  const [selectedUser, setSelectedUser] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [currentData, setCurrentData] = useState(mockData["30days"])

  const timeRangeOptions = [
    { value: "30days", label: "30 ngày qua" },
    { value: "quarter", label: "Quý trước" },
    { value: "year", label: "Năm nay" },
  ]

  const documentTypeOptions = [
    { value: "all", label: "Tất cả loại tài liệu" },
    { value: "invoice", label: "Hóa đơn GTGT" },
    { value: "contract", label: "Hợp đồng pháp lý" },
    { value: "id", label: "CMND/CCCD" },
    { value: "license", label: "Giấy phép kinh doanh" },
  ]

  const userOptions = [
    { value: "all", label: "Tất cả người dùng" },
    { value: "user1", label: "Nguyễn Văn A" },
    { value: "user2", label: "Trần Thị B" },
    { value: "user3", label: "Lê Văn C" },
    { value: "user4", label: "Phạm Văn D" },
    { value: "user5", label: "Hoàng Thị E" },
  ]

  const handleFilterChange = (filterType: string, value: string) => {
    setIsLoading(true)
    
    setTimeout(() => {
      if (filterType === "timeRange") {
        setSelectedTimeRange(value)
        setCurrentData(mockData[value as keyof typeof mockData])
      } else if (filterType === "documentType") {
        setSelectedDocumentType(value)
      } else if (filterType === "user") {
        setSelectedUser(value)
      }
      setIsLoading(false)
    }, 1000)
  }

  const maxAvgTime = Math.max(...currentData.performanceTrend.map(item => item.avgTime))
  const maxTotalDocs = Math.max(...currentData.performanceTrend.map(item => item.totalDocs))
  const maxBottleneckTime = Math.max(...currentData.bottlenecks.map(item => item.avgTime))

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Báo cáo & Thống kê</h1>
        <p className="text-gray-600">Phân tích chi tiết hiệu suất và hiệu quả của hệ thống VOffice</p>
      </div>

      {/* Global Filter Bar */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Bộ lọc toàn cục
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Time Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Khoảng thời gian
              </label>
                             <div className="relative">
                 <select
                   value={selectedTimeRange}
                   onChange={(e) => handleFilterChange("timeRange", e.target.value)}
                   className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                 >
                   {timeRangeOptions.map((option) => (
                     <option key={option.value} value={option.value}>
                       {option.label}
                     </option>
                   ))}
                 </select>
                 <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black-400 pointer-events-none" />
               </div>
            </div>

            {/* Document Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại tài liệu
              </label>
                             <div className="relative">
                 <select
                   value={selectedDocumentType}
                   onChange={(e) => handleFilterChange("documentType", e.target.value)}
                   className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                 >
                   {documentTypeOptions.map((option) => (
                     <option key={option.value} value={option.value}>
                       {option.label}
                     </option>
                   ))}
                 </select>
                 <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black-400 pointer-events-none" />
               </div>
            </div>

            {/* User Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Người dùng/Phòng ban
              </label>
                             <div className="relative">
                 <select
                   value={selectedUser}
                   onChange={(e) => handleFilterChange("user", e.target.value)}
                   className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                 >
                   {userOptions.map((option) => (
                     <option key={option.value} value={option.value}>
                       {option.label}
                     </option>
                   ))}
                 </select>
                 <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black-400 pointer-events-none" />
               </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50" style={{backdropFilter: 'blur(20px)'}}>
          <div className="bg-white p-6 rounded-lg flex items-center space-x-3">
            <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
            <span className="text-gray-700">Đang cập nhật dữ liệu...</span>
          </div>
        </div>
      )}

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Widget 1: Performance Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Xu hướng Hiệu suất xử lý
            </CardTitle>
            <p className="text-sm text-gray-600">
              Thời gian xử lý trung bình và tổng số tài liệu theo thời gian
            </p>
          </CardHeader>
                                <CardContent>
             <div className="relative h-80">
               {/* Grid Lines */}
               <div className="absolute inset-0 flex flex-col justify-between">
                 {[0, 1, 2, 3, 4].map((i) => (
                   <div key={i} className="border-t border-gray-200"></div>
                 ))}
               </div>
               
               {/* Y-axis labels */}
               <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
                 <span>{Math.round(maxTotalDocs)}</span>
                 <span>{Math.round(maxTotalDocs * 0.75)}</span>
                 <span>{Math.round(maxTotalDocs * 0.5)}</span>
                 <span>{Math.round(maxTotalDocs * 0.25)}</span>
                 <span>0</span>
               </div>
               
               {/* Y-axis labels for time */}
               <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pl-2">
                 <span>{Math.round(maxAvgTime)}p</span>
                 <span>{Math.round(maxAvgTime * 0.75)}p</span>
                 <span>{Math.round(maxAvgTime * 0.5)}p</span>
                 <span>{Math.round(maxAvgTime * 0.25)}p</span>
                 <span>0p</span>
               </div>
               
               {/* Chart Content */}
               <div className="absolute inset-0 ml-12 mr-12 flex items-end justify-between">
                 {currentData.performanceTrend.map((item, index) => (
                   <div key={index} className="flex-1 flex flex-col items-center relative">
                     {/* Total Documents Bar */}
                     <div 
                       className="w-3/4 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                       style={{ height: `${(item.totalDocs / maxTotalDocs) * 280}px` }}
                       title={`${item.month}: ${item.totalDocs} tài liệu`}
                     ></div>
                     
                     {/* Average Time Line */}
                     <div 
                       className="w-3 h-3 bg-orange-500 rounded-full absolute border-2 border-white shadow-sm"
                       style={{ 
                         bottom: `${(item.avgTime / maxAvgTime) * 280}px`,
                         left: '50%',
                         transform: 'translateX(-50%)'
                       }}
                       title={`${item.month}: ${item.avgTime} phút`}
                     ></div>
                     
                     {/* X-axis labels */}
                     <span className="text-xs text-gray-500 font-medium mt-2">{item.month}</span>
                   </div>
                 ))}
               </div>
               
               {/* Y-axis line */}
               <div className="absolute left-10 top-0 bottom-0 w-px bg-gray-300"></div>
               <div className="absolute right-10 top-0 bottom-0 w-px bg-gray-300"></div>
               
               {/* X-axis line */}
               <div className="absolute left-10 right-10 bottom-0 h-px bg-gray-300"></div>
             </div>
             
             <div className="flex justify-center space-x-6 mt-4">
               <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 bg-blue-500 rounded"></div>
                 <span className="text-sm text-gray-600">Tổng số tài liệu</span>
               </div>
               <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                 <span className="text-sm text-gray-600">Thời gian xử lý TB (phút)</span>
               </div>
             </div>
           </CardContent>
        </Card>

        {/* Widget 2: Bottleneck Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Phân tích Điểm nghẽn
            </CardTitle>
            <p className="text-sm text-gray-600">
              Thời gian trung bình cho từng giai đoạn xử lý
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentData.bottlenecks.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-32 text-sm text-gray-600">{item.stage}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-orange-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${(item.avgTime / maxBottleneckTime) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-sm font-medium text-gray-900">{item.avgTime}p</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Phân tích:</strong> Khâu "Phê duyệt (Approver)" đang chiếm nhiều thời gian nhất. 
                Cần xem xét lại quy trình hoặc nhắc nhở các Approver.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Widget 3: User Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Hiệu suất Người dùng
            </CardTitle>
            <p className="text-sm text-gray-600">
              Đánh giá hiệu suất của từng nhân viên
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Người dùng</th>
                    <th className="text-center py-2">Đã tải</th>
                    <th className="text-center py-2">Đã xử lý</th>
                    <th className="text-center py-2">TB/1 tài liệu</th>
                    <th className="text-center py-2">Tỷ lệ từ chối</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.userPerformance.map((user, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 font-medium">{user.name}</td>
                      <td className="py-2 text-center">{user.uploaded}</td>
                      <td className="py-2 text-center">{user.processed}</td>
                      <td className="py-2 text-center">{user.avgTime}p</td>
                      <td className="py-2 text-center">
                        <Badge 
                          variant={user.rejectionRate > 6 ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {user.rejectionRate}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Phân tích:</strong> Nguyễn Văn A có thời gian xử lý thấp nhưng tỷ lệ từ chối cao. 
                Cần đào tạo thêm về tính chính xác.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Widget 4: Document Type Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Phân bổ thời gian theo Loại tài liệu
            </CardTitle>
            <p className="text-sm text-gray-600">
              % tổng thời gian xử lý của toàn hệ thống theo loại tài liệu
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-8">
              {/* Donut Chart */}
              <div className="relative w-64 h-64">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {currentData.documentTypes.map((item, index) => {
                    const total = currentData.documentTypes.reduce((sum, d) => sum + d.percentage, 0)
                    const percentage = (item.percentage / total) * 100
                    const startAngle = currentData.documentTypes
                      .slice(0, index)
                      .reduce((sum, d) => sum + (d.percentage / total) * 360, 0)
                    const endAngle = startAngle + (percentage * 360) / 100
                    
                    const colors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B"]
                    const color = colors[index % colors.length]
                    
                    const x1 = 50 + 35 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 50 + 35 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 50 + 35 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 50 + 35 * Math.sin((endAngle * Math.PI) / 180)
                    
                    const largeArcFlag = percentage > 50 ? 1 : 0
                    
                    return (
                      <path
                        key={index}
                        d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={color}
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    )
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {currentData.documentTypes.reduce((sum, item) => sum + item.percentage, 0)}%
                    </div>
                    <div className="text-sm text-gray-600">Tổng thời gian</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                {currentData.documentTypes.map((item, index) => {
                  const colors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B"]
                  const color = colors[index % colors.length]
                  
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-sm text-gray-700">{item.type}</span>
                      <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="mt-6 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Phân tích:</strong> "Hợp đồng pháp lý" chỉ chiếm 10% về số lượng nhưng lại chiếm tới 40% tổng thời gian xử lý. 
                Quy trình xử lý hợp đồng đang phức tạp nhất và cần được ưu tiên tối ưu.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
