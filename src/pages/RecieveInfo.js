import React from 'react';
import PropTypes from 'prop-types';

import { RecieveInfoContainer } from '../containers';

const RecieveInfo = ({ match }) => <RecieveInfoContainer infoId={match.params.id} />;

RecieveInfo.propTypes = {
  match: PropTypes.object.isRequired,
};

export default RecieveInfo;
