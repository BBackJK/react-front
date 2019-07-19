/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import { dateConverter } from "../../../util";
import "./Lists.css";

const Lists = ({ lists, children, theme }) => {
  return theme === "user" ? (
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
          {"                 "}({dateConverter(lists.created_at)})
          {"                 "}
          {children}
        </li>
      </ul>
    </div>
  ) : theme === "message" ? (
    <div className="lists-main">
      <ul className="lists-ul">
        <li>
          <b>{lists.category}</b>
          {"                 "}({dateConverter(lists.created_at)})
          {"                 "}
          {children}
        </li>
      </ul>
    </div>
  ) : (
    <div className="lists-main">
      <ul className="lists-ul">
        <li className="lists-li">
          <b>{lists.user.name}</b>
          {"                 "}
          {lists.contents.length > 12
            ? "(" + lists.contents.substring(0, 13) + "...)"
            : "(" + lists.contents + ")"}
          {"                 "}
          {children}
        </li>
      </ul>
    </div>
  );
};
Lists.propTypes = {
  lists: PropTypes.object.isRequired,
  children: PropTypes.node,
  theme: PropTypes.string
};

export default Lists;
