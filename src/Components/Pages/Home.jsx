import React from 'react';
import image from '../../Images/hs.png'
import './home.css'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1 className="main_name">Silicon Pulse </h1>
            <p className="subhead_name">
                The Ultimate Gaming Hardware Emporium.
            </p>
            <Link to='product'><h4 className='home_btn'>Shop Now</h4></Link>
            <img
                className="img_main"
                src={image}
                alt=""
            />           

        </div>
    );
}

export default Home;