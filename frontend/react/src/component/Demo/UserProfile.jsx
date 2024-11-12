import React, { useState } from 'react';
import { User, Bell, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [isEdit, setIsEdit] = useState(false); // Quản lý trạng thái chỉnh sửa
    const [userData, setUserData] = useState({
        avatarUrl: 'https://via.placeholder.com/150',
        username: 'xuanduong',
        email: 'tranduongw@gmail.com',
        phone: '0917741973',
        address: 'Hoàng Liệt, Hoàng Mai, Hà Nội',
    });
    const navigate = useNavigate();

    // Hàm cập nhật thông tin người dùng khi chỉnh sửa
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Hàm xử lý nút Save Changes
    const handleSaveChanges = () => {
        setIsEdit(false); // Đóng chế độ chỉnh sửa sau khi lưu
        console.log('Updated data', userData); // In ra thông tin đã thay đổi
    };
    /*This is how you comment in reactjs*/
    const handleBack = () => {
        navigate('/dashboard'); // Điều hướng về dashboard khi nhấn nút quay lại
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <div className="course-sidebar bg-gray-900 text-white w-64 p-6">
                <button
                    onClick={handleBack}
                    className="mb-4 text-sm text-blue-500 hover:underline"
                >
                    &larr; Back to Dashboard
                </button>
            </div>
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button className="lg:hidden">
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl font-semibold">Trang chủ / <span className="text-cyan-500">User Profile</span></h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition duration-150">
                            <Bell size={20} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition duration-150">
                            <User size={20} />
                        </button>
                    </div>
                </header>

                {/* Nội dung User Profile */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-center mb-4">
                            <img
                                src={userData.avatarUrl}
                                alt={`${userData.username}'s avatar`}
                                className="w-32 h-32 rounded-full"
                            />
                        </div>

                        <h3 className="text-2xl font-semibold text-center">{userData.username}</h3>
                        <p className="text-center text-gray-500">{userData.email}</p>

                        <div className="mt-6 space-y-4">
                            <div>
                                <strong>Phone: </strong>
                                {isEdit ? (
                                    <input
                                        type="text"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <span>{userData.phone}</span>
                                )}
                            </div>
                            <div>
                                <strong>Address: </strong>
                                {isEdit ? (
                                    <input
                                        type="text"
                                        name="address"
                                        value={userData.address}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <span>{userData.address}</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                onClick={isEdit ? handleSaveChanges : () => setIsEdit(true)}
                                className="bg-green-500 text-white p-2 rounded-md"
                            >
                                {isEdit ? 'Save Changes' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserProfile;
