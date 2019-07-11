import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { isMobilePhone, isLength } from 'validator';

import { useInput } from '../../../util';
import './SearchForm.css';

const SearchForm = ({ children, onFunc }) => {
  const [searchPhone, onSearchPhone] = useInput('');

  const [phoneValidError, setPhoneValidError] = useState(false);

  const onSearch = useCallback(
    (e) => {
      e.preventDefault();

      if (
        !isMobilePhone(searchPhone)
        || !isLength(searchPhone, { min: 11, max: 11 })
      ) {
        return setPhoneValidError(true);
      }

      const searchData = searchPhone;

      return onFunc(searchData);
    },
    [searchPhone],
  );

  return (
    <div className="searchForm-main">
      <h1>친구를 검색하세요!</h1>
      <form onSubmit={onSearch}>
        <input
          type="search"
          className="searchForm-input"
          placeholder="Input phone number.."
          value={searchPhone}
          onChange={onSearchPhone}
        />
        {'                      '}
        {children}
      </form>
      <br />
      {phoneValidError && (
        <div className="searchForm-error">핸드폰 형식에 맞춰주세요</div>
      )}
    </div>
  );
};

SearchForm.propTypes = {
  children: PropTypes.node,
  onFunc: PropTypes.func.isRequired,
};

export default SearchForm;
