import React from 'react';
import PropTypes from 'prop-types';

import { AlarmInfoContainer } from '../containers';

const AlarmInfo = ({ match }) => (
  <div>
    <AlarmInfoContainer infoId={match.params.id} />
  </div>
);

AlarmInfo.propTypes = {
  match: PropTypes.object.isRequired,
};

export default AlarmInfo;
