import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { isMobilePhone, isLength } from 'validator';

import { useInput } from '../../../util';
import './ProfileUpdateForm.css';

const ProfileUpdateForm = ({ userInfo, onFunc, children }) => {
  const [_name, onChangeName] = useInput(userInfo.name);
  const [_phone, onChangePhone] = useInput(userInfo.phone);

  const [phoneValidError, setPhoneValidError] = useState(false);

  const onUpdate = useCallback(
    (e) => {
      e.preventDefault();

      if (!isMobilePhone(_phone) || !isLength(_phone, { min: 11, max: 11 })) {
        return setPhoneValidError(true);
      }
      const updateData = {
        name: _name,
        phone: _phone,
      };

      return onFunc(updateData);
    },
    [_name, _phone],
  );

  return !userInfo ? (
    <div className="profile-update-title">
      잠시만 기다려주세요! 정보를 읽어오는 중 입니다..
    </div>
  ) : (
    <div className="profile-update-main">
      <h1 className="profile-update-title">
        <b>{userInfo.name} 님</b>
      </h1>
      <form onSubmit={onUpdate}>
        <table className="profile-update-table">
          <thead>
            <tr>
              <th className="profile-update-th" />
              <th className="profile-update-th">Info</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="profile-update-th">email</th>
              <td className="profile-update-td">{userInfo.email}</td>
            </tr>
            <tr>
              <th className="profile-update-th">name</th>
              <td className="profile-update-td">
                <input
                  className="profile-update-input"
                  value={_name}
                  onChange={onChangeName}
                  placeholder={userInfo.name}
                  required
                />
              </td>
            </tr>
            <tr>
              <th className="profile-update-th">phone</th>
              <td className="profile-update-td">
                <input
                  className="profile-update-input"
                  value={_phone}
                  onChange={onChangePhone}
                  placeholder={userInfo.phone}
                  required
                />
              </td>
            </tr>
            <tr>
              <th className="profile-update-th">date</th>
              <td className="profile-update-td">{userInfo.created_at}</td>
            </tr>
          </tbody>
        </table>
        {phoneValidError && (
          <div className="profile-update-error">핸드폰 형식에 맞춰주세요</div>
        )}
        {children}
      </form>
    </div>
  );
};

ProfileUpdateForm.propTypes = {
  userInfo: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  onFunc: PropTypes.func,
};

export default ProfileUpdateForm;
