import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import room from '../api/room';
import debounce from 'lodash/debounce';
import { useSelector } from 'react-redux';
const { kakao } = window;

const MapContainer = styled.div`
  border-radius: 1rem;
  filter: drop-shadow(2px 2px 6px var(--color-shadow));
  width: 25.1rem;
  height: auto;
`;

export const Minimap = styled.div`
  border-radius: 1rem;
  width: 25rem;
  height: 17rem;
`;

const Roommap = ({ address, latitude, longitude, draggable = true }) => {
  const [center, setCenter] = useState({ latitude: 0, longitude: 0 });
  const asdf = useSelector((state) => state.gathReducer)

  useEffect(() => {
      
    const container = document.querySelector('#map');
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
      draggable,
    };
    const map = new kakao.maps.Map(container, options);

    const markerPosition = new kakao.maps.LatLng(latitude, longitude);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    kakao.maps.event.addListener(map, 'center_changed', () => {
      const level = map.getLevel();
      const latlng = map.getCenter(); // .Ma : 위도, .La: 경도

      marker.setPosition(latlng);

      setCenter({
        latitude: latlng.Ma.toFixed(6),
        longitude: latlng.La.toFixed(6),
      });
    });
  }, [latitude, longitude]);

  return (
    <>
      <MapContainer>
        <Minimap id="map"></Minimap>
      </MapContainer>
    </>
  );
};

// Roommap.propTypes = {
//   address: PropTypes.string.isRequired,
//   latitude: PropTypes.number.isRequired,
//   longitude: PropTypes.number.isRequired,
//   center: PropTypes.shape({
//     latitude: PropTypes.number.isRequired,
//     longitude: PropTypes.number.isRequired,
//   }),
//   setCenter: PropTypes.func.isRequired,
// };

export default Roommap;
