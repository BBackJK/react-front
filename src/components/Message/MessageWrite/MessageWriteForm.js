import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../../../util';

import './MessageWriteForm.css';

const MessageWriteForm = ({ children, onFunc }) => {
  const [category, onChangeCategory] = useInput('');
  const [contents, onChangeContents] = useInput('');

  const onAddSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const postData = {
        category,
        contents,
      };

      return onFunc(postData);
    },
    [category, contents],
  );

  return (
    <div className="message-write-main">
      <h1 className="message-write-title">메세지 작성</h1>
      <form onSubmit={onAddSubmit}>
        <table className="message-write-table">
          <thead>
            <tr>
              <th className="message-write-th">Category</th>
              <td className="message-write-td">
                <input
                  className="message-write-input"
                  value={category}
                  onChange={onChangeCategory}
                  placeholder="카테고리를 작성하세요.."
                />
              </td>
            </tr>
            <tr>
              <th className="message-write-th">Contents</th>
              <td className="message-write-td">
                <textarea
                  className="message-write-textarea"
                  rows="17"
                  cols="50"
                  value={contents}
                  onChange={onChangeContents}
                  placeholder="내용을 작성하세요.."
                />
              </td>
            </tr>
          </thead>
        </table>
        {children}
      </form>
    </div>
  );
};

MessageWriteForm.propTypes = {
  children: PropTypes.node,
  onFunc: PropTypes.func,
};

export default MessageWriteForm;
