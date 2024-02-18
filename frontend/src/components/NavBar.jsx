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
                <li className='nav-item'>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <h1 className='title'>Float Note</h1>
                    </Link>
                </li>
                <div style={{ display: 'flex' }}>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <li className='nav-item' style={{ textDecoration: "none", color: "black", marginRight: '1rem' }}>About </li>
                        </Dialog.Trigger>
                        <AboutDialog />
                    </Dialog.Root>
                    <li className='nav-item'>
                        <Link to="/" style={{ textDecoration: "none", color: 'black', marginRight: '1rem' }}>
                            Account
                        </Link>
                    </li>
                    {user && <li className='nav-item' onClick={handleLogout}>Log Out</li>}
                    {!user &&
                        <li className='nav-item'>
                            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                                Log In
                            </Link>
                        </li>
                    }
                </div>
            </ul>
        </nav >
    )
}

export default NavBar