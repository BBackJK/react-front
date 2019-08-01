/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './LocationView.css';

const LocationView = ({ latlng, children }) => {
  useEffect(() => {
    // lat,lng 추출
    const idx = latlng.indexOf(',');
    const lat = latlng.substring(0, idx);
    const lng = latlng.substring(idx + 1);

    // 지도 생성
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 4,
    };

    const map = new kakao.maps.Map(container, options);

    // 마커 표시
    const markerPosition = new kakao.maps.LatLng(lat, lng);

    const markers = new kakao.maps.Marker({
      position: markerPosition,
    });

    markers.setMap(map);

    // 인포윈도우 생성
    const infoWindow = new kakao.maps.InfoWindow({
      position: new kakao.maps.LatLng(lat, lng),
      content: '<div style="padding:5px;">여기서 전송했어요!</div>',
    });

    infoWindow.open(map, markers);

    // 줌 컨트롤 생성
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  return (
    <div className="location-main">
      <div id="map" className="location-map" />
      {children}
    </div>
  );
};

LocationView.propTypes = {
  children: PropTypes.node,
  latlng: PropTypes.string,
};

export default LocationView;
