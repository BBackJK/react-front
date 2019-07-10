/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({ type, func, ment }) =>
  type === "submit" ? (
    <button type="submit" className="button-submit">
      {ment}
    </button>
  ) : (
    <button type="button" className="button-cancel" onClick={func}>
      {ment}
    </button>
  );

Button.propTypes = {
  type: PropTypes.string.isRequired,
  ment: PropTypes.string.isRequired,
  func: PropTypes.func
};

Button.defaultProps = {
  func: () => {
    window.history.back();
  }
};

export default Button;
