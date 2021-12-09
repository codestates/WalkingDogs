import React,{ useEffect } from 'react';
import styled from 'styled-components'
import Roomcard from '../Components/Roomcard'
const {kakao} = window;


const MapContainer = styled.div`
    width: auto;
    height: auto;
`

const Minimap = styled.div`
    width: auto;
    min-height: 50rem;
`


const CardContainer = styled.div`
    width: auto;
`


// styled-component Boundary
const Maps = () => {

    useEffect(() => {
        const container = document.querySelector('#map')
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        const map = new kakao.maps.Map(container, options)
    }, []);

    return(
        <>
            <MapContainer>
                <Minimap id="map"></Minimap>
            </MapContainer>
        </>
    );
}

export default Maps