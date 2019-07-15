import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => (
  <div className="nav-main">
    <ul className="nav-ul">
      <li className="nav-li">
        <Link to="/alarms" className="nav-link">
          알람
        </Link>
      </li>
      <li className="nav-li">
        <Link to="/follow" className="nav-link">
          친구
        </Link>
      </li>
      <li className="nav-li">
        <Link to="/messages" className="nav-link">
          메세지
        </Link>
      </li>
    </ul>
  </div>
);

export default NavBar;
