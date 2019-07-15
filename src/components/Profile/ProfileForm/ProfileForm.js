/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import "./ProfileForm.css";

const ProfileForm = ({ userInfo, children }) =>
  !userInfo ? (
    <div className="profile-title">
      잠시만 기다려주세요! 정보를 읽어오는 중 입니다..
    </div>
  ) : (
    <div className="profile-main">
      <h1 className="profile-title">
        <b>{userInfo.name} 님</b>
      </h1>
      <table className="profile-table">
        <thead>
          <tr>
            <th className="profile-th" />
            <th className="profile-th">Info</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="profile-th">email</th>
            <td className="profile-td">{userInfo.email}</td>
          </tr>
          <tr>
            <th className="profile-th">name</th>
            <td className="profile-td">{userInfo.name}</td>
          </tr>
          <tr>
            <th className="profile-th">phone</th>
            <td className="profile-td">{userInfo.phone}</td>
          </tr>
          <tr>
            <th className="profile-th">date</th>
            <td className="profile-td">{userInfo.created_at}</td>
          </tr>
        </tbody>
      </table>
      {children}
    </div>
  );

ProfileForm.propTypes = {
  userInfo: PropTypes.object,
  children: PropTypes.node
};

export default ProfileForm;
