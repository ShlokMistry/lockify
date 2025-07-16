import React,{ useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {

    const [result , setResult ] = useState([]);
    const fetchWebsiteData = async () =>{
        try{
            const id = localStorage.getItem("user_id");
            const response = await axios.post("http://localhost/lockify/home.php",{
                user_id: id,
            });
            // Assuming home.php now sends response.data.website
            setResult(response.data.website);
        }
        catch(e)
        {
            console.log(e);
        }
    };
    useEffect(() =>{
        fetchWebsiteData();
    }, []);

    return (
        <>
        {/* Changed from <table> to <div> for a flexible grid layout */}
        <div className={styles.websiteGridContainer}> {/* Apply flexbox/grid styles here */}
            {result.map((w) => (
                // Each website's content is now directly a child of the grid container
                <div key={w.web_id} className={styles.websiteCard}> {/* Added websiteCard class for individual box styling */}
                    <div className="hcontent"> {/* Kept your original hcontent class if it has specific styles */}
                        <h3>{w.web_name}</h3>
                        <Link
                            className={styles.viewDetailsLink}
                            to={`/profilepass/${w.web_id}/${w.reg_id}`}
                            style={{position: "relative",top: "10px" }}
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};
export default Home;