/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({ type, func, ment }) =>
  type === "submit" ? (
    <button type="submit" className="button-submit">
      {ment}
    </button>
  ) : type === "button" ? (
    <button type="button" className="button-normal" onClick={func}>
      {ment}
    </button>
  ) : (
    <button type="alarm" className="button-alarm" onClick={func}>
      <div className="button-blink">{ment}</div>
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
