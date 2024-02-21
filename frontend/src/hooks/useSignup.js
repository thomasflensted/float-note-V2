import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { USER_URL } from '../urls';

export const useSignup = () => {

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { userDispatch } = useAuthContext();

    const signup = async (email, password, passwordRepeat) => {
        setIsLoading(true);
        setError('');

        if (password !== passwordRepeat) {
            setError("Passwords are not identical");
            setIsLoading(false);
            return { signup, error, isLoading };
        }

        const response = await fetch(`${USER_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            localStorage.setItem("user", JSON.stringify(json))
            userDispatch({ type: "LOGIN", payload: json });
            setIsLoading(false);
        }
    }
    return { signup, error, isLoading };
}

export default useSignup