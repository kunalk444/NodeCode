import './App.css'
import Signup from './components/Authentication/Signup'
import Navbar from './components/Navbar'
import { useState } from 'react';
import Problems from './components/Problems';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { apiCallFunction } from './helpers/apiHelper';
import { delUserData, saveUserData } from './components/Slices/userSlice';
import {Routes,Route} from 'react-router-dom';
import InsideProblem from './components/InsideProblem';

function App() {
  const dispatch = useDispatch();
  const [showSignup,setShowSignup] = useState(false);
  useEffect(()=>{
    (async()=>{
      const res = await apiCallFunction("auth/me",null,"GET");
      if(res.success){
        dispatch(saveUserData(res.user));
      }else{
        dispatch(delUserData());
      }

    })();
  },[]);
  
  return (
    <>
      <Navbar showSignup = {()=>setShowSignup(true)}/>
      <Problems />
      {showSignup && <Signup stopShow = {()=>setShowSignup(false)}/>}
    </>
  )
}

export default App
