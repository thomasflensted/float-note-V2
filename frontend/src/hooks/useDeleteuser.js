import { useState } from 'react'
import { USER_URL } from '../urls';
import { useLogout } from '../hooks/useLogout'
import { useNotesContext } from '../hooks/useNotesContext';

export const useDeleteUser = () => {

    const [deleteError, setDeleteError] = useState('');
    const { logout } = useLogout();
    const { dispatch } = useNotesContext();

    const deleteUser = async (id, password) => {

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            setDeleteError("Something went wrong.");
            return null;
        }

        const response = await fetch(`${USER_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        })

        const data = await response.json();

        if (!response.ok) {
            setDeleteError(data.error);
            return null;
        } else {
            logout();
            dispatch({ type: "SET_NOTES", payload: [] });
        }
        return data;
    }

    return { deleteUser, deleteError };
}

export default useDeleteUser