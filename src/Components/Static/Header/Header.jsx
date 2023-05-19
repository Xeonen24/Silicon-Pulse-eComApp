import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faCartShopping } from '@fortawesome/free-solid-svg-icons';
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
                    <ul id='nav3'>
                    <Link to='/'><li className='logoTitle'>logoplaceholder</li></Link>
                    </ul>
                    <ul id='nav1'>
                        <Link to="/"><li className={activeLink === "/" ? "active" : ""} onClick={() => handleLinkClick("/")}>Home</li></Link>
                        <Link to="/product"><li className={activeLink === "/product" ? "active" : ""} onClick={() => handleLinkClick("/product")}>Products</li></Link>
                        <Link to="/about"><li className={activeLink === "/about" ? "active" : ""} onClick={() => handleLinkClick("/about")}>About</li></Link>
                    </ul>
                    <ul id='nav2'>
                    <Link><FontAwesomeIcon icon={faUser} style={{ color: 'white',fontSize: '24px',marginTop:'24px',marginRight:'20px' }} /></Link>
                    <Link><FontAwesomeIcon icon={faCartShopping} style={{ color: 'white',fontSize: '24px',marginTop:'24px' }} /></Link>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;
