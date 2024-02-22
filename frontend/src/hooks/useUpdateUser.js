import { useState } from 'react'
import { USER_URL } from '../urls';

export const useUpdateUser = () => {

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const resetResponse = () => {
        setTimeout(() => {
            setError('')
            setSuccess('')
        }, 5000);
    }

    const updateUser = async (email, newEmail, typedPassword, newPassword, newPasswordRepeat) => {
        setIsLoading(true);
        setError('');

        if (newPassword !== newPasswordRepeat) {
            setIsLoading(false);
            setError("New passwords are not matching.")
            resetResponse()
            return null;
        }

        if (!newPassword && (newEmail === email || !newEmail)) {
            setIsLoading(false);
            setError("No changes to save.");
            resetResponse()
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
            resetResponse()
            return;
        } else {
            setIsLoading(false);
            setSuccess(data.message);
            resetResponse()
        }
        return data.updatedUser.email;
    }

    return { updateUser, error, isLoading, success };
}

export default useUpdateUser