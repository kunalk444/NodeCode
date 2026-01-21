import './App.css'
import Signup from './components/Authentication/Signup'
import Navbar from './components/Navbar'
import { useState } from 'react';
import Problems from './components/Problems';

function App() {
  const [showSignup,setShowSignup] = useState(false);
  return (
    <>
      <Navbar showSignup = {()=>setShowSignup(true)}/>
      <Problems />
      {showSignup && <Signup stopShow = {()=>setShowSignup(false)}/>}
    </>
  )
}

export default App
