import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';

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
                {user && <li className='nav-item' onClick={handleLogout}>Log Out</li>}
                {!user &&
                    <li className='nav-item'>
                        <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                            Log In
                        </Link>
                    </li>
                }
            </ul>
        </nav >
    )
}

export default NavBar