import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { Calendar, Clock, Target, Award, BookOpen, Search,ChevronLeft ,ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import axios from "axios";

const TestHistory = ({ userId }) => {
    const [testResults, setTestResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const paginationOptions = [10, 25, 50, 100];

    // Get paginated data
    const getPaginatedData = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredResults.slice(indexOfFirstItem, indexOfLastItem);
    };

    // Calculate total pages
    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

    // Reset to first page when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const getAuthConfig = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    });

    // Function to convert seconds to minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (minutes === 0) {
            return `${remainingSeconds} giây`;
        }
        return `${minutes} phút ${remainingSeconds} giây`;
    };

    // Function to convert seconds to minutes for calculations
    const secondsToMinutes = (seconds) => {
        return seconds / 60;
    };

    useEffect(() => {
        const fetchTestResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/test-results/user`, getAuthConfig());
                const data = await response.data;
                setTestResults(data);
                setFilteredResults(data);
            } catch (error) {
                console.error('Error fetching test results:', error);
            }
        };

        fetchTestResults();
    }, [userId]);

    // Calculate statistics
    const calculateStats = () => {
        const totalTests = filteredResults.length;
        const averageScore = filteredResults.reduce((acc, test) => acc + test.score, 0) / totalTests;
        const totalTime = filteredResults.reduce((acc, test) => acc + test.timeTaken, 0);
        const perfectScores = filteredResults.filter(test => test.score === 100).length;

        return {
            totalTests,
            averageScore: averageScore.toFixed(1),
            totalTime,
            perfectScores
        };
    };

    // Prepare chart data with converted time
    const prepareScoreData = () => {
        return filteredResults
            .slice(-10)
            .map(test => ({
                name: format(new Date(test.completedAt), 'HH:mm'),
                score: test.score,
                time: secondsToMinutes(test.timeTaken).toFixed(1) // Convert to minutes for chart
            }));
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        const filtered = testResults.filter(test =>
            test.testName.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredResults(filtered);
    };

    const stats = calculateStats();

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Lịch sử làm bài</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài test..."
                            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Tổng số bài test</p>
                                <p className="text-2xl font-bold">{stats.totalTests}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Target className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Điểm trung bình</p>
                                <p className="text-2xl font-bold">{stats.averageScore}%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <Award className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Điểm tuyệt đối</p>
                                <p className="text-2xl font-bold">{stats.perfectScores}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Clock className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Tổng thời gian</p>
                                <p className="text-2xl font-bold">{formatTime(stats.totalTime)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4">Biểu đồ kết quả</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={prepareScoreData()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#3b82f6"
                                    name="Điểm số"
                                    strokeWidth={2}
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="time"
                                    stroke="#10b981"
                                    name="Thời gian (phút)"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Test List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên bài test</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điểm số</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hoàn thành</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {getPaginatedData().map((test) => (
                                <tr key={test.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{test.testName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{formatTime(test.timeTaken)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            test.score >= 80 ? 'bg-green-100 text-green-800' :
                                                test.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                        }`}>
                                            {test.score}%
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(new Date(test.completedAt), 'dd/MM/yyyy HH:mm')}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Controls */}
                    <div className="px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="border rounded-lg px-2 py-1 text-sm focus:ring-2
                                    focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {paginationOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option} / trang
                                        </option>
                                    ))}
                                </select>
                                <span className="text-sm text-gray-600">
                                    Hiển thị {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredResults.length)} trong số {filteredResults.length} kết quả
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg transition-colors ${
                                        currentPage === 1
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>

                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    if (
                                        pageNumber === 1 ||
                                        pageNumber === totalPages ||
                                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setCurrentPage(pageNumber)}
                                                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                                    currentPage === pageNumber
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                                        return <span key={pageNumber} className="px-2 text-gray-400">...</span>;
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg transition-colors ${
                                        currentPage === totalPages
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestHistory;