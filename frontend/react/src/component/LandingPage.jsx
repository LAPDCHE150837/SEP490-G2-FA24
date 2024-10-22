import React from 'react';
import { ChevronRight, BookOpen, Globe, Sparkles } from 'lucide-react';

const LandingPage = () => {
    const handleLogin = () => {
        window.location.href = '/login';
    };
    return (
        <div className="bg-gradient-to-b from-[#40E0D0] to-white min-h-screen font-sans">
            <header className="bg-white bg-opacity-90 backdrop-blur-md shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-[#40E0D0]">NihonGo!</h1>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8">
                            {['Trang chủ', 'Khóa học', 'Về chúng tôi', 'Liên hệ'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-700 hover:text-[#40E0D0] transition duration-300">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <button className="bg-[#40E0D0] text-white px-4 py-2 rounded-full hover:bg-[#3BC0B0] transition duration-300" onClick={handleLogin}>

                        Đăng nhập
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16">
                <section className="text-center mb-24">
                    <h2 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
                        Khám Phá Tiếng Nhật Cùng NihongoMaster
                    </h2>
                    <p className="text-xl text-gray-800 mb-12 max-w-2xl mx-auto">
                        Hành trình học tiếng Nhật của bạn bắt đầu ở đây. Phương pháp học hiệu quả, linh hoạt và thú vị
                        cho mọi cấp độ.
                    </p>
                    <a href="#"
                       className="inline-flex items-center bg-white text-[#40E0D0] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#40E0D0] hover:text-white transition duration-300 shadow-lg hover:shadow-xl">
                        Bắt đầu học ngay
                        <ChevronRight className="ml-2" size={20}/>
                    </a>
                </section>


                <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                    {[
                        {
                            icon: BookOpen,
                            title: 'Học mọi lúc, mọi nơi',
                            desc: 'Truy cập bài học linh hoạt từ mọi thiết bị, phù hợp với lịch trình bận rộn của bạn.'
                        },
                        {
                            icon: Globe,
                            title: 'Bài học tương tác',
                            desc: 'Tham gia các bài tập tương tác và trò chơi học tập thú vị để nâng cao kỹ năng của bạn.'
                        },
                        {
                            icon: Globe,
                            title: 'Bài học tương tác',
                            desc: 'Tham gia các bài tập tương tác và trò chơi học tập thú vị để nâng cao kỹ năng của bạn.'
                        }
                    ].map((feature, index) => (
                        <div key={index}
                             className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                            <feature.icon className="text-[#40E0D0] mb-4" size={48}/>
                            <h3 className="text-2xl font-semibold text-[#40E0D0] mb-4">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </section>




                <section className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-12 text-center shadow-xl">
                    <Sparkles className="text-[#40E0D0] mx-auto mb-6" size={48}/>
                    <h2 className="text-3xl font-bold text-[#40E0D0] mb-6">Sẵn sàng cho cuộc phiêu lưu ngôn ngữ?</h2>
                    <p className="text-xl text-gray-700 mb-8">Đăng ký ngay hôm nay và nhận 7 ngày dùng thử miễn phí!</p>
                    <a href="/register"
                       className="inline-flex items-center bg-[#40E0D0] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#3BC0B0] transition duration-300 shadow-lg hover:shadow-xl">
                        Đăng ký ngay
                        <ChevronRight className="ml-2" size={20}/>
                    </a>
                </section>
            </main>

            <footer className="bg-[#40E0D0] text-white text-center p-8 mt-24">
                <p className="mb-4">&copy; 2024 NihongoMaster. Tất cả quyền được bảo lưu.</p>
                <div className="flex justify-center space-x-4">
                    {['Điều khoản sử dụng', 'Chính sách bảo mật', 'Liên hệ'].map((item) => (
                        <a key={item} href="#" className="hover:text-[#3BC0B0] transition duration-300">{item}</a>
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;