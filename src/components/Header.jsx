import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css';

function Header() {
    return (
        <header>
            <div className="nav-links">
                <Link to="/home">Home</Link>
                <Link to="/add">Add</Link>
                <Link to="/">Logout</Link> 
            </div>
        </header>
    )
}
export default Header