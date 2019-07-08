import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = ({ link, menu }) => (
  <div className="layout-header">
    <Link to="/" className="layout-link">
      <div className="layout-logo">Gaeddal</div>
    </Link>
    <div className="layout-menu">
      <Link to={link} className="layout-link">
        <div className="layout-auth">{menu}</div>
      </Link>
    </div>
  </div>
);

Header.propTypes = {
  link: PropTypes.string.isRequired,
  menu: PropTypes.string.isRequired,
};

export default Header;
