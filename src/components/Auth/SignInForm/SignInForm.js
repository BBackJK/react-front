import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

import './SignInForm.css';

const SignInForm = ({ successGoogle, responseFailure }) => (
  <div className="sign-in-main">
    <form className="sign-in-form">
      <b className="sign-in-title"> LOGIN </b>
      <br />
      <br />
      <br />
      <b> 쉽게 로그인 하세요!</b>
      <br />
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_KEY}
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={successGoogle}
        onFailure={responseFailure}
        className="sign-in-google-btn"
      />
    </form>
  </div>
);

SignInForm.propTypes = {
  successGoogle: PropTypes.func.isRequired,
  responseFailure: PropTypes.func.isRequired,
};

export default SignInForm;
