"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  History,
  Trash2,
  FileText,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  X
} from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  uploadedBy: string
  uploadDate: string
  status: string
  lastApprover: string
  selected?: boolean
}

interface DocumentHistory {
  time: string
  date: string
  action: string
  user: string
  details?: string
}

export default function DocumentsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [documentsPerPage] = useState(10)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Sample data
  const documents: Document[] = [
    { id: "INV-00123", name: "Hóa đơn ABC Corp", type: "Hóa đơn GTGT", uploadedBy: "Nguyễn Văn A", uploadDate: "14/08/2025 10:30", status: "Đang chờ duyệt", lastApprover: "-" },
    { id: "HD-0045", name: "Hợp đồng XYZ Ltd", type: "Hợp đồng lao động", uploadedBy: "Trần Thị B", uploadDate: "14/08/2025 09:15", status: "Bị từ chối", lastApprover: "Lê Văn C" },
    { id: "INV-00121", name: "Hóa đơn DEF Company", type: "Hóa đơn GTGT", uploadedBy: "Lê Văn C", uploadDate: "13/08/2025 16:45", status: "Đã duyệt", lastApprover: "Nguyễn Thị D" },
    { id: "CMND-089", name: "CMND Nguyễn Thị D", type: "CMND/CCCD", uploadedBy: "Phạm Văn E", uploadDate: "13/08/2025 14:20", status: "Bị từ chối", lastApprover: "Hoàng Thị F" },
    { id: "HD-0046", name: "Hợp đồng GHI Corp", type: "Hợp đồng lao động", uploadedBy: "Hoàng Thị F", uploadDate: "13/08/2025 11:30", status: "Đang chờ duyệt", lastApprover: "-" },
    { id: "INV-00120", name: "Hóa đơn JKL Ltd", type: "Hóa đơn GTGT", uploadedBy: "Vũ Văn G", uploadDate: "12/08/2025 17:00", status: "Đã duyệt", lastApprover: "Nguyễn Thị D" },
    { id: "HD-0047", name: "Hợp đồng MNO Corp", type: "Hợp đồng lao động", uploadedBy: "Nguyễn Văn A", uploadDate: "12/08/2025 15:30", status: "Mới tải lên", lastApprover: "-" },
    { id: "INV-00122", name: "Hóa đơn PQR Company", type: "Hóa đơn GTGT", uploadedBy: "Trần Thị B", uploadDate: "12/08/2025 13:45", status: "Đang chờ duyệt", lastApprover: "-" },
    { id: "CMND-090", name: "CCCD Lê Văn H", type: "CMND/CCCD", uploadedBy: "Lê Văn C", uploadDate: "11/08/2025 16:20", status: "Đã duyệt", lastApprover: "Phạm Văn E" },
    { id: "HD-0048", name: "Hợp đồng STU Ltd", type: "Hợp đồng lao động", uploadedBy: "Phạm Văn E", uploadDate: "11/08/2025 14:10", status: "Bị từ chối", lastApprover: "Hoàng Thị F" },
    { id: "INV-00124", name: "Hóa đơn VWX Corp", type: "Hóa đơn GTGT", uploadedBy: "Hoàng Thị F", uploadDate: "11/08/2025 12:30", status: "Mới tải lên", lastApprover: "-" },
    { id: "HD-0049", name: "Hợp đồng YZA Company", type: "Hợp đồng lao động", uploadedBy: "Vũ Văn G", uploadDate: "10/08/2025 18:00", status: "Đã duyệt", lastApprover: "Nguyễn Thị D" },
  ]

  const documentTypes = ["Tất cả", "Hóa đơn GTGT", "Hợp đồng lao động", "CMND/CCCD", "Hợp đồng mua bán", "Biên bản"]
  const statusOptions = ["Tất cả", "Mới tải lên", "Đang chờ duyệt", "Đã duyệt", "Bị từ chối"]
  const users = ["Tất cả", "Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Văn E", "Hoàng Thị F", "Vũ Văn G"]

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    const matchesUser = userFilter === "all" || doc.uploadedBy === userFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesUser
  })

  // Pagination
  const indexOfLastDocument = currentPage * documentsPerPage
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage
  const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument)
  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã duyệt": return "bg-green-100 text-green-700 border-green-200"
      case "Đang chờ duyệt": return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Bị từ chối": return "bg-red-100 text-red-700 border-red-200"
      case "Mới tải lên": return "bg-blue-100 text-blue-700 border-blue-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleSelectDocument = (documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    )
  }

  const handleSelectAll = () => {
    if (selectedDocuments.length === currentDocuments.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(currentDocuments.map(doc => doc.id))
    }
  }

  const handleViewDocument = (document: Document) => {
    alert(`Xem chi tiết tài liệu: ${document.name} (ID: ${document.id})`)
    handleCloseDropdown()
  }

  const handleViewHistory = (document: Document) => {
    setCurrentDocument(document)
    setShowHistoryModal(true)
    handleCloseDropdown()
  }

  const handleDeleteDocument = (document: Document) => {
    if (confirm(`Bạn có chắc chắn muốn xóa tài liệu "${document.name}"? Hành động này không thể hoàn tác.`)) {
      alert(`Đã xóa tài liệu: ${document.name}`)
    }
    handleCloseDropdown()
  }

  const handleExportCSV = () => {
    alert("Chức năng xuất báo cáo CSV đang được phát triển!")
  }

  const handleToggleDropdown = (documentId: string) => {
    setOpenDropdownId(openDropdownId === documentId ? null : documentId)
  }

  const handleCloseDropdown = () => {
    setOpenDropdownId(null)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const documentHistory: DocumentHistory[] = [
    { time: "10:30", date: "14/08/2025", action: "đã tải lên tài liệu", user: "Nguyễn Văn A" },
    { time: "11:00", date: "14/08/2025", action: "Hệ thống AI đã bóc tách xong thông tin", user: "AI System" },
    { time: "11:05", date: "14/08/2025", action: "đã gửi duyệt", user: "Nguyễn Văn A" },
    { time: "14:20", date: "14/08/2025", action: "đã từ chối", user: "Lê Văn C", details: "Thiếu chữ ký của khách hàng" },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Tài liệu</h1>
        <p className="text-gray-600">Xem và quản lý tất cả tài liệu trong hệ thống</p>
      </div>

      {/* Action & Filter Bar */}
      <Card className="mb-6">
        <CardContent className="p-6">
          {/* Search Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="inline w-4 h-4 mr-2" />
              Tìm kiếm tài liệu
            </label>
            <div className="relative">
              <Input
                placeholder="Nhập tên tài liệu, ID, hoặc tên người tải lên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-base"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Filters Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Status Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 mr-2" />
                Trạng thái
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 appearance-none"
              >
                {statusOptions.map(option => (
                  <option key={option} value={option === "Tất cả" ? "all" : option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2" />
                Loại tài liệu
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 appearance-none"
              >
                {documentTypes.map(type => (
                  <option key={type} value={type === "Tất cả" ? "all" : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* User Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Người tải lên
              </label>
              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='12' height='8' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1.41.59 6 5.17 10.59.59 12 2 6 8 0 2z' fill='%236B7280'/%3e%3c/svg%3e")`,
                  backgroundSize: '12px 8px',
                  backgroundPosition: 'right 12px center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {users.map(user => (
                  <option key={user} value={user === "Tất cả" ? "all" : user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Khoảng thời gian
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 text-sm"
                  placeholder="Từ ngày"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 text-sm"
                  placeholder="Đến ngày"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleExportCSV}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Xuất báo cáo CSV
              </Button>
              {selectedDocuments.length > 0 && (
                <div className="text-sm text-gray-600">
                  Đã chọn {selectedDocuments.length} tài liệu
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Tổng cộng: {filteredDocuments.length} tài liệu
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Danh sách tài liệu</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Hiển thị {indexOfFirstDocument + 1} - {Math.min(indexOfLastDocument, filteredDocuments.length)} trong tổng số {filteredDocuments.length} tài liệu
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {selectedDocuments.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Xóa đã chọn ({selectedDocuments.length})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button 
                      onClick={handleSelectAll} 
                      className="flex items-center hover:bg-gray-100 p-1 rounded"
                      title="Chọn tất cả"
                    >
                      {selectedDocuments.length === currentDocuments.length ? (
                        <CheckSquare className="w-5 h-5 text-orange-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Tài liệu
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Loại
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Người tải lên
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Ngày tải lên
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Người duyệt cuối
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleSelectDocument(doc.id)}
                        className="flex items-center hover:bg-gray-100 p-1 rounded"
                        title="Chọn tài liệu này"
                      >
                        {selectedDocuments.includes(doc.id) ? (
                          <CheckSquare className="w-5 h-5 text-orange-600" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <button 
                            onClick={() => handleViewDocument(doc)}
                            className="text-orange-600 hover:text-orange-800 font-semibold text-left hover:underline"
                          >
                            {doc.name}
                          </button>
                          <p className="text-sm text-gray-500 mt-1 font-mono">{doc.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-900 font-medium">{doc.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="text-sm text-gray-900 font-medium">{doc.uploadedBy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{doc.uploadDate.split(' ')[0]}</div>
                        <div className="text-gray-500">{doc.uploadDate.split(' ')[1]}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`${getStatusColor(doc.status)} font-medium px-3 py-1`}>
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {doc.lastApprover !== "-" ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <User className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="font-medium">{doc.lastApprover}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative" ref={dropdownRef}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-10 h-10 hover:bg-gray-100"
                          onClick={() => handleToggleDropdown(doc.id)}
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                        {openDropdownId === doc.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                              <button
                                onClick={() => handleViewDocument(doc)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Xem chi tiết
                              </button>
                              <button
                                onClick={() => handleViewHistory(doc)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <History className="w-4 h-4 mr-2" />
                                Xem lịch sử
                              </button>
                              <button
                                onClick={() => handleDeleteDocument(doc)}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Xóa
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-semibold text-gray-900">{indexOfFirstDocument + 1}</span> - <span className="font-semibold text-gray-900">{Math.min(indexOfLastDocument, filteredDocuments.length)}</span> trong tổng số <span className="font-semibold text-gray-900">{filteredDocuments.length}</span> tài liệu
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Trước
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    // Show only current page, first page, last page, and pages around current
                    const shouldShow = 
                      page === 1 || 
                      page === totalPages || 
                      Math.abs(page - currentPage) <= 1
                    
                    if (!shouldShow) {
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="px-2 text-gray-400">...</span>
                      }
                      return null
                    }
                    
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 ${
                          currentPage === page 
                            ? "bg-orange-600 hover:bg-orange-700 text-white" 
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2"
                >
                  Tiếp
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Modal */}
      {showHistoryModal && currentDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{backdropFilter: 'blur(20px)'}}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <History className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Lịch sử tài liệu</h3>
                    <p className="text-orange-100 text-sm">Theo dõi quá trình xử lý</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowHistoryModal(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Document Info */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-14 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg">{currentDocument.name}</h4>
                  <p className="text-sm text-gray-500 font-mono">{currentDocument.id}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={getStatusColor(currentDocument.status)}>
                      {currentDocument.status}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Tải lên bởi: <span className="font-medium">{currentDocument.uploadedBy}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="px-6 py-4 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {documentHistory.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-green-500' : 
                        index === documentHistory.length - 1 ? 'bg-red-500' : 
                        'bg-orange-500'
                      }`}></div>
                      {index < documentHistory.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 mt-1"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold text-gray-900">
                            {item.user}
                          </p>
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                            {item.time}, {item.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          {item.action}
                        </p>
                        {item.details && (
                          <div className="bg-red-50 border border-red-200 rounded p-3">
                            <p className="text-sm text-red-800">
                              <span className="font-medium">Lý do từ chối:</span> {item.details}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowHistoryModal(false)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
