import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../hooks/useSignup';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
    }

    return (
        <div className='note login-note'>
            <div className='note-top loading-note-top'>
                <h2 className='note-title'>Sign Up</h2>
            </div>
            <div className="note-text-container">
                <form className='login-form' action="" onSubmit={(e) => handleSubmit(e)} id='login-form'>
                    <div>
                        <label className='login-label' htmlFor="email">Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} className='login-input' type="text" id="email" />
                    </div>
                    <div>
                        <label className='login-label' htmlFor="pw">Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} className='login-input' type="password" name="" id="pw" />
                    </div>
                    <button style={{ marginTop: ".5rem", marginBottom: "1rem" }} disabled={isLoading} className='login-btn login-input'>Sign Up</button>
                </form>
                <Link className='switch-login-text' to="/login">Already Have An Account?</Link>
                {error &&
                    <div className='login-error-container'>
                        <p className='login-error'>{error}</p>
                    </div>
                }
            </div >
        </div >
    )
}

export default Signup