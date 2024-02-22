import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import useUpdateUser from '../hooks/useUpdateUser';
import { useDeleteUser } from '../hooks/useDeleteuser';
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import Alert from './Alert';
import { userDeleteText } from './stringConstants';
import { deleteNotesDB } from '../api';

const Account = () => {

    const { user, userDispatch } = useAuthContext();
    const [typedPassword, setTypedPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('')
    const [newEmail, setNewEmail] = useState('')
    let { updateUser, error, isLoading, success } = useUpdateUser();
    const { deleteUser, deleteError } = useDeleteUser();

    useEffect(() => {
        setNewEmail(user.email)
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedEmail = await updateUser(user.email, newEmail, typedPassword, newPassword, newPasswordRepeat)
        if (!updatedEmail) return;
        userDispatch({ type: "LOGIN", payload: { ...user, email: updatedEmail } })
        localStorage.setItem('user', JSON.stringify({ ...user, email: updatedEmail }))
    }

    const handleDeleteUser = async () => {
        const result = await deleteUser(user._id, typedPassword);
        if (result) await deleteNotesDB(user)
    }

    return (
        <div className='note center-note account-note'>
            <div className='note-top center-note-top blue'>
                <h2 className='note-title'>{user.email}</h2>
            </div>
            <div className="note-text-container">
                <form className='vertical-form' autoComplete="off">
                    <div>
                        <label className='form-label'>Update email address:</label>
                        <input className='form-input auto-input' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className='form-label'>Update password:</label>
                        <input autoComplete="new-password" className='form-input auto-input' type='password' onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div>
                        <label className='form-label'>Repeat new password:</label>
                        <input autoComplete="new-password" className='form-input auto-input' type='password' onChange={(e) => setNewPasswordRepeat(e.target.value)} />
                    </div>
                    <div>
                        <label className='form-label'>Current password:</label>
                        <input className='form-input auto-input' type='password' onChange={(e) => setTypedPassword(e.target.value)} />
                    </div>
                </form>
                <button
                    disabled={isLoading}
                    className='btn btn-standard btn-100'
                    onClick={handleSubmit}>Save
                </button>
                <AlertDialog.Root>
                    <AlertDialog.Trigger className='btn btn-delete btn-100'>Delete Account</AlertDialog.Trigger>
                    <Alert text={userDeleteText} handleDelete={handleDeleteUser} />
                </AlertDialog.Root>
                {(error || deleteError) && <div className='error response'>{error || deleteError}</div>}
                {success && <div className='success response'>{success}</div>}
            </div >
        </div >
    )
}

export default Account
