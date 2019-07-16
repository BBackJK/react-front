/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import './FollowSearchView.css';

const FollowSearchView = ({ searchData, children, error }) => (
  <div className="follow-search-main">
    {!searchData ? (
      <div>번호를 검색하여 친구를 추가하세요!</div>
    ) : searchData.length === 0 ? (
      <div className="follow-search-error">
        찾으시는 번호는 등록되어있지 않은 번호입니다
        <p>다시 확인하여 검색해주세요</p>
      </div>
    ) : (
      <div>
        {children}
        {error === 400 ? (
          <div className="follow-search-error">자신을 추가할 수 없습니다</div>
        ) : error === 409 ? (
          <div className="follow-search-error">
            이미 친구로 등록된 중복된 요청입니다
            <p>친구가 아니시라면 요청수락을 기다리시거나 요청을 수락하세요!</p>
          </div>
        ) : (
          <div />
        )}
      </div>
    )}
  </div>
);

FollowSearchView.propTypes = {
  searchData: PropTypes.object,
  children: PropTypes.node,
  error: PropTypes.string,
};

FollowSearchView.defaultProps = {
  searchData: null,
};

export default FollowSearchView;
