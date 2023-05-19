import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./header.css";

const Header = () => {
    const [activeLink, setActiveLink] = useState('/');

    useEffect(() => {
        const storedActiveLink = localStorage.getItem('activeLink');
        if (storedActiveLink) {
            setActiveLink(storedActiveLink);
        }
    }, []);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        localStorage.setItem('activeLink', link);
    };

    return (
        <div>
            <div className="header">
                <nav>
                    <ul id='#nav1'>
                        <Link to="/"><li className={activeLink === "/" ? "active" : ""} onClick={() => handleLinkClick("/")}>Home</li></Link>
                        <Link to="/product"><li className={activeLink === "/product" ? "active" : ""} onClick={() => handleLinkClick("/product")}>Products</li></Link>
                        <Link to="/about"><li className={activeLink === "/about" ? "active" : ""} onClick={() => handleLinkClick("/about")}>About</li></Link>
                    </ul>
                    <ul className='nav2'>
                    <li style={{ border: 'none',pointerEvents:'none' }}>|</li>
                    <Link><li>Register</li></Link>
                    <Link><li>Login</li></Link>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;
