import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useUser } from '../Other/UserContext'; // Adjust import path as needed

const Login = () => {
  const navigate = useNavigate();
  const { setName } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailArray, setEA] = useState(['@','g','m','a','i','l','.','c','o','m']);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:2000/user');
      const users = response.data.message;

      const user = users.find(user => user.email === email && user.role === "user");
      const admin = users.find(user => user.email === email && user.role === "admin");

      if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          setName(user.name);
          console.log("User Name set to:", user.name);
          alert("Login Successfully");
          navigate("/user" ,{ state: { person:user }});
        } else {
          setErrorMessage("Invalid email or password");
        }
      } else if (admin) {
        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (isPasswordMatch) {
          setName(admin.name);
          console.log("Admin Name set to:", admin.name);
          alert("Admin Login Successfully");
          navigate("/admin",{ state: { person:admin }});
        } else {
          setErrorMessage("Invalid email or password");
        }
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };
  const emailSubmit=(event)=>{
    if(event.key==='Enter' ||event.type==='click'){
      email.endsWith("@gmail.com")
      ? setEmail(email)
      : email.endsWith("@gmail.co")
      ? setEmail(email + "m")
      : email.endsWith("@gmail.c")
      ? setEmail(email + "om")
      : email.endsWith("@gmail.")
      ? setEmail(email + "com")
      : email.endsWith("@gmail")
      ? setEmail(email + ".com")
      : email.endsWith("@gmai")
      ? setEmail(email + "l.com")
      : email.endsWith("@gma")
      ? setEmail(email + "il.com")
      : email.endsWith("@gm")
      ? setEmail(email + "ail.com")
      : email.endsWith("@g")
      ? setEmail(email + "mail.com")
      : email.endsWith("@")
      ? setEmail(email + "gmail.com")
      : email.includes('@')&& !email.endsWith("gmail.com")?setEmail(''):setEmail(email+"@gmail.com");
    }
  }

  return (
    <div className='loginpage'>
      <section className='login'>
        <img src='https://w7.pngwing.com/pngs/505/761/png-transparent-login-computer-icons-avatar-icon-monochrome-black-silhouette.png' alt="img"/>
        <form onSubmit={submitHandler}>
          <input 
            type='email' 
            placeholder='Enter Email' 
            required 
            onKeyDown={emailSubmit}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type='password' 
            placeholder='Enter Password' 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className='error'>{errorMessage}</p>}
          <div className='buttons'>
            <button type='submit'>Ok</button>
            <button type='button' onClick={() => { navigate("/") }}>Cancel</button>
          </div>
        </form>
        <div className='signupbutton' onClick={() => { navigate('/signup') }}>
        </div>
      </section>
    </div>
  );
};

export default Login;
