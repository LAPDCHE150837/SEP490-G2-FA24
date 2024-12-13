import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Edit2, Trash2, Check,ChevronLeft,ChevronRight,Eye,EyeOff   } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area,XAxis,YAxis,Tooltip } from 'recharts';
import axios from 'axios';
import CRMLayout from "../Crm.jsx";
import { format } from 'date-fns';
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const UserManagement = () => {
    // Add new state for analytics
    const [analytics, setAnalytics] = useState({
        usersByRole: {},
        usersByStatus: {},
        registrationTrend: { labels: [], values: [] },
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0
    });
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

// Add function to fetch analytics
    const fetchAnalytics = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/admin/analytics/users', getAuthConfig());
            setAnalytics(response.data);
        } catch (err) {
            console.error('Error fetching analytics:', err);
        }
    };

// Update useEffect to fetch both users and analytics
    useEffect(() => {
        fetchUsers();
        fetchAnalytics();
    }, []);
    const [users, setUsers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        role: 'STUDENT'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const roles = ['ADMIN', 'USER', 'CONTENT','TEACHER'];
    // ... keep existing states ...
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    // Add pagination options
    const paginationOptions = [5, 25, 50, 100];
    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Get current users
    const getCurrentUsers = () => {
        const indexOfLastUser = currentPage * itemsPerPage;
        const indexOfFirstUser = indexOfLastUser - itemsPerPage;
        return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    };

    // Update total pages when filtered results or items per page changes
    useEffect(() => {
        setTotalPages(Math.ceil(filteredUsers.length / itemsPerPage));
        // Reset to first page if current page is out of bounds
        if (currentPage > Math.ceil(filteredUsers.length / itemsPerPage)) {
            setCurrentPage(1);
        }
    }, [filteredUsers.length, itemsPerPage]);

    // Pagination controls
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const getAuthConfig = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {

            setLoading(true);
            const token = localStorage.getItem("access_token");
            const decodedToken = jwtDecode(token);
            if (decodedToken.permission[0].authority !== "ROLE_ADMIN") {
                navigate("/denied")
            }

            const response = await axios.get('http://localhost:8080/v1/auth/user', getAuthConfig());
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };
    const validateForm = () => {
        const errors = {};

        // Username validation
        if (!newUser.username.trim()) {
            errors.username = 'Vui lòng nhập tên người dùng';
        } else if (newUser.username.length < 3) {
            errors.username = 'Tên người dùng phải có ít nhất 3 ký tự';
        }

        // Email validation
        if (!newUser.email.trim()) {
            errors.email = 'Vui lòng nhập email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
            errors.email = 'Email không hợp lệ';
        }

        // Password validation
        if (!newUser.password) {
            errors.password = 'Vui lòng nhập mật khẩu';
        } else if (newUser.password.length < 6) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        } else if (!/[A-Z]/.test(newUser.password)) {
            errors.password = 'Mật khẩu phải chứa ít nhất 1 chữ in hoa';
        }

        return errors;
    };

    const handleInputChange = (field, value) => {
        setNewUser(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user types
        if (validationErrors[field]) {
            setValidationErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            setLoading(true);
            await axios.post('http://localhost:8080/v1/auth/register', newUser, getAuthConfig());
            setIsAddModalOpen(false);
            setNewUser({
                username: '',
                email: '',
                password: '',
                role: 'STUDENT'
            });
            setValidationErrors({});
            fetchUsers();
        } catch (err) {
            setError('Failed to add user');
            console.error('Error adding user:', err);
        } finally {
            setLoading(false);
        }
    };



    const getRoleColor = (role) => {
        const colors = {
            ADMIN: 'bg-red-100 text-red-800',
            USER: 'bg-blue-100 text-blue-800',
            STUDENT: 'bg-green-100 text-green-800'
        };
        return colors[role] || 'bg-gray-100 text-gray-800';
    };

    return (
        <CRMLayout>

            <div className="min-h-screen bg-gray-50 p-6">
                <div className=" mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <UserPlus className="h-5 w-5" />
                            Thêm người dùng
                        </button>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm người dùng..."
                                    className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>


                    {/* Pagination Controls */}
                    <div className="px-6 py-4 bg-white border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <select
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPageChange}
                                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {paginationOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option} / trang
                                        </option>
                                    ))}
                                </select>
                                <span className="text-sm text-gray-500">
                                        Hiển thị {Math.min((currentPage - 1) * itemsPerPage + 1, filteredUsers.length)} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} trong số {filteredUsers.length} kết quả
                                    </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg ${
                                        currentPage === 1
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>

                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    // Show first page, last page, current page, and pages around current page
                                    if (
                                        pageNumber === 1 ||
                                        pageNumber === totalPages ||
                                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                                className={`px-3 py-1 rounded-lg ${
                                                    currentPage === pageNumber
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    } else if (
                                        pageNumber === currentPage - 2 ||
                                        pageNumber === currentPage + 2
                                    ) {
                                        return <span key={pageNumber} className="px-2">...</span>;
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg ${
                                        currentPage === totalPages
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* Users Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên người dùng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vai trò
                                </th>
                                {/*<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">*/}
                                {/*    Thao tác*/}
                                {/*</th>*/}
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {getCurrentUsers().map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {user.username}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    {/*<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">*/}
                                    {/*    <div className="flex gap-2">*/}
                                    {/*        <button className="text-blue-600 hover:text-blue-800">*/}
                                    {/*            <Edit2 className="h-5 w-5" />*/}
                                    {/*        </button>*/}
                                    {/*        <button className="text-red-600 hover:text-red-800">*/}
                                    {/*            <Trash2 className="h-5 w-5" />*/}
                                    {/*        </button>*/}
                                    {/*    </div>*/}
                                    {/*</td>*/}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Add User Modal */}
                    {isAddModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                <h2 className="text-xl font-bold mb-4">Thêm người dùng mới</h2>
                                <form onSubmit={handleAddUser} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tên người dùng</label>
                                        <input
                                            type="text"
                                            className={`w-full px-4 py-3 bg-white rounded-lg border-2 
                                        ${validationErrors.username ? 'border-red-500' : 'border-gray-200'}
                                        outline-none focus:border-blue-500 transition-all duration-200`}
                                            value={newUser.username}
                                            onChange={(e) => handleInputChange('username', e.target.value)}
                                        />
                                        {validationErrors.username && (
                                            <p className="mt-1 text-sm text-red-500">{validationErrors.username}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            className={`w-full px-4 py-3 bg-white rounded-lg border-2 
                                        ${validationErrors.email ? 'border-red-500' : 'border-gray-200'}
                                        outline-none focus:border-blue-500 transition-all duration-200`}
                                            value={newUser.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                        />
                                        {validationErrors.email && (
                                            <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className={`w-full px-4 py-3 bg-white rounded-lg border-2 
                                            ${validationErrors.password ? 'border-red-500' : 'border-gray-200'}
                                            outline-none focus:border-blue-500 transition-all duration-200`}
                                                value={newUser.password}
                                                onChange={(e) => handleInputChange('password', e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                        {validationErrors.password && (
                                            <p className="mt-1 text-sm text-red-500">{validationErrors.password}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                                        <select
                                            className="w-full px-4 py-3 bg-white rounded-lg border-2 border-gray-200
                                        outline-none focus:border-blue-500 transition-all duration-200"
                                            value={newUser.role}
                                            onChange={(e) => handleInputChange('role', e.target.value)}
                                        >
                                            {roles.map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex justify-end gap-4 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsAddModalOpen(false);
                                                setValidationErrors({});
                                                setNewUser({
                                                    username: '',
                                                    email: '',
                                                    password: '',
                                                    role: 'STUDENT'
                                                });
                                            }}
                                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                                            disabled={loading}
                                        >
                                            {loading ? 'Đang thêm...' : 'Thêm người dùng'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Error Toast */}
                    {error && (
                        <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
                            {error}
                        </div>
                    )}
                </div>
                {/* Analytics Section */}
                <div className="grid grid-cols-1 mt-2  md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Total Users */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Tổng người dùng</p>
                                <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <UserPlus className="h-6 w-6 text-blue-600"/>
                            </div>
                        </div>
                    </div>



                    {/* Users by Role */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600 mb-3">Phân bố vai trò</p>
                            {Object.entries(analytics.usersByRole).map(([role, count]) => (
                                <div key={role} className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(role)}`}>
                        {role}
                    </span>
                                    <span className="font-medium">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Registration Trend */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div>
                            <p className="text-sm text-gray-600 mb-3">Đăng ký trong tháng</p>
                            <div className="h-20">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={analytics.registrationTrend.labels.map((label, index) => ({
                                            name: format(new Date(label), 'dd/MM'),
                                            value: analytics.registrationTrend.values[index]
                                        }))}
                                        margin={{top: 5, right: 5, bottom: 5, left: 5}}
                                    >
                                        <XAxis
                                            dataKey="name"
                                            fontSize={10}
                                            tick={{fill: '#6B7280'}}
                                        />
                                        <YAxis
                                            fontSize={10}
                                            tick={{fill: '#6B7280'}}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #E5E7EB',
                                                borderRadius: '8px',
                                                padding: '8px'
                                            }}
                                            formatter={(value) => [`${value} người dùng`]}
                                            labelFormatter={(label) => `Ngày ${label}`}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#4F46E5"
                                            fill="#EEF2FF"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </CRMLayout>
    );
};

export default UserManagement;