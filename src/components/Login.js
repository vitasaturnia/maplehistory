import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase'; // Ensure the path is correct
import { Link, navigate } from 'gatsby';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!password) {
            setError('Please enter your password.');
            return;
        }

        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to the user's profile after successful login
            navigate('/myprofile');
        } catch (error) {
            console.error('Login error:', error);

            if (error.code === 'auth/wrong-password') {
                setError('Wrong password. Please try again.');
            } else if (error.code === 'auth/user-not-found') {
                setError('User not found.');
            } else {
                setError('An error occurred while logging in. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            setError('Please enter your email to reset your password.');
            return;
        }

        try {
            // Generate the password reset link
            await sendPasswordResetEmail(auth, email);

            // Inform the user that the password reset email has been sent
            setError('Password reset email sent. Check your inbox.');
        } catch (error) {
            console.error('Password reset error:', error);

            if (error.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else {
                setError('Password reset failed. Please check the email address.');
            }
        }
    };

    // Function to validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    return (
        <div className="centeredcontainer has-text-centered">
            <h1 className="title mb-2 has-text-warning">Login</h1>
            <Link to="/register">
                <p className="mb-3 subtitle is-5 has-text-warning is-italic">Don't have an account? Register here!</p>
            </Link>
            <form onSubmit={handleLogin}>
                <div>
                    <label className="mb-3 has-text-warning">Email:</label>
                    <br />
                    <input className="mt-1em mb-3 redinput" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="mb-3 mt-1em has-text-warning">Password:</label>
                    <br />
                    <input className="mt-1em redinput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />
                <button className="button is-warning is-outlined" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
            <p className="has-text-link mt-1em" style={{ cursor: 'pointer' }} onClick={handlePasswordReset}>
                Forgot your password? Reset it here.
            </p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
