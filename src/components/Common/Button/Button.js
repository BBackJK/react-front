/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({ type, func, ment, img }) => {
  return type === "submit" ? (
    <button type="submit" className="button-submit">
      {ment}
    </button>
  ) : type === "normal" ? (
    <button type="normal" className="button-normal" onClick={func}>
      {ment}
    </button>
  ) : type === "alarm" ? (
    <button type="alarm" className="button-alarm" onClick={func}>
      <div className="button-blink">{ment}</div>
    </button>
  ) : type === "info" ? (
    <button type="info" className="button-info" onClick={func}>
      {ment}
    </button>
  ) : type === "message-info" ? (
    <button type="info" className="button-message-info" onClick={func}>
      {ment}
    </button>
  ) : (
    <button type="button" className="button-normal-extension" onClick={func}>
      {ment}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  ment: PropTypes.string,
  func: PropTypes.func,
  img: PropTypes.node
};

Button.defaultProps = {
  func: () => {
    window.history.back();
  }
};

export default Button;
