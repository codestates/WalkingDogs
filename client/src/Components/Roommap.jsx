import React , {useRef, useEffect}from 'react';
import styled from 'styled-components';
const { kakao } = window;



export const Container = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 100px;
    display: flex;
`

export const Box = styled.div`
    border: 1px solid green;
    width: 11%;
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

    const container = useRef(null);

    // const options = {
    //     center: new kakao.maps.LatLng(33.450701, 126.570667),
    //     level: 3,
    // };

    useEffect(()=>{}, []);


    return(
        <Container>
            <Box>
                <H3>모임장소가 어디일까요?</H3>
                    <Place> 장소 </Place>
            </Box>
            
                <div id='map' style={{width: '300px',height: '200px;'}}></div>

        </Container>
    )

}

export default Roommap;