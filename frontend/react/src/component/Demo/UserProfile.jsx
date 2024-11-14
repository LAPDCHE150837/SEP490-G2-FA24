// import React, { useState } from 'react';
// import { User, Bell, Menu } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
//
// const UserProfile = () => {
//     const [isEdit, setIsEdit] = useState(false);
//     const [userData, setUserData] = useState({
//         avatarUrl: 'https://via.placeholder.com/150',
//         username: 'xuanduong',
//         email: 'tranduongw@gmail.com',
//         phone: '0917741973',
//         address: 'Hoàng Liệt, Hoàng Mai, Hà Nội',
//         courses: ['Khóa học N5 - Bắt đầu với tiếng Nhật', 'Khóa học N4 - Nâng cao cơ bản', 'Khóa học N3 - Trung cấp'],
//     });
//     const navigate = useNavigate();
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };
//
//     const handleSaveChanges = () => {
//         setIsEdit(false);
//         console.log('Thông tin đã được cập nhật', userData);
//     };
//
//     const handleBack = () => {
//         navigate('/dashboard');
//     };
//
//     const handleChangePassword = () => {
//         alert('Mở màn hình đổi mật khẩu');
//         navigate('/reset');
//     };
//
//     return (
//         <div className="flex bg-gray-100 min-h-screen">
//             <div className="course-sidebar bg-gray-900 text-white w-64 p-6">
//                 <button
//                     onClick={handleBack}
//                     className="mb-4 text-sm text-blue-500 hover:underline"
//                 >
//                     &larr; Back to Dashboard
//                 </button>
//             </div>
//             <div className="flex-1 flex flex-col">
//                 <header className="bg-white shadow-sm p-4 flex justify-between items-center">
//                     <div className="flex items-center space-x-4">
//                         <button className="lg:hidden">
//                             <Menu size={24} />
//                         </button>
//                         <h2 className="text-xl font-semibold">Trang chủ / <span className="text-cyan-500">User Profile</span></h2>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <button className="p-2 hover:bg-gray-100 rounded-full transition duration-150">
//                             <Bell size={20} />
//                         </button>
//                         <button className="p-2 hover:bg-gray-100 rounded-full transition duration-150">
//                             <User size={20} />
//                         </button>
//                     </div>
//                 </header>
//
//                 <main className="flex-1 p-6 overflow-y-auto">
//                     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//                         <div className="flex justify-center mb-4">
//                             <img
//                                 src={userData.avatarUrl}
//                                 alt={`${userData.username}'s avatar`}
//                                 className="w-32 h-32 rounded-full"
//                             />
//                         </div>
//
//                         <h3 className="text-2xl font-semibold text-center">{userData.username}</h3>
//                         <p className="text-center text-gray-500">{userData.email}</p>
//
//                         <div className="mt-6 space-y-4">
//                             <div>
//                                 <strong>Số điện thoại: </strong>
//                                 {isEdit ? (
//                                     <input
//                                         type="text"
//                                         name="phone"
//                                         value={userData.phone}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 mt-2 border border-gray-300 rounded-md"
//                                     />
//                                 ) : (
//                                     <span>{userData.phone}</span>
//                                 )}
//                             </div>
//                             <div>
//                                 <strong>Địa chỉ: </strong>
//                                 {isEdit ? (
//                                     <input
//                                         type="text"
//                                         name="address"
//                                         value={userData.address}
//                                         onChange={handleInputChange}
//                                         className="w-full p-2 mt-2 border border-gray-300 rounded-md"
//                                     />
//                                 ) : (
//                                     <span>{userData.address}</span>
//                                 )}
//                             </div>
//                         </div>
//
//                         <div className="mt-6">
//                             <h4 className="font-semibold text-lg">Khoá học của tôi</h4>
//                             <ul className="list-disc pl-5 mt-2">
//                                 {userData.courses.map((course, index) => (
//                                     <li key={index} className="text-gray-700">
//                                         {course}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//
//                         {/* Nút chỉnh sửa và đổi mật khẩu */}
//                         <div className="mt-6 flex justify-center space-x-4">
//                             <button
//                                 onClick={isEdit ? handleSaveChanges : () => setIsEdit(true)}
//                                 className="bg-green-500 text-white py-3 px-6 rounded-md text-lg"
//                             >
//                                 {isEdit ? 'Lưu thay đổi' : 'Chỉnh sửa thông tin'}
//                             </button>
//                             <button
//                                 onClick={handleChangePassword}
//                                 className="bg-blue-500 text-white py-3 px-6 rounded-md text-lg"
//                             >
//                                 Đổi mật khẩu
//                             </button>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };
//
// export default UserProfile;
