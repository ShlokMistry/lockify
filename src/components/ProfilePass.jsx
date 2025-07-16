import React, { useState } from "react"; // Added useState
import { useParams, useNavigate } from 'react-router-dom'; // Added useParams
import axios from "axios"; // Added axios import
import styles from './ProfilePass.module.css';

const ProfilePass = () => {
    const [password, setPassword]= useState("");
    const { wid, uid } = useParams(); // Destructure wid and uid from useParams
    const navigate = useNavigate(); // Corrected typo from naviget

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const id = localStorage.getItem("user_id");
            if (!id) {
                alert("User not logged in. Please log in first.");
                navigate("/login"); // Redirect to login if user_id is missing
                return;
            }

            const response = await axios.post(
                "http://localhost/lockify/profile_password.php",
                {
                    password: password, // Send the password state
                    user_id: id,
                }
            );
            if(response.data.status){
                // Corrected navigation path to /view/:wid/:uid with template literals
                navigate(`/view/${wid}/${uid}`);
            }
            else
            {
                alert(response.data.message || "Invalid Profile Password");
            }
        }
        catch(e)
        {
            console.error("Error submitting profile password:", e);
            alert("An error occurred. Please check console for details.");
        }
    };

    return (
        <>
            <form onSubmit={submitHandler}> {/* Added onSubmit handler */}
                <table className={styles.profileTable}>
                    <tbody> {/* Added tbody for semantic HTML */}
                        <tr>
                            <td className={styles.profileLabelCell}>Profile Password:</td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="Password"
                                    name="Ppass"
                                    id="Ppass"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required // Make it required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {/* Changed Link to a button to trigger form submission */}
                                <button
                                    type="submit"
                                    className={styles.viewDetailsLink} // Reusing class for styling
                                >
                                    Submit
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
};
export default ProfilePass;