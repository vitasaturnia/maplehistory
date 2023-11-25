import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Ensure the path is correct
import { Link } from "gatsby";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setIsRegistered(true);
        } catch (error) {
            console.error('Sign up error:', error);
            setError('Sign up failed. ' + error.message);
        }
    };

    if (isRegistered) {
        return (
            <div className="centeredcontainer has-text-centered">
                <div className="">
                <h1 className="title has-text-warning">Registration Complete</h1>
                <p className="subtitle is-italic has-text-warning is-5">Please check your inbox for the confirmation link.</p>
                <Link to="/login" className="button is-warning is-outlined">
                    Go to Login
                </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="centeredcontainer has-text-centered">
            <h1 className="title has-text-warning">Register</h1>
            <Link to="/login">
                <p className="subtitle is-5 has-text-warning is-italic">Already a member? Login instead!</p>
            </Link>
            <form onSubmit={handleSignUp}>
                <div>
                    <label className="has-text-warning">Email:</label>
                    <br/>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="has-text-warning">Password:</label>
                    <br/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br/>
                <button className="button is-warning is-outlined" type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
