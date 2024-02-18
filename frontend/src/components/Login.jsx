// Imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Components
import useLogin from '../hooks/useLogin';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <div className='note login-note'>
            <div className='note-top loading-note-top'>
                <h2 className='note-title'>Log In</h2>
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
                    <button style={{ marginTop: ".5rem", marginBottom: "1rem" }} disabled={isLoading} className='login-btn login-input'>Log In</button>
                </form>
                <Link className='switch-login-text' to="/signup">New User? Sign Up Here</Link>
                {error &&
                    <div className='login-error-container'>
                        <p className='login-error'>{error}</p>
                    </div>
                }
            </div >
        </div >
    )
}

export default Login