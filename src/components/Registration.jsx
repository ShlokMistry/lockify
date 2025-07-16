import React, { useState } from "react";
import axios from "axios";
import styles from './Registration.module.css';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profile_password, setProfile_Password] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showProfile_Password, setShowProfile_Password] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.length < 3 || username.length > 20 || !/^[A-Za-z0-9_]+$/.test(username)) {
            setMessage('Username must be 3-20 alphanumeric characters or underscores.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }
        if (!/^[0-9]{10}$/.test(contact)) {
            setMessage('Contact number must be exactly 10 digits.');
            return;
        }
        if (password.length < 6 || password.length > 10) {
            setMessage('Password must be 6-10 characters long.');
            return;
        }
        if (password !== confirmPassword) {
            setMessage('Passwords do not match. Please ensure both password fields are identical.');
            return;
        }
        if (profile_password.length < 4 || profile_password.length > 10) {
            setMessage('Profile password must be 4-10 characters long.');
            return;
        }

        const data = { username , email , contact , password , profile_password };

        try{
            const response = await axios.post(
                "http://localhost/lockify/register.php",
                data
            );

            if(response.data.status){
                alert ("Registered Successfully");
                navigate("/"); // This should now work as expected after the alert
            }
            else
            {
                alert ("Error in registration: " + response.data.message);
            }
        }
        catch(error)
        {
            console.error("Axios error:", error);
            setMessage('An error occurred during registration. Please try again.');
        }

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const toggleProfile_PasswordVisibility = () => {
        setShowProfile_Password(!showProfile_Password);
    };

    return (
        <div className={styles.registrationContainer}>
            <h2 className={styles.registrationTitle}>Registration</h2>
            <form onSubmit={handleSubmit} className={styles.registrationForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="Uname" className={styles.formLabel}>
                        Username
                    </label>
                    <input
                        type="text"
                        id="Uname"
                        name="Uname"
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
                    <label htmlFor="Email_id" className={styles.formLabel}>
                        Email ID
                    </label>
                    <input
                        type="email"
                        id="Email_id"
                        name="Email_id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.formInput}
                        aria-label="Email ID input field"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="Contact" className={styles.formLabel}>
                        Contact No
                    </label>
                    <input
                        type="tel"
                        id="Contact"
                        name="Contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                        pattern="[0-9]{10}"
                        inputMode="numeric"
                        maxLength="10"
                        className={styles.formInput}
                        aria-label="Contact number input field"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="Upass" className={styles.formLabel}>
                        Password
                    </label>
                    <div className={styles.passwordField}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="Upass"
                            name="Upass"
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
                            <i className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'} aria-hidden="true"></i>
                        </span>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="Cpass" className={styles.formLabel}>
                        Confirm Password
                    </label>
                    <div className={styles.passwordField}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="Cpass"
                            name="Cpass"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            maxLength="10"
                            className={styles.formInput}
                            aria-label="Confirm password input field"
                        />
                        <span
                            className={styles.passwordToggle}
                            onClick={toggleConfirmPasswordVisibility}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            <i className={showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'} aria-hidden="true"></i>
                        </span>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="Ppass" className={styles.formLabel}>
                        Profile Password
                    </label>
                    <div className={styles.passwordField}>
                        <input
                            type={showProfile_Password ? "text" : "password"}
                            id="Ppass"
                            name="Ppass"
                            value={profile_password}
                            onChange={(e) => setProfile_Password(e.target.value)}
                            required
                            minLength="4"
                            maxLength="10"
                            className={styles.formInput}
                            aria-label="Profile password input field"
                        />
                        <span
                            className={styles.passwordToggle}
                            onClick={toggleProfile_PasswordVisibility}
                            aria-label={showProfile_Password ? "Hide password" : "Show password"}
                        >
                            <i className={showProfile_Password ? 'fas fa-eye' : 'fas fa-eye-slash'} aria-hidden="true"></i>
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
                    className={styles.registerButton}
                >
                    Register
                </button>

                <p className={styles.loginPrompt}>
                    Already have an account?{' '}
                    <button
                        type="button"
                        onClick={() => navigate('/')} // Changed this line to navigate to /Login
                        className={styles.loginLink}
                    >
                        Login here
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Registration;