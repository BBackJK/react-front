import React from 'react';
import PropTypes from 'prop-types';

import './Lists.css';

const Lists = ({ lists, children }) => (
  <div className="lists-main">
    <ul className="lists-ul">
      <li>
        <b>{lists.name}</b>
        {'                 '}({lists.email}){'                 '}
        {children}
      </li>
    </ul>
  </div>
);

Lists.propTypes = {
  lists: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default Lists;
