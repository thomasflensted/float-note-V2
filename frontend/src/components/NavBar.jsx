// imports
import { Link } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog';

// contexts and hooks
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';

// components
import AboutDialog from './AboutDialog';

const NavBar = ({ zIndex }) => {

    const { logout } = useLogout();
    const { user } = useAuthContext();
    const { dispatch } = useNotesContext();

    const handleLogout = () => {
        logout();
        dispatch({ type: "SET_NOTES", payload: [] });
    }

    return (
        <nav>
            <ul className='navbar' style={{ zIndex: zIndex }}>
                <li>
                    <Link className='nav-item' to="/">
                        <h1 className='nav-title'>Float Note</h1>
                    </Link>
                </li>
                <div className='nav-right-content'>
                    <Dialog.Root>
                        <Dialog.Trigger asChild><li className='nav-item'>About</li></Dialog.Trigger>
                        <AboutDialog />
                    </Dialog.Root>
                    {user && <li><Link className='nav-item' to="/account">Account</Link></li>}
                    {user && <li className='nav-item' onClick={handleLogout}>Log Out</li>}
                    {!user && <li><Link className='nav-item' to="/login" >Log In</Link></li>}
                </div>
            </ul>
        </nav >
    )
}

export default NavBar