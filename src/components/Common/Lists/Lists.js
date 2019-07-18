/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import "./Lists.css";

const Lists = ({ lists, children, theme }) =>
  theme === "user" ? (
    !lists.user ? (
      <div className="lists-main">
        <ul className="lists-ul">
          <li>
            <b>{lists.name}</b>
            {"                 "}({lists.email}){"                 "}
            {children}
          </li>
        </ul>
      </div>
    ) : (
      <div className="lists-main">
        <ul className="lists-ul">
          <li>
            <b>{lists.user.name}</b>
            {"                 "}({lists.user.email}){"                 "}
            {children}
          </li>
        </ul>
      </div>
    )
  ) : theme === "alarm" ? (
    <div className="lists-main">
      <ul className="lists-ul">
        <li>
          <b>{lists.title}</b>
          {"                 "}({lists.created_at}){"                 "}
          {children}
        </li>
      </ul>
    </div>
  ) : theme === "message" ? (
    <div className="lists-main">
      <ul className="lists-ul">
        <li>
          <b>{lists.category}</b>
          {"                 "}({lists.created_at}){"                 "}
          {children}
        </li>
      </ul>
    </div>
  ) : (
    <div className="lists-main">
      <ul className="lists-ul">
        <li>
          <b>{lists.user.name}</b>
          {"                 "}({lists.contents}){"                 "}
          {children}
        </li>
      </ul>
    </div>
  );
Lists.propTypes = {
  lists: PropTypes.object.isRequired,
  children: PropTypes.node,
  theme: PropTypes.string
};

export default Lists;
