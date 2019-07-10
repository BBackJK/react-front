import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { isMobilePhone, isLength } from 'validator';

import { useInput } from '../../../util';
import './ProfileModForm.css';

const ProfileModForm = ({ userInfo, onFunc, children }) => {
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
    <div className="profile-mod-title">
      잠시만 기다려주세요! 정보를 읽어오는 중 입니다..
    </div>
  ) : (
    <div className="profile-mod-main">
      <h1 className="profile-title">
        <b>{userInfo.name} 님</b>
      </h1>
      <form onSubmit={onUpdate}>
        <table className="profile-mod-table">
          <thead>
            <tr>
              <th className="profile-mod-th" />
              <th className="profile-mod-th">Info</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="profile-mod-th">email</th>
              <td className="profile-mod-td">{userInfo.email}</td>
            </tr>
            <tr>
              <th className="profile-mod-th">name</th>
              <td className="profile-mod-td">
                <input
                  className="profile-mod-input"
                  value={_name}
                  onChange={onChangeName}
                  placeholder={userInfo.name}
                  required
                />
              </td>
            </tr>
            <tr>
              <th className="profile-mod-th">phone</th>
              <td className="profile-mod-td">
                <input
                  className="profile-mod-input"
                  value={_phone}
                  onChange={onChangePhone}
                  placeholder={userInfo.phone}
                  required
                />
              </td>
            </tr>
            <tr>
              <th className="profile-mod-th">date</th>
              <td className="profile-mod-td">{userInfo.created_at}</td>
            </tr>
          </tbody>
        </table>
        {phoneValidError && (
          <div className="profile-mod-error">핸드폰 형식에 맞춰주세요</div>
        )}
        {children}
      </form>
    </div>
  );
};

ProfileModForm.propTypes = {
  userInfo: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  onFunc: PropTypes.func,
};

export default ProfileModForm;
