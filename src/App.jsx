import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router'
import Login from './Components/Login/login'
import Register from "./Components/Register/Register"
import Dashboard from './Components/Dashboard/Dashboard'
import axios from 'axios'

const setAuthToken =  (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};


const App =()=> {
  const navigate =useNavigate()
  const [authenticated,setAuthentication] = useState(false)
  const [user,setUser]= useState({})

  const getAuthenticated =(data)=>{
    setAuthToken(data.token)
    setUser((pState)=>data.userObj)
    setAuthentication(true)
    navigate('/dashboard')
  }

  const logout = ()=>{
    setAuthToken(null)
    setUser(null)
    setAuthentication(false)
  }



  return (
    <div className='app'>
    <Routes>
        <Route path="" element={<Login authenticate={getAuthenticated} />}/>
        <Route path="register" element={<Register/>}/>
        <Route path='dashboard' element={<Dashboard authenticated={authenticated} user={user} logout={logout}/>}/>
    </Routes>

    
    
    </div>
  )
}

export default App
