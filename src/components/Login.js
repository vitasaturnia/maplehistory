import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase'; // Ensure the path is correct
import { Link } from "gatsby";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showReset, setShowReset] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setShowReset(false);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/myprofile/'); // Redirect to /myprofile/ after successful login
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials.');
            if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-login-credentials') {
                setShowReset(true);
            }
        }
    };

    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent. Check your inbox.');
        } catch (error) {
            console.error('Password reset error:', error);
            alert('Failed to send password reset email. Make sure your email is correct.');
        }
    };

    return (
        <div className="centeredcontainer has-text-centered">
            <h1 className="title has-text-warning">Sign in</h1>
            <Link to="/register">
                <p className="subtitle is-5 has-text-warning is-italic">Not a member yet? Sign up now!</p>
            </Link>

            <form onSubmit={handleLogin}>
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
                <button className="button is-warning is-outlined" type="submit">Login</button>
                {showReset && <p><a href="#!" onClick={handlePasswordReset}>Reset Password</a></p>}
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
