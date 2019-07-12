import React from 'react';
import PropTypes from 'prop-types';

import './FriendsRequest.css';

const FriendsRequest = ({ children }) => (
  <div className="friendsRequest-main">
    <h1>요청 리스트</h1>
    <br />
    {children}
  </div>
);

FriendsRequest.propTypes = {
  children: PropTypes.node,
};

export default FriendsRequest;
