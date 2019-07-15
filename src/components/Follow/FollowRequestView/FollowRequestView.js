import React from 'react';
import PropTypes from 'prop-types';

import './FollowRequestView.css';

const FollowRequestView = ({ children }) => (
  <div className="followRequest-main">
    <h1>요청 리스트</h1>
    <br />
    {children}
  </div>
);

FollowRequestView.propTypes = {
  children: PropTypes.node,
};

export default FollowRequestView;
