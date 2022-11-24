import React from 'react';
import {Link} from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './styles/Sidebar.css'
const Sidebar=() => {
  return (
    <Menu>
      <Link className="menu-item" to="/AdminPanel">
        Home
      </Link>
      <Link className="menu-item" to="/Client">
        Clients
      </Link>
      <a className="menu-item" href="/pizzas">
        Pizzas
      </a>
      <a className="menu-item" href="/desserts">
        Desserts
      </a>
    </Menu>
  );
};

export default Sidebar;