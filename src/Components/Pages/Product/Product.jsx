import React from 'react';
import './product.css';
import image from "../../../Images/intel.jpg";

const Product = () =>{
    return ( 
        <>
            <div className="grid">
                <div  className="grid-item">
                <img src={image} alt="bate" className="item-image" />
                <h3 className="item-title">Intel Core i7 bate</h3>
                <p className="item-price">400$</p>
                </div>
                <div  className="grid-item">
                <img src={image} alt="bate" className="item-image" />
                <h3 className="item-title"></h3>
                <p className="item-price">400$</p>
                </div>
                <div  className="grid-item">
                <img src={image} alt="bate" className="item-image" />
                <h3 className="item-title"></h3>
                <p className="item-price">400$</p>
                </div>
                <div  className="grid-item">
                <img src={image} alt="bate" className="item-image" />
                <h3 className="item-title"></h3>
                <p className="item-price">400$</p>
                </div>
                <div  className="grid-item">
                <img src={image} alt="bate" className="item-image" />
                <h3 className="item-title"></h3>
                <p className="item-price">400$</p>
                </div>
                <div  className="grid-item">
                <img src={image} alt="bate" className="item-image" />
                <h3 className="item-title"></h3>
                <p className="item-price">400$</p>
                </div>
                <div  className="grid-item">
                <img src={image} alt="bate" className="item-image" />
                <h3 className="item-title"></h3>
                <p className="item-price">400$</p>
                </div>
                <div  className="grid-item">
                <img src={image} alt="bate" className="item-image" />
                <h3 className="item-title"></h3>
                <p className="item-price">400$</p>
                </div>
                <div  className="grid-item">
                <img src={image} alt="bate" className="item-image" />
                <h3 className="item-title"></h3>
                <p className="item-price">400$</p>
                </div>
                <div  className="grid-item">
                <img src={image} alt="bate" className="item-image" />
                <h3 className="item-title"></h3>
                <p className="item-price">400$</p>
                </div>
            </div>
        </>
    );
}

export default Product;