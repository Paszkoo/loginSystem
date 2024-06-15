import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message);
            setIsLoading(false);
            return;
        }
        dispatch({ type: 'LOGIN', payload: data });
        localStorage.setItem('user', JSON.stringify(data));
        setIsLoading(false);
    };

    return { login, isLoading, error };
};