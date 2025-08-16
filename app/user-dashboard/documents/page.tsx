"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  FileText, 
  Upload, 
  LogOut,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  User,
  Home,
  Plus,
  Eye,
  Folder,
  Receipt,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  Calendar,
  Search,
  Grid3X3,
  List,
  MoreHorizontal,
  Download,
  Trash2,
  Edit,
  Move,
  Copy,
  Share,
  Star,
  Filter,
  SortAsc,
  SortDesc,
  Info
} from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DocumentRepository() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [currentPath, setCurrentPath] = useState<string[]>(['Kho tài liệu'])
  const [showInfoPanel, setShowInfoPanel] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null)
  const [lastClickedItem, setLastClickedItem] = useState<string | null>(null)
  const [newFolderName, setNewFolderName] = useState('')
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [createdFolderName, setCreatedFolderName] = useState('')
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')

  // Cleanup timeout khi component unmount
  useEffect(() => {
    return () => {
      if (clickTimeout) {
        clearTimeout(clickTimeout)
      }
    }
  }, [clickTimeout])

  // Mock data - trong thực tế sẽ lấy từ API
  const [currentFolderId, setCurrentFolderId] = useState("root")
  
  // Định nghĩa kiểu dữ liệu cho folder
  type FolderData = {
    id: string
    name: string
    path: string[]
    subFolders: any[]
    documents: any[]
  }
  
  // Dữ liệu cho từng thư mục - chuyển thành state
  const [folderData, setFolderData] = useState<{ [key: string]: FolderData }>({
    "root": {
      id: "root",
      name: "Kho tài liệu",
      path: ["Kho tài liệu"],
      subFolders: [
        {
          id: "invoices",
          name: "Hóa đơn",
          type: "folder",
          icon: Folder,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          itemCount: 176,
          lastModified: "2 giờ trước",
          createdBy: "Nguyễn Văn A"
        },
        {
          id: "personal-docs",
          name: "Chứng từ cá nhân",
          type: "folder",
          icon: Folder,
          color: "text-green-600",
          bgColor: "bg-green-50",
          itemCount: 567,
          lastModified: "Hôm qua",
          createdBy: "Nguyễn Văn A"
        },
        {
          id: "contracts",
          name: "Hợp đồng",
          type: "folder",
          icon: Folder,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          itemCount: 89,
          lastModified: "3 ngày trước",
          createdBy: "Nguyễn Văn A"
        }
      ],
      documents: []
    },
    "invoices": {
      id: "invoices",
      name: "Hóa đơn",
      path: ["Kho tài liệu", "Hóa đơn"],
      subFolders: [
        {
          id: "invoices-2025",
          name: "Năm 2025",
          type: "folder",
          icon: Folder,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          itemCount: 45,
          lastModified: "2 giờ trước",
          createdBy: "Nguyễn Văn A"
        },
        {
          id: "invoices-2024",
          name: "Năm 2024",
          type: "folder",
          icon: Folder,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          itemCount: 123,
          lastModified: "1 tuần trước",
          createdBy: "Nguyễn Văn A"
        },
        {
          id: "invoices-pending",
          name: "Chờ duyệt",
          type: "folder",
          icon: Folder,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          itemCount: 8,
          lastModified: "Hôm qua",
          createdBy: "Nguyễn Văn A"
        }
      ],
      documents: [
        {
          id: "inv-00123",
          name: "Hóa đơn INV-00123.pdf",
          type: "document",
          icon: Receipt,
          color: "text-green-600",
          bgColor: "bg-green-50",
          size: "2.5 MB",
          status: "approved",
          lastModified: "2 giờ trước",
          createdBy: "Nguyễn Văn A",
          tags: ["Đã duyệt", "Hóa đơn đầu ra", "Khách hàng A"]
        },
        {
          id: "inv-00124",
          name: "Hóa đơn INV-00124.pdf",
          type: "document",
          icon: Receipt,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          size: "1.8 MB",
          status: "pending",
          lastModified: "Hôm qua",
          createdBy: "Nguyễn Văn A",
          tags: ["Chờ duyệt", "Hóa đơn đầu vào", "Nhà cung cấp B"]
        },
        {
          id: "inv-00125",
          name: "Hóa đơn INV-00125.pdf",
          type: "document",
          icon: Receipt,
          color: "text-red-600",
          bgColor: "bg-red-50",
          size: "3.2 MB",
          status: "rejected",
          lastModified: "3 ngày trước",
          createdBy: "Nguyễn Văn A",
          tags: ["Bị từ chối", "Hóa đơn đầu ra", "Khách hàng C"]
        }
      ]
    },
    "invoices-2025": {
      id: "invoices-2025",
      name: "Năm 2025",
      path: ["Kho tài liệu", "Hóa đơn", "Năm 2025"],
      subFolders: [
        {
          id: "invoices-2025-q1",
          name: "Quý 1",
          type: "folder",
          icon: Folder,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          itemCount: 12,
          lastModified: "1 ngày trước",
          createdBy: "Nguyễn Văn A"
        },
        {
          id: "invoices-2025-q2",
          name: "Quý 2",
          type: "folder",
          icon: Folder,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          itemCount: 15,
          lastModified: "2 ngày trước",
          createdBy: "Nguyễn Văn A"
        }
      ],
      documents: [
        {
          id: "inv-2025-001",
          name: "Hóa đơn tháng 1-2025.pdf",
          type: "document",
          icon: Receipt,
          color: "text-green-600",
          bgColor: "bg-green-50",
          size: "1.2 MB",
          status: "approved",
          lastModified: "1 ngày trước",
          createdBy: "Nguyễn Văn A",
          tags: ["Tháng 1", "Đã duyệt", "Hóa đơn đầu ra"]
        },
        {
          id: "inv-2025-002",
          name: "Hóa đơn tháng 2-2025.pdf",
          type: "document",
          icon: Receipt,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          size: "1.5 MB",
          status: "pending",
          lastModified: "2 ngày trước",
          createdBy: "Nguyễn Văn A",
          tags: ["Tháng 2", "Chờ duyệt", "Hóa đơn đầu vào"]
        }
      ]
    },
    "personal-docs": {
      id: "personal-docs",
      name: "Chứng từ cá nhân",
      path: ["Kho tài liệu", "Chứng từ cá nhân"],
      subFolders: [
        {
          id: "personal-docs-id",
          name: "CMND/CCCD",
          type: "folder",
          icon: Folder,
          color: "text-green-600",
          bgColor: "bg-green-50",
          itemCount: 3,
          lastModified: "1 tuần trước",
          createdBy: "Nguyễn Văn A"
        },
        {
          id: "personal-docs-education",
          name: "Bằng cấp",
          type: "folder",
          icon: Folder,
          color: "text-green-600",
          bgColor: "bg-green-50",
          itemCount: 5,
          lastModified: "2 tuần trước",
          createdBy: "Nguyễn Văn A"
        }
      ],
      documents: [
        {
          id: "cmnd-001",
          name: "CMND mặt trước.pdf",
          type: "document",
          icon: FileImage,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          size: "0.8 MB",
          status: "approved",
          lastModified: "1 tuần trước",
          createdBy: "Nguyễn Văn A",
          tags: ["CMND", "Đã duyệt", "Chứng minh nhân dân"]
        },
        {
          id: "cmnd-002",
          name: "CMND mặt sau.pdf",
          type: "document",
          icon: FileImage,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          size: "0.7 MB",
          status: "approved",
          lastModified: "1 tuần trước",
          createdBy: "Nguyễn Văn A",
          tags: ["CMND", "Đã duyệt", "Chứng minh nhân dân"]
                 }
       ]
     },
     "contracts": {
       id: "contracts",
       name: "Hợp đồng",
       path: ["Kho tài liệu", "Hợp đồng"],
       subFolders: [
         {
           id: "contracts-active",
           name: "Hợp đồng đang hiệu lực",
           type: "folder",
           icon: Folder,
           color: "text-purple-600",
           bgColor: "bg-purple-50",
           itemCount: 15,
           lastModified: "3 ngày trước",
           createdBy: "Nguyễn Văn A"
         },
         {
           id: "contracts-expired",
           name: "Hợp đồng đã hết hạn",
           type: "folder",
           icon: Folder,
           color: "text-gray-600",
           bgColor: "bg-gray-50",
           itemCount: 8,
           lastModified: "1 tuần trước",
           createdBy: "Nguyễn Văn A"
         }
       ],
       documents: [
         {
           id: "contract-001",
           name: "Hợp đồng lao động.pdf",
           type: "document",
           icon: FileSpreadsheet,
           color: "text-purple-600",
           bgColor: "bg-purple-50",
           size: "2.1 MB",
           status: "approved",
           lastModified: "3 ngày trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Hợp đồng lao động", "Đang hiệu lực", "Nhân viên A"]
         },
         {
           id: "contract-002",
           name: "Hợp đồng kinh doanh.pdf",
           type: "document",
           icon: FileSpreadsheet,
           color: "text-purple-600",
           bgColor: "bg-purple-50",
           size: "3.5 MB",
           status: "approved",
           lastModified: "1 tuần trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Hợp đồng kinh doanh", "Đang hiệu lực", "Đối tác B"]
         }
       ]
     },
     "invoices-2024": {
       id: "invoices-2024",
       name: "Năm 2024",
       path: ["Kho tài liệu", "Hóa đơn", "Năm 2024"],
       subFolders: [
         {
           id: "invoices-2024-q1",
           name: "Quý 1",
           type: "folder",
           icon: Folder,
           color: "text-blue-600",
           bgColor: "bg-blue-50",
           itemCount: 30,
           lastModified: "2 tuần trước",
           createdBy: "Nguyễn Văn A"
         },
         {
           id: "invoices-2024-q2",
           name: "Quý 2",
           type: "folder",
           icon: Folder,
           color: "text-blue-600",
           bgColor: "bg-blue-50",
           itemCount: 35,
           lastModified: "3 tuần trước",
           createdBy: "Nguyễn Văn A"
         },
         {
           id: "invoices-2024-q3",
           name: "Quý 3",
           type: "folder",
           icon: Folder,
           color: "text-blue-600",
           bgColor: "bg-blue-50",
           itemCount: 28,
           lastModified: "1 tháng trước",
           createdBy: "Nguyễn Văn A"
         },
         {
           id: "invoices-2024-q4",
           name: "Quý 4",
           type: "folder",
           icon: Folder,
           color: "text-blue-600",
           bgColor: "bg-blue-50",
           itemCount: 30,
           lastModified: "2 tháng trước",
           createdBy: "Nguyễn Văn A"
         }
       ],
       documents: [
         {
           id: "inv-2024-001",
           name: "Hóa đơn tháng 12-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "2.8 MB",
           status: "approved",
           lastModified: "2 tuần trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 12", "Đã duyệt", "Hóa đơn đầu ra"]
         }
       ]
     },
     "invoices-pending": {
       id: "invoices-pending",
       name: "Chờ duyệt",
       path: ["Kho tài liệu", "Hóa đơn", "Chờ duyệt"],
       subFolders: [],
       documents: [
         {
           id: "inv-pending-001",
           name: "Hóa đơn chờ duyệt 001.pdf",
           type: "document",
           icon: Receipt,
           color: "text-yellow-600",
           bgColor: "bg-yellow-50",
           size: "1.5 MB",
           status: "pending",
           lastModified: "Hôm qua",
           createdBy: "Nguyễn Văn A",
           tags: ["Chờ duyệt", "Hóa đơn đầu vào", "Nhà cung cấp C"]
         },
         {
           id: "inv-pending-002",
           name: "Hóa đơn chờ duyệt 002.pdf",
           type: "document",
           icon: Receipt,
           color: "text-yellow-600",
           bgColor: "bg-yellow-50",
           size: "2.1 MB",
           status: "pending",
           lastModified: "2 ngày trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Chờ duyệt", "Hóa đơn đầu ra", "Khách hàng D"]
         }
       ]
     },
     "invoices-2025-q1": {
       id: "invoices-2025-q1",
       name: "Quý 1",
       path: ["Kho tài liệu", "Hóa đơn", "Năm 2025", "Quý 1"],
       subFolders: [],
       documents: [
         {
           id: "inv-2025-q1-001",
           name: "Hóa đơn tháng 1-2025.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "1.2 MB",
           status: "approved",
           lastModified: "1 ngày trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 1", "Đã duyệt", "Hóa đơn đầu ra"]
         },
         {
           id: "inv-2025-q1-002",
           name: "Hóa đơn tháng 2-2025.pdf",
           type: "document",
           icon: Receipt,
           color: "text-yellow-600",
           bgColor: "bg-yellow-50",
           size: "1.5 MB",
           status: "pending",
           lastModified: "2 ngày trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 2", "Chờ duyệt", "Hóa đơn đầu vào"]
         },
         {
           id: "inv-2025-q1-003",
           name: "Hóa đơn tháng 3-2025.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "1.8 MB",
           status: "approved",
           lastModified: "3 ngày trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 3", "Đã duyệt", "Hóa đơn đầu ra"]
         }
       ]
     },
     "personal-docs-id": {
       id: "personal-docs-id",
       name: "CMND/CCCD",
       path: ["Kho tài liệu", "Chứng từ cá nhân", "CMND/CCCD"],
       subFolders: [],
       documents: [
         {
           id: "cmnd-front",
           name: "CMND mặt trước.pdf",
           type: "document",
           icon: FileImage,
           color: "text-blue-600",
           bgColor: "bg-blue-50",
           size: "0.8 MB",
           status: "approved",
           lastModified: "1 tuần trước",
           createdBy: "Nguyễn Văn A",
           tags: ["CMND", "Đã duyệt", "Chứng minh nhân dân"]
         },
         {
           id: "cmnd-back",
           name: "CMND mặt sau.pdf",
           type: "document",
           icon: FileImage,
           color: "text-blue-600",
           bgColor: "bg-blue-50",
           size: "0.7 MB",
           status: "approved",
           lastModified: "1 tuần trước",
           createdBy: "Nguyễn Văn A",
           tags: ["CMND", "Đã duyệt", "Chứng minh nhân dân"]
         },
         {
           id: "cccd",
           name: "CCCD gắn chip.pdf",
           type: "document",
           icon: FileImage,
           color: "text-blue-600",
           bgColor: "bg-blue-50",
           size: "1.2 MB",
           status: "approved",
           lastModified: "2 tuần trước",
           createdBy: "Nguyễn Văn A",
           tags: ["CCCD", "Đã duyệt", "Căn cước công dân"]
         }
       ]
     },
     "invoices-2024-q1": {
       id: "invoices-2024-q1",
       name: "Quý 1",
       path: ["Kho tài liệu", "Hóa đơn", "Năm 2024", "Quý 1"],
       subFolders: [],
       documents: [
         {
           id: "inv-2024-q1-001",
           name: "Hóa đơn tháng 1-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "1.5 MB",
           status: "approved",
           lastModified: "2 tuần trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 1", "Đã duyệt", "Hóa đơn đầu ra"]
         },
         {
           id: "inv-2024-q1-002",
           name: "Hóa đơn tháng 2-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "1.8 MB",
           status: "approved",
           lastModified: "3 tuần trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 2", "Đã duyệt", "Hóa đơn đầu ra"]
         },
         {
           id: "inv-2024-q1-003",
           name: "Hóa đơn tháng 3-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-yellow-600",
           bgColor: "bg-yellow-50",
           size: "2.1 MB",
           status: "pending",
           lastModified: "1 tháng trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 3", "Chờ duyệt", "Hóa đơn đầu vào"]
         }
       ]
     },
     "invoices-2024-q2": {
       id: "invoices-2024-q2",
       name: "Quý 2",
       path: ["Kho tài liệu", "Hóa đơn", "Năm 2024", "Quý 2"],
       subFolders: [],
       documents: [
         {
           id: "inv-2024-q2-001",
           name: "Hóa đơn tháng 4-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "1.6 MB",
           status: "approved",
           lastModified: "1 tháng trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 4", "Đã duyệt", "Hóa đơn đầu ra"]
         },
         {
           id: "inv-2024-q2-002",
           name: "Hóa đơn tháng 5-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "1.9 MB",
           status: "approved",
           lastModified: "1 tháng trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 5", "Đã duyệt", "Hóa đơn đầu ra"]
         },
         {
           id: "inv-2024-q2-003",
           name: "Hóa đơn tháng 6-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "2.0 MB",
           status: "approved",
           lastModified: "2 tháng trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 6", "Đã duyệt", "Hóa đơn đầu ra"]
         }
       ]
     },
     "invoices-2024-q3": {
       id: "invoices-2024-q3",
       name: "Quý 3",
       path: ["Kho tài liệu", "Hóa đơn", "Năm 2024", "Quý 3"],
       subFolders: [],
       documents: [
         {
           id: "inv-2024-q3-001",
           name: "Hóa đơn tháng 7-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "1.7 MB",
           status: "approved",
           lastModified: "2 tháng trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 7", "Đã duyệt", "Hóa đơn đầu ra"]
         },
         {
           id: "inv-2024-q3-002",
           name: "Hóa đơn tháng 8-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "1.8 MB",
           status: "approved",
           lastModified: "2 tháng trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 8", "Đã duyệt", "Hóa đơn đầu ra"]
         },
         {
           id: "inv-2024-q3-003",
           name: "Hóa đơn tháng 9-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-yellow-600",
           bgColor: "bg-yellow-50",
           size: "2.2 MB",
           status: "pending",
           lastModified: "3 tháng trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 9", "Chờ duyệt", "Hóa đơn đầu vào"]
         }
       ]
     },
     "invoices-2024-q4": {
       id: "invoices-2024-q4",
       name: "Quý 4",
       path: ["Kho tài liệu", "Hóa đơn", "Năm 2024", "Quý 4"],
       subFolders: [],
       documents: [
         {
           id: "inv-2024-q4-001",
           name: "Hóa đơn tháng 10-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "1.9 MB",
           status: "approved",
           lastModified: "3 tháng trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 10", "Đã duyệt", "Hóa đơn đầu ra"]
         },
         {
           id: "inv-2024-q4-002",
           name: "Hóa đơn tháng 11-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "2.0 MB",
           status: "approved",
           lastModified: "3 tháng trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 11", "Đã duyệt", "Hóa đơn đầu ra"]
         },
         {
           id: "inv-2024-q4-003",
           name: "Hóa đơn tháng 12-2024.pdf",
           type: "document",
           icon: Receipt,
           color: "text-green-600",
           bgColor: "bg-green-50",
           size: "2.8 MB",
           status: "approved",
           lastModified: "2 tuần trước",
           createdBy: "Nguyễn Văn A",
           tags: ["Tháng 12", "Đã duyệt", "Hóa đơn đầu ra"]
                   }
        ]
      }
    })

  // Lấy dữ liệu thư mục hiện tại
  const currentFolder = folderData[currentFolderId as keyof typeof folderData] || folderData.root
  const subFolders = currentFolder.subFolders
  const documents = currentFolder.documents

  // Hàm chuẩn hóa tiếng Việt (bỏ dấu)
  const normalizeVietnamese = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'd')
  }

  // Filter dữ liệu theo search query (không phân biệt dấu)
  const filteredSubFolders = subFolders.filter(folder => 
    normalizeVietnamese(folder.name).includes(normalizeVietnamese(searchQuery))
  )
  const filteredDocuments = documents.filter(doc => 
    normalizeVietnamese(doc.name).includes(normalizeVietnamese(searchQuery))
  )

  const handleLogout = () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      window.location.href = "/"
    }
  }



  const handleGlobalSearch = () => {
    if (globalSearchQuery.trim()) {
      // Chuyển đến trang kết quả tìm kiếm với query
      window.location.href = `/user-dashboard/search?q=${encodeURIComponent(globalSearchQuery.trim())}`
    }
  }

  const handleUploadDocument = () => {
    window.location.href = "/user-dashboard/upload"
  }



  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      // Logic tạo thư mục mới
      console.log("Tạo thư mục mới:", newFolderName)
      
      // Tạo thư mục mới
      const newFolderId = `folder-${Date.now()}`
      const newFolder = {
        id: newFolderId,
        name: newFolderName.trim(),
        type: "folder",
        icon: Folder,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        itemCount: 0,
        lastModified: "Vừa tạo",
        createdBy: "Nguyễn Văn A"
      }
      
      // Cập nhật state để trigger re-render
      setFolderData(prev => ({
        ...prev,
        [currentFolderId]: {
          ...prev[currentFolderId],
          subFolders: [...prev[currentFolderId].subFolders, newFolder]
        }
      }))
      
      // Lưu tên thư mục để hiển thị trong thông báo
      setCreatedFolderName(newFolderName.trim())
      
      // Reset form và đóng dialog
      setNewFolderName('')
      setShowCreateFolderDialog(false)
      
      // Hiển thị thông báo thành công
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
        setCreatedFolderName('')
      }, 3000)
    }
  }

  const handleItemClick = (item: any) => {
    if (item.type === 'folder') {
      // Kiểm tra xem có phải double click không
      if (lastClickedItem === item.id && clickTimeout) {
        // Double click - truy cập vào thư mục
        clearTimeout(clickTimeout)
        setClickTimeout(null)
        setLastClickedItem(null)
        
        // Mở thư mục mới - nếu không có dữ liệu thì tạo thư mục trống
        if (folderData[item.id]) {
          setCurrentFolderId(item.id)
          setCurrentPath(folderData[item.id].path)
        } else {
          // Tạo thư mục trống cho các thư mục cuối cùng
          const newEmptyFolder = {
            id: item.id,
            name: item.name,
            path: [...currentFolder.path, item.name],
            subFolders: [],
            documents: []
          }
          // Thêm vào folderData
          setFolderData(prev => ({
            ...prev,
            [item.id]: newEmptyFolder
          }))
          setCurrentFolderId(item.id)
          setCurrentPath(newEmptyFolder.path)
        }
      } else {
        // Single click - chỉ highlight item
        setLastClickedItem(item.id)
        
        // Set timeout để reset nếu không có click thứ 2
        const timeout = setTimeout(() => {
          setLastClickedItem(null)
          setClickTimeout(null)
        }, 300) // 300ms để detect double click
        
        setClickTimeout(timeout)
      }
    } else {
      // Tài liệu - hiển thị thông tin ngay lập tức
      setSelectedItem(item)
      setShowInfoPanel(true)
    }
  }

  const handleBreadcrumbClick = (index: number) => {
    if (index < currentPath.length - 1) {
      // Tìm thư mục tương ứng với breadcrumb được click
      const targetPath = currentPath.slice(0, index + 1)
      const targetFolderName = targetPath[targetPath.length - 1]
      
      // Tìm folder ID dựa trên tên thư mục
      let targetFolderId = "root"
      
      // Tìm trong folderData
      for (const [folderId, folder] of Object.entries(folderData)) {
        if (folder.path.length === targetPath.length && 
            folder.path[targetPath.length - 1] === targetFolderName) {
          targetFolderId = folderId
          break
        }
      }
      
      setCurrentFolderId(targetFolderId)
      setCurrentPath(targetPath)
    }
  }

  const handleBackToParent = () => {
    if (currentFolder.path.length > 1) {
      // Tìm thư mục cha
      const parentPath = currentFolder.path.slice(0, -1)
      const parentFolderName = parentPath[parentPath.length - 1]
      
      // Tìm folder ID của thư mục cha
      let parentFolderId = "root"
      
      for (const [folderId, folder] of Object.entries(folderData)) {
        if (folder.path.length === parentPath.length && 
            folder.path[parentPath.length - 1] === parentFolderName) {
          parentFolderId = folderId
          break
        }
      }
      
      setCurrentFolderId(parentFolderId)
      setCurrentPath(parentPath)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt'
      case 'pending':
        return 'Chờ duyệt'
      case 'rejected':
        return 'Bị từ chối'
      default:
        return 'Không xác định'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>Thư mục "{createdFolderName}" đã được tạo thành công!</span>
        </div>
      )}
      
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
                  <div className="text-xs text-gray-500">Kho tài liệu</div>
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
         {/* Breadcrumb Navigation */}
         <div className="mb-6">
           <nav className="flex items-center space-x-2 text-sm">
             {currentFolder.path.map((path, index) => (
               <div key={index} className="flex items-center">
                 {index > 0 && <span className="text-gray-400 mx-2">/</span>}
                 <button
                   onClick={() => handleBreadcrumbClick(index)}
                   className={`hover:text-blue-600 transition-colors ${
                     index === currentFolder.path.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-600'
                   }`}
                 >
                   {path}
                 </button>
               </div>
             ))}
           </nav>
         </div>

                   {/* Folder Header with Back Button */}
          {currentFolder.path.length > 1 && (
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleBackToParent}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900">{currentFolder.name}</h1>
                  <p className="text-gray-500 mt-1">
                    {subFolders.length} thư mục • {documents.length} tài liệu
                  </p>
                </div>
              </div>
            </div>
          )}

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm trong thư mục này..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Lọc
              </Button>
              
              <Button variant="outline" size="sm">
                <SortAsc className="w-4 h-4 mr-2" />
                Sắp xếp
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
              
              <Dialog open={showCreateFolderDialog} onOpenChange={setShowCreateFolderDialog}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowCreateFolderDialog(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo thư mục
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tạo thư mục mới</DialogTitle>
                    <DialogDescription>
                      Nhập tên thư mục bạn muốn tạo trong thư mục hiện tại.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Input 
                      placeholder="Tên thư mục..." 
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCreateFolder()
                        }
                      }}
                    />
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowCreateFolderDialog(false)
                        setNewFolderName('')
                      }}
                    >
                      Hủy
                    </Button>
                    <Button onClick={handleCreateFolder}>Tạo thư mục</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button onClick={handleUploadDocument} className="bg-red-600 hover:bg-red-700">
                <Upload className="w-4 h-4 mr-2" />
                Tải lên
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* File/Folder List */}
          <div className={`flex-1 ${showInfoPanel ? 'mr-80' : ''}`}>
            {/* Subfolders */}
            {subFolders.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Folder className="w-5 h-5 mr-2 text-blue-600" />
                  Thư mục ({filteredSubFolders.length})
                </h3>
                
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredSubFolders.map((folder) => (
                      <Card 
                        key={folder.id}
                        className={`hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-300 hover:scale-105 ${
                          lastClickedItem === folder.id 
                            ? 'border-blue-400 bg-blue-50 shadow-lg' 
                            : 'border-gray-200'
                        }`}
                        onClick={() => handleItemClick(folder)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 ${folder.bgColor} rounded-lg flex items-center justify-center`}>
                              <folder.icon className={`w-5 h-5 ${folder.color}`} />
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Đổi tên
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Move className="w-4 h-4 mr-2" />
                                  Di chuyển
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Sao chép
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <h4 className="font-medium text-gray-900 mb-1 truncate">{folder.name}</h4>
                          <p className="text-xs text-gray-500 mb-2">{folder.itemCount} mục</p>
                          <p className="text-xs text-gray-400">Cập nhật: {folder.lastModified}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredSubFolders.map((folder) => (
                      <div 
                        key={folder.id}
                        className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                          lastClickedItem === folder.id 
                            ? 'bg-blue-50 border-blue-300' 
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => handleItemClick(folder)}
                      >
                        <div className={`w-10 h-10 ${folder.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                          <folder.icon className={`w-5 h-5 ${folder.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{folder.name}</h4>
                          <p className="text-sm text-gray-500">{folder.itemCount} mục • {folder.lastModified}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">{folder.createdBy}</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Đổi tên
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Move className="w-4 h-4 mr-2" />
                                Di chuyển
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Sao chép
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

                         {/* Documents */}
             <div>
               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                 <FileText className="w-5 h-5 mr-2 text-green-600" />
                 Tài liệu ({filteredDocuments.length})
               </h3>
               
               {/* Empty state */}
               {filteredSubFolders.length === 0 && filteredDocuments.length === 0 && (
                 <div className="text-center py-12">
                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     {searchQuery ? (
                       <Search className="w-8 h-8 text-gray-400" />
                     ) : (
                       <Folder className="w-8 h-8 text-gray-400" />
                     )}
                   </div>
                   <h3 className="text-lg font-medium text-gray-900 mb-2">
                     {searchQuery ? 'Không tìm thấy kết quả' : 'Thư mục trống'}
                   </h3>
                   <p className="text-gray-500 mb-6">
                     {searchQuery 
                       ? `Không tìm thấy tài liệu hoặc thư mục nào chứa "${searchQuery}"`
                       : 'Thư mục này chưa có tài liệu hoặc thư mục con nào.'
                     }
                   </p>
                   {!searchQuery && (
                     <div className="flex items-center justify-center space-x-4">
                       <Button onClick={() => setShowCreateFolderDialog(true)} variant="outline">
                         <Plus className="w-4 h-4 mr-2" />
                         Tạo thư mục mới
                       </Button>
                       <Button onClick={handleUploadDocument} className="bg-red-600 hover:bg-red-700">
                         <Upload className="w-4 h-4 mr-2" />
                         Tải lên tài liệu
                       </Button>
                     </div>
                   )}
                 </div>
               )}
              
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredDocuments.map((doc) => (
                    <Card 
                      key={doc.id}
                      className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-gray-200 hover:border-green-300 hover:scale-105"
                      onClick={() => handleItemClick(doc)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-10 h-10 ${doc.bgColor} rounded-lg flex items-center justify-center`}>
                            <doc.icon className={`w-5 h-5 ${doc.color}`} />
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Xem chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Tải xuống
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Đổi tên
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Move className="w-4 h-4 mr-2" />
                                Di chuyển
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share className="w-4 h-4 mr-2" />
                                Chia sẻ
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <h4 className="font-medium text-gray-900 mb-1 truncate">{doc.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{doc.size}</p>
                        <Badge variant="secondary" className={`text-xs ${getStatusColor(doc.status)}`}>
                          {getStatusText(doc.status)}
                        </Badge>
                        <p className="text-xs text-gray-400 mt-2">Cập nhật: {doc.lastModified}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredDocuments.map((doc) => (
                    <div 
                      key={doc.id}
                      className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleItemClick(doc)}
                    >
                      <div className={`w-10 h-10 ${doc.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                        <doc.icon className={`w-5 h-5 ${doc.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.lastModified}</span>
                          <span>•</span>
                          <span>{doc.createdBy}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className={`text-xs ${getStatusColor(doc.status)}`}>
                            {getStatusText(doc.status)}
                          </Badge>
                                                     {doc.tags.slice(0, 2).map((tag: string, index: number) => (
                             <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                               {tag}
                             </span>
                           ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Star className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Tải xuống
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Đổi tên
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Move className="w-4 h-4 mr-2" />
                              Di chuyển
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="w-4 h-4 mr-2" />
                              Chia sẻ
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info Panel */}
          {showInfoPanel && selectedItem && (
            <div className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-6 h-fit sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Thông tin chi tiết</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowInfoPanel(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Preview */}
                <div className="text-center">
                  <div className={`w-16 h-16 ${selectedItem.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <selectedItem.icon className={`w-8 h-8 ${selectedItem.color}`} />
                  </div>
                  <h4 className="font-medium text-gray-900">{selectedItem.name}</h4>
                  <p className="text-sm text-gray-500">{selectedItem.type === 'folder' ? 'Thư mục' : 'Tài liệu'}</p>
                </div>

                {/* File Info */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Kích thước:</span>
                    <span className="text-sm font-medium">{selectedItem.size || `${selectedItem.itemCount} mục`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Ngày tạo:</span>
                    <span className="text-sm font-medium">{selectedItem.lastModified}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Người tạo:</span>
                    <span className="text-sm font-medium">{selectedItem.createdBy}</span>
                  </div>
                  {selectedItem.status && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Trạng thái:</span>
                      <Badge variant="secondary" className={`text-xs ${getStatusColor(selectedItem.status)}`}>
                        {getStatusText(selectedItem.status)}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Thẻ (Tags)</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag: string, index: number) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Tải xuống
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Share className="w-4 h-4 mr-2" />
                      Chia sẻ
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                    <Button variant="ghost" size="icon" className="w-12 h-12 bg-red-50 text-red-600 hover:bg-red-100">
                      <Folder className="w-5 h-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Kho tài liệu</p>
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
      </div>
    </div>
  )
}
