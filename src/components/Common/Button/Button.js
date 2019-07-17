/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({ type, func, ment }) => {
  return ment.length > 4 ? (
    <button type="button" className="button-normal-extension" onClick={func}>
      {ment}
    </button>
  ) : type === "submit" ? (
    <button type="submit" className="button-submit">
      {ment}
    </button>
  ) : type === "button" ? (
    <button type="button" className="button-normal" onClick={func}>
      {ment}
    </button>
  ) : type === "alarm" ? (
    <button type="alarm" className="button-alarm" onClick={func}>
      <div className="button-blink">{ment}</div>
    </button>
  ) : (
    <button type="info" className="button-info" onClick={func}>
      {ment}
    </button>
  );
};

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
