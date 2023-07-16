import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './manageProduct.css';

const ManageProduct = () => {
  const [data, setData] = useState({
    productCode: '',
    title: '',
    description: '',
    category: '',
    available: '',
    imagePath: '',
    manufacturer: '',
    discountprice: '',
    price: '',
  });

  const postData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/add-product' , data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching categories and products:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div>
      <div className='add-product-box'>
        <form className='add-product-form' onSubmit={handleFormSubmit}>
          <label>Product Code</label>
          <input
            type='text'
            name='productCode'
            value={data.productCode}
            onChange={(e) => setData({ ...data, productCode: e.target.value })}
          />
          <label>Title</label>
          <input
            type='text'
            name='title'
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <label>Description</label>
          <input
            type='text'
            name='description'
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
          <label>Price</label>
          <input
            type='text'
            name='price'
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />
          <label>Category</label>
          <input
            type='text'
            name='category'
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          />
          <label>Available</label>
          <input
            type='text'
            name='available'
            value={data.available}
            onChange={(e) => setData({ ...data, available: e.target.value })}
          />
          <label>Image Path</label>
          <input
            type='text'
            name='imagePath'
            value={data.imagePath}
            onChange={(e) => setData({ ...data, imagePath: e.target.value })}
          />
          <label>Discount Price</label>
          <input
            type='text'
            name='discountprice'
            value={data.discountprice}
            onChange={(e) => setData({ ...data, discountprice: e.target.value })}
          />
          <label>Manufacturer</label>
          <input
            type='text'
            name='manufacturer'
            value={data.manufacturer}
            onChange={(e) => setData({ ...data, manufacturer: e.target.value })}
          />
          <button className='signupbutton' type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
};

export default ManageProduct;
