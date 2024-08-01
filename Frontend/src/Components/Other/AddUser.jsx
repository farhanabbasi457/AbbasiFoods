import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const AddUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const response = await axios.post('http://localhost:2000/user', {
        name,
        email,
        password:hashedPassword,
        role:"user",
        address: address,
        phone:phone
      });

      if (response) {
        alert('User Added Successfully');
        navigate('/admin');
      } else {
        setErrorMessage('An error occurred during Adding User. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An error occurred during Adding User. Please try again.');
    }
  };

  return (
    <div className='signuppage'>
      <section className='signup'>
        <h1 id='h1'>Add User details</h1>
        <form onSubmit={submitHandler}>
          
        <input 
            type='text' 
            placeholder='Enter Name' 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type='email' 
            placeholder='Enter Email' 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type='number' 
            placeholder='Enter Phone' 
            required 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input 
            type='text' 
            placeholder='Enter Address' 
            required 
            value={address}
            onChange={(e) => setAdress(e.target.value)}
          />
          <input 
            type='password' 
            placeholder='Enter Password' 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type='password' 
            placeholder='Confirm Password' 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {errorMessage && <p className='error'>{errorMessage}</p>}
          <div className='buttons'>
            <button type='submit'>Ok</button>
            <button type='button' onClick={() => { navigate("/admin") }}>Cancel</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddUser;
