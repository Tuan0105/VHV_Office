"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff, X, Loader2, Building, User, Shield } from "lucide-react"
import Image from "next/image"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [selectedRole, setSelectedRole] = useState("user")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập địa chỉ email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      
      // Demo account validation
      const demoAccounts = {
        "admin@vhvoffice.vn": "admin",
        "user@vhvoffice.vn": "user", 
        "approver@vhvoffice.vn": "approver"
      }
      
      const userEmail = formData.email.toLowerCase()
      const expectedRole = demoAccounts[userEmail as keyof typeof demoAccounts]
      
      // Check if email exists in demo accounts
      if (!expectedRole) {
        setErrors({ email: "Tài khoản không tồn tại. Vui lòng sử dụng tài khoản demo." })
        return
      }
      
      // Check if selected role matches the account
      if (selectedRole !== expectedRole) {
        setErrors({ email: `Tài khoản ${userEmail} chỉ có thể đăng nhập với vai trò ${expectedRole === 'admin' ? 'Admin' : expectedRole === 'user' ? 'User' : 'Approver'}.` })
        return
      }
      
      // Check password (demo password is "demo123")
      if (formData.password !== "demo123") {
        setErrors({ password: "Mật khẩu không đúng. Mật khẩu demo là: demo123" })
        return
      }
      
      // Login successful - redirect based on role
      switch (selectedRole) {
        case "admin":
          window.location.href = "/admin-dashboard"
          break
        case "user":
          window.location.href = "/user-dashboard"
          break
        case "approver":
          window.location.href = "/approver-dashboard"
          break
        default:
          window.location.href = "/user-dashboard"
      }
    }, 2000)
  }

  const handleForgotPassword = () => {
    alert("Chức năng quên mật khẩu sẽ sớm được cập nhật!")
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Column - Brand Area */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 lotus-pattern opacity-10"></div>
            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 flex items-center justify-center shadow-lg">
                  <img src="/logo.svg" alt="VHV Office Logo" className="w-full h-full" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900">VHV Office</span>
                  <div className="text-sm text-gray-500">by VHV</div>
                </div>
              </div>

              {/* Slogan */}
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Phần mềm số hóa văn bản thông minh
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Thay đổi cách thức doanh nghiệp lưu trữ và tương tác với tài liệu.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Độ chính xác 98% cho tiếng Việt</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Xử lý 6 giây/trang</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Lưu trữ cấu trúc thông minh</span>
                </div>
              </div>

                             {/* Illustration */}
               <div className="relative">
                 <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-lg p-6">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-3">
                       <div className="bg-white rounded-lg p-3 shadow-sm">
                         <div className="flex items-center space-x-2">
                           <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                           <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                         </div>
                         <div className="mt-2 h-2 bg-gray-200 rounded"></div>
                         <div className="mt-1 h-2 bg-gray-200 rounded w-3/4"></div>
                       </div>
                       <div className="bg-white rounded-lg p-3 shadow-sm">
                         <div className="flex items-center justify-between">
                           <div className="w-8 h-8 flex items-center justify-center">
                             <img src="/logo.svg" alt="VHV Office Logo" className="w-full h-full" />
                           </div>
                           <div className="text-xs text-gray-600">VHV Office</div>
                         </div>
                       </div>
                     </div>
                     <div className="space-y-3">
                       <div className="bg-white rounded-lg p-3 shadow-sm">
                         <div className="flex items-center space-x-2 mb-2">
                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                           <span className="text-xs text-gray-600">AI Processing</span>
                         </div>
                         <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                           <div className="h-full bg-green-500 rounded-full" style={{width: '98%'}}></div>
                         </div>
                       </div>
                       <div className="bg-white rounded-lg p-3 shadow-sm">
                         <div className="flex items-center space-x-2">
                           <div className="w-6 h-6 flex items-center justify-center">
                             <img src="/logo.svg" alt="VHV Office Logo" className="w-full h-full" />
                           </div>
                           <div className="text-xs text-gray-700">Document Ready</div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg border">
                   <div className="text-sm text-gray-600">Độ chính xác</div>
                   <div className="text-2xl font-bold text-green-600">98%</div>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Đăng nhập vào VHV Office
                </h1>
                <p className="text-gray-600">
                  Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6" noValidate>
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                    autoFocus
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pr-10 ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                                 {/* Remember Me & Forgot Password */}
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                     <Checkbox
                       id="rememberMe"
                       name="rememberMe"
                       checked={formData.rememberMe}
                       onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))}
                     />
                     <Label htmlFor="rememberMe" className="text-sm text-gray-700">
                       Ghi nhớ đăng nhập
                     </Label>
                   </div>
                   <button
                     type="button"
                     onClick={handleForgotPassword}
                     className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                   >
                     Quên mật khẩu?
                   </button>
                 </div>

                {/* Role Selection for Demo */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">
                    Đăng nhập với vai trò (Demo):
                  </Label>
                  <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <RadioGroupItem value="admin" id="admin" className="sr-only" />
                        <Label
                          htmlFor="admin"
                          className={`flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedRole === "admin"
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Shield className="w-6 h-6 mb-2 text-red-600" />
                          <span className="text-sm font-medium">Admin</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="user" id="user" className="sr-only" />
                        <Label
                          htmlFor="user"
                          className={`flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedRole === "user"
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <User className="w-6 h-6 mb-2 text-blue-600" />
                          <span className="text-sm font-medium">User</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="approver" id="approver" className="sr-only" />
                        <Label
                          htmlFor="approver"
                          className={`flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedRole === "approver"
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Building className="w-6 h-6 mb-2 text-green-600" />
                          <span className="text-sm font-medium">Approver</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-lg hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </form>

                             {/* Demo Accounts */}
               <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                 <h4 className="text-sm font-medium text-gray-700 mb-3">Tài khoản Demo (Click để copy):</h4>
                 <div className="space-y-0">
                   <div className="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer" onClick={() => navigator.clipboard.writeText('admin@vhvoffice.vn')}>
                     <div>
                       <span className="text-xs text-gray-500">Admin:</span>
                       <span className="text-sm font-mono ml-2">admin@vhvoffice.vn</span>
                     </div>
                     <span className="text-xs text-blue-600">Copy</span>
                   </div>
                   <div className="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer" onClick={() => navigator.clipboard.writeText('user@vhvoffice.vn')}>
                     <div>
                       <span className="text-xs text-gray-500">User:</span>
                       <span className="text-sm font-mono ml-2">user@vhvoffice.vn</span>
                     </div>
                     <span className="text-xs text-blue-600">Copy</span>
                   </div>
                   <div className="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer" onClick={() => navigator.clipboard.writeText('approver@vhvoffice.vn')}>
                     <div>
                       <span className="text-xs text-gray-500">Approver:</span>
                       <span className="text-sm font-mono ml-2">approver@vhvoffice.vn</span>
                     </div>
                     <span className="text-xs text-blue-600">Copy</span>
                   </div>
                   <div className="text-xs text-gray-500 mt-2">
                     Mật khẩu: <span className="font-mono">demo123</span>
                   </div>
                 </div>
               </div>

               {/* Footer Links */}
               <div className="mt-6 pt-4 border-t border-gray-200">
                 <div className="flex justify-center space-x-6 text-sm text-gray-500">
                   <a href="#" className="hover:text-red-600 transition-colors">
                     Điều khoản sử dụng
                   </a>
                   <a href="#" className="hover:text-red-600 transition-colors">
                     Chính sách bảo mật
                   </a>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

