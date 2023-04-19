import { url } from "inspector";
import React, { useState } from "react";


interface Response {
    credential: string;
}

interface User {
    name: string;
    email: string;
    // ... other user properties
}

interface ApiResponse {
    user?: User;
    message?: string;
}

const useFetch = (url: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogle = async (response: Response) => {
        setLoading(true);
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credential: response.credential }),
            });
            setLoading(false);

            const data: ApiResponse = await res.json();

            if (data?.user) {
                localStorage.setItem('user', JSON.stringify(data?.user));
                window.location.reload();
            } else {
                throw new Error(data?.message || 'error');
            }
        } catch (error) {
            if (error instanceof Error && error.message) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return { loading, error, handleGoogle };
};

export default useFetch;