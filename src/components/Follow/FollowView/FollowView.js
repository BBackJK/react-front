import React from 'react';
import PropTypes from 'prop-types';

import './FollowView.css';

const FollowView = ({ children }) => (
  <div className="follow-main">
    <h1>친구 목록</h1>
    {children}
  </div>
);

FollowView.propTypes = {
  children: PropTypes.node,
};

export default FollowView;
