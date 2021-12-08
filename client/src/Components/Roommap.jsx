import React , {useRef, useEffect, useState}from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import room from '../api/room';
const { kakao } = window;



export const Container = styled.div`
    border: 1px solid black;
    width: auto;
    height: auto;
    display: flex;
    justify-content: space-around;
`

export const Box = styled.div`
    border: 1px solid green;
    width: auto;
    height: auto;
    margin: 10px;
`

export const H3 = styled.h3`
    font-weight: inherit;
    border-bottom: 1px solid orange;
    width: fit-content;
    height: auto;
    margin: 2px;
`

export const Place = styled.div`
    font-size: 30px;
    justify-content: flex-start;
`

export const Minimap = styled.div`
    width: 500px;
    height: 400px;
`


const Roommap = ( { address, latitude, longitude }) => {

    // const container = useRef(null);

    // const options = {
    //     center: new kakao.maps.LatLng(33.450701, 126.570667),
    //     level: 3,
    // };
    // const [lat, setLat] = useState(0);
    // const [lon, setLon] = useState(0);
    // const [address, setAddress] = useState('');

    useEffect(async () => {
        // const result = await room.roomDetailApi(room_id)
        // const { latitude, longitude, address } = result.data.data

        // setLat(parseFloat(latitude).toFixed(6))
        // setLon(parseFloat(longitude).toFixed(6))

        const container = document.querySelector('#map')
        const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3,
        };
        const map = new kakao.maps.Map(container, options)
    }, [latitude, longitude]);


    return(
        <Container>
            <Box>
                <H3>모임장소가 어디일까요?</H3>
                    <Place> {address} </Place>
                <Minimap id='map'></Minimap>
            </Box>
            

        </Container>
    )
};

Roommap.defaultProps = {
    place: '광화문',
    latitude:126.8990406557216,
    longitude:37.56820203278462,
};

Roommap.propTypes = {
    place: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
}

export default Roommap;