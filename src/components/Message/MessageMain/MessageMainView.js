import React from 'react';
import PropTypes from 'prop-types';

import './MessageMainView.css';

const MessageMainView = ({ children }) => (
  <div className="message-main">
    <h1>메시지 목록</h1>
    {children}
  </div>
);

MessageMainView.propTypes = {
  children: PropTypes.node,
};

export default MessageMainView;
