import React, { useState } from 'react';
import axios from "axios";
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        // Frontend validation for username and password
        if (username.length < 3 || username.length > 20 || !/^[A-Za-z0-9_]+$/.test(username)) {
            setMessage('Username must be 3-20 alphanumeric characters or underscores.');
            return;
        }
        if (password.length < 6 || password.length > 10) {
            setMessage('Password must be 6-10 characters long.');
            return;
        }

        console.log('Login attempt:', { username, password }); // Log attempt for debugging

        try {
            const data = { username, password }; // Data object to be sent to backend
            const response = await axios.post(
                "http://localhost/lockify/login.php",
                data
            );

            // Check the status from the backend response
            if(response.data.status){
                const id = response.data.user.user_id; // Assuming user_id is returned on success
                localStorage.setItem("user_id", id); // Store user ID in local storage
                setMessage('Login successful! Redirecting to Home...'); // MOVE THIS LINE HERE
                setTimeout(() => {
                    navigate("/Home"); // MOVE THIS LINE HERE
                }, 1000); // Small delay for message visibility
            } else {
                // Display error message from backend
                setMessage(response.data.message || "Invalid Username or Password");
            }
        } catch(e) {
            console.error("Login error:", e); // Log the actual error
            setMessage("An error occurred during login. Please try again."); // Generic error for the user
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.loginTitle}>Login</h2>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.formLabel}>
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                        maxLength="20"
                        pattern="[A-Za-z0-9_]+"
                        className={styles.formInput}
                        aria-label="Username input field"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.formLabel}>
                        Password
                    </label>
                    <div className={styles.passwordField}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                            maxLength="10"
                            className={styles.formInput}
                            aria-label="Password input field"
                        />
                        <span
                            className={styles.passwordToggle}
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {/* Font Awesome icons (requires Font Awesome to be linked in your HTML) */}
                            <i className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'} aria-hidden="true"></i>
                        </span>
                    </div>
                </div>

                {message && (
                    <p className={`${styles.messageDisplay} ${message.includes('successful') ? styles.successMessage : styles.errorMessage}`}>
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    className={styles.loginButton}
                >
                    Login
                </button>

                <p className={styles.registerPrompt}>
                    Don't have an account?{' '}
                    <Link to="/registration" className={styles.viewDetailsLink}>
                        Register here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;