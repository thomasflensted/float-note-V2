import { useState } from 'react'
import { USER_URL } from '../urls';

export const useUpdateUser = () => {

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const updateUser = async (email, newEmail, typedPassword, newPassword, newPasswordRepeat) => {
        setIsLoading(true);
        setError('');

        if (newPassword !== newPasswordRepeat) {
            setIsLoading(false);
            setError("New passwords are not matching.")
            return null;
        }

        if (!newPassword && (newEmail === email || !newEmail)) {
            setIsLoading(false);
            setError("No changes to save.");
            return null;
        }

        const response = await fetch(`${USER_URL}/update`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newEmail, newPassword, typedPassword })
        })

        const data = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(data.error);
            return;
        } else {
            setIsLoading(false);
            setSuccess(data.message);
        }
        return data.updatedUser.email;
    }

    return { updateUser, error, isLoading, success };
}

export default useUpdateUser