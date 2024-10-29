// CourseCard Component
const CourseCard = ({title, image, type, date, progress}) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-1">{type}</p>
            <div className="flex items-center text-xs text-gray-500 mb-3">
                <span className="mr-2">●</span> Đang cập nhật
                <span className="mx-2">|</span>
                <span>{date}</span>
            </div>
            <div className="flex items-center">
                <div className="flex-grow bg-gray-200 rounded-full h-2 mr-2">
                    <div
                        className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                        style={{width: `${progress}%`}}
                    ></div>
                </div>
                <span className="text-xs text-gray-600">{progress}%</span>
            </div>
        </div>
    </div>
);

export default CourseCard