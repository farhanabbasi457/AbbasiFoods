import React from 'react'
import { useUser } from '../Other/UserContext';
import { useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedAdmin = (props) => {
    const {Component} =props;
    const { name } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
      if(name !=="Farhan"){
        navigate("/login");
      }

    }, [])
    
    
    
  return (
    <div>
        <Component/>
    </div>
  )
}

export default ProtectedAdmin