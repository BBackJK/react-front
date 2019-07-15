import React from 'react';
import PropTypes from 'prop-types';

import './FollowMainView.css';

const FollowMainView = ({ children }) => (
  <div className="follow-main">
    <h1>친구 목록</h1>
    {children}
  </div>
);

FollowMainView.propTypes = {
  children: PropTypes.node,
};

export default FollowMainView;
