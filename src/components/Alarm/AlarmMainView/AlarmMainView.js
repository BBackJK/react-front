import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../../../util';
import './AlarmMainView.css';

const AlarmMainView = ({ children, onFunc }) => {
  const [title, onChangeTitle] = useInput('');

  const onAddSubmit = useCallback(
    (e) => {
      e.preventDefault();
      return onFunc(title);
    },
    [title],
  );

  return (
    <div className="alarm-main">
      <h1>알람 목록</h1>
      {children[0]}
      <br />
      <div>
        <form onSubmit={onAddSubmit}>
          <textarea
            cols="30"
            className="alarm-textarea"
            placeholder="추가할 알람을 적으세요"
            value={title}
            onChange={onChangeTitle}
          />
          <br />
          {children[1]}
        </form>
      </div>
    </div>
  );
};

AlarmMainView.propTypes = {
  children: PropTypes.node,
  onFunc: PropTypes.func,
};

export default AlarmMainView;
