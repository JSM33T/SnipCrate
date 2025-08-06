'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of user data
export interface UserProfile {
    id?: string;
    name: string;
    email: string;
    designation: string;
    avatar?: string;
    isAuthenticated: boolean;
}

// Define the initial state
interface UserState {
    user: UserProfile | null;
    isLoading: boolean;
    error: string | null;
}

// Define action types
type UserAction =
    | { type: 'LOGIN_START' }
    | { type: 'LOGIN_SUCCESS'; payload: UserProfile }
    | { type: 'LOGIN_ERROR'; payload: string }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
    | { type: 'CLEAR_ERROR' };

// Define the context type
interface UserContextType {
    state: UserState;
    login: (userData: UserProfile) => void;
    logout: () => void;
    updateProfile: (updates: Partial<UserProfile>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
    clearError: () => void;
}

// Initial state
const initialState: UserState = {
    user: null,
    isLoading: false,
    error: null,
};

// Reducer function
function userReducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
    case 'LOGIN_START':
        return {
            ...state,
            isLoading: true,
            error: null,
        };
    case 'LOGIN_SUCCESS':
        return {
            ...state,
            user: { ...action.payload, isAuthenticated: true },
            isLoading: false,
            error: null,
        };
    case 'LOGIN_ERROR':
        return {
            ...state,
            user: null,
            isLoading: false,
            error: action.payload,
        };
    case 'LOGOUT':
        return {
            ...state,
            user: null,
            isLoading: false,
            error: null,
        };
    case 'UPDATE_PROFILE':
        return {
            ...state,
            user: state.user ? { ...state.user, ...action.payload } : null,
        };
    case 'CLEAR_ERROR':
        return {
            ...state,
            error: null,
        };
    default:
        return state;
    }
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [state, dispatch] = useReducer(userReducer, initialState);

    // Action creators
    const login = (userData: UserProfile) => {
        dispatch({ type: 'LOGIN_START' });
        try {
            // Here you would typically make an API call to authenticate
            // For now, we'll just simulate a successful login
            dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
        } catch (error) {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: error instanceof Error ? error.message : 'Login failed'
            });
        }
    };

    const logout = () => {
        // Here you would typically make an API call to logout
        // Clear any stored tokens, etc.
        dispatch({ type: 'LOGOUT' });
    };

    const updateProfile = (updates: Partial<UserProfile>) => {
        dispatch({ type: 'UPDATE_PROFILE', payload: updates });
    };

    const setLoading = (loading: boolean) => {
        if (loading) {
            dispatch({ type: 'LOGIN_START' });
        }
    };

    const setError = (error: string) => {
        dispatch({ type: 'LOGIN_ERROR', payload: error });
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    const value: UserContextType = {
        state,
        login,
        logout,
        updateProfile,
        setLoading,
        setError,
        clearError,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook to use the user context
export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

// Hook for easy access to user data
export function useUserData() {
    const { state } = useUser();
    return state.user;
}

// Hook for authentication status
export function useAuth() {
    const { state } = useUser();
    return {
        isAuthenticated: state.user?.isAuthenticated ?? false,
        isLoading: state.isLoading,
        error: state.error,
    };
}
