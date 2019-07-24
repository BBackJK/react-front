import React from 'react';
import PropTypes from 'prop-types';

import { ReceiveInfoContainer } from '../containers';

const ReceiveInfo = ({ match }) => <ReceiveInfoContainer infoId={match.params.id} />;

ReceiveInfo.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ReceiveInfo;
