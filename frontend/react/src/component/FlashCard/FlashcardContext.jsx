// src/context/FlashcardContext.jsx
import { createContext, useContext, useState, useReducer } from 'react';

const FlashcardContext = createContext();

const initialState = {
    sets: [],
    currentSet: null,
    loading: false,
    error: null
};

function flashcardReducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: true };
        case 'SET_SETS':
            return { ...state, sets: action.payload, loading: false };
        case 'SET_CURRENT_SET':
            return { ...state, currentSet: action.payload, loading: false };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

export function FlashcardProvider({ children }) {
    const [state, dispatch] = useReducer(flashcardReducer, initialState);

    // Later these will interact with your Spring Boot backend
    const createSet = async (setData) => {
        try {
            dispatch({ type: 'SET_LOADING' });
            // For now, just update local state
            dispatch({
                type: 'SET_SETS',
                payload: [...state.sets, { id: Date.now(), ...setData }]
            });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', error: error.message });
        }
    };

    const value = {
        ...state,
        createSet,
        // Add more methods as needed
    };

    return (
        <FlashcardContext.Provider value={value}>
            {children}
        </FlashcardContext.Provider>
    );
}

export const useFlashcards = () => {
    const context = useContext(FlashcardContext);
    if (!context) {
        throw new Error('useFlashcards must be used within a FlashcardProvider');
    }
    return context;
};