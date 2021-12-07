import React , {useRef, useEffect}from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
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


const Roommap = () => {

    // const container = useRef(null);

    // const options = {
    //     center: new kakao.maps.LatLng(33.450701, 126.570667),
    //     level: 3,
    // };


        useEffect(() => {
        const container = document.querySelector('#map')
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        const map = new kakao.maps.Map(container, options)
    }, []);


    return(
        <Container>
            <Box>
                <H3>모임장소가 어디일까요?</H3>
                    <Place> 장소 </Place>
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