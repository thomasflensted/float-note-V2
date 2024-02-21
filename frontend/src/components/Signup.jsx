// imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// contexts and hooks
import useSignup from '../hooks/useSignup';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const { signup, error, isLoading } = useSignup();;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password, passwordRepeat);
    }

    return (
        <div className='note center-note'>
            <div className='note-top center-note-top yellow'>
                <h2 className='note-title'>Sign Up</h2>
            </div>
            <div className="note-text-container">
                <form className='vertical-form' action="" onSubmit={(e) => handleSubmit(e)} id='login-form'>
                    <div>
                        <label className='form-label' htmlFor="email">Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} className='form-input block-input' type="text" id="email" />
                    </div>
                    <div>
                        <label className='form-label' htmlFor="pw">Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} className='form-input block-input' type="password" name="" id="pw" />
                    </div>
                    <div>
                        <label className='form-label' htmlFor="pw">Repeat password:</label>
                        <input onChange={(e) => setPasswordRepeat(e.target.value)} className='form-input block-input' type="password" name="" id="pw" />
                    </div>
                    <button disabled={isLoading} className='btn btn-standard'>Sign Up</button>
                </form>
                <Link className='form-redirect-text' to="/login">Already Have An Account?</Link>
                {error && <div className='error response'>{error}</div>}
            </div >
        </div >
    )
}

export default Signup