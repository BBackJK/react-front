import React from 'react';
import PropTypes from 'prop-types';
import { LocationView, Button } from '../../components';

const ReceiveMapContainer = ({ latlng }) => (
  <LocationView latlng={latlng}>
    <Button type="normal" ment="뒤로가기" />
  </LocationView>
);
ReceiveMapContainer.propTypes = {
  latlng: PropTypes.string,
};

export default ReceiveMapContainer;
