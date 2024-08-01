import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addcategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();


    try {
      const response = await axios.post('http://localhost:2000/category', {
        name,
      });

      if (response) {
        alert('Category Added Successfully');
        navigate('/admin');
      }else {
        setErrorMessage('An error occurred during Adding. Please try again.');
      }
    } catch (error) {
      console.error('Error during Adding:', error);
      
      setErrorMessage('An error occurred during Adding. Please try again.');
    }
  };

  return (
    <div className='signuppage'>
      <section className='signup'>
        <h1 id='h1'>Add Category details</h1>
        <form onSubmit={submitHandler}>
          
          <input 
          type="string"
            placeholder='Enter Category Name' 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
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

export default Addcategory;
