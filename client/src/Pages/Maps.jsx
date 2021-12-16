import React,{ useEffect, useState } from 'react';
import styled from 'styled-components'
import { useSelector} from 'react-redux';

import debounce from 'lodash/debounce';
import media from 'styled-media-query'
import Roomcard from '../Components/Roomcard'
import map from '../api/map';

// import { useDispatch } from 'react-redux';
// import {Link} from 'react-router-dom';
// import { searchGatherAction, signinAction, signoutAction } from '../store/actions';
// import useDeepCompareEffect from 'use-deep-compare-effect';
// import { set } from 'lodash';

// import {Map, MapMarker, CustomOverlayMap} from 'react-kakao-maps-sdk';
// import PropTypes from 'prop-types'
// import AllButtons from '../Components/AllButtons';

const {kakao} = window;


const MapContainer = styled.div`
    width: 100vw;
    height: calc (200vh - 73px);
    height: calc (var(--vh, 1vh) * 200 -73px);
    filter: drop-shadow(2px 2px 6px var(--color-shadow));
    text-align: center;
    ${media.lessThan("medium")`
        height: calc (200vh - 57px);
        height: calc (var(--vh, 1vh) * 200 - 57px);
    `}
`

const RoomList = styled.div`
    background-color: rgba(255, 255, 255, 0.6);
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    gap: 0.5;
    z-index: 10;
    overflow-y: auto;
    transition: margin 0.7s ease-in-out;
    -moz-transition: margin 0.7s ease-in-out;
    -webkit-transition: margin 0.7s ease-in-out;
        ::-webkit-scrollbar {
            display: none;
        }
    ${media.greaterThan("medium")`
        flex-direction: column;
        position: absolute;
        top: 0rem;
        right: 21rem;
        width: 21rem;
        height: 85vh;
        margin: ${(props) => (props.listView ? "0rem 0rem" : "0rem -21rem")};
        > div:first-child {
        margin-top: 0.8rem;
        }
    `};
    ${media.lessThan("medium")`
        flex-direction: row;
        position: absolute;
        left: 0rem;
        bottom: ${(props) => (props.conditions ? "5.5rem" : "0.5rem")}; 
        width: 100%;
        height: 85vh;
        margin: ${(props) => (props.listView ? "0rem 0rem" : "-18rem 0rem")};
        > * {
        margin: 0rem 0.3rem;
        }
        > div:first-child {
        margin-left: 0.8rem;
        }
    `};
`

// const StyleRoomCard = styled(Roomcard)`
//     border: 3px solid var(--color-white);
//     &.hovered{
//         box-shadow: 2px 2px var(--color-mainviolet--50);
//     }
// `

const KakaoMap = styled.div`
    width: 100vw;
    height: 85vh;
`

// const CardContainer = styled.div`
//     width: auto;
// `

// const RadiusBtn = styled.button`
//     position: absolute;
//     width: 100px;
//     height: 50px;
//     border-radius: 25px;
//     border: 1px solid skyblue;
//     top: 0rem;
//     left: 5%;
//     z-index: 10;
//     background-color: white;
// `

const StyledRoomcard = styled(Roomcard)`
    
    `

// styled-component Boundary
const Maps = () => {

    const { position } = useSelector(({ posReducer }) => posReducer);
    const [rooms, setRooms] = useState([]);
    const markers = []
    let kakaoMap
    
    // const dispatch = useDispatch();
    // const [listView, setListView] = useState(true);
    // const [address, setAddress] = useState();

    // const handleDragStart = () => {
    //     setListView(false);
    // }
    
    // const handleDragEnd = () => {
        //     setListView(true);
        // }
        
        
    useEffect(() => {
        const searchRooms = async (position) => {
            const result = await map.locationApi({ latitude: position.latitude, longitude: position.longitude })
            
            setRooms([ ...result.data.rooms ]);
    
            result.data.rooms.forEach(el => {
                const marker = new kakao.maps.Marker({
                    map: kakaoMap,
                    position: new kakao.maps.LatLng(el.latitude, el.longitude),
                    title: el.title,
                })
                markers.push(marker)
    
                const infoWindow = new kakao.maps.InfoWindow({
                    content: el.title // 인포윈도우에 표시할 내용
                });
    
                const mouseOver = (map, marker, infoWindow) => {
                    return () => { infoWindow.open(map, marker) }
                }
    
                const mouseOut = (infoWindow) => {
                    return () => { infoWindow.close() }
                }
    
                kakao.maps.event.addListener(marker, 'mouseover', mouseOver(kakaoMap, marker, infoWindow));
                kakao.maps.event.addListener(marker, 'mouseout', mouseOut(infoWindow));
            })
    
            markers.forEach(el => {
                const path = [kakaoMap.getCenter(), el.getPosition()];
                const line = new kakao.maps.Polyline({ path });
                const dist = line.getLength();
    
                if(dist > 1500)
                    el.setMap(null)
            })
        }

        const initFunction = async () => {
            window.scrollTo(0,0);
            const container = document.querySelector('#map')
            const options = {
                center: new kakao.maps.LatLng(position.latitude, position.longitude),
                level: 4,
            };

            kakaoMap = new kakao.maps.Map(container, options);
            
            const markerPosition = new kakao.maps.LatLng(position.latitude, position.longitude);
            
            const marker = new kakao.maps.Marker({
                position: markerPosition,
            })
    
            // const circle = new kakao.maps.Circle({
                //     center : new kakao.maps.LatLng(position.latitude, position.longitude),  // 원의 중심좌표 입니다 
            //     radius: 1000, // 미터 단위의 원의 반지름입니다 
            //     strokeWeight: 5, // 선의 두께입니다 
            //     strokeColor: '#75B8FA', // 선의 색깔입니다
            //     strokeOpacity: 0.4, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            //     strokeStyle: 'solid', // 선의 스타일 입니다
            //     fillColor: '#CFE7FF', // 채우기 색깔입니다
            //     fillOpacity: 0.2  // 채우기 불투명도 입니다   
            // });
            
            marker.setMap(kakaoMap);
            // circle.setMap(kakaoMap);
    
            const zoomControl = new kakao.maps.ZoomControl();
            kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);
    
            kakao.maps.event.addListener(kakaoMap, 'center_changed', () => {
                const latlng = kakaoMap.getCenter(); // .Ma : 위도, .La: 경도
    
                // circle.setPosition(latlng)
                marker.setPosition(latlng)
            })
    
            kakao.maps.event.addListener(kakaoMap, 'dragend', debounce(() => {
                
                searchRooms({ latitude: kakaoMap.getCenter().Ma.toFixed(6), longitude: kakaoMap.getCenter().La.toFixed(6) })
                
            }, 200))
        }
        
        initFunction();
        
    }, []);

    return(
        <>
            <MapContainer>
              <KakaoMap id='map'></KakaoMap>
              <RoomList>
                {/* <StyledRoomCard/> */}
                {rooms.map((el) => {
                    return <StyledRoomcard key={el.id} listKey={el.id} room={{ ...el }} />
                })}
              </RoomList>
              {/* <RadiusBtn onClick={handleButtonClickRadiusToggle}>반경 표시</RadiusBtn> */}
            </MapContainer>
        </>
    );
}

export default Maps