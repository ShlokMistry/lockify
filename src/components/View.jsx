import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from './View.module.css';

const View = () => {
    const { wid, uid } = useParams();
    const [result, setResult] = useState({}); // Initialized as an empty object

    const fetchWebsiteDetails = async () => {
        try {
            const response = await axios.post(
                "http://localhost/lockify/view_details.php",
                {
                    user_id: uid, // This is reg_id from the backend perspective
                    wid: wid,
                }
            );

            // --- ADD THESE CONSOLE LOGS FOR DEBUGGING ---
            console.log("Full response from view_details.php:", response);
            console.log("Response data:", response.data);
            console.log("Response data.website:", response.data.website);
            // --- END DEBUGGING LOGS ---

            if (response.data && response.data.status && response.data.website) {
                setResult(response.data.website);
            } else {
                console.error("Failed to fetch website details:", response.data.message || "Unknown error occurred on backend.");
                setResult({}); // Ensure result is an object even on error
                alert(response.data.message || "Could not retrieve website details. Check console for more info.");
            }
        } catch (e) {
            console.error("Network or Axios error during fetchWebsiteDetails:", e);
            setResult({}); // Ensure result is an object on network error
            alert("A network error occurred. Please check your browser console.");
        }
    };

    useEffect(() => {
        fetchWebsiteDetails();
    }, [wid, uid]); // Added wid, uid to dependency array if they can change.

    return (
        <form>
            <table className={styles.viewTable}>
                <tbody>
                    <tr><td className={styles.viewName}>{result.web_name}</td></tr>
                    <tr><td className={styles.viewPass}>Username: {result.username}</td></tr>
                    <tr><td className={styles.viewPass}>Password: {result.password}</td></tr>
                </tbody>
            </table>
        </form>
    );
};

export default View;