const CourseCard = ({ title, type, image, date, progress, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <img src={image} alt={title} className="w-full h-48 object-cover rounded mb-4"/>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{type}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    onClick={onEdit}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default CourseCard;