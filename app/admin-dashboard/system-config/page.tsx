"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  UserPlus, 
  Mail,
  Users,
  FileText,
  Workflow,
  CheckCircle,
  Clock,
  XCircle,
  ChevronDown,
  Shield,
  ShieldOff,
  RefreshCw,
  Eye
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@company.com",
    role: "Admin",
    status: "active",
    avatar: "/placeholder-user.jpg",
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@company.com",
    role: "User",
    status: "active",
    avatar: "",
    joinDate: "2024-02-20"
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@company.com",
    role: "Approver",
    status: "pending",
    avatar: "",
    joinDate: "2024-03-10"
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@company.com",
    role: "User",
    status: "inactive",
    avatar: "",
    joinDate: "2024-01-05"
  }
];

const mockDocumentTypes = [
  {
    id: 1,
    name: "Hóa đơn GTGT",
    fields: [
      { name: "Số hóa đơn", type: "text", required: true },
      { name: "Ngày phát hành", type: "date", required: true },
      { name: "Tên nhà cung cấp", type: "text", required: true },
      { name: "Tổng tiền", type: "number", required: true }
    ]
  },
  {
    id: 2,
    name: "Hợp đồng lao động",
    fields: [
      { name: "Số hợp đồng", type: "text", required: true },
      { name: "Tên nhân viên", type: "text", required: true },
      { name: "Ngày ký", type: "date", required: true },
      { name: "Lương cơ bản", type: "number", required: true }
    ]
  }
];

export default function SystemConfigPage() {
  const [users, setUsers] = useState(mockUsers);
  const [documentTypes, setDocumentTypes] = useState(mockDocumentTypes);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateDocTypeModalOpen, setIsCreateDocTypeModalOpen] = useState(false);
  const [editingDocType, setEditingDocType] = useState(null);
  const [newDocType, setNewDocType] = useState({
    name: "",
    fields: []
  });

  // Invite user modal state
  const [inviteEmails, setInviteEmails] = useState("");
  const [inviteRole, setInviteRole] = useState("User");

  // Document type form state
  const [docTypeName, setDocTypeName] = useState("");
  const [docTypeFields, setDocTypeFields] = useState<Array<{name: string; type: string; required: boolean}>>([]);

  const handleInviteUser = () => {
    const emails = inviteEmails.split(",").map(email => email.trim()).filter(email => email);
    if (emails.length === 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập ít nhất một email",
        variant: "destructive"
      });
      return;
    }

    // Add new users to the list
    const newUsers = emails.map((email, index) => ({
      id: users.length + index + 1,
      name: email.split("@")[0],
      email,
      role: inviteRole,
      status: "pending",
      avatar: "",
      joinDate: new Date().toISOString().split("T")[0]
    }));

    setUsers([...newUsers, ...users]);
    setIsInviteModalOpen(false);
    setInviteEmails("");
    setInviteRole("User");

    toast({
      title: "Thành công",
      description: `Đã gửi lời mời thành công cho ${emails.length} người dùng!`,
    });
  };

  const handleCreateDocumentType = () => {
    if (!docTypeName.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tên loại tài liệu",
        variant: "destructive"
      });
      return;
    }

    const newDocType = {
      id: documentTypes.length + 1,
      name: docTypeName,
      fields: docTypeFields
    };

    setDocumentTypes([newDocType, ...documentTypes]);
    setIsCreateDocTypeModalOpen(false);
    setDocTypeName("");
    setDocTypeFields([]);

    toast({
      title: "Thành công",
      description: `Đã tạo thành công loại tài liệu '${docTypeName}'!`,
    });
  };

  const addField = () => {
    setDocTypeFields([...docTypeFields, { name: "", type: "text", required: false }]);
  };

  const removeField = (index: number) => {
    setDocTypeFields(docTypeFields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, field: string, value: any) => {
    const newFields = [...docTypeFields];
    newFields[index] = { ...newFields[index], [field]: value };
    setDocTypeFields(newFields);
  };

  const handleUserAction = (action: string, user: any) => {
    switch (action) {
      case 'edit':
        toast({
          title: "Chỉnh sửa vai trò",
          description: `Đang mở form chỉnh sửa vai trò cho ${user.name}`,
        });
        break;
      case 'activate':
        setUsers(users.map(u => 
          u.id === user.id ? { ...u, status: 'active' } : u
        ));
        toast({
          title: "Thành công",
          description: `Đã kích hoạt tài khoản ${user.name}`,
        });
        break;
      case 'deactivate':
        setUsers(users.map(u => 
          u.id === user.id ? { ...u, status: 'inactive' } : u
        ));
        toast({
          title: "Thành công",
          description: `Đã vô hiệu hóa tài khoản ${user.name}`,
        });
        break;
      case 'resend':
        toast({
          title: "Gửi lại lời mời",
          description: `Đã gửi lại lời mời cho ${user.email}`,
        });
        break;
      case 'view':
        toast({
          title: "Xem chi tiết",
          description: `Đang mở thông tin chi tiết của ${user.name}`,
        });
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Hoạt động";
      case "pending": return "Đang chờ";
      case "inactive": return "Vô hiệu hóa";
      default: return "Không xác định";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "bg-red-100 text-red-800";
      case "Approver": return "bg-blue-100 text-blue-800";
      case "User": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cấu hình hệ thống</h1>
          <p className="text-gray-600 mt-2">Quản lý người dùng, loại tài liệu và quy trình làm việc</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Người dùng
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Loại tài liệu
          </TabsTrigger>
          <TabsTrigger value="workflow" className="flex items-center gap-2">
            <Workflow className="w-4 h-4" />
            Quy trình
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Quản lý Người dùng */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm theo tên hoặc email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Approver">Approver</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Mời người dùng mới
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Mời người dùng mới</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="emails">Địa chỉ email</Label>
                    <Textarea
                      id="emails"
                      placeholder="Nhập email, cách nhau bằng dấu phẩy"
                      value={inviteEmails}
                      onChange={(e) => setInviteEmails(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Vai trò</Label>
                    <Select value={inviteRole} onValueChange={setInviteRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="User">Nhân viên (User)</SelectItem>
                        <SelectItem value="Approver">Người duyệt (Approver)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>
                      Hủy
                    </Button>
                    <Button onClick={handleInviteUser}>
                      Gửi lời mời
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Người dùng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vai trò
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày tham gia
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Avatar className="w-8 h-8 mr-3">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getStatusColor(user.status)}>
                            {getStatusText(user.status)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(user.joinDate).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleUserAction('view', user)}>
                                <Eye className="w-4 h-4 mr-2" />
                                Xem chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUserAction('edit', user)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Chỉnh sửa vai trò
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === 'active' && (
                                <DropdownMenuItem 
                                  onClick={() => handleUserAction('deactivate', user)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <ShieldOff className="w-4 h-4 mr-2" />
                                  Vô hiệu hóa
                                </DropdownMenuItem>
                              )}
                              {user.status === 'inactive' && (
                                <DropdownMenuItem 
                                  onClick={() => handleUserAction('activate', user)}
                                  className="text-green-600 focus:text-green-600"
                                >
                                  <Shield className="w-4 h-4 mr-2" />
                                  Kích hoạt lại
                                </DropdownMenuItem>
                              )}
                              {user.status === 'pending' && (
                                <DropdownMenuItem onClick={() => handleUserAction('resend', user)}>
                                  <RefreshCw className="w-4 h-4 mr-2" />
                                  Gửi lại lời mời
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Quản lý Loại tài liệu */}
        <TabsContent value="documents" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Loại tài liệu</h2>
            <Dialog open={isCreateDocTypeModalOpen} onOpenChange={setIsCreateDocTypeModalOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Tạo loại tài liệu mới
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Tạo loại tài liệu mới</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="docTypeName">Tên loại tài liệu</Label>
                    <Input
                      id="docTypeName"
                      placeholder="Ví dụ: Phiếu đề nghị tạm ứng"
                      value={docTypeName}
                      onChange={(e) => setDocTypeName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label>Các trường dữ liệu cần bóc tách</Label>
                    <div className="space-y-3 mt-2">
                      {docTypeFields.map((field, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Input
                            placeholder="Tên trường"
                            value={field.name}
                            onChange={(e) => updateField(index, "name", e.target.value)}
                            className="flex-1"
                          />
                          <Select 
                            value={field.type} 
                            onValueChange={(value) => updateField(index, "type", value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Văn bản</SelectItem>
                              <SelectItem value="number">Số</SelectItem>
                              <SelectItem value="date">Ngày tháng</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`required-${index}`}
                              checked={field.required}
                              onCheckedChange={(checked) => updateField(index, "required", checked)}
                            />
                            <Label htmlFor={`required-${index}`} className="text-sm">Bắt buộc</Label>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeField(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={addField}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm trường
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDocTypeModalOpen(false)}>
                      Hủy
                    </Button>
                    <Button onClick={handleCreateDocumentType}>
                      Lưu cấu hình
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {documentTypes.map((docType) => (
              <Card key={docType.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{docType.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Sửa
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Xóa
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {docType.fields.map((field, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <span className="font-medium">{field.name}</span>
                        <Badge variant="secondary">{field.type}</Badge>
                        {field.required && (
                          <Badge variant="destructive">Bắt buộc</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 3: Quản lý Quy trình */}
        <TabsContent value="workflow" className="space-y-6">
          <Card className="text-center py-12">
            <CardContent>
              <Workflow className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Thiết lập Quy trình Phê duyệt nâng cao
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Tính năng này cho phép bạn tạo các luồng duyệt tài liệu nhiều bước phức tạp 
                (ví dụ: Hóa đơn &gt; 50 triệu cần 2 cấp duyệt). Tính năng sẽ sớm được ra mắt 
                trong các phiên bản tiếp theo.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
}
