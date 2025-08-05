import { useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
}

function buildHeaders(extraHeaders: Record<string, string> = {}) {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...extraHeaders,
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

export function useApi() {
    const get = useCallback(
        async (
            endpoint: string,
            options: {
                headers?: Record<string, string>;
                [key: string]: any;
            } = {}
        ) => {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'GET',
                headers: buildHeaders(options.headers),
                ...options,
            });
            return res.json();
        },
        []
    );

    const post = useCallback(
        async (
            endpoint: string,
            body: any = {},
            options: {
                headers?: Record<string, string>;
                [key: string]: any;
            } = {}
        ) => {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: buildHeaders(options.headers),
                body: JSON.stringify(body),
                ...options,
            });
            return res.json();
        },
        []
    );

    return { get, post };
}
