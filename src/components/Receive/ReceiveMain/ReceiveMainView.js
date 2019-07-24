import React from 'react';
import PropTypes from 'prop-types';

import './ReceiveMainView.css';

const ReceiveMainView = ({ children }) => (
  <div className="receive-main">
    <h1>받은 메시지 목록</h1>
    {children}
  </div>
);

ReceiveMainView.propTypes = {
  children: PropTypes.node,
};

export default ReceiveMainView;
