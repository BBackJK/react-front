import React from 'react';
import PropTypes from 'prop-types';

import './RecieveMainView.css';

const RecieveMainView = ({ children }) => (
  <div className="recieve-main">
    <h1>받은 메시지 목록</h1>
    {children}
  </div>
);

RecieveMainView.propTypes = {
  children: PropTypes.node,
};

export default RecieveMainView;
