import "./styles/global.css";
import Login from './pages/Login';
import Home from "./pages/Home";
import {Routes,Route} from 'react-router-dom'
import Profile from "./pages/Profile";
import {CurrentUser} from './Context/CurrentUser'
import { useEffect, useState } from "react";

function App() {
const[user,setUser]=useState()

useEffect(async() => {
  const res=await fetch("https://socialmediabackend1.herokuapp.com/user",{
      method:"GET",
    headers:{
        "Content-Type":"application/json",
        "x-auth-token":localStorage.getItem("token")
    }
  })
  const data=await res.json()
  setUser(data)
}, [localStorage.getItem("token")])




  return (
    <>
    <CurrentUser.Provider value={{user}}>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </CurrentUser.Provider>
    
    </>
    
   
  );
}

export default App;
