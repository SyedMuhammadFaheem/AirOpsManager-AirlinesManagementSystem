import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import Sidebar from './Sidebar'
import { NavBtn, NavBtnLink } from "../Navbar/NavbarElements";
import MovingText from "react-moving-text";
import './styles/AdminPanel.css';
const AdminPanel = () => {
  const [user,setUser]=useState({});
  useEffect(() => {
    Axios
      .get('http://localhost:5000/getstats')
      .then((resp) => setUser({ ...resp.data[0] }));
      console.log(user.countt)
      console.log(user.summ)
  }, []);
  return (
    <div className='bg-image'>
      <Sidebar/>

      <br/>
      <br/>
      <br/>
      <br/>
      <MovingText
        type="popIn"
        duration="1600ms"
        delay="0s"
        direction="normal"
        timing="ease-in"
        iteration="5"
        fillMode="none"
        >
        <h1 style={{textAlign:"center", fontSize:"80px", fontWeight:'800', color:'white',backgroundColor:'black',width:'100vw',padding:'10px'}}>Welcome, cynotryl!</h1>
      </MovingText>
      <br/>
      <br/>
      <div style={{backgroundColor:'black', width:'100vw', padding:'10px'}}>
        <h1 style={{color:'white'}}>Bookings Count: {user.countt}</h1>
        <h1 style={{color:'white'}}>Revenue Generated: {user.summ}</h1>
      </div>
      <NavBtn >
          <NavBtnLink to="/">Logout</NavBtnLink>
        </NavBtn>
    </div>
  )
}

export default AdminPanel