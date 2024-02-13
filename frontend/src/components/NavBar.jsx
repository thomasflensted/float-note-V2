import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = ({ zIndex }) => {
    return (
        <nav>
            <ul className='navbar' style={{ zIndex: zIndex }}>
                <li className='nav-item'>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <h1 className='title'>Float Note</h1>
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                        Log In
                    </Link>
                </li>
            </ul>
        </nav >
    )
}

export default NavBar