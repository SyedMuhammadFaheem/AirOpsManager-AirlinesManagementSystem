import React from 'react'
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavbarElements';
const Navbar = () => {
  return (
    <div>
        <Nav>
            <NavLink to='/' >
                <img src={require('../../images/logo.png')} alt='logo' style={{width:'125px', height:'120px', marginRight:'350px' }} />
                {/* <h3>FMA Airlines Management</h3> */}
            </NavLink>
            <NavMenu>
            <NavLink to='/services' >
                Book
            </NavLink>
            <NavLink to='/about' >
                About
            </NavLink>
            <NavLink to='/contact-us' >
                Contact
            </NavLink>
            </NavMenu> 
            <NavBtn>
                <NavBtnLink to='/sign-up'>Sign Up</NavBtnLink>
            </NavBtn>
            <NavBtn>
                <NavBtnLink to='/signin'>Sign In</NavBtnLink>
            </NavBtn>
        </Nav>
    </div>
  )
}

export default Navbar