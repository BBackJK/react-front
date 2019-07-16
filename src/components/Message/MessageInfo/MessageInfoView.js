import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../../../util';
import './MessageInfoView.css';

const MessageInfoView = ({ messageInfo, children, onFunc }) => {
  const [category, onChangeCategory] = useInput('');
  const [contents, onChangeContents] = useInput('');

  const onUpdateSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const putData = { category, contents };

      return onFunc(putData);
    },
    [category, contents],
  );

  return !messageInfo ? (
    <div className="message-info-main">
      잠시만 기다려주세요! 정보를 읽어오는 중 입니다..
    </div>
  ) : (
    <div className="message-info-main">
      <h1 className="message-info-title">메시지 정보</h1>
      <form onSubmit={onUpdateSubmit}>
        <table className="message-info-table">
          <thead>
            <tr>
              <th className="message-info-th">Category</th>
              <td className="message-info-td">
                <input
                  className="message-info-input"
                  value={category}
                  onChange={onChangeCategory}
                  placeholder={messageInfo.category}
                  required
                />
              </td>
            </tr>
            <tr>
              <th className="message-info-th">Contents</th>
              <td className="message-info-td">
                <textarea
                  className="message-info-textarea"
                  rows="17"
                  cols="50"
                  value={contents}
                  onChange={onChangeContents}
                  placeholder={messageInfo.contents}
                  required
                />
              </td>
            </tr>
            <tr>
              <th className="message-info-th">date</th>
              <td className="message-info-td">{messageInfo.created_at}</td>
            </tr>
            <tr>
              <th className="message-info-th">update date</th>
              {!messageInfo.updated_at ? (
                <td className="message-info-td">변경한 기록이 없습니다.</td>
              ) : (
                <td className="message-info-td">{messageInfo.updated_at}</td>
              )}
            </tr>
          </thead>
        </table>
        {children}
      </form>
    </div>
  );
};

MessageInfoView.propTypes = {
  messageInfo: PropTypes.object,
  children: PropTypes.node,
  onFunc: PropTypes.func,
};

export default MessageInfoView;
