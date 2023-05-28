import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';


import TypingMaster from './Typemaster';
import LoginForm from '../Pages/LoginForm';
import SignupForm from '../Pages/SignupForm';

const AllRoutes = () => {
  return (
    <div>                          
            <Routes>                     
                <Route path="/" element={<TypingMaster/>}/> 
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/signup" element={<SignupForm/>}/>
                 
                
            </Routes>  
      </div>
  )
}

export default AllRoutes