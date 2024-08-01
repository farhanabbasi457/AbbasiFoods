import React from 'react';
import { Link } from 'react-router-dom';
import pic from "../Images/image.png"
import { useUser } from '../Other/UserContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { name } = useUser();
    const navigate = useNavigate();
    var url;
    console.log("Header Name:", name); // Debug log
    if (name === "Farhan") {
        url = "/admin";
    }
    else {
        url = "/";
    }
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src={pic} alt='Logo pic' />
                <h1>Abbasi Foods</h1>
            </div>
            <ul className="sidebar-menu">
            <li>
                {
                    name?<Link id='if'>{name}</Link>:""
                }
            </li>
                <li>{
                    name=== "Farhan"?<Link to="/admin">Dashboard</Link>: name=== null || name ===""? <Link to="/login">Dashboard</Link>:<Link to="/user">Dashboard</Link>
                    }
                </li> 
                <li>
                    {
                        name === null || name === "" ? <Link to="/login">LogIn</Link> : <Link to="/logout">LogOut</Link>
                    }
                </li>
                
            </ul>
        </div>
    );
};

export default Header;
