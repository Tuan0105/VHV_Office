"use client"

import type React from "react"

import LoginModal from "@/components/login-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  Brain,
  Building,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  Eye,
  FileSearch,
  FileText,
  Folder,
  FolderOpen,
  Globe,
  Heart,
  Mail,
  MapPin,
  Pause,
  Phone,
  Play,
  Plug,
  Search,
  Shield,
  ShoppingCart,
  Star,
  Tags,
  Target,
  Upload,
} from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function VHVOfficeWebsite() {
  const [currentPage, setCurrentPage] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [currentDemo, setCurrentDemo] = useState("invoice")
  const [showExtractedText, setShowExtractedText] = useState(false)
  const [language, setLanguage] = useState("vi")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const parallaxRef = useRef<HTMLDivElement>(null)
  const carouselInterval = useRef<NodeJS.Timeout | undefined>(undefined)

  const testimonials = [
    {
      quote: "VHV Office giúp chúng tôi số hóa 10.000 hóa đơn/tháng, tiết kiệm 40% thời gian!",
      author: "Nguyễn Văn A",
      position: "CEO Công ty ABC",
      company: "ABC Corp",
    },
    {
      quote: "Lưu trữ cấu trúc giúp chúng tôi quản lý tài liệu dễ dàng hơn bao giờ hết!",
      author: "Trần Thị B",
      position: "Quản lý Văn phòng XYZ",
      company: "XYZ Office",
    },
    {
      quote: "Tích hợp với ERP của chúng tôi thật mượt mà và hiệu quả.",
      author: "Lê Văn C",
      position: "CTO Doanh nghiệp 123",
      company: "Enterprise 123",
    },
  ]

  const demoSamples = {
    invoice: {
      title: "Hóa đơn GTGT",
      image: "/hoa_don_gia_tri_gia_tang.jpg",
      extractedData: [
        "Tên công ty: Công ty TNHH Hoàng Anh",
        "Mã số thuế: 0009836571",
        "Địa chỉ: 275 Nguyễn Tuân, Q.Thanh Xuân, Hà Nội",
        "Ngày hóa đơn: 22/05/2017",
        "Số hóa đơn: 0001235",
        "Tổng tiền trước thuế: 24,000,000 VNĐ",
        "Thuế GTGT: 2,400,000 VNĐ",
        "Tổng tiền thanh toán: 26,400,000 VNĐ",
      ],
    },
    cmnd: {
      title: "Chứng minh nhân dân",
      image: "/placeholder.svg?height=300&width=400&text=Vietnamese+ID+Card+OCR",
      extractedData: [
        "Họ và tên: NGUYỄN VĂN A",
        "Số CMND: 123456789",
        "Ngày sinh: 01/01/1990",
        "Nơi sinh: Hà Nội",
        "Quê quán: Hà Nội, Việt Nam",
        "Ngày cấp: 15/06/2015",
        "Nơi cấp: Công an quận Ba Đình",
      ],
    },
    contract: {
      title: "Hợp đồng lao động",
      image: "/placeholder.svg?height=300&width=400&text=Vietnamese+Labor+Contract",
      extractedData: [
        "Số hợp đồng: HD-LD-2024-001",
        "Ngày ký: 15/01/2024",
        "Bên A (Người sử dụng lao động): Công ty TNHH ABC",
        "Bên B (Người lao động): Nguyễn Văn B",
        "Vị trí công việc: Nhân viên kinh doanh",
        "Mức lương: 15,000,000 VNĐ/tháng",
        "Thời hạn hợp đồng: 12 tháng",
      ],
    },
    receipt: {
      title: "Phiếu đề nghị tạm ứng",
      image: "/placeholder.svg?height=300&width=400&text=Vietnamese+Advance+Request",
      extractedData: [
        "Số phiếu: PTU-2024-001",
        "Ngày lập: 20/01/2024",
        "Người đề nghị: Trần Thị C",
        "Phòng ban: Kế toán",
        "Lý do tạm ứng: Chi phí công tác",
        "Số tiền đề nghị: 5,000,000 VNĐ",
        "Ngày cần: 25/01/2024",
      ],
    },
  }

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".parallax-bg")

      parallaxElements.forEach((element) => {
        const rate = scrolled * -0.5
        ;(element as HTMLElement).style.transform = `translateY(${rate}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".fade-in, .slide-up, .zoom-in")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [currentPage])

  // Auto-scrolling carousel
  useEffect(() => {
    if (!isCarouselPaused && currentPage === "home") {
      carouselInterval.current = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }

    return () => {
      if (carouselInterval.current) {
        clearInterval(carouselInterval.current)
      }
    }
  }, [isCarouselPaused, testimonials.length, currentPage])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const [demoStep, setDemoStep] = useState(0) // 0: Upload, 1: Processing, 2: Results
  const [isDemoProcessing, setIsDemoProcessing] = useState(false)
  const [demoProgress, setDemoProgress] = useState(0)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [demoProcessingSteps] = useState([
    "Đang tải tài liệu lên máy chủ an toàn...",
    "AI đang phân tích bố cục tài liệu...",
    "Tiến hành bóc tách ký tự quang học (OCR)...",
    "Nhận diện các trường thông tin quan trọng...",
    "Phân tích và trích xuất dữ liệu...",
    "Hoàn tất xử lý..."
  ])

  const handleDemoToggle = (type: string) => {
    setCurrentDemo(type)
    setShowExtractedText(false)
    setDemoStep(0)
    setDemoProgress(0)
    setCurrentStepIndex(0)
    setIsDemoProcessing(false)
    setSelectedFile(null)
    setFilePreview(null)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      
      // Create preview URL for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setFilePreview(null)
      }
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
      
      // Create preview URL for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setFilePreview(null)
      }
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const startDemoProcessing = () => {
    if (!selectedFile) return
    
    setDemoStep(1)
    setIsDemoProcessing(true)
    setDemoProgress(0)
    setCurrentStepIndex(0) // Bắt đầu từ bước 0
    
    // Simulate processing steps
    let stepIndex = 0
    const interval = setInterval(() => {
      if (stepIndex < demoProcessingSteps.length - 1) {
        stepIndex++
        setCurrentStepIndex(stepIndex)
        setDemoProgress(((stepIndex + 1) / demoProcessingSteps.length) * 100)
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setDemoStep(2)
          setIsDemoProcessing(false)
          setShowExtractedText(true)
        }, 1000)
      }
    }, 800)
  }

  const resetDemo = () => {
    setDemoStep(0)
    setIsDemoProcessing(false)
    setDemoProgress(0)
    setCurrentStepIndex(0)
    setShowExtractedText(false)
    setSelectedFile(null)
    setFilePreview(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/

    if (!formData.name.trim()) errors.name = "Vui lòng nhập họ tên"
    if (!formData.email.trim()) errors.email = "Vui lòng nhập email"
    else if (!emailRegex.test(formData.email)) errors.email = "Email không hợp lệ"
    if (!formData.phone.trim()) errors.phone = "Vui lòng nhập số điện thoại"
    else if (!phoneRegex.test(formData.phone)) errors.phone = "Số điện thoại không hợp lệ"

    return errors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Show success toast
    setToastMessage("Gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ trong 24h.")
    setShowToast(true)
    
    // Hide toast after 5 seconds
    setTimeout(() => {
      setShowToast(false)
    }, 5000)

    // Reset form
    setFormData({ name: "", email: "", company: "", phone: "", message: "" })
    setFormErrors({})
  }

  const navigateToPage = (page: string) => {
    setCurrentPage(page)
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToDemo = () => {
    if (currentPage !== "home") {
      setCurrentPage("home")
      setTimeout(() => {
        const demoSection = document.getElementById("demo")
        if (demoSection) {
          demoSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    } else {
      const demoSection = document.getElementById("demo")
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: "smooth" })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header - Consistent Across All Pages */}
      <header className="fixed top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-20 md:h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 fade-in visible">
              <div className="w-10 h-10 md:w-10 md:h-10 flex items-center justify-center shadow-lg">
                <img src="/logo.svg" alt="VHV Office Logo" className="w-full h-full" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">VHV Office</span>
                <div className="text-xs text-gray-500">by VHV</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigateToPage("home")}
                className={`text-gray-900 hover:text-red-600 transition-colors font-medium border-b-2 border-transparent hover:border-red-600 pb-1 ${
                  currentPage === "home" ? "text-red-600 border-red-600" : ""
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => navigateToPage("about")}
                className={`text-gray-900 hover:text-red-600 transition-colors font-medium border-b-2 border-transparent hover:border-red-600 pb-1 ${
                  currentPage === "about" ? "text-red-600 border-red-600" : ""
                }`}
              >
                Về VHV Office
              </button>
              <button
                onClick={() => navigateToPage("customers")}
                className={`text-gray-900 hover:text-red-600 transition-colors font-medium border-b-2 border-transparent hover:border-red-600 pb-1 ${
                  currentPage === "customers" ? "text-red-600 border-red-600" : ""
                }`}
              >
                Khách hàng
              </button>
              <button
                onClick={() => navigateToPage("contact")}
                className={`text-gray-900 hover:text-red-600 transition-colors font-medium border-b-2 border-transparent hover:border-red-600 pb-1 ${
                  currentPage === "contact" ? "text-red-600 border-red-600" : ""
                }`}
              >
                Liên hệ
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="relative hidden md:block">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors hover:scale-110">
                  <Globe className="w-4 h-4 text-red-600" />
                  <span className="text-sm">VI</span>
                </button>
              </div>

              <Button
                onClick={scrollToDemo}
                className="hidden md:inline-flex bg-red-600 hover:bg-red-700 text-white font-bold hover:scale-105 transition-all duration-200"
              >
                Trải nghiệm ngay
              </Button>
              <Button 
                variant="ghost" 
                className="hidden md:inline-flex text-blue-600 hover:text-red-600"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Đăng nhập
              </Button>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
                  <div className="hamburger-line w-6 h-0.5 bg-red-600 mb-1"></div>
                  <div className="hamburger-line w-6 h-0.5 bg-red-600 mb-1"></div>
                  <div className="hamburger-line w-6 h-0.5 bg-red-600"></div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`mobile-menu fixed top-20 right-0 w-80 h-full bg-white shadow-2xl z-40 ${isMenuOpen ? "open" : ""}`}
        >
          <nav className="flex flex-col p-6 space-y-6">
            <button
              onClick={() => navigateToPage("home")}
              className="text-gray-900 hover:text-red-600 transition-colors text-left text-lg"
            >
              Trang chủ
            </button>
            <button
              onClick={() => navigateToPage("about")}
              className="text-gray-900 hover:text-red-600 transition-colors text-left text-lg"
            >
              Về VHV Office
            </button>
            <button
              onClick={() => navigateToPage("customers")}
              className="text-gray-900 hover:text-red-600 transition-colors text-left text-lg"
            >
              Khách hàng
            </button>
            <button
              onClick={() => navigateToPage("contact")}
              className="text-gray-900 hover:text-red-600 transition-colors text-left text-lg"
            >
              Liên hệ
            </button>
            <div className="border-t pt-4">
              <Button onClick={scrollToDemo} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold mb-4">
                Trải nghiệm ngay
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-blue-600 hover:text-red-600"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Đăng nhập
              </Button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </header>

      {/* Page Content */}
      <main className="pt-20">
        {/* HOME PAGE */}
        {currentPage === "home" && (
          <div className="page-content active">
            {/* Hero Section */}
            <section className="relative min-h-[600px] md:min-h-[600px] bg-gradient-to-br from-blue-50 to-white overflow-hidden">
              <div className="absolute inset-0 lotus-pattern opacity-20"></div>
              <div className="absolute top-0 right-0 w-1/3 h-full lotus-pattern-animated opacity-10"></div>

              <div className="container mx-auto px-4 lg:px-6 py-16 lg:py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
                  <div className="text-center lg:text-left space-y-8">
                    <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200 fade-in">
                      🚀 Độ chính xác 98% cho tiếng Việt
                    </Badge>

                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight fade-in">
                      VHV Office: <span className="text-gradient">Số hóa, lưu trữ, quản lý thông minh</span>
                    </h1>

                    <p className="text-lg lg:text-2xl text-gray-600 leading-relaxed slide-up">
                      Chuyển đổi tài liệu tiếng Việt thành văn bản số, lưu trữ theo cấu trúc, quản lý hiệu quả với AI
                      OCR 98% chính xác.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start slide-up">
                      <Button
                        size="lg"
                        onClick={scrollToDemo}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold rounded-lg hover:scale-110 transition-all duration-200 shadow-xl hover:shadow-2xl"
                      >
                        Thử VHV Office miễn phí
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigateToPage("contact")}
                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-bold rounded-lg hover:scale-105 transition-all duration-200"
                      >
                        Liên hệ tư vấn
                      </Button>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500 slide-up">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Xử lý 6 giây/trang</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Lưu trữ cấu trúc</span>
                      </div>
                    </div>
                  </div>

                  <div className="zoom-in">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500 p-8">
                        <div className="grid grid-cols-2 gap-6">
                          {/* Document Processing Area */}
                          <div className="space-y-4">
                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">Hóa đơn ABC Corp</span>
                                </div>
                                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                  Đã xử lý
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>Tên công ty:</span>
                                  <span className="font-medium">Công ty TNHH ABC</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>Số hóa đơn:</span>
                                  <span className="font-medium">HD001234</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>Tổng tiền:</span>
                                  <span className="font-medium text-green-600">1.500.000 VNĐ</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-purple-600" />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">CMND Nguyễn Văn A</span>
                                </div>
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs">
                                  Đang xử lý
                                </Badge>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{width: '75%'}}></div>
                              </div>
                            </div>
                          </div>

                          {/* AI Processing Stats */}
                          <div className="space-y-4">
                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-600 mb-1">98%</div>
                                <div className="text-xs text-gray-500">Độ chính xác</div>
                                <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-green-500 rounded-full" style={{width: '98%'}}></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600 mb-1">6s</div>
                                <div className="text-xs text-gray-500">Xử lý/trang</div>
                                <div className="mt-2 flex items-center justify-center">
                                  <Clock className="w-4 h-4 text-blue-500 mr-1" />
                                  <span className="text-xs text-gray-500">Tốc độ cao</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600 mb-1">1,234</div>
                                <div className="text-xs text-gray-500">Tài liệu đã xử lý</div>
                                <div className="mt-2 flex items-center justify-center">
                                  <CheckSquare className="w-4 h-4 text-purple-500 mr-1" />
                                  <span className="text-xs text-gray-500">Hôm nay</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border">
                        <div className="text-sm text-gray-600">Độ chính xác</div>
                        <div className="text-3xl font-bold text-green-600">98%</div>
                      </div>
                      <div className="absolute -top-6 -right-6 bg-red-600 text-white p-4 rounded-xl shadow-xl">
                        <div className="text-sm">Xử lý</div>
                        <div className="text-xl font-bold">6s/trang</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
              <div className="absolute inset-0 paper-texture parallax-bg"></div>
              <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
                    Lợi ích vượt trội của VHV Office
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                    Tăng hiệu suất, tiết kiệm thời gian và chi phí cho doanh nghiệp Việt Nam
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Clock className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Tăng 21% hiệu suất làm việc</h3>
                      <p className="text-gray-600">Truy cập và quản lý tài liệu mọi lúc, mọi nơi</p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <FileText className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Tiết kiệm 40% thời gian</h3>
                      <p className="text-gray-600">Số hóa tài liệu trong 6 giây, loại bỏ nhập liệu thủ công</p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <FolderOpen className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Lưu trữ cấu trúc thông minh</h3>
                      <p className="text-gray-600">Tổ chức tài liệu theo thư mục, tag, và metadata tự động</p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <DollarSign className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Giảm chi phí vận hành</h3>
                      <p className="text-gray-600">Cắt giảm chi phí in ấn và lưu trữ hồ sơ giấy</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* NEW: Storage & Management Section */}
            <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-8 lotus-border"></div>
              <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
                    Lưu trữ & Quản lý tài liệu thông minh
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                    Hệ thống lưu trữ cấu trúc và quản lý tài liệu tiên tiến, tối ưu hóa quy trình làm việc
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Folder className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Lưu trữ cấu trúc</h3>
                      <p className="text-gray-600">
                        Tự động phân loại tài liệu vào thư mục theo loại (hóa đơn, hợp đồng, CMND) và gắn metadata
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Search className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Quản lý tập trung</h3>
                      <p className="text-gray-600">
                        Tìm kiếm nhanh, quản lý quyền truy cập, và theo dõi lịch sử chỉnh sửa
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Plug className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Tích hợp linh hoạt</h3>
                      <p className="text-gray-600">
                        Đồng bộ với hệ thống ERP, CRM, hoặc đám mây (Google Drive, Dropbox)
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Dashboard Mockup */}
                <div className="max-w-4xl mx-auto zoom-in">
                  <div className="dashboard-mockup">
                    <div className="text-center mb-6 mt-8">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">VHV Office Dashboard</h4>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Search className="w-4 h-4" />
                          <span>Tìm kiếm thông minh</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Tags className="w-4 h-4" />
                          <span>Gắn tag tự động</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>Bảo mật cao</span>
                        </div>
                      </div>
                    </div>

                    <div className="folder-structure">
                      <div className="folder-item">
                        <Folder className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">📄 Hóa đơn (1,234 tài liệu)</span>
                        <div className="ml-auto text-xs text-gray-500">Cập nhật: 2 phút trước</div>
                      </div>
                      <div className="folder-item">
                        <Folder className="w-5 h-5 text-green-600" />
                        <span className="font-medium">🆔 Chứng từ cá nhân (567 tài liệu)</span>
                        <div className="ml-auto text-xs text-gray-500">Cập nhật: 1 giờ trước</div>
                      </div>
                      <div className="folder-item">
                        <Folder className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">📚 Tài liệu giáo dục (890 tài liệu)</span>
                        <div className="ml-auto text-xs text-gray-500">Cập nhật: 3 giờ trước</div>
                      </div>
                      <div className="folder-item">
                        <Folder className="w-5 h-5 text-orange-600" />
                        <span className="font-medium">🏥 Hồ sơ y tế (234 tài liệu)</span>
                        <div className="ml-auto text-xs text-gray-500">Cập nhật: 1 ngày trước</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technology Section */}
            <section className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
              <div className="absolute inset-0 paper-texture parallax-bg"></div>
              <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
                    Công nghệ tiên tiến của VHV Office
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                    Kết hợp 4 công nghệ hàng đầu để mang lại độ chính xác tối ưu cho văn bản tiếng Việt
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Eye className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">AI OCR</h3>
                      <p className="text-gray-600">Nhận diện văn bản in/viết tay tiếng Việt, độ chính xác 98%</p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Brain className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">ICR</h3>
                      <p className="text-gray-600">Phân tích chữ viết tay phức tạp với machine learning</p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <FileSearch className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">ADRT</h3>
                      <p className="text-gray-600">Bóc tách dữ liệu từ hóa đơn, hợp đồng không cần mẫu</p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <CheckSquare className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">OMR</h3>
                      <p className="text-gray-600">Xử lý biểu mẫu, khảo sát với dấu tích/chữ ký</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Interactive Demo Section */}
            <section id="demo" className="py-16 lg:py-24 bg-white relative overflow-hidden">
              <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
                    Trải nghiệm VHV Office ngay
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                    Tải lên tài liệu của bạn và xem VHV Office hoạt động với độ chính xác 98%
                  </p>
                </div>

                <div className="max-w-6xl mx-auto">
                  {/* Demo Toggle Buttons */}
                  <div className="flex justify-center mb-8 fade-in">
                    <div className="flex bg-gray-100 rounded-lg p-1 shadow-lg">
                      {Object.entries(demoSamples).map(([key, sample]) => (
                        <button
                          key={key}
                          onClick={() => handleDemoToggle(key)}
                          className={`demo-toggle px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                            currentDemo === key 
                              ? "bg-white text-red-600 shadow-md transform scale-105" 
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          {sample.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Upload Area */}
                    <div className="fade-in">
                      {demoStep === 0 && (
                        <Card className="border-2 border-dashed border-blue-600 hover:border-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                          <CardContent className="p-12 text-center">
                            {!selectedFile ? (
                              <>
                                <Upload className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tải lên tài liệu để thử số hóa</h3>
                                <p className="text-gray-600 mb-8">Hỗ trợ định dạng: JPG, PNG, PDF</p>
                                
                                {/* File Upload Area */}
                                <div
                                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 hover:border-blue-400 transition-colors"
                                  onDrop={handleDrop}
                                  onDragOver={handleDragOver}
                                >
                                  <div className="space-y-4">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                                    <div>
                                      <p className="text-lg font-medium text-gray-900">
                                        Kéo và thả file của bạn vào đây, hoặc
                                      </p>
                                      <p className="text-sm text-gray-500 mt-1">
                                        Hỗ trợ: PDF, JPG, PNG. Tối đa 10MB
                                      </p>
                                    </div>
                                    <Input
                                      type="file"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      onChange={handleFileSelect}
                                      className="hidden"
                                      id="demo-file-upload"
                                    />
                                    <Label htmlFor="demo-file-upload">
                                      <Button variant="outline" asChild>
                                        <span>Chọn từ máy tính</span>
                                      </Button>
                                    </Label>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                  <FileText className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">File đã được chọn</h3>
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                  <div className="flex items-center space-x-3">
                                    <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                    <div className="text-left min-w-0 flex-1">
                                      <p className="font-medium text-gray-900 break-words">{selectedFile.name}</p>
                                      <p className="text-sm text-gray-500">
                                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-center">
                                  <Button 
                                    onClick={startDemoProcessing}
                                    className="bg-red-600 hover:bg-red-700 text-white hover:scale-110 transition-all duration-200 px-8 py-3 text-lg font-bold"
                                  >
                                    Bắt đầu xử lý AI
                                  </Button>
                                  <div className="h-6"></div>
                                  <Button 
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedFile(null)
                                      setFilePreview(null)
                                      setCurrentStepIndex(0)
                                      setDemoProgress(0)
                                    }}
                                    className="text-gray-600 hover:text-red-600"
                                  >
                                    Chọn file khác
                                  </Button>
                                </div>
                              </>
                            )}
                          </CardContent>
                        </Card>
                      )}

                      {demoStep === 1 && (
                        <Card className="border-2 border-blue-600 shadow-xl">
                          <CardContent className="p-12 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                              <Brain className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI đang xử lý tài liệu</h3>
                            <div className="space-y-4 mb-6">
                              {demoProcessingSteps.map((step, index) => (
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
                                      <CheckSquare className="w-4 h-4 text-white" />
                                    )}
                                  </div>
                                  <span className="text-sm">{step}</span>
                                </div>
                              ))}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${demoProgress}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-600">
                              {currentStepIndex < demoProcessingSteps.length - 1 
                                ? `Đang xử lý bước ${currentStepIndex + 1}/${demoProcessingSteps.length}...`
                                : "Hoàn tất xử lý..."
                              }
                            </p>
                          </CardContent>
                        </Card>
                      )}

                      {demoStep === 2 && (
                        <Card className="border-2 border-green-600 shadow-xl">
                          <CardContent className="p-12 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                              <CheckSquare className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Xử lý hoàn tất!</h3>
                            <p className="text-gray-600 mb-6">AI đã trích xuất thành công thông tin từ tài liệu</p>
                            <div className="space-y-3 mb-6">
                              <div className="flex items-center justify-center space-x-2 text-green-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm">Xử lý trong 4.8 giây</span>
                              </div>
                              <div className="flex items-center justify-center space-x-2 text-blue-600">
                                <Target className="w-4 h-4" />
                                <span className="text-sm">Độ chính xác: 98%</span>
                              </div>
                            </div>
                                                         <div className="flex flex-col items-center">
                               <Button 
                                 onClick={resetDemo}
                                 variant="outline"
                                 className="border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 transition-all duration-200"
                               >
                                 Thử lại với tài liệu khác
                               </Button>
                               <div className="h-6"></div>
                               <Button 
                                 onClick={() => {
                                   setDemoStep(0)
                                   setIsDemoProcessing(false)
                                   setDemoProgress(0)
                                   setCurrentStepIndex(0)
                                   setShowExtractedText(false)
                                 }}
                                 className="bg-blue-600 hover:bg-blue-700 text-white"
                               >
                                 Xử lý file khác
                               </Button>
                             </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Demo Results */}
                    <div className="zoom-in">
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-xl min-h-[400px] flex items-center justify-center">
                          {demoStep === 0 && !selectedFile && (
                            <div className="text-center">
                              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText className="w-12 h-12 text-gray-400" />
                              </div>
                              <h4 className="text-xl font-semibold text-gray-900 mb-2">Chưa có tài liệu</h4>
                              <p className="text-gray-600">Hãy tải lên tài liệu để xem kết quả AI trích xuất</p>
                            </div>
                          )}

                          {demoStep === 0 && selectedFile && (
                            <div className="w-full">
                              <h4 className="font-semibold text-gray-900 mb-4 text-xl">
                                Tài liệu đã chọn
                              </h4>
                              <div className="mb-6">
                                {filePreview ? (
                                  <Image
                                    src={filePreview}
                                    alt="File preview"
                                    width={400}
                                    height={300}
                                    className="rounded-lg w-full shadow-lg object-contain"
                                  />
                                ) : (
                                  <div className="bg-white rounded-lg p-8 text-center border">
                                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600">{selectedFile.name}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-700">
                                  💡 File đã sẵn sàng để xử lý. Click "Bắt đầu xử lý AI" để trích xuất thông tin.
                                </p>
                              </div>
                            </div>
                          )}

                          {demoStep === 1 && (
                            <div className="w-full">
                              <h4 className="font-semibold text-gray-900 mb-4 text-xl">Đang xử lý...</h4>
                              <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                  <Brain className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-gray-600">AI đang phân tích và trích xuất dữ liệu từ tài liệu của bạn...</p>
                              </div>
                            </div>
                          )}

                          {demoStep === 2 && (
                            <div className="w-full">
                              <h4 className="font-semibold text-gray-900 mb-4 text-xl">
                                Kết quả trích xuất - {demoSamples[currentDemo as keyof typeof demoSamples].title}
                              </h4>
                              <div className="mb-6">
                                {filePreview ? (
                                  <Image
                                    src={filePreview}
                                    alt="File preview"
                                    width={400}
                                    height={300}
                                    className="rounded-lg w-full shadow-lg object-contain"
                                  />
                                ) : (
                                  <div className="bg-white rounded-lg p-8 text-center border">
                                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600">{selectedFile?.name}</p>
                                  </div>
                                )}
                              </div>
                              <div className="bg-white p-6 rounded-lg border space-y-3">
                                {demoSamples[currentDemo as keyof typeof demoSamples].extractedData.map((item, index) => (
                                  <div key={index} className={`text-extraction flex justify-between animate-fade-in`} style={{animationDelay: `${index * 0.1}s`}}>
                                    <span className="text-sm text-gray-600">{item.split(":")[0]}:</span>
                                    <span className="text-sm font-medium text-gray-900">{item.split(":")[1]}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {demoStep === 2 && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2 text-green-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span>Xử lý trong 4.8 giây</span>
                            </div>
                            <div className="flex items-center space-x-2 text-blue-600">
                              <Target className="w-4 h-4" />
                              <span>Độ chính xác: 98%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 lg:py-24 bg-blue-50">
              <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
                    Khách hàng nói gì về VHV Office?
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                    Hàng nghìn doanh nghiệp Việt Nam đã tin tưởng và sử dụng VHV Office
                  </p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <div
                    className="relative"
                    onMouseEnter={() => setIsCarouselPaused(true)}
                    onMouseLeave={() => setIsCarouselPaused(false)}
                  >
                    <Card className="fade-in border-0 shadow-2xl">
                      <CardContent className="p-12 text-center">
                        <div className="flex justify-center mb-8">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <blockquote className="text-2xl lg:text-3xl text-gray-700 mb-8 leading-relaxed font-medium">
                          "{testimonials[currentTestimonial].quote}"
                        </blockquote>
                        <div className="flex items-center justify-center space-x-6">
                          <div className="w-20 h-20 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                            {testimonials[currentTestimonial].author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="text-left">
                            <div className="text-xl font-bold text-gray-900">
                              {testimonials[currentTestimonial].author}
                            </div>
                            <div className="text-gray-600 text-lg">{testimonials[currentTestimonial].position}</div>
                            <div className="text-red-600 font-medium">{testimonials[currentTestimonial].company}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Carousel Controls */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl hover:bg-gray-50 w-12 h-12"
                      onClick={prevTestimonial}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl hover:bg-gray-50 w-12 h-12"
                      onClick={nextTestimonial}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>

                    {/* Pause/Play Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur hover:bg-white"
                      onClick={() => setIsCarouselPaused(!isCarouselPaused)}
                    >
                      {isCarouselPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    </Button>
                  </div>

                  {/* Carousel Indicators */}
                  <div className="flex justify-center mt-8 space-x-3">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          index === currentTestimonial ? "bg-red-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        onClick={() => setCurrentTestimonial(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Footer Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-800 to-blue-600 text-white relative overflow-hidden">
              <div className="absolute inset-0 lotus-pattern-animated opacity-30"></div>
              <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16 fade-in">
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
                      Bắt đầu số hóa với VHV Office hôm nay
                    </h2>
                    <p className="text-xl lg:text-2xl text-blue-100">
                      Chuyển đổi, lưu trữ, và quản lý tài liệu với công nghệ AI từ VHV
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="fade-in">
                      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                        <Button
                          size="lg"
                          className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-xl font-bold hover:scale-110 transition-all duration-200 shadow-xl"
                        >
                          Dùng thử miễn phí
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          onClick={() => navigateToPage("contact")}
                          className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 text-xl font-bold bg-transparent hover:scale-105 transition-all duration-200"
                        >
                          Liên hệ đội ngũ VHV
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-6 text-sm text-blue-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Miễn phí 14 ngày</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Hỗ trợ 24/7</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Tích hợp ERP/CRM</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Đào tạo miễn phí</span>
                        </div>
                      </div>
                    </div>

                    <div className="slide-up">
                      <Card className="bg-white/10 backdrop-blur border-white/20 shadow-2xl">
                        <CardContent className="p-8">
                          <h3 className="text-2xl font-bold mb-6 text-white">Đăng ký tư vấn miễn phí</h3>
                          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <div>
                              <Input
                                type="text"
                                name="name"
                                placeholder="Họ và tên *"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`form-field bg-white/20 border-white/30 text-white placeholder:text-white/70 ${
                                  formErrors.name ? "border-red-400" : ""
                                }`}
                              />
                              {formErrors.name && <p className="form-error text-red-300">{formErrors.name}</p>}
                            </div>
                            <div>
                              <Input
                                type="email"
                                name="email"
                                placeholder="Email *"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`form-field bg-white/20 border-white/30 text-white placeholder:text-white/70 ${
                                  formErrors.email ? "border-red-400" : ""
                                }`}
                              />
                              {formErrors.email && <p className="form-error text-red-300">{formErrors.email}</p>}
                            </div>
                            <div>
                              <Input
                                type="text"
                                name="company"
                                placeholder="Công ty"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="form-field bg-white/20 border-white/30 text-white placeholder:text-white/70"
                              />
                            </div>
                                                      <div>
                            <Input
                              type="tel"
                              name="phone"
                              placeholder="Số điện thoại *"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`form-field bg-white/20 border-white/30 text-white placeholder:text-white/70 ${
                                formErrors.phone ? "border-red-400" : ""
                              }`}
                            />
                            {formErrors.phone && <p className="form-error text-red-300">{formErrors.phone}</p>}
                          </div>
                            <Button
                              type="submit"
                              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg hover:scale-105 transition-all duration-200 shadow-xl"
                            >
                              Đăng ký tư vấn
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ABOUT PAGE */}
        {currentPage === "about" && (
          <div className="page-content active">
            {/* Hero Section */}
            <section className="relative min-h-[500px] md:min-h-[500px] bg-gradient-to-br from-blue-50 to-white overflow-hidden">
              <div className="absolute inset-0 lotus-pattern opacity-20"></div>
              <div className="container mx-auto px-4 lg:px-6 py-16 lg:py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left space-y-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight fade-in">
                      VHV Office: <span className="text-gradient">Giải pháp số hóa & quản lý tài liệu toàn diện</span>
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed slide-up">
                      Số hóa, lưu trữ, và quản lý tài liệu tiếng Việt với AI OCR và công nghệ tiên tiến.
                    </p>

                    <Button
                      size="lg"
                      onClick={() => {
                        const featuresSection = document.getElementById("about-features")
                        if (featuresSection) {
                          featuresSection.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold rounded-lg hover:scale-110 transition-all duration-200 shadow-xl"
                    >
                      Khám phá tính năng
                    </Button>
                  </div>

                  <div className="zoom-in">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500 p-8">
                        <div className="space-y-6">
                          {/* Technology Stack */}
                          <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Công nghệ lõi</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                  <Eye className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="text-sm font-medium text-gray-700">AI OCR</div>
                                <div className="text-xs text-gray-500">98% chính xác</div>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                  <Brain className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-sm font-medium text-gray-700">ICR</div>
                                <div className="text-xs text-gray-500">Chữ viết tay</div>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                  <FileSearch className="w-6 h-6 text-purple-600" />
                                </div>
                                <div className="text-sm font-medium text-gray-700">ADRT</div>
                                <div className="text-xs text-gray-500">Bóc tách dữ liệu</div>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                  <CheckSquare className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-sm font-medium text-gray-700">OMR</div>
                                <div className="text-xs text-gray-500">Biểu mẫu</div>
                              </div>
                            </div>
                          </div>

                          {/* Processing Pipeline */}
                          <div className="bg-white rounded-lg p-4 shadow-sm border">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Quy trình xử lý</h4>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span>Tải lên</span>
                              </div>
                              <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>AI xử lý</span>
                              </div>
                              <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span>Kết quả</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technology Section */}
            <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-8 lotus-border"></div>
              <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Công nghệ lõi của VHV Office</h2>
                  <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                    Nền tảng AI tiên tiến được tối ưu hóa đặc biệt cho văn bản tiếng Việt
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Eye className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">AI OCR</h3>
                      <p className="text-gray-600">Nhận diện văn bản in/viết tay tiếng Việt, độ chính xác 98%</p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Brain className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">ICR</h3>
                      <p className="text-gray-600">Phân tích chữ viết tay phức tạp với machine learning</p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <FileSearch className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">ADRT</h3>
                      <p className="text-gray-600">Bóc tách dữ liệu từ hóa đơn, hợp đồng không cần mẫu</p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <CheckSquare className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">OMR</h3>
                      <p className="text-gray-600">Xử lý biểu mẫu, khảo sát với dấu tích/chữ ký</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="about-features" className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
              <div className="absolute inset-0 paper-texture parallax-bg"></div>
              <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Tính năng nổi bật</h2>
                  <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                    Giải pháp toàn diện cho quản lý và số hóa tài liệu doanh nghiệp
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <FileText className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Số hóa văn bản</h3>
                      <p className="text-gray-600">Chuyển đổi tài liệu giấy thành văn bản số chính xác</p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Folder className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Lưu trữ cấu trúc</h3>
                      <p className="text-gray-600">Tổ chức tài liệu theo thư mục, tag, và metadata tự động</p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Search className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Quản lý thông minh</h3>
                      <p className="text-gray-600">
                        Tìm kiếm nhanh, quản lý quyền truy cập, theo dõi lịch sử chỉnh sửa
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Plug className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Tích hợp API</h3>
                      <p className="text-gray-600">Kết nối với ERP, CRM, Google Drive, Dropbox</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* CTA Footer Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-800 to-blue-600 text-white relative overflow-hidden">
              <div className="absolute inset-0 lotus-pattern-animated opacity-30"></div>
              <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="fade-in mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Bắt đầu số hóa với VHV Office hôm nay</h2>
                    <p className="text-xl text-blue-100">
                      Chuyển đổi, lưu trữ, và quản lý tài liệu với công nghệ AI từ VHV
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button
                      size="lg"
                      onClick={scrollToDemo}
                      className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-xl font-bold hover:scale-110 transition-all duration-200 shadow-xl"
                    >
                      Dùng thử miễn phí
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigateToPage("contact")}
                      className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 text-xl font-bold bg-transparent hover:scale-105 transition-all duration-200"
                    >
                      Liên hệ đội ngũ VHV
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CUSTOMERS PAGE */}
        {currentPage === "customers" && (
          <div className="page-content active">
            {/* Hero Section */}
            <section className="relative min-h-[500px] bg-gradient-to-br from-blue-50 to-white overflow-hidden">
              <div className="absolute inset-0 lotus-pattern opacity-20"></div>
              <div className="container mx-auto px-4 lg:px-6 py-16 lg:py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left space-y-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight fade-in">
                      <span className="text-gradient">Khách hàng tin dùng</span> VHV Office
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed slide-up">
                      Hơn 500 doanh nghiệp và tổ chức Việt Nam đã chọn VHV Office để số hóa và quản lý tài liệu.
                    </p>

                    <Button
                      size="lg"
                      onClick={scrollToDemo}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold rounded-lg hover:scale-110 transition-all duration-200 shadow-xl"
                    >
                      Tham gia ngay
                    </Button>
                  </div>

                  <div className="zoom-in">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500 p-8">
                        <div className="space-y-6">
                          {/* Customer Success Metrics */}
                          <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Thành công của khách hàng</h3>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <div className="text-2xl font-bold text-green-600 mb-1">500+</div>
                                <div className="text-xs text-gray-500">Doanh nghiệp</div>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <div className="text-2xl font-bold text-blue-600 mb-1">45K+</div>
                                <div className="text-xs text-gray-500">Tài liệu xử lý</div>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
                                <div className="text-xs text-gray-500">Hài lòng</div>
                              </div>
                            </div>
                          </div>

                          {/* Industry Sectors */}
                          <div className="bg-white rounded-lg p-4 shadow-sm border">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Các ngành nghề phục vụ</h4>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div className="flex items-center space-x-2">
                                <Building className="w-4 h-4 text-blue-600" />
                                <span className="text-gray-600">Chính phủ</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <ShoppingCart className="w-4 h-4 text-green-600" />
                                <span className="text-gray-600">Bán lẻ</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <BookOpen className="w-4 h-4 text-purple-600" />
                                <span className="text-gray-600">Giáo dục</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Heart className="w-4 h-4 text-red-600" />
                                <span className="text-gray-600">Y tế</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Customer Segments Section */}
            <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-8 lotus-border"></div>
              <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Phục vụ đa dạng lĩnh vực</h2>
                  <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                    VHV Office đáp ứng nhu cầu số hóa tài liệu cho mọi ngành nghề tại Việt Nam
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Building className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Chính phủ</h3>
                      <p className="text-gray-600 mb-6">Số hóa chứng từ hành chính, hồ sơ công dân (CMND, hộ khẩu)</p>
                      <div className="overflow-hidden rounded-lg">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 h-48 flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                              <Building className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white rounded p-2 shadow-sm">
                                <div className="text-xs text-gray-600">CMND: 123456789</div>
                                <div className="text-xs font-medium">NGUYỄN VĂN A</div>
                              </div>
                              <div className="bg-white rounded p-2 shadow-sm">
                                <div className="text-xs text-gray-600">Hộ khẩu: HN-001</div>
                                <div className="text-xs font-medium">123 Đường ABC</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <ShoppingCart className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Doanh nghiệp bán lẻ</h3>
                      <p className="text-gray-600 mb-6">Xử lý hóa đơn, tích hợp với hệ thống kế toán</p>
                      <div className="overflow-hidden rounded-lg">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 h-48 flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                              <ShoppingCart className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white rounded p-2 shadow-sm">
                                <div className="text-xs text-gray-600">Hóa đơn: HD001234</div>
                                <div className="text-xs font-medium">Cửa hàng ABC</div>
                              </div>
                              <div className="bg-white rounded p-2 shadow-sm">
                                <div className="text-xs text-gray-600">Tổng tiền: 1.500.000₫</div>
                                <div className="text-xs font-medium">Ngày: 15/12/2024</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <BookOpen className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Giáo dục</h3>
                      <p className="text-gray-600 mb-6">Số hóa sách giáo khoa, tài liệu học tập</p>
                      <div className="overflow-hidden rounded-lg">
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 h-48 flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                              <BookOpen className="w-8 h-8 text-purple-600" />
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white rounded p-2 shadow-sm">
                                <div className="text-xs text-gray-600">Sách: Lịch sử Việt Nam</div>
                                <div className="text-xs font-medium">Lớp 10 - Chương 1</div>
                              </div>
                              <div className="bg-white rounded p-2 shadow-sm">
                                <div className="text-xs text-gray-600">Trang: 15-20</div>
                                <div className="text-xs font-medium">NXB Giáo dục</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 bounce-hover">
                        <Heart className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Y tế</h3>
                      <p className="text-gray-600 mb-6">Quản lý hồ sơ bệnh án, đơn thuốc tiếng Việt</p>
                      <div className="overflow-hidden rounded-lg">
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 h-48 flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto">
                              <Heart className="w-8 h-8 text-red-600" />
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white rounded p-2 shadow-sm">
                                <div className="text-xs text-gray-600">Bệnh án: BN001234</div>
                                <div className="text-xs font-medium">Bệnh viện ABC</div>
                              </div>
                              <div className="bg-white rounded p-2 shadow-sm">
                                <div className="text-xs text-gray-600">Đơn thuốc: DT001</div>
                                <div className="text-xs font-medium">BS. Nguyễn Văn B</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 lg:py-24 bg-blue-50">
              <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    Câu chuyện thành công từ khách hàng
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                    Những phản hồi tích cực từ các doanh nghiệp đã sử dụng VHV Office
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="fade-in border-0 shadow-xl hover:shadow-2xl card-3d bg-white">
                      <CardContent className="p-8">
                        <div className="flex justify-center mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center space-x-4">
                          <div className="w-15 h-15 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{testimonial.author}</div>
                            <div className="text-gray-600 text-sm">{testimonial.position}</div>
                            <div className="text-red-600 font-medium text-sm">{testimonial.company}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Footer Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-800 to-blue-600 text-white relative overflow-hidden">
              <div className="absolute inset-0 lotus-pattern-animated opacity-30"></div>
              <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="fade-in mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Bắt đầu số hóa với VHV Office hôm nay</h2>
                    <p className="text-xl text-blue-100">
                      Chuyển đổi, lưu trữ, và quản lý tài liệu với công nghệ AI từ VHV
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button
                      size="lg"
                      onClick={scrollToDemo}
                      className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-xl font-bold hover:scale-110 transition-all duration-200 shadow-xl"
                    >
                      Dùng thử miễn phí
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigateToPage("contact")}
                      className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 text-xl font-bold bg-transparent hover:scale-105 transition-all duration-200"
                    >
                      Liên hệ đội ngũ VHV
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CONTACT PAGE */}
        {currentPage === "contact" && (
          <div className="page-content active">
            {/* Hero Section */}
            <section className="relative min-h-[500px] bg-gradient-to-br from-blue-50 to-white overflow-hidden">
              <div className="absolute inset-0 lotus-pattern opacity-20"></div>
              <div className="container mx-auto px-4 lg:px-6 py-16 lg:py-24 relative z-10">
                <div className="text-center space-y-8">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight fade-in">
                    <span className="text-gradient">Liên hệ với</span> VHV Office
                  </h1>

                  <p className="text-lg lg:text-xl text-gray-600 leading-relaxed slide-up max-w-3xl mx-auto">
                    Kết nối với đội ngũ VHV để trải nghiệm giải pháp số hóa và quản lý tài liệu tiên tiến.
                  </p>

                  <Button
                    size="lg"
                    onClick={() => {
                      const formSection = document.getElementById("contact-form")
                      if (formSection) {
                        formSection.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold rounded-lg hover:scale-110 transition-all duration-200 shadow-xl"
                  >
                    Gửi yêu cầu ngay
                  </Button>
                </div>
              </div>
            </section>

            {/* Contact Information Section */}
            <section className="py-16 lg:py-24 bg-white">
              <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h2>
                  <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                    Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div className="space-y-8 fade-in">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Địa chỉ</h3>
                        <p className="text-gray-600">
                          P323.324 Tòa tháp Đông, Chung cư Học viện Quốc phòng, Phường Nghĩa Đô, Thành phố Hà Nội, Việt Nam
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Hotline</h3>
                        <a href="tel:19001234" className="text-blue-600 hover:text-red-600 transition-colors text-lg">
                          1900 1234
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                        <a
                          href="mailto:contact@vhvoffice.vn"
                          className="text-blue-600 hover:text-red-600 transition-colors text-lg"
                        >
                          contact@vhvoffice.vn
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <ExternalLink className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Website</h3>
                        <a href="#" className="text-blue-600 hover:text-red-600 transition-colors text-lg">
                          www.vhvoffice.vn
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="zoom-in">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg">
                      <div className="space-y-6">
                        {/* Office Location with Map */}
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Văn phòng VHV Office</h3>
                          
                          {/* Interactive Map */}
                          <div className="bg-white rounded-lg p-4 shadow-sm border mb-4">
                            <div className="space-y-4">
                              {/* Google Maps Embed */}
                              <div className="relative overflow-hidden rounded-lg h-64 bg-gray-100">
                                <iframe
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0951822989!2d105.7991676!3d21.0501975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5bade2c193%3A0x16c0b4280e3419a3!2zQ2h1bmcgY8awIEjhuqNpIHZp4buHbiBRdW5nIHBo2g!5e0!3m2!1svi!2s!4v1703123456789!5m2!1svi!2s"
                                  width="100%"
                                  height="100%"
                                  style={{ border: 0 }}
                                  allowFullScreen
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                  className="rounded-lg"
                                ></iframe>
                                
                                {/* Overlay with VHV Office Marker */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                  <div className="w-6 h-6 bg-red-600 rounded-full shadow-lg animate-pulse flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                  </div>
                                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium text-gray-700 whitespace-nowrap">
                                    VHV Office
                                  </div>
                                </div>
                              </div>
                              
                              {/* Directions Button */}
                              <div className="text-center">
                                                                 <a 
                                   href="https://www.google.com/maps/place/Chung+c%C6%B0+H%E1%BB%8Dc+vi%E1%BB%87n+qu%E1%BB%91c+ph%C3%B2ng+-+th%C3%A1p+T%C3%A2y/@21.0502025,105.7965927,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab5bade2c193:0x16c0b4280e3419a3!8m2!3d21.0501975!4d105.7991676!16s%2Fg%2F11twpmh4s9?entry=ttu&g_ep=EgoyMDI1MDgxMS4wIKXMDSoASAFQAw%3D%3D" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
                                 >
                                  <MapPin className="w-4 h-4" />
                                  <span>Chỉ đường</span>
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center space-x-3">
                                <MapPin className="w-4 h-4 text-red-600" />
                                <span className="text-gray-700">P323.324 Tòa tháp Đông, Chung cư Học viện Quốc phòng, Phường Nghĩa Đô, Thành phố Hà Nội, Việt Nam</span>
                              </div>
                           
                              <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-blue-600" />
                                <span className="text-gray-700">1900 1234</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-green-600" />
                                <span className="text-gray-700">contact@vhvoffice.vn</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contact Hours */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Giờ làm việc</h4>
                          <div className="space-y-2 text-xs text-gray-600">
                            <div className="flex justify-between">
                              <span>Thứ 2 - Thứ 6:</span>
                              <span className="font-medium">8:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Thứ 7:</span>
                              <span className="font-medium">8:00 - 12:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Chủ nhật:</span>
                              <span className="font-medium">Nghỉ</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact-form" className="py-16 lg:py-24 bg-gray-50">
              <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-16 fade-in">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Gửi yêu cầu tư vấn</h2>
                  <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                    Điền thông tin bên dưới và chúng tôi sẽ liên hệ với bạn trong 24 giờ
                  </p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <Card className="shadow-2xl border-0 slide-up">
                    <CardContent className="p-8">
                      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                              Họ và tên *
                            </label>
                            <Input
                              id="name"
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className={`form-field ${formErrors.name ? "border-red-400" : ""}`}
                              placeholder="Nhập họ và tên"
                            />
                            {formErrors.name && <p className="form-error">{formErrors.name}</p>}
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              Email *
                            </label>
                            <Input
                              id="email"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`form-field ${formErrors.email ? "border-red-400" : ""}`}
                              placeholder="Nhập địa chỉ email"
                            />
                            {formErrors.email && <p className="form-error">{formErrors.email}</p>}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                              Công ty
                            </label>
                            <Input
                              id="company"
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="form-field"
                              placeholder="Nhập tên công ty"
                            />
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                              Số điện thoại *
                            </label>
                            <Input
                              id="phone"
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`form-field ${formErrors.phone ? "border-red-400" : ""}`}
                              placeholder="Nhập số điện thoại"
                            />
                            {formErrors.phone && <p className="form-error">{formErrors.phone}</p>}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Tin nhắn
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="form-field"
                            placeholder="Nhập nội dung tin nhắn..."
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg hover:scale-105 transition-all duration-200 shadow-xl"
                        >
                          Gửi yêu cầu
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* CTA Footer Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-800 to-blue-600 text-white relative overflow-hidden">
              <div className="absolute inset-0 lotus-pattern-animated opacity-30"></div>
              <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="fade-in mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Bắt đầu số hóa với VHV Office hôm nay</h2>
                    <p className="text-xl text-blue-100">
                      Chuyển đổi, lưu trữ, và quản lý tài liệu với công nghệ AI từ VHV
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button
                      size="lg"
                      onClick={scrollToDemo}
                      className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-xl font-bold hover:scale-110 transition-all duration-200 shadow-xl"
                    >
                      Dùng thử miễn phí
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 text-xl font-bold bg-transparent hover:scale-105 transition-all duration-200"
                    >
                      Liên hệ đội ngũ VHV
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer - Consistent Across All Pages */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center shadow-lg">
                  <img src="/logo.svg" alt="VHV Office Logo" className="w-full h-full" />
                </div>
                <div>
                  <div className="text-2xl font-bold">VHV - Văn Hóa Việt</div>
                  <div className="text-sm text-gray-400">Công nghệ từ Văn Hóa Việt</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md text-lg">
                Phát triển các giải pháp công nghệ AI tiên tiến, mang đậm bản sắc văn hóa Việt Nam, phục vụ chuyển đổi
                số cho doanh nghiệp.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <span className="text-sm">FB</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <span className="text-sm">LI</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <span className="text-sm">YT</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">Sản phẩm</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <button onClick={() => navigateToPage("home")} className="hover:text-red-400 transition-colors">
                    VHV Office
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Enterprise Solutions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">Công ty</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <button onClick={() => navigateToPage("about")} className="hover:text-red-400 transition-colors">
                    About VHV
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage("contact")} className="hover:text-red-400 transition-colors">
                    Contact
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} VHV - Văn Hóa Việt. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">
                  Gửi yêu cầu tư vấn thành công!
                </p>
                <p className="text-sm text-green-700 mt-1">
                  {toastMessage}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => setShowToast(false)}
                  className="text-green-400 hover:text-green-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
