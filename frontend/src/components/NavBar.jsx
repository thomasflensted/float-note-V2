// imports
import { Link } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

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
                        <h1 className='nav-title'>ProjecTiles</h1>
                    </Link>
                </li>
                <div className='nav-right-content'>
                    <Dialog.Root>
                        <Dialog.Trigger asChild><li className='nav-item'>About</li></Dialog.Trigger>
                        <AboutDialog />
                    </Dialog.Root>
                    {user &&
                        <DropdownMenu.Root modal={false}>
                            <DropdownMenu.Trigger asChild>
                                <li className='nav-item'>Account</li>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Portal>
                                <DropdownMenu.Content className="DropdownMenuContent" sideOffset={20} align="end" style={{ zIndex: zIndex + 1, marginRight: "1rem" }} >
                                    <DropdownMenu.Arrow className="DropdownMenuArrow" />
                                    <DropdownMenu.Item asChild className="DropdownMenuItem">
                                        <Link className='nav-item' to="/account">Settings</Link>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Separator className="DropdownMenuSeparator" />
                                    <DropdownMenu.Item onClick={handleLogout} className="DropdownMenuItem" style={{ color: "red" }}>Log Out</DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    }
                    {!user && <li><Link className='nav-item' to="/login" >Log In</Link></li>}
                </div>
            </ul>
        </nav >
    )
}

export default NavBar