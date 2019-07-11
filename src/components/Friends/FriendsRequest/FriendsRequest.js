import React from 'react';
import PropTypes from 'prop-types';

import './FriendsRequest.css';

const FriendsRequest = ({ children }) => (
  <div className="friendsRequest-main">
    요청온 목록 화면 입니다.
    <br />
    {children}
  </div>
);

FriendsRequest.propTypes = {
  children: PropTypes.node,
};

export default FriendsRequest;
