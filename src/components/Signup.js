import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Ensure the path is correct
import { navigate } from 'gatsby';
import { Link } from "gatsby";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/'); // Redirect to home page or dashboard after sign up
        } catch (error) {
            console.error('Sign up error:', error);
            setError('Sign up failed. ' + error.message);
        }
    };

    return (
        <div className="centeredcontainer has-text-centered">
            <h1 className="title has-text-warning">Sign Up</h1>
            <Link to="/register">
                <p className="subtitle is-5 has-text-warning is-italic">Already a member? Sign in instead!</p>
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

export default SignUp;
