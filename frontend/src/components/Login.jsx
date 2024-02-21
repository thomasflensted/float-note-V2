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
        <div className='note center-note'>
            <div className='note-top center-note-top blue'>
                <h2 className='note-title'>Log In</h2>
            </div>
            <div className="note-text-container">
                <form className='vertical-form' action="" onSubmit={(e) => handleSubmit(e)} id='login-form'>
                    <div>
                        <label className='form-label' htmlFor="email">Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} className='form-input block-input' type="text" id="email" />
                    </div>
                    <div>
                        <label className='form-label' htmlFor="pw">Repeat:</label>
                        <input onChange={(e) => setPassword(e.target.value)} className='form-input block-input' type="password" name="" id="pw" />
                    </div>
                    <button disabled={isLoading} className='btn btn-standard'>Log In</button>
                </form>
                <Link className='form-redirect-text' to="/signup">New User? Sign Up Here</Link>
                {error && <div className='error response'>{error}</div>}
            </div >
        </div >
    )
}

export default Login