import React from 'react';
import PropTypes from 'prop-types';

import { MessageInfoContainer } from '../containers';

const MessageInfo = ({ match }) => (
  <div>
    <MessageInfoContainer infoId={match.params.id} />
  </div>
);

MessageInfo.propTypes = {
  match: PropTypes.object.isRequired,
};

export default MessageInfo;
