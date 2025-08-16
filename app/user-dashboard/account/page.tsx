"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  LogOut,

  Eye,
  EyeOff,
  Save,
  Camera,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Home,
  FileText,
  Upload,
  Search,
  X
} from "lucide-react"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"

export default function UserAccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')

  const userProfile = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@company.com",
    phone: "0123456789",
    position: "Nhân viên",
    department: "Kế toán",
    employeeId: "NV001",
    joinDate: "15/01/2023",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    avatar: "/placeholder-user.jpg"
  }

  const handleLogout = () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      window.location.href = "/"
    }
  }



  const handleSaveProfile = () => {
    alert("✅ Thông tin hồ sơ đã được cập nhật thành công!")
  }

  const handleChangePassword = () => {
    alert("✅ Mật khẩu đã được thay đổi thành công!")
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
                <img src="/logo.svg" alt="VOffice Logo" className="w-full h-full" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">VOffice</span>
                <div className="text-xs text-gray-500">Tài khoản</div>
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
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tài khoản</h1>
            <p className="text-gray-600">Quản lý thông tin cá nhân và bảo mật tài khoản</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Hồ sơ của tôi</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Bảo mật</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Thông tin cá nhân
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Avatar Section */}
                    <div className="lg:col-span-1">
                      <div className="text-center space-y-4">
                        <div className="relative inline-block">
                          <Image
                            src={userProfile.avatar}
                            alt="User Avatar"
                            width={120}
                            height={120}
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white"
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{userProfile.name}</h3>
                          <p className="text-sm text-gray-600">{userProfile.position}</p>
                          <Badge variant="outline" className="mt-2">
                            {userProfile.department}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Họ và tên</Label>
                          <Input 
                            id="name" 
                            defaultValue={userProfile.name}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input 
                              id="email" 
                              defaultValue={userProfile.email}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <div className="relative mt-1">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input 
                              id="phone" 
                              defaultValue={userProfile.phone}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="address">Địa chỉ</Label>
                          <div className="relative mt-1">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input 
                              id="address" 
                              defaultValue={userProfile.address}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="employeeId">Mã nhân viên</Label>
                          <div className="relative mt-1">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input 
                              id="employeeId" 
                              defaultValue={userProfile.employeeId}
                              className="pl-10"
                              readOnly
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="position">Chức vụ</Label>
                          <Input 
                            id="position" 
                            defaultValue={userProfile.position}
                            className="mt-1"
                            readOnly
                          />
                        </div>
                        <div>
                          <Label htmlFor="joinDate">Ngày vào làm</Label>
                          <div className="relative mt-1">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input 
                              id="joinDate" 
                              defaultValue={userProfile.joinDate}
                              className="pl-10"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Button onClick={handleSaveProfile} className="bg-red-600 hover:bg-red-700">
                          <Save className="w-4 h-4 mr-2" />
                          Lưu thay đổi
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Thay đổi mật khẩu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                      <div className="relative mt-1">
                        <Input 
                          id="currentPassword" 
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Nhập mật khẩu hiện tại"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newPassword">Mật khẩu mới</Label>
                      <div className="relative mt-1">
                        <Input 
                          id="newPassword" 
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Nhập mật khẩu mới"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                      <div className="relative mt-1">
                        <Input 
                          id="confirmPassword" 
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Nhập lại mật khẩu mới"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button onClick={handleChangePassword} className="bg-red-600 hover:bg-red-700">
                        <Shield className="w-4 h-4 mr-2" />
                        Thay đổi mật khẩu
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Thiết lập bảo mật</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Xác thực 2 yếu tố</h4>
                        <p className="text-sm text-gray-600">Bảo vệ tài khoản bằng mã xác thực</p>
                      </div>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                        Chưa bật
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Thông báo đăng nhập</h4>
                        <p className="text-sm text-gray-600">Nhận email khi có đăng nhập mới</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-300">
                        Đã bật
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Phiên đăng nhập</h4>
                        <p className="text-sm text-gray-600">Quản lý các thiết bị đã đăng nhập</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
                  <Button variant="ghost" size="icon" className="w-12 h-12 bg-red-50 text-red-600 hover:bg-red-100">
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
  )
}
