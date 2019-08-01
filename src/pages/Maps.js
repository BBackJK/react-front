import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { ReceiveMapContainer } from '../containers';

const Maps = ({ location }) => {
  const query = queryString.parse(location.search);

  return <ReceiveMapContainer latlng={query.latlng} />;
};

Maps.propTypes = {
  location: PropTypes.object,
};

export default Maps;
