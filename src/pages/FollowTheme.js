import React from 'react';
import PropTypes from 'prop-types';

import { FollowRequestContainer, FollowSearchContainer } from '../containers';

const FollowTheme = ({ match }) => {
  console.log(match);

  return match.params.theme === 'search' ? (
    <FollowSearchContainer />
  ) : (
    <FollowRequestContainer />
  );
};

FollowTheme.propTypes = {
  match: PropTypes.object.isRequired,
};

export default FollowTheme;
