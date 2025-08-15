"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  User, 
  Shield, 
  Mail, 
  Phone, 
  MapPin,
  Edit,
  Save,
  X,
  Eye,
  EyeOff,
  Key
} from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Nguyễn Văn Approver",
    email: "approver@vhvoffice.com",
    phone: "0901234567",
    position: "Approver",
    department: "Phòng Kế toán",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    employeeId: "APP001",
    joinDate: "01/01/2023"
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleBack = () => {
    window.history.back()
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to API
    alert("Đã cập nhật thông tin thành công!")
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!")
      return
    }
    if (passwordData.newPassword.length < 8) {
      alert("Mật khẩu mới phải có ít nhất 8 ký tự!")
      return
    }
    
    // Here you would typically save to API
    alert("Đã thay đổi mật khẩu thành công!")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
  }

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Hồ sơ của tôi</h2>
        {!isEditing ? (
          <Button onClick={handleEdit} variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Chỉnh sửa
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Lưu
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Thông tin cá nhân
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={userData.phone}
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="address">Địa chỉ</Label>
              <Input
                id="address"
                value={userData.address}
                onChange={(e) => setUserData({...userData, address: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Thông tin công việc
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Mã nhân viên</Label>
              <Input value={userData.employeeId} disabled />
            </div>
            <div>
              <Label>Chức vụ</Label>
              <Input value={userData.position} disabled />
            </div>
            <div>
              <Label>Phòng ban</Label>
              <Input value={userData.department} disabled />
            </div>
            <div>
              <Label>Ngày vào làm</Label>
              <Input value={userData.joinDate} disabled />
            </div>
            <div>
              <Label>Trạng thái</Label>
              <div className="mt-2">
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Đang hoạt động
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSecurity = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Bảo mật</h2>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Thay đổi mật khẩu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                placeholder="Nhập mật khẩu hiện tại"
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
          
          <div>
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                placeholder="Nhập mật khẩu mới (ít nhất 8 ký tự)"
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
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                placeholder="Nhập lại mật khẩu mới"
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
          </div>

          <Button 
            onClick={handlePasswordChange}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
          >
            Thay đổi mật khẩu
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hoạt động đăng nhập</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium">Đăng nhập thành công</p>
                <p className="text-sm text-gray-500">IP: 192.168.1.100 - TP.HCM, Việt Nam</p>
                <p className="text-sm text-gray-500">Thiết bị: Chrome trên Windows 10</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Hôm nay, 14:30</p>
                <Badge variant="secondary" className="bg-green-50 text-green-700">Thành công</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium">Đăng nhập thành công</p>
                <p className="text-sm text-gray-500">IP: 192.168.1.100 - TP.HCM, Việt Nam</p>
                <p className="text-sm text-gray-500">Thiết bị: Chrome trên Windows 10</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Hôm qua, 09:15</p>
                <Badge variant="secondary" className="bg-green-50 text-green-700">Thành công</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg border border-gray-200 w-fit">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "profile" 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Hồ sơ của tôi
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "security" 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Bảo mật
          </button>
        </div>

        {/* Content */}
                 {activeTab === "profile" && renderProfile()}
         {activeTab === "security" && renderSecurity()}
     </div>
   )
 }
