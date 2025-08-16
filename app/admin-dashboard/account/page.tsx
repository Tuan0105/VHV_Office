"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Lock, 
  Building, 
  CreditCard, 
  Camera, 
  Trash2, 
  Save, 
  Eye, 
  EyeOff,
  Download,
  CheckCircle,
  AlertCircle,
  Shield,
  Globe,
  Phone,
  Mail,
  MapPin,
  ExternalLink
} from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState("")
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  // Profile data
  const [profileData, setProfileData] = useState({
    fullName: "Nguyễn Văn Admin",
    title: "Trưởng phòng IT",
    email: "admin@vhvoffice.com",
    phone: "0901234567",
    language: "vi",
    timezone: "Asia/Ho_Chi_Minh",
    avatar: "/placeholder-user.jpg"
  })

  // Company data
  const [companyData, setCompanyData] = useState({
    name: "VOffice Company",
    taxCode: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    website: "https://vhvoffice.com",
    logo: "/placeholder-logo.png"
  })

  // Password data
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  // Payment data
  const paymentHistory = [
    {
      date: "15/12/2024",
      invoiceId: "INV-2024-001",
      amount: "2,500,000 VNĐ",
      status: "Đã thanh toán"
    },
    {
      date: "15/11/2024",
      invoiceId: "INV-2024-002",
      amount: "2,500,000 VNĐ",
      status: "Đã thanh toán"
    },
    {
      date: "15/10/2024",
      invoiceId: "INV-2024-003",
      amount: "2,500,000 VNĐ",
      status: "Đã thanh toán"
    }
  ]

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleCompanyChange = (field: string, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
    
    if (field === "newPassword") {
      // Simple password strength check
      if (value.length < 6) setPasswordStrength("Yếu")
      else if (value.length < 10) setPasswordStrength("Trung bình")
      else setPasswordStrength("Mạnh")
    }
    
    if (field === "confirmPassword" || field === "newPassword") {
      const newPassword = field === "newPassword" ? value : passwordData.newPassword
      const confirmPassword = field === "confirmPassword" ? value : passwordData.confirmPassword
      setPasswordMatch(newPassword === confirmPassword)
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, avatar: e.target?.result as string }))
        setHasChanges(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCompanyData(prev => ({ ...prev, logo: e.target?.result as string }))
        setHasChanges(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setHasChanges(false)
    // Show success message
    alert("✅ Đã cập nhật hồ sơ thành công!")
  }

  const handleSaveCompany = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setHasChanges(false)
    // Show success message
    alert("✅ Đã cập nhật thông tin công ty thành công!")
  }

  const handleUpdatePassword = async () => {
    if (!passwordMatch) {
      alert("Mật khẩu xác nhận không khớp!")
      return
    }
    
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    
    // Clear form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
    setPasswordStrength("")
    
    // Show success message
    alert("✅ Đã cập nhật mật khẩu thành công!")
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "Yếu": return "text-red-600"
      case "Trung bình": return "text-yellow-600"
      case "Mạnh": return "text-green-600"
      default: return "text-gray-600"
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Tài khoản</h1>
        <p className="text-gray-600">Quản lý thông tin cá nhân, bảo mật và cài đặt tài khoản</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Hồ sơ của tôi</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Bảo mật</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center space-x-2">
            <Building className="w-4 h-4" />
            <span>Thông tin Công ty</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4" />
            <span>Thanh toán & Gói cước</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Hồ sơ của tôi */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={profileData.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  />
                  <div className="absolute bottom-1 right-1">
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-8 h-8 rounded-full bg-white"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Thay đổi ảnh
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Xóa ảnh
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleProfileChange("fullName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Chức danh (tùy chọn)</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => handleProfileChange("title", e.target.value)}
                    placeholder="Ví dụ: Trưởng phòng IT"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">Email không thể thay đổi vì đây là định danh đăng nhập</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại (tùy chọn)</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                    placeholder="0901234567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Ngôn ngữ</Label>
                  <Select value={profileData.language} onValueChange={(value) => handleProfileChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Múi giờ</Label>
                  <Select value={profileData.timezone} onValueChange={(value) => handleProfileChange("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</SelectItem>
                      <SelectItem value="Asia/Hanoi">Asia/Hanoi (GMT+7)</SelectItem>
                      <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveProfile}
                  disabled={!hasChanges || isLoading}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Bảo mật */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Đổi mật khẩu
              </CardTitle>
              <p className="text-sm text-gray-600">
                Để đảm bảo an toàn, hãy sử dụng một mật khẩu mạnh mà bạn không dùng ở nơi khác.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {passwordData.newPassword && (
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span className={`text-sm ${getPasswordStrengthColor()}`}>
                      Độ mạnh: {passwordStrength}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {passwordData.confirmPassword && !passwordMatch && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Mật khẩu xác nhận không khớp</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleUpdatePassword}
                  disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword || !passwordMatch || isLoading}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Lock className="w-4 h-4 mr-2" />
                  )}
                  Cập nhật mật khẩu
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Thông tin Công ty */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Thông tin công ty
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={companyData.logo}
                    alt="Company Logo"
                    className="w-24 h-24 rounded-lg object-cover border-4 border-gray-200"
                  />
                  <div className="absolute bottom-1 right-1">
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-8 h-8 rounded-full bg-white"
                      onClick={() => logoInputRef.current?.click()}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    Thay đổi logo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Xóa logo
                  </Button>
                </div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>

              {/* Company Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Tên công ty</Label>
                  <Input
                    id="companyName"
                    value={companyData.name}
                    onChange={(e) => handleCompanyChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxCode">Mã số thuế</Label>
                  <Input
                    id="taxCode"
                    value={companyData.taxCode}
                    onChange={(e) => handleCompanyChange("taxCode", e.target.value)}
                    placeholder="0123456789"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    value={companyData.address}
                    onChange={(e) => handleCompanyChange("address", e.target.value)}
                    placeholder="123 Đường ABC, Quận 1, TP.HCM"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={companyData.website}
                    onChange={(e) => handleCompanyChange("website", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveCompany}
                  disabled={!hasChanges || isLoading}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Lưu thông tin
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Thanh toán & Gói cước */}
        <TabsContent value="payment" className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Gói cước hiện tại
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Gói Doanh nghiệp (Business Plan)</h3>
                  <Badge className="bg-orange-600 text-white">Đang sử dụng</Badge>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Lên đến 50 người dùng</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>1 TB dung lượng lưu trữ</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Hỗ trợ qua Email & Điện thoại</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Tích hợp API nâng cao</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Báo cáo chi tiết</span>
                  </div>
                </div>

                <div className="border-t border-orange-200 pt-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Gói cước của bạn sẽ tự động gia hạn vào ngày <strong>31/12/2025</strong>
                  </p>
                  <div className="flex space-x-3">
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      Nâng cấp gói
                    </Button>
                    <Button variant="outline">
                      Quản lý gói cước
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Lịch sử thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Ngày thanh toán</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Mã hóa đơn</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Số tiền</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Trạng thái</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{payment.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 font-mono">{payment.invoiceId}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{payment.amount}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-orange-600 hover:text-orange-700"
                            onClick={() => window.open('/sample-invoice.pdf', '_blank')}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Tải về
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
