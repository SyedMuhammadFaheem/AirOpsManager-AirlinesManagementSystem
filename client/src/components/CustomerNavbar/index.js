import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink } from '../Navbar/NavbarElements';
import { useAuth } from '../../contexts/AuthContext';

const CustomerNavbar = () => {
  const { id } = useParams();
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push('/CustomerSignin');
  };

  return (
    <div>
      <Nav>
        <NavMenu>
          <NavLink to={`/ViewProfile/${id}`}>View Profile</NavLink>
          <NavLink to={`/BookTicket/${id}`}>Book Flight</NavLink>
          <NavLink to={`/ViewCustomerTickets/${id}`}>View Tickets</NavLink>
          <NavLink to={`/AddReviews/${id}`}>Add Review</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink as="button" onClick={handleLogout} style={{ marginLeft: '550px', cursor: 'pointer' }}>
            Logout
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </div>
  );
};

export default CustomerNavbar;
