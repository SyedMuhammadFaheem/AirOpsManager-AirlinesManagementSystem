import React from "react";
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
const Navbar = () => {
  return (
    <div>
      <Nav>
        <NavLink to="/">
          <img
            src={require("../../images/logo.png")}
            alt="logo"
            style={{ width: "125px", height: "120px", marginRight: "350px" }}
          />
          {/* <h3>FMA Airlines Management</h3> */}
        </NavLink>
        <NavMenu>
          <NavLink to="/BookTicket">View Flights</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact-us">Contact</NavLink>
        </NavMenu>
        <NavBtn>
          <Dropdown >
            <Dropdown.Toggle id="dropdown-basic" style={{fontSize:'20px',marginTop:'-10px',height:'48px'}}>Client Login</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item ><Link to='/sign-up'>Sign Up</Link></Dropdown.Item>
                <Dropdown.Item ><Link to='/CustomerSignin'>Sign In</Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </NavBtn>
        <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </div>
  );
};

export default Navbar;
