import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../../../util';
import './EmailInput.css';

const EmailInput = ({ children, onFunc }) => {
  const [authNumber, onChangeAuthNumber] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const putData = {
        auth: authNumber,
      };

      return onFunc(putData);
    },
    [authNumber],
  );

  return (
    <div className="email-input-main">
      <form onSubmit={onSubmit}>
        <input
          className="email-input-input"
          value={authNumber}
          onChange={onChangeAuthNumber}
          placeholder="인증번호를 입력해주세요!"
        />
        {'                '}
        {children}
      </form>
    </div>
  );
};

EmailInput.propTypes = {
  children: PropTypes.node,
  onFunc: PropTypes.func,
};

export default EmailInput;
