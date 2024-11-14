
import React, { createContext, useState, useContext, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};

export const ProgressProvider = ({ children }) => {
    const [progressData, setProgressData] = useState(() => {
        try {
            const savedProgress = localStorage.getItem('japaneseProgress');
            const parsedProgress = savedProgress ? JSON.parse(savedProgress) : null;
            return parsedProgress || {
                scores: {},
                attempts: {},
                streaks: {},
                lastPracticed: {}
            };
        } catch (error) {
            console.error('Error loading progress:', error);
            return {
                scores: {},
                attempts: {},
                streaks: {},
                lastPracticed: {}
            };
        }
    });

    const getCharacterStats = (character) => {
        if (!character) return null;

        return {
            bestScore: progressData.scores[character] || 0,
            attempts: progressData.attempts[character] || [],
            streak: progressData.streaks[character] || 0,
            lastPracticed: progressData.lastPracticed[character] || null
        };
    };

    useEffect(() => {
        try {
            localStorage.setItem('japaneseProgress', JSON.stringify(progressData));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }, [progressData]);

    const updateProgress = (character, score, transcript) => {
        setProgressData(prev => {
            const currentAttempts = prev.attempts[character] || [];
            const newAttempt = {
                transcript,
                score,
                date: new Date().toISOString()
            };

            return {
                scores: {
                    ...prev.scores,
                    [character]: Math.max(score, prev.scores[character] || 0)
                },
                attempts: {
                    ...prev.attempts,
                    [character]: [...currentAttempts, newAttempt].slice(-5) // Keep last 5 attempts
                },
                streaks: {
                    ...prev.streaks,
                    [character]: score >= 80 ? (prev.streaks[character] || 0) + 1 : 0
                },
                lastPracticed: {
                    ...prev.lastPracticed,
                    [character]: new Date().toISOString()
                }
            };
        });
    };



    const value = {
        updateProgress,
        getCharacterStats
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};

export default ProgressProvider;
