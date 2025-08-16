"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import {
    Brain,
    CheckCircle,
    Clock,
    Eye,
    FileCheck,
    FileText,
    Home,
    LogOut,
    Save,
    Search,
    Upload,
    User,
    X,
    Zap
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function UploadPage() {
  const [currentStep, setCurrentStep] = useState(1) // 1: Upload, 2: Processing, 3: Validation
  const [selectedDocumentType, setSelectedDocumentType] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [extractedData, setExtractedData] = useState<any>(null)
  const [autoTags, setAutoTags] = useState<string[]>([])
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const documentTypes = [
    { value: "invoice", label: "Hóa đơn GTGT" },
    { value: "contract", label: "Hợp đồng lao động" },
    { value: "receipt", label: "Phiếu đề nghị tạm ứng" },
    { value: "report", label: "Báo cáo tài chính" }
  ]

  const processingSteps = [
    "Đang tải tài liệu lên máy chủ an toàn...",
    "AI đang phân tích bố cục tài liệu...",
    "Tiến hành bóc tách ký tự quang học (OCR)...",
    "Nhận diện các trường thông tin quan trọng...",
    "Phân tích và trích xuất dữ liệu...",
    "Hoàn tất 99%..."
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleStartProcessing = () => {
    if (!selectedDocumentType || !selectedFile) return
    
    setIsProcessing(true)
    setCurrentStep(2)
    setCurrentStepIndex(0)
    setProcessingProgress(0)
    
    // Simulate processing steps
    let stepIndex = 0
    const interval = setInterval(() => {
      if (stepIndex < processingSteps.length - 1) {
        stepIndex++
        setCurrentStepIndex(stepIndex)
        setProcessingProgress(((stepIndex + 1) / processingSteps.length) * 100)
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setCurrentStep(3)
          setIsProcessing(false)
          // Mock extracted data based on the actual invoice
          setExtractedData({
            companyName: "Công ty TNHH Hoàng Anh",
            taxCode: "0009836571",
            invoiceDate: "22/05/2017",
            invoiceNumber: "0001235",
            subtotal: "24,000,000",
            vat: "2,400,000",
            total: "26,400,000"
          })

          // Auto-generated tags based on AI analysis
          setAutoTags([
            "Hóa đơn GTGT",
            "Công ty TNHH Hoàng Anh", 
            "Tháng 5-2017",
            "Hóa đơn đầu ra",
            "Dịch vụ viễn thông",
            "Đã duyệt"
          ])
        }, 1000)
      }
    }, 800)
  }

  const handleSubmitForApproval = () => {
    // Simulate submission
    toast({
      title: "Thành công!",
      description: "Đã gửi duyệt thành công hóa đơn 0001235!",
      variant: "success",
    })
    
    // Delay để toast hiển thị đầy đủ trước khi chuyển trang
    setTimeout(() => {
      router.push("/user-dashboard")
    }, 2000)
  }

  const handleBackToDashboard = () => {
    router.push("/user-dashboard")
  }

  const handleGlobalSearch = () => {
    if (globalSearchQuery.trim()) {
      // Chuyển đến trang kết quả tìm kiếm với query
      router.push(`/user-dashboard/search?q=${encodeURIComponent(globalSearchQuery.trim())}`)
    }
  }

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

  const handleResetUpload = () => {
    setCurrentStep(1)
    setCurrentStepIndex(0)
    setProcessingProgress(0)
    setIsProcessing(false)
    setSelectedFile(null)
    setSelectedDocumentType("")
    setExtractedData(null)
    setAutoTags([])
  }

  // Step 1: Upload Screen
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/logo.svg" alt="VOffice Logo" className="w-full h-full" />
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">VOffice</span>
                  <div className="text-xs text-gray-500">Tải lên tài liệu</div>
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
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Tải lên tài liệu mới</h1>
              <p className="text-gray-600">Bước 1: Chọn loại tài liệu và tải file lên</p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Step 1: Document Type Selection */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Loại tài liệu bạn muốn xử lý là gì?
                    </Label>
                    <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn loại tài liệu..." />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Step 2: File Upload */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Tải file lên
                    </Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        selectedFile 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      {selectedFile ? (
                        <div className="space-y-4">
                          <FileText className="w-12 h-12 text-green-600 mx-auto" />
                          <div>
                            <p className="font-medium text-gray-900">{selectedFile.name}</p>
                            <p className="text-sm text-gray-500">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedFile(null)}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Chọn file khác
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-lg font-medium text-gray-900">
                              Kéo và thả file của bạn vào đây, hoặc
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Hỗ trợ: PDF, JPG, PNG. Tối đa 5MB
                            </p>
                          </div>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-upload"
                          />
                          <Label htmlFor="file-upload">
                            <Button variant="outline" asChild>
                              <span>Chọn từ máy tính</span>
                            </Button>
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={handleStartProcessing}
                    disabled={!selectedDocumentType || !selectedFile}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Bắt đầu xử lý
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar Navigation - Luôn hiển thị */}
        <TooltipProvider>
          <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50">
            <div className="flex flex-col space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/user-dashboard">
                    <Button variant="ghost" size="icon" className="w-12 h-12 hover:bg-gray-100">
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
                      <FileText className="w-5 h-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Tài liệu của tôi</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/user-dashboard/upload">
                    <Button variant="ghost" size="icon" className="w-12 h-12 bg-red-50 text-red-600 hover:bg-red-100">
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

  // Step 2: Processing Screen
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            {/* Animated Brain Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              AI đang xử lý tài liệu của bạn
            </h2>

            <div className="space-y-4">
              {processingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                    index <= currentStepIndex
                      ? index === currentStepIndex
                        ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                        : 'bg-green-50 text-green-700'
                      : 'opacity-0 h-0 overflow-hidden'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    index === currentStepIndex
                      ? 'bg-blue-600 animate-pulse'
                      : 'bg-green-600'
                  }`}>
                    {index === currentStepIndex ? (
                      <Clock className="w-4 h-4 text-white animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {currentStepIndex < processingSteps.length - 1 
                  ? `Đang xử lý bước ${currentStepIndex + 1}/${processingSteps.length}...`
                  : "Hoàn tất xử lý..."
                }
              </p>
            </div>
          </div>
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

  // Step 3: Validation Screen
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.svg" alt="VOffice Logo" className="w-full h-full" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">VOffice</span>
                <div className="text-xs text-gray-500">Xác thực thông tin</div>
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Xác thực thông tin</h1>
            <p className="text-gray-600">Kiểm tra và chỉnh sửa thông tin đã được AI trích xuất</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Image Viewer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Nguồn tham chiếu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Image
                      src="/hoa_don_gia_tri_gia_tang.jpg"
                      alt="Hóa đơn GTGT - Công ty TNHH Hoàng Anh"
                      width={500}
                      height={400}
                      className="w-full rounded-lg border object-contain"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Search className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileCheck className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-sm">
                      {selectedFile?.name}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column: Form Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Kết quả & Hành động
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Tên công ty</Label>
                      <Input 
                        value={extractedData?.companyName || ""} 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Mã số thuế</Label>
                      <Input 
                        value={extractedData?.taxCode || ""} 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Địa chỉ công ty</Label>
                      <Input 
                        value="275 Nguyễn Tuân, Quận Thanh Xuân, Thành phố Hà Nội" 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Người mua hàng</Label>
                      <Input 
                        value="Vũ Quang Minh" 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Tên đơn vị mua</Label>
                      <Input 
                        value="Công ty TNHH Bảo An" 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Mã số thuế mua</Label>
                      <Input 
                        value="0037291269" 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Ngày hóa đơn</Label>
                      <Input 
                        value={extractedData?.invoiceDate || ""} 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Số hóa đơn</Label>
                      <Input 
                        value={extractedData?.invoiceNumber || ""} 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Mô tả hàng hóa/dịch vụ</Label>
                    <Input 
                      value="Điều chỉnh giảm đơn giá, thành tiền và tiền thuế của máy tính ASUS của HĐ số 0001234, ký hiệu: AA/13P, ngày 30/01/2017" 
                      className="mt-1"
                      readOnly
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Đơn vị tính</Label>
                      <Input 
                        value="Chiếc" 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Số lượng</Label>
                      <Input 
                        value="12" 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Đơn giá</Label>
                      <Input 
                        value="2,000,000" 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Tổng tiền trước thuế</Label>
                      <Input 
                        value={extractedData?.subtotal || ""} 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Thuế GTGT</Label>
                      <Input 
                        value={extractedData?.vat || ""} 
                        className="mt-1"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-red-600">Tổng tiền thanh toán</Label>
                      <Input 
                        value={extractedData?.total || ""} 
                        className="mt-1 border-red-300 focus:border-red-500"
                        placeholder="Nhập lại số tiền chính xác"
                      />
                    </div>
                  </div>

                  {/* Auto-generated Tags */}
                  <div>
                    <Label className="text-sm font-medium">Thẻ (Tags) - Tự động gắn bởi AI</Label>
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex flex-wrap gap-2">
                        {autoTags.map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700 border-blue-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-blue-600 mt-2">
                        💡 AI đã phân tích nội dung và tự động gắn các thẻ liên quan. 
                        Bạn có thể chỉnh sửa hoặc thêm thẻ mới.
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Số tiền viết bằng chữ</Label>
                    <Input 
                      value="Hai mươi sáu triệu bốn trăm nghìn đồng chẵn" 
                      className="mt-1"
                      readOnly
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex flex-col space-y-3">
                      <div className="flex space-x-3">
                        <Button 
                          onClick={handleSubmitForApproval}
                          className="flex-1 bg-red-600 hover:bg-red-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Gửi duyệt
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Save className="w-4 h-4 mr-2" />
                          Lưu nháp
                        </Button>
                        <Button variant="outline" onClick={handleBackToDashboard}>
                          <X className="w-4 h-4 mr-2" />
                          Hủy bỏ
                        </Button>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={handleResetUpload}
                        className="w-full border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 transition-all duration-200"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Tải lên tài liệu khác
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation - Luôn hiển thị */}
      <TooltipProvider>
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50">
          <div className="flex flex-col space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/user-dashboard">
                  <Button variant="ghost" size="icon" className="w-12 h-12 hover:bg-gray-100">
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
                    <FileText className="w-5 h-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Tài liệu của tôi</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/user-dashboard/upload">
                  <Button variant="ghost" size="icon" className="w-12 h-12 bg-red-50 text-red-600 hover:bg-red-100">
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
