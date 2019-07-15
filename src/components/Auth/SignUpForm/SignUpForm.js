/* eslint-disable no-unused-expressions */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { isEmail, isMobilePhone, isLength } from 'validator';

import { useInput } from '../../../util';
import './SignUpForm.css';

const SignUpForm = ({ onFunc, children }) => {
  const [_email, onChangeEmail] = useInput('');
  const [_name, onChangeName] = useInput('');
  const [_phone, onChangePhone] = useInput('');
  const [emailValidError, setEmailValidError] = useState(false);
  const [phoneValidError, setPhoneValidError] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!isEmail(_email)) {
        return setEmailValidError(true);
      }
      if (!isMobilePhone(_phone) || !isLength(_phone, { min: 11, max: 11 })) {
        return setPhoneValidError(true);
      }

      const signUpData = {
        email: _email,
        name: _name,
        phone: _phone,
      };

      return onFunc(signUpData);
    },
    [_email, _name, _phone],
  );

  return (
    <div className="sign-up-main">
      <h1 className="sign-up-title">등록이 되어있지 않으시군요!</h1>
      <h3 className="sign-up-title">
        간단한 정보를 등록 후 서비스를 이용해 주세요!
      </h3>
      <hr className="sign-up-hr" />
      <form onSubmit={onSubmit} className="sign-up-form">
        <div>
          <div className="sign-up-label">
            <label>
              <b>Email</b>
            </label>
          </div>
          <input
            placeholder="Your Email..."
            className="sign-up-input"
            value={_email}
            onChange={onChangeEmail}
            required
          />
          {emailValidError && (
            <div className="sign-up-error">이메일 형식에 맞춰주세요</div>
          )}
        </div>
        <div>
          <div className="sign-up-label">
            <label>
              <b>Name</b>
            </label>
          </div>
          <input
            placeholder="Your Name..."
            className="sign-up-input"
            value={_name}
            onChange={onChangeName}
            required
          />
        </div>
        <div>
          <div className="sign-up-label">
            <label>
              <b>Phone</b>
            </label>
          </div>
          <input
            placeholder="Your Phone...   ex) 010XXXXXXXX"
            className="sign-up-input"
            value={_phone}
            onChange={onChangePhone}
            required
          />
          {phoneValidError && (
            <div className="sign-up-error">핸드폰 형식에 맞춰주세요</div>
          )}
        </div>
        {children}
      </form>
    </div>
  );
};

SignUpForm.propTypes = {
  onFunc: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default SignUpForm;
