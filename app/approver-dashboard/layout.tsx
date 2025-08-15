"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { 
  Home, 
  Inbox, 
  History, 
  User, 
  LogOut,
  Bell
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function ApproverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [pendingCount] = useState(5)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const { toast } = useToast()

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const handleConfirmLogout = () => {
    setShowLogoutModal(false)
    toast({
      title: "Thành công!",
      description: "Đã đăng xuất thành công!",
      variant: "success",
    })
    window.location.href = "/"
  }

  const handleCancelLogout = () => {
    setShowLogoutModal(false)
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const isActive = (path: string) => {
    if (path === "/approver-dashboard" && pathname === "/approver-dashboard") {
      return true
    }
    if (path === "/approver-dashboard/inbox" && pathname === "/approver-dashboard/inbox") {
      return true
    }
    if (path !== "/approver-dashboard" && path !== "/approver-dashboard/inbox" && pathname.startsWith(path)) {
      return true
    }
    return false
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Tối giản tuyệt đối */}
      <div className="w-72 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-6 flex-1">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.svg" alt="VHV Office Logo" className="w-full h-full" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">VHV Office</span>
              <div className="text-xs text-gray-500">Approver</div>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => handleNavigation("/approver-dashboard")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/approver-dashboard") 
                  ? "bg-blue-50 text-blue-700 border border-blue-200" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Tổng quan</span>
            </button>

            <button
              onClick={() => handleNavigation("/approver-dashboard/inbox")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/approver-dashboard/inbox") 
                  ? "bg-blue-50 text-blue-700 border border-blue-200" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Inbox className="w-5 h-5" />
              <span>Hộp thư chờ duyệt</span>
              {pendingCount > 0 && (
                <Badge variant="destructive" className="ml-auto text-xs">
                  {pendingCount}
                </Badge>
              )}
            </button>

            <button
              onClick={() => handleNavigation("/approver-dashboard/history")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/approver-dashboard/history") 
                  ? "bg-blue-50 text-blue-700 border border-blue-200" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <History className="w-5 h-5" />
              <span>Lịch sử quyết định</span>
            </button>

            <button
              onClick={() => handleNavigation("/approver-dashboard/account")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/approver-dashboard/account") 
                  ? "bg-blue-50 text-blue-700 border border-blue-200" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <User className="w-5 h-5" />
              <span>Tài khoản</span>
            </button>
          </nav>
        </div>

        {/* Nút đăng xuất neo ở cuối sidebar */}
        <div className="p-6 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  {pathname === "/approver-dashboard" && "Tổng quan"}
                  {pathname === "/approver-dashboard/inbox" && "Hộp thư chờ duyệt"}
                  {pathname.startsWith("/approver-dashboard/history") && "Lịch sử quyết định"}
                  {pathname.startsWith("/approver-dashboard/account") && "Tài khoản"}
                  {pathname.startsWith("/approver-dashboard/documents") && "Xem & Duyệt tài liệu"}
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </Badge>
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>
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
