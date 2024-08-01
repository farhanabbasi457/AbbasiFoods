import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Additem = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [price, setprice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();
  const { person } = location.state || {};

  useEffect(() => {
    console.log('Received person:', person);
  }, [person]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://abbasifoods.onrender.com/category/single/${person}`);

      if (response.data.success === true) {
        console.log(response.data.message[0]._id);

        try {
          const response1 = await axios.post('https://abbasifoods.onrender.com/menuitem', {
            category_ID: response.data.message[0]._id,
            name: name,
            description:description ,
            price: price,
          });

          

          if (response1.data.success === true) {
            alert('Item Added Successfully');
            navigate('/admin');
          } else {
            setErrorMessage('An error occurred during Adding. Please try again.');
          }
        } catch (error) {
          console.error('Error during Adding:', error);
          setErrorMessage('An error occurred during Adding. Please try again.');
        }
      } else {
        setErrorMessage('An error occurred during Adding. Please try again.');
      }
    } catch (error) {
      console.error('Error during Adding:', error);
    }



  };

  return (
    <div className='signuppage'>
      <section className='signup'>
        <h1 id='h1'>Add Item details</h1>
        <form onSubmit={submitHandler}>

          <input
            type="text"
            placeholder='Enter Name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder='Enter Description'
            required
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="text"
            placeholder='Enter Price'
            required
            value={price}
            onChange={(e) => setprice(e.target.value)}
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

export default Additem;
