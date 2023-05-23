import React from 'react';
import './signup.css'

const Signup=()=> {
    return ( 
        <div className='signup-box'>
            <form className='signup-form' action='POST'>
                <label>Username</label><input type='text' name='username' ></input>
                <label>Email</label><input type='text' name='email'></input>
                <label>Password</label><input type='text' name='password' ></input>
                <label>Re-enter Password</label><input type='text'name='password2' ></input>
                <button className='signupbutton' type='submit'>Register</button>
            </form>
            <div className='login-box'>
                <h3 className='logintitle'>Already have an account?</h3>
            </div>
        </div>
     );
}

export default Signup;