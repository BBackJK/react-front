/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';

import './ReceiveInfoView.css';
import { dateConverter } from '../../../util';

const ReceiveInfoView = ({ receiveInfo, children }) => !receiveInfo ? (
    <div className="receive-info-main">
      잠시만 기다려주세요! 정보를 읽어오는 중 입니다..
    </div>
  ) : (
    <div className="receive-info-main">
      <h1 className="receive-info-title">받은 메세지 정보</h1>
      <table className="receive-info-table">
        <thead>
          <tr>
            <th className="receive-info-th">sender</th>
            <td className="receive-info-td">{receiveInfo.user.name}</td>
          </tr>
          <tr>
            <th className="receive-info-th">date</th>
            <td className="receive-info-td">
              {dateConverter(receiveInfo.sended_at)}
            </td>
          </tr>
          <tr>
            <th className="receive-info-th">contents</th>
            <td className="receive-info-td">
              <textarea
                className="receive-info-textarea"
                placeholder={receiveInfo.contents}
                readOnly="readOnly"
                disabled
              />
            </td>
          </tr>
        </thead>
      </table>
      {children}
    </div>
  );

ReceiveInfoView.propTypes = {
  receiveInfo: PropTypes.object,
  children: PropTypes.node,
};

export default ReceiveInfoView;
