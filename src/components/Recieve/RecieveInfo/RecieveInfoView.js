import React from 'react';
import PropTypes from 'prop-types';

import './RecieveInfoView.css';

const RecieveInfoView = ({ recieveInfo, children }) => {
  console.log(recieveInfo);

  return !recieveInfo ? (
    <div className="recieve-info-main">
      잠시만 기다려주세요! 정보를 읽어오는 중 입니다..
    </div>
  ) : (
    <div className="recieve-info-main">
      <h1 className="recieve-info-title">받은 메세지 정보</h1>
      <table className="recieve-info-table">
        <thead>
          <tr>
            <th className="recieve-info-th">sender</th>
            <td className="recieve-info-td">{recieveInfo.user.name}</td>
          </tr>
          <tr>
            <th className="recieve-info-th">latitude</th>
            <td className="recieve-info-td">{recieveInfo.lat}</td>
          </tr>
          <tr>
            <th className="recieve-info-th">longitude</th>
            <td className="recieve-info-td">{recieveInfo.lng}</td>
          </tr>
          <tr>
            <th className="recieve-info-th">date</th>
            <td className="recieve-info-td">{recieveInfo.sended_at}</td>
          </tr>
          <tr>
            <th className="recieve-info-th">contents</th>
            <td className="recieve-info-td">{recieveInfo.contents}</td>
          </tr>
        </thead>
      </table>
      {children}
    </div>
  );
};

RecieveInfoView.propTypes = {
  recieveInfo: PropTypes.object,
  children: PropTypes.node,
};

export default RecieveInfoView;
