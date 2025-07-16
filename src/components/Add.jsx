import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './Add.module.css';

// Renamed component from ProfilePass to Add
const Add = () => {

    const [websiteName, setWebsiteName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const id = localStorage.getItem("user_id");
            if (!id) {
                alert("User not logged in. Please log in first.");
                navigate("/login");
                return;
            }

            const data = { websiteName, username, password, id };
            const response = await axios.post(
                "http://localhost/lockify/add_website.php",
                data
            );
            if(response.data.status)
            {
                alert("Website Details Added Successfully");
                navigate("/home");
            }
            else
            {
                alert(response.data.message || "Error...Try Again");
            }
        }
        catch(e)
        {
            console.error("Error submitting website details:", e);
            alert("An error occurred. Please check console for details.");
        }
    };

    return (
        <>
            <form onSubmit={submitHandler}> {/* Added onSubmit handler */}
                <table className={styles.addTable}>
                    <tr>
                        <td className={styles.addLabelCell}>Website Name:</td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text"
                                name="webname"
                                id="webname"
                                value={websiteName}
                                onChange={(e) => setWebsiteName(e.target.value)}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.addLabelCell}>User Name:</td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.addLabelCell}>Password:</td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="password"
                                name="webPass"
                                id="webPass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                className={styles.addSubmitButton}
                                type="submit"
                                name="submit"
                                id="submit"
                                value="Add Details"
                            />
                        </td>
                    </tr>
                </table>
            </form>
        </>
    );
};

// Exported as Add
export default Add;