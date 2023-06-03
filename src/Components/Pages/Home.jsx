import React from 'react';
import image from '../../Images/hs.png'
import './home.css'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
            <div className="main_div">
                <h1 className="main_name">Silicon Pulses </h1>
                <p className="subhead_name">
                    The Ultimate Gaming Hardware Empssorium.
                </p>
                <Link to='product' className='product-link'><h4 className='home_btn' spellcheck="false">Shop Now</h4></Link>
                <img
                    className="img_main"
                    src={image}
                    alt=""
                />
            </div>           
    )
}
export default Home;