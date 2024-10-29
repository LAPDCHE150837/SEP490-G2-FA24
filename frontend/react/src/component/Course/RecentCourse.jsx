// RecentCourse Component
const RecentCourse = ({ title, status }) => (
    <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-3 hover:shadow-md transition duration-300">
        <span className="text-cyan-500 text-2xl">📘</span>
        <div>
            <p className="font-semibold text-sm">{title}</p>
            <p className="text-xs text-cyan-500">{status}</p>
        </div>
    </div>
);

export default RecentCourse