import React from 'react'
import Sidebar from './Sidebar'
import { NavBtn, NavBtnLink } from "../Navbar/NavbarElements";
import MovingText from "react-moving-text";
import './styles/AdminPanel.css';
const AdminPanel = () => {
  return (
    <div className='bg-image'>
      <Sidebar/>
      <MovingText
        type="popIn"
        duration="1600ms"
        delay="0s"
        direction="normal"
        timing="ease-in"
        iteration="5"
        fillMode="none"
        >
        <h1 style={{textAlign:"center", fontSize:"80px", fontWeight:'800', color:'white'}}>Welcome, cynotryl!</h1>
      </MovingText>
      <NavBtn >
          <NavBtnLink to="/">Logout</NavBtnLink>
        </NavBtn>
    </div>
  )
}

export default AdminPanel