import React , {useEffect, useState}from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import room from '../api/room';
import debounce from 'lodash/debounce'
const { kakao } = window;



const MapContainer = styled.div`
    border-radius: 1rem;
    filter: drop-shadow(2px 2px 6px var(--color-shadow));
    width: 25.1rem;
    height: auto;
`


export const Minimap = styled.div`
    border-radius: 1rem;
    width: 25rem;
    height: 17rem;
`



const Roommap = ( { address, latitude, longitude, draggable = true }) => {

    const [center, setCenter] = useState({ latitude : 0, longitude: 0 })

    useEffect(async () => {
        const container = document.querySelector('#map')
        const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            draggable,
            level: 3,
        };
        const map = new kakao.maps.Map(container, options)

        const markerPosition = new kakao.maps.LatLng(latitude, longitude);

        const marker = new kakao.maps.Marker({
            position: markerPosition,
        })

        marker.setMap(map);

        kakao.maps.event.addListener(map, 'center_changed', () => {
            const level = map.getLevel();
            const latlng = map.getCenter(); // .Ma : 위도, .La: 경도

            marker.setPosition(latlng)

            setCenter({ latitude: latlng.Ma.toFixed(6), longitude: latlng.La.toFixed(6)})
        })

    }, []);


    return(
        <>
        <MapContainer>
            <Minimap id='map'></Minimap>
        </MapContainer>
        </>
    )
};

Roommap.defaultProps = {
    address: '광화문',
    latitude:   "126.8990406557216",
    longitude:  "37.56820203278462",
};

Roommap.propTypes = {
    address: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    center: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }),
    setCenter: PropTypes.func.isRequired,
}

export default Roommap;