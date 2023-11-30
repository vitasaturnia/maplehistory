import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import { useAuth } from '../context/Authcontext'; // Ensure the path is correct

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth(); // Destructure signIn from useAuth

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!isValidPassword(password)) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);

        try {
            await signIn(email, password);
            navigate('/myprofile'); // Redirect to the user's profile after successful login
        } catch (error) {
            handleError(error); // Enhanced error handling
        } finally {
            setLoading(false);
        }
    };

    // Function to validate email format
    const isValidEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

    // Function to validate password
    const isValidPassword = (password) => password.length >= 8;

    // Enhanced error handling function
    const handleError = (error) => {
        console.error('Login error:', error);
        switch (error.code) {
            case 'auth/wrong-password':
                setError('Incorrect password. Please try again or reset your password.');
                break;
            case 'auth/user-not-found':
                setError('No account found with this email. Please register.');
                break;
            default:
                setError('An unexpected error occurred. Please try again later.');
                break;
        }
    };

    // JSX layout
    return (
        <div className="centeredcontainer has-text-centered">
            <h1 className="title mb-2 has-text-warning">Login</h1>
            <Link to="/register">
                <p className="mb-3 subtitle is-5 has-text-warning is-italic">Don't have an account? Register here!</p>
            </Link>
            <form onSubmit={handleLogin}>
                <div>
                    <label className="mb-3 has-text-warning">Email:</label>
                    <br/>
                    <input
                        className="mt-1em mb-3 redinput"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="mb-3 mt-1em has-text-warning">Password:</label>
                    <br/>
                    <input
                        className="mt-1em redinput"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br/>
                <button
                    className="button is-warning is-outlined"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
            <p className="has-text-link mt-1em">
                Forgot your password? Reset it here.
            </p>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
};

export default Login;
