import React from 'react';
import PropTypes from 'prop-types';

import './FriendView.css';

const FriendView = ({ children }) => (
  <div className="friend-main">
    <h1>친구 목록</h1>
    <br />
    {children}
  </div>
);

FriendView.propTypes = {
  children: PropTypes.node,
};

export default FriendView;
