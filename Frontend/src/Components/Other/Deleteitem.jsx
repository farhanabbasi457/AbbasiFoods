import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Deletecategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();


    try {
      const response = await axios.delete(`https://abbasifoods.onrender.com/menuitem/${name}`);

      if (response.data.message === 1) {
        alert('Item Deleted Successfully');
        navigate('/admin');
      }
      else{
        setErrorMessage("Item Not Found");
      }
    } catch (error) {
      console.error('Error during Adding:', error);
    }
  };

  return (
    <div className='signuppage'>
      <section className='signup'>
        <h1 id='h1'>Delete Items Here</h1>
        <form onSubmit={submitHandler}>
          
          <input 
          type="string"
            placeholder='Enter Item Name' 
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

export default Deletecategory;
