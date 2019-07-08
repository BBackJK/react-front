/* eslint-disable no-unused-expressions */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { isEmail, isMobilePhone } from 'validator';

import './SignUpForm.css';
import { SIGN_UP } from '../../../reducers/user';

const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const SignUpForm = ({ sns }) => {
  const [email, onChangeEmail] = useInput('');
  const [name, onChangeName] = useInput('');
  const [phone, onChangePhone] = useInput('');
  const [emailValidError, setEmailValidError] = useState(null);
  const [phoneValidError, setPhoneValidError] = useState(null);

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      console.log('클릭');
      e.preventDefault();
      !isEmail(email) ? setEmailValidError(true) : setEmailValidError(false);
      !isMobilePhone(phone)
        ? setPhoneValidError(true)
        : setPhoneValidError(false);

      if (emailValidError !== true && phoneValidError !== true) {
        dispatch({
          type: SIGN_UP,
          data: {
            sns_email: sns,
            email,
            name,
            phone,
          },
        });
      }
    },
    [email, name, phone],
  );

  return (
    <div className="sign-up-main">
      <h1 className="sign-up-title">등록이 되어있지 않으시군요!</h1>
      <h3 className="sign-up-title">
        간단한 정보를 등록 후 서비스를 이용해 주세요!
      </h3>
      <form onSubmit={onSubmit} className="sign-up-form">
        <div>
          <div className="sign-up-label">
            <label>Email</label>
          </div>
          <input
            placeholder="Your Email..."
            className="sign-up-input"
            value={email}
            onChange={onChangeEmail}
            required
          />
          {emailValidError && (
            <div className="sign-up-error">이메일 형식에 맞춰주세요.</div>
          )}
        </div>
        <div>
          <div className="sign-up-label">
            <label>Name</label>
          </div>
          <input
            placeholder="Your Name..."
            className="sign-up-input"
            value={name}
            onChange={onChangeName}
            required
          />
        </div>
        <div>
          <div className="sign-up-label">
            <label>Phone</label>
          </div>
          <input
            placeholder="Your Phone...   ex) 010XXXXXXXX"
            className="sign-up-input"
            value={phone}
            onChange={onChangePhone}
            required
          />
          {phoneValidError && (
            <div className="sign-up-error">핸드폰 형식에 맞춰주세요!</div>
          )}
        </div>
        <div>
          <button type="submit" className="sign-up-button">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

SignUpForm.propTypes = {
  sns: PropTypes.string.isRequired,
};

export default SignUpForm;
