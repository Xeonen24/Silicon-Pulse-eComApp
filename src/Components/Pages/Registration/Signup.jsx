import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the server
      const response = await axios.post('/signup', {
        username,
        email,
        password,
        password2,
      });
      console.log(response.data);
      // Clear form fields after successful submission
      setUsername('');
      setEmail('');
      setPassword('');
      setPassword2('');
    } catch (error) {
      console.error(error);
    }
    localStorage.setItem("username", username);
    window.location.href='/login'
  };

  return (
    <div className='signup-box'>
      <form className='signup-form' onSubmit={handleFormSubmit}>
        <label>Username</label>
        <input
          type='text'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type='text'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Re-enter Password</label>
        <input
          type='text'
          name='password2'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button className='signupbutton' type='submit'>Register</button>
      </form>
      <div className='login-box'>
        <h3 className='logintitle'>Already have an account?</h3>
      </div>
    </div>
  );
};

export default Signup;
