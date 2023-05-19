import React, { useState } from 'react';
import "./header.css";

const Header = () => {
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (link) => {
        setActiveLink(link);

    };
    return (
        <div>
            <div className="header">
                <nav>
                    <ul>
                        <li className={activeLink === "/" ? "active" : ""} onClick={() => handleLinkClick("/")}>Home</li>
                        <li className={activeLink === "projects" ? "active" : ""} onClick={() => handleLinkClick("projects")}>Projects</li>
                        <li className={activeLink === "about" ? "active" : ""} onClick={() => handleLinkClick("about")}>About me</li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;