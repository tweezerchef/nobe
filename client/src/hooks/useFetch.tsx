import { url } from "inspector";
import React, { useState } from "react";
import axios from "axios";


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
        let res;
        try {
            res = await axios(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({ credential: response.credential }),
            });
            setLoading(false);
            console.log(res);

            const data: ApiResponse = res.data;;
            console.log(data);

            if (data?.user) {
                await localStorage.setItem('user', JSON.stringify(data?.user));
                let user = await localStorage.getItem('user');
                console.log(user);
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