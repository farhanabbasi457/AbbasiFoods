import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Updatecategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [Newname, setNewName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();


    try {
      const response = await axios.put(`http://localhost:2000/category/${name}`, {
        name:Newname,
      });

      if (response.data.message === 1) {
        alert('Category Updated Successfully');
        navigate('/admin');
      }else {
        setErrorMessage('Category Not Found');
      }
    } catch (error) {
      console.error('Error during Adding:', error);
      
      setErrorMessage('An error occurred during Adding. Please try again.');
    }
  };

  return (
    <div className='signuppage'>
      <section className='signup'>
        <h1 id='h1'>Update Category Here</h1>
        <form onSubmit={submitHandler}>
          
          <input 
          type="string"
            placeholder='Enter Category Name' 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <input  
          type='string'
            placeholder='Enter New Name' 
            required 
            value={Newname}
            onChange={(e) => setNewName(e.target.value)}
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

export default Updatecategory;
