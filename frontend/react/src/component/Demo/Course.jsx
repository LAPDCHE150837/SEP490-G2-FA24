import React, { useState, useEffect } from 'react';

const CourseProgress = ({ courseId, modules }) => {
    // State to keep track of completed modules
    const [completedModules, setCompletedModules] = useState([]);

    // Initialize state from saved progress (e.g., localStorage or API)
    useEffect(() => {
        const savedProgress = localStorage.getItem(`progress_${courseId}`);
        if (savedProgress) {
            setCompletedModules(JSON.parse(savedProgress));
        }
    }, [courseId]);

    // Handle module completion toggle
    const toggleModuleCompletion = (moduleId) => {
        setCompletedModules((prevCompletedModules) => {
            const isCompleted = prevCompletedModules.includes(moduleId);
            const newCompletedModules = isCompleted
                ? prevCompletedModules.filter((id) => id !== moduleId)
                : [...prevCompletedModules, moduleId];

            // Save to localStorage or update via API
            localStorage.setItem(`progress_${courseId}`, JSON.stringify(newCompletedModules));
            return newCompletedModules;
        });
    };

    // Calculate progress percentage
    const progressPercentage = Math.round(
        (completedModules.length / modules.length) * 100
    );

    return (
        <div>
            <h2>Course Progress</h2>
            <p>Course ID: {courseId}</p>
            <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '8px' }}>
                <div
                    style={{
                        width: `${progressPercentage}%`,
                        height: '20px',
                        backgroundColor: '#4caf50',
                        borderRadius: '8px',
                    }}
                ></div>
            </div>
            <p>{progressPercentage}% completed</p>

            <ul>
                {modules.map((module) => (
                    <li key={module.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={completedModules.includes(module.id)}
                                onChange={() => toggleModuleCompletion(module.id)}
                            />
                            {module.name}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseProgress;