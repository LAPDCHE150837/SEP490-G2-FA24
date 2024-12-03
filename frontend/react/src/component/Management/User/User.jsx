import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, UserPlus } from 'lucide-react';
import axios from 'axios';
import CRMLayout from "../Crm.jsx";

const UserManagement = () => {
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

    const getAuthConfig = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/v1/auth/user', getAuthConfig());
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
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
            fetchUsers();
        } catch (err) {
            setError('Failed to add user');
            console.error('Error adding user:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRoleColor = (role) => {
        const colors = {
            ADMIN: 'bg-red-100 text-red-800',
            USER: 'bg-blue-100 text-blue-800',
            CONTENT: 'bg-purple-100 text-purple-800',
            STUDENT: 'bg-green-100 text-green-800'
        };
        return colors[role] || 'bg-gray-100 text-gray-800';
    };

    return (
        <CRMLayout>

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto space-y-6">
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
                            {filteredUsers.map((user) => (
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
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                <h2 className="text-xl font-bold mb-4">Thêm người dùng mới</h2>
                                <form onSubmit={handleAddUser} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tên người dùng</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 bg-white rounded-lg border-2 border-gray-200
                    outline-none focus:border-blue-500 transition-all duration-200 ease-in-out
                    shadow-sm hover:border-gray-300
                    text-gray-700 text-base
                    placeholder:text-gray-400
                    disabled:bg-gray-50 disabled:cursor-not-allowed
                    focus:ring-4 focus:ring-blue-100"
                                            value={newUser.username}
                                            onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 bg-white rounded-lg border-2 border-gray-200
                    outline-none focus:border-blue-500 transition-all duration-200 ease-in-out
                    shadow-sm hover:border-gray-300
                    text-gray-700 text-base
                    placeholder:text-gray-400
                    disabled:bg-gray-50 disabled:cursor-not-allowed
                    focus:ring-4 focus:ring-blue-100"
                                            value={newUser.email}
                                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                        <input
                                            type="password"
                                            required
                                            className="w-full px-4 py-3 bg-white rounded-lg border-2 border-gray-200
                    outline-none focus:border-blue-500 transition-all duration-200 ease-in-out
                    shadow-sm hover:border-gray-300
                    text-gray-700 text-base
                    placeholder:text-gray-400
                    disabled:bg-gray-50 disabled:cursor-not-allowed
                    focus:ring-4 focus:ring-blue-100"
                                            value={newUser.password}
                                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                                        <select
                                            className="w-full px-4 py-3 bg-white rounded-lg border-2 border-gray-200
                    outline-none focus:border-blue-500 transition-all duration-200 ease-in-out
                    shadow-sm hover:border-gray-300
                    text-gray-700 text-base
                    placeholder:text-gray-400
                    disabled:bg-gray-50 disabled:cursor-not-allowed
                    focus:ring-4 focus:ring-blue-100"
                                            value={newUser.role}
                                            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                                        >
                                            {roles.map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex justify-end gap-4 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsAddModalOpen(false)}
                                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
            </div>
        </CRMLayout>
    );
};

export default UserManagement;