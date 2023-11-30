import React, { useState } from 'react';
import { useAuth } from '../context/Authcontext'; // Adjust the path as per your project structure
import { Link, navigate } from 'gatsby';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { signUp } = useAuth(); // Using signUp from context


    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please enter all fields.');
            return;
        }

        try {
            await signUp( email, password);
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            console.error('Sign up error:', error);
            setError(error.message);
        }
    };

    return (
        <div className="centeredcontainer has-text-centered">
            <h1 className="title mb-2 has-text-warning">Register</h1>
            <Link to="/login">
                <p className="mb-3 subtitle is-5 has-text-warning is-italic">Already a member? Login instead!</p>
            </Link>
            <form onSubmit={handleSignUp}>
                <div>
                    <label className="mb-3 has-text-warning">Email:</label>
                    <br />
                    <input className="mt-1em mb-3 redinput" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label className="mb-3 mt-1em has-text-warning">Password:</label>
                    <br />
                    <input className="mt-1em redinput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <br />
                <button className="button is-warning is-outlined" type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
