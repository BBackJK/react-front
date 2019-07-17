import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../../../util';
import './MessageSendForm.css';

const MessageSendForm = ({ followLists, messageLists, onFunc, children }) => {
  const [followIndex, onChangeFollowIndex] = useInput('');
  const [messageIndex, onChangeMessageIndex] = useInput('');
  const [writeContents, onChangeWriteContents] = useInput('');
  const [contentsError, setContentsError] = useState(false);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);

  useEffect(() => {
    const options = {
      timeout: 10000,
      enableHighAccuaracy: true,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (err) => {
          console.log(err);
        },
        options,
      );
    }
  }, [lat, lng]);

  const onSendSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (messageIndex === '' && writeContents === '') {
        return setContentsError(true);
      }

      let postData;

      if (messageIndex === '') {
        postData = {
          id: followLists[followIndex].user.id,
          name: followLists[followIndex].user.name,
          email: followLists[followIndex].user.email,
          contents: writeContents,
          lat,
          lng,
        };
      }

      if (messageIndex !== '') {
        postData = {
          id: followLists[followIndex].user.id,
          name: followLists[followIndex].user.name,
          email: followLists[followIndex].user.email,
          contents: messageLists[messageIndex].contents,
          lat,
          lng,
        };
      }

      return onFunc(postData);
    },
    [followIndex, messageIndex, writeContents],
  );

  return (
    <div className="message-send-main">
      <h1 className="message-send-title">메세지 전송</h1>
      <form onSubmit={onSendSubmit}>
        <table className="message-send-table">
          <thead>
            <tr>
              <th className="message-send-th">follower</th>
              <td className="message-send-td">
                <select
                  name="follow"
                  className="message-send-select"
                  value={followIndex}
                  onChange={onChangeFollowIndex}
                >
                  <option value="main">친구를 선택하세요</option>
                  {followLists.length === 0 ? (
                    <option value="wait">잠시만 기다려주세요</option>
                  ) : (
                    followLists.map((m, i) => (
                      <option key={m.id} value={i}>
                        {m.user.name}
                      </option>
                    ))
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th className="message-send-th">message</th>
              <td className="message-send-td">
                <select
                  name="message"
                  className="message-send-select"
                  value={messageIndex}
                  onChange={onChangeMessageIndex}
                >
                  <option value="main">메세지를 선택하세요</option>
                  {messageLists.length === 0 ? (
                    <option value="wait">잠시만 기다려주세요</option>
                  ) : (
                    messageLists.map((m, i) => (
                      <option key={m.id} value={i}>
                        {m.category}
                      </option>
                    ))
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th className="message-send-th" />
              <td className="message-send-td">
                {messageIndex === '' ? (
                  <textarea
                    className="message-send-textarea"
                    cols="30"
                    rows="3"
                    value={writeContents}
                    onChange={onChangeWriteContents}
                    placeholder="직접 작성해서 보내보세요"
                  />
                ) : (
                  <textarea
                    className="message-send-textarea"
                    cols="30"
                    rows="3"
                    placeholder={messageLists[messageIndex].contents}
                  />
                )}
              </td>
            </tr>
          </thead>
        </table>
        {contentsError ? (
          <div className="message-send-error">내용을 확인해 주세요!</div>
        ) : (
          <br />
        )}
        {children}
      </form>
    </div>
  );
};

MessageSendForm.propTypes = {
  followLists: PropTypes.object,
  messageLists: PropTypes.object,
  onFunc: PropTypes.func,
  children: PropTypes.node,
};

export default MessageSendForm;
