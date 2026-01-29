import './App.css'
import Signup from './components/Authentication/Signup'
import Navbar from './components/Navbar'
import { useState } from 'react';
import Problems from './components/Problems';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { apiCallFunction } from './helpers/apiHelper';
import { delUserData, saveUserData } from './components/Slices/userSlice';
import { Routes, Route } from 'react-router-dom';
import InsideProblem from './components/InsideProblem';
import { delCode } from './components/Slices/codeSlice';
import { removeProblemData } from './components/Slices/insideProblemSlice';
import FilterBox from './components/FilterBox';

function App() {
  const dispatch = useDispatch();
  //const [showSignup,setShowSignup] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await apiCallFunction("auth/me", null, "GET");
      if (res.success) {
        dispatch(saveUserData(res.user));
      } else {
        dispatch(delUserData());
      }
      dispatch(delCode());
      dispatch(removeProblemData());
    })();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex gap-4 px-1 mt-2 max-w-[1600px] mx-auto bg-gradient-to-b from-rose-50/40 via-white to-white">
        <div className="w-56 shrink-0 mt-33">
          <FilterBox />
        </div>

        <div className="flex-1">
          <Problems />
        </div>

        <div className="w-48 shrink-0"></div>
      </div>
    </>
  );


}

export default App
