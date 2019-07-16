import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../../../util';
import './AlarmInfoView.css';

const AlarmInfoView = ({ alarmInfo, children, onFunc }) => {
  const [title, onChangeTitle] = useInput('');
  const onUpdate = useCallback(
    (e) => {
      e.preventDefault();

      return onFunc(title);
    },
    [title],
  );

  return !alarmInfo ? (
    <div className="alarm-info-title">
      잠시만 기다려주세요! 정보를 읽어오는 중 입니다..
    </div>
  ) : (
    <div className="alarm-info-main">
      <h1 className="alarm-info-title">
        <b>알람 정보</b>
      </h1>
      <form onSubmit={onUpdate}>
        <table className="alarm-info-table">
          <thead>
            <tr>
              <th className="alarm-info-th" />
              <th className="alarm-info-th">Info</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="alarm-info-th">title</th>
              <td className="alarm-info-td">
                <textarea
                  className="alarm-info-textarea"
                  value={title}
                  onChange={onChangeTitle}
                  placeholder={alarmInfo.title}
                  required
                />
              </td>
            </tr>
            <tr>
              <th className="alarm-info-th">date</th>
              <td className="alarm-info-td">{alarmInfo.created_at}</td>
            </tr>
            <tr>
              <th className="alarm-info-th">update date</th>
              {!alarmInfo.updated_at ? (
                <td className="alarm-info-td">변경한 기록이 없습니다.</td>
              ) : (
                <td className="alarm-info-td">{alarmInfo.updated_at}</td>
              )}
            </tr>
          </tbody>
        </table>
        {children}
      </form>
    </div>
  );
};

AlarmInfoView.propTypes = {
  alarmInfo: PropTypes.object,
  children: PropTypes.node,
  onFunc: PropTypes.func,
};

export default AlarmInfoView;
