import React from 'react';
import "./App.scss";
import Header from "./Components/Header/Header";
import Admin from "./Components/Home/Admin";
import Login from './Components/Other/Login';
import Signup from './Components/Other/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLog from './Components/Home/UserLog';
import ProtectedAdmin from './Components/Other/ProtectedAdmin';
import ProtectedUser from './Components/Other/ProtectedUser';
import Logout from './Components/Other/Logout';
import Addcategory from './Components/Other/Addcategory';
import UpdateCategory from './Components/Other/Updatecategory'
import DeleteCategory from './Components/Other/Deletecategory'
import Additem from './Components/Other/Additem';
import Updateitem from './Components/Other/Updateitem'
import Deleteitem from './Components/Other/Deleteitem'
import Report from './Components/Other/Report';
import AddUser from './Components/Other/AddUser';
import DeleteUser from './Components/Other/DeleteUser';

import { UserProvider } from './Components/Other/UserContext'; 

function App() {
  return (
    <UserProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedAdmin Component={Admin}/>} />
        <Route path="/addcategory" element={<ProtectedAdmin Component={Addcategory}/>} />
        <Route path="/updatecategory" element={<ProtectedAdmin Component={UpdateCategory}/>} />
        <Route path="/deletecategory" element={<ProtectedAdmin Component={DeleteCategory}/>} />
        <Route path="/adduser" element={<ProtectedAdmin Component={AddUser}/>} />
        <Route path="/deleteuser" element={<ProtectedAdmin Component={DeleteUser}/>} />
        <Route path="/additem" element={<ProtectedAdmin Component={Additem}/>} />
        <Route path="/updateitem" element={<ProtectedAdmin Component={Updateitem}/>} />
        <Route path="/deleteitem" element={<ProtectedAdmin Component={Deleteitem}/>} />
        <Route path="/report" element={<ProtectedAdmin Component={Report}/>} />
        <Route path="/logout" element={<ProtectedUser Component={Logout}/>} />
        <Route path="/user" element={<ProtectedUser Component={UserLog}/>} />


      </Routes>
    </Router>
  </UserProvider>
  );
}

export default App;
