import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import Sidebar from './Sidebar';
import { NavBtn, NavBtnLink } from '../Navbar/NavbarElements';
import MovingText from 'react-moving-text';
import './styles/AdminPanel.css';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const AdminPanel = () => {
  const { logout, auth } = useAuth();
  const history = useHistory();
  const [stats, setStats] = useState({ countt: 0, summ: 0 });

  useEffect(() => {
    apiClient
      .get('/booking/getstats')
      .then((resp) => setStats(resp.data))
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await logout();
    history.push('/signin');
  };

  return (
    <div className="bg-image">
      <Sidebar />
      <br /><br /><br /><br />
      <MovingText
        type="popIn"
        duration="1600ms"
        delay="0s"
        direction="normal"
        timing="ease-in"
        iteration="5"
        fillMode="none"
      >
        <h1 style={{ textAlign: 'center', fontSize: '80px', fontWeight: '800', color: 'white', backgroundColor: 'black', width: '100vw', padding: '10px' }}>
          Welcome, {auth.username || 'Admin'}!
        </h1>
      </MovingText>
      <br /><br />
      <div style={{ backgroundColor: 'black', width: '100vw', padding: '10px' }}>
        <h1 style={{ color: 'white' }}>Bookings Count: {stats.countt}</h1>
        <h1 style={{ color: 'white' }}>Revenue Generated: {stats.summ}</h1>
      </div>
      <NavBtn>
        <NavBtnLink as="button" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</NavBtnLink>
      </NavBtn>
    </div>
  );
};

export default AdminPanel;
