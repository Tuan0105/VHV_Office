"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Link, 
  Copy, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Zap,
  Database,
  Code,
  Activity,
  Plus,
  FileText,
  Building2,
  Calculator,
  ShoppingCart,
  Users,
  CreditCard,
  Settings
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function IntegrationPage() {
  const [connections, setConnections] = useState({
    sap: false,
    salesforce: false,
    odoo: false,
    misa: false,
    basevn: false,
    quickbooks: false,
    xero: false,
    hubspot: false
  })

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production API Key", key: "vof-api-prod-xxxx1234abcd", created: "2024-01-15", lastUsed: "2024-01-20" },
    { id: 2, name: "Development API Key", key: "vof-api-dev-yyyy5678efgh", created: "2024-01-10", lastUsed: "2024-01-18" }
  ])

  const [showNewApiKey, setShowNewApiKey] = useState(false)
  const [newApiKey, setNewApiKey] = useState("")

  // Dữ liệu ứng dụng có thể kết nối
  const appConnections = [
    {
      id: "sap",
      name: "SAP Business One",
      description: "Đồng bộ dữ liệu hóa đơn, hợp đồng đã duyệt vào hệ thống SAP",
      logo: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: "salesforce",
      name: "Salesforce CRM",
      description: "Tự động tạo leads và opportunities từ tài liệu được xử lý",
      logo: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      id: "odoo",
      name: "Odoo ERP",
      description: "Tích hợp với hệ thống quản lý tài nguyên doanh nghiệp Odoo",
      logo: Database,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: "misa",
      name: "MISA AMIS",
      description: "Đồng bộ hóa đơn và chứng từ kế toán với phần mềm MISA",
      logo: Calculator,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: "basevn",
      name: "Base.vn",
      description: "Kết nối với nền tảng quản lý công việc Base.vn",
      logo: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: "quickbooks",
      name: "QuickBooks",
      description: "Tự động hóa quy trình kế toán với QuickBooks",
      logo: CreditCard,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      id: "xero",
      name: "Xero",
      description: "Đồng bộ dữ liệu tài chính với hệ thống kế toán Xero",
      logo: Calculator,
      color: "text-blue-400",
      bgColor: "bg-blue-50"
    },
    {
      id: "hubspot",
      name: "HubSpot",
      description: "Tích hợp với nền tảng marketing và CRM HubSpot",
      logo: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    }
  ]

  // Dữ liệu nhật ký đồng bộ
  const syncLogs = [
    {
      id: 1,
      timestamp: "2024-01-20 10:30:15",
      system: "SAP Business One",
      systemIcon: Building2,
      object: "Hóa đơn INV-00123",
      status: "success",
      details: "Đồng bộ thành công hóa đơn mua hàng"
    },
    {
      id: 2,
      timestamp: "2024-01-20 10:28:42",
      system: "MISA AMIS",
      systemIcon: Calculator,
      object: "Hợp đồng CT-00456",
      status: "success",
      details: "Cập nhật trạng thái hợp đồng đã duyệt"
    },
    {
      id: 3,
      timestamp: "2024-01-20 10:25:18",
      system: "Salesforce CRM",
      systemIcon: Users,
      object: "Lead LD-00789",
      status: "success",
      details: "Tạo lead mới từ tài liệu được xử lý"
    },
    {
      id: 4,
      timestamp: "2024-01-20 10:22:33",
      system: "Odoo ERP",
      systemIcon: Database,
      object: "Đơn hàng PO-00321",
      status: "failed",
      details: "Lỗi kết nối mạng, sẽ thử lại sau"
    },
    {
      id: 5,
      timestamp: "2024-01-20 10:20:05",
      system: "Base.vn",
      systemIcon: FileText,
      object: "Task TK-00987",
      status: "success",
      details: "Tạo task mới cho đội phát triển"
    }
  ]

  const handleConnectionToggle = (appId: string) => {
    setConnections(prev => ({
      ...prev,
      [appId]: !prev[appId as keyof typeof prev]
    }))

    // Hiển thị thông báo
    const isConnected = !connections[appId as keyof typeof connections]
    const appName = appConnections.find(app => app.id === appId)?.name
    
    toast({
      title: isConnected ? "✅ Kết nối thành công!" : "❌ Đã ngắt kết nối",
      description: isConnected 
        ? `Đã kết nối thành công với ${appName}` 
        : `Đã ngắt kết nối với ${appName}`,
    })
  }

  const generateNewApiKey = () => {
    const newKey = `vof-api-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    setNewApiKey(newKey)
    setShowNewApiKey(true)
  }

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "✅ Đã sao chép!",
      description: "API key đã được sao chép vào clipboard",
    })
  }

  const getStatusColor = (status: string) => {
    return status === "success" 
      ? "bg-green-100 text-green-800 border-green-200" 
      : "bg-red-100 text-red-800 border-red-200"
  }

  const getStatusIcon = (status: string) => {
    return status === "success" ? CheckCircle : XCircle
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tích hợp</h1>
        <p className="text-gray-600">Kết nối VHV Office với các hệ thống và ứng dụng khác để tự động hóa quy trình làm việc</p>
      </div>

      {/* Khu vực 1: Thư viện Kết nối */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link className="w-5 h-5 mr-2 text-orange-600" />
            Kết nối với các ứng dụng của bạn
          </CardTitle>
          <p className="text-gray-600">
            Tự động hóa công việc bằng cách kết nối VHV Office với các công cụ bạn sử dụng hàng ngày như ERP, CRM và phần mềm kế toán.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {appConnections.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${app.bgColor} rounded-lg flex items-center justify-center`}>
                      <app.logo className={`w-6 h-6 ${app.color}`} />
                    </div>
                    <Switch
                      checked={connections[app.id as keyof typeof connections]}
                      onCheckedChange={() => handleConnectionToggle(app.id)}
                    />
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{app.name}</h3>
                    <p className="text-sm text-gray-600">{app.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={connections[app.id as keyof typeof connections] ? "default" : "secondary"}
                      className={connections[app.id as keyof typeof connections] 
                        ? "bg-green-100 text-green-800 border-green-200" 
                        : "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      {connections[app.id as keyof typeof connections] ? "Đã kết nối" : "Chưa kết nối"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Khu vực 2: Truy cập API cho nhà phát triển */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 mr-2 text-orange-600" />
            Dành cho nhà phát triển: Truy cập API & Webhooks
          </CardTitle>
          <p className="text-gray-600">
            Sử dụng API của VOffice để xây dựng các tích hợp tùy chỉnh, lấy dữ liệu tài liệu đã xử lý hoặc lắng nghe các sự kiện theo thời gian thực với Webhooks.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* API Keys Management */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
                <Button onClick={generateNewApiKey} className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo Khóa API mới
                </Button>
              </div>
              
              <div className="space-y-3">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Zap className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{apiKey.name}</p>
                          <p className="text-sm text-gray-500 font-mono">{apiKey.key}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyApiKey(apiKey.key)}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Sao chép
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* API Documentation Link */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Tài liệu API</h4>
                    <p className="text-sm text-gray-600">Xem hướng dẫn chi tiết dành cho lập trình viên</p>
                  </div>
                </div>
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Xem tài liệu
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Khu vực 3: Nhật ký đồng bộ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-orange-600" />
            Nhật ký đồng bộ hóa gần đây
          </CardTitle>
          <p className="text-gray-600">
            Theo dõi tất cả các hoạt động đồng bộ dữ liệu với các hệ thống tích hợp.
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Thời gian</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Hệ thống tích hợp</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Đối tượng</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {syncLogs.map((log) => {
                  const StatusIcon = getStatusIcon(log.status)
                  return (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {log.timestamp}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                            <log.systemIcon className="w-3 h-3 text-gray-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{log.system}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        {log.object}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(log.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {log.status === "success" ? "Thành công" : "Thất bại"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {log.details}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog tạo API Key mới */}
      <Dialog open={showNewApiKey} onOpenChange={setShowNewApiKey}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo API Key mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex space-x-2">
                <Input
                  id="api-key"
                  value={newApiKey}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  onClick={() => copyApiKey(newApiKey)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                ⚠️ Lưu ý: API key này sẽ chỉ hiển thị một lần. Hãy sao chép và lưu trữ an toàn.
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowNewApiKey(false)}
              >
                Đóng
              </Button>
              <Button
                onClick={() => {
                  setApiKeys(prev => [...prev, {
                    id: prev.length + 1,
                    name: `API Key ${prev.length + 1}`,
                    key: newApiKey,
                    created: new Date().toISOString().split('T')[0],
                    lastUsed: "-"
                  }])
                  setShowNewApiKey(false)
                  setNewApiKey("")
                  toast({
                    title: "✅ Tạo thành công!",
                    description: "API key mới đã được tạo và thêm vào danh sách",
                  })
                }}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Lưu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
