import React from 'react'
const NavBar = ({ zIndex }) => {
    return (
        <nav>
            <ul className='navbar' style={{ zIndex: zIndex }}>
                <li className='nav-item'>
                    <h1 className='title'>Float Note</h1>
                </li>
                <li className='nav-item'>
                    Log In
                </li>
            </ul>
        </nav >
    )
}

export default NavBar