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
    background-color: rgba(255, 255, 255, 0);
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
        padding: 1rem;
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

const CardContainer = styled.div`
    border: 5px solid ${(props) => props.focused ? '#2196f3c9' : 'transparent'};
    border-radius: 1.4rem;
`

// styled-component Boundary
const Maps = () => {

    const { position } = useSelector(({ posReducer }) => posReducer)
    const [rooms, setRooms] = useState([])
    const markers = []
    const [focused, setFocused] = useState(null)
    let circle
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
        
    // const toggleCircle = () => {
        
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
                    content: `<span style='padding: 5px;'>${el.title}</span>`, // 인포윈도우에 표시할 내용
                });
    
                const mouseOver = (map, marker, infoWindow) => {
                    return () => {
                        const top = document.querySelector(`#card${el.id}`).offsetTop
                        document.querySelector('#roomList').scrollTo({ top, behavior: 'smooth' })
                        infoWindow.open(map, marker)
                        setFocused(el.id)
                    }
                }
    
                const mouseOut = (infoWindow) => {
                    return () => {
                        infoWindow.close()
                        setFocused(null)
                    }
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
                    content: `<span style='padding: 5px;'>${el.title}</span>`, // 인포윈도우에 표시할 내용
                });
    
                const mouseOver = (map, marker, infoWindow) => {
                    return () => {
                        const top = document.querySelector(`#card${el.id}`).offsetTop
                        document.querySelector('#roomList').scrollTo({ top, behavior: 'smooth' })
                        infoWindow.open(map, marker)
                        setFocused(el.id)
                    }
                }
    
                const mouseOut = (infoWindow) => {
                    return () => {
                        infoWindow.close()
                        setFocused(null)
                    }
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
            
            const markerPosition = new kakao.maps.LatLng(position.latitude, position.longitude);
            
            const imageSource = 'https://walkingdogs.s3.ap-northeast-2.amazonaws.com/original/center_marker.png'  // 이미지 서버에 넣고 주소 대체
            const imageSize = new kakao.maps.Size(50, 50)
            const imageOption = { offset: new kakao.maps.Point(25, 25) }

            const markerImg = new kakao.maps.MarkerImage(imageSource, imageSize, imageOption)
        
            const centerMarker = new kakao.maps.Marker({
                image: markerImg,
                position: markerPosition,
                zIndex: 10,
            })
    
            circle = new kakao.maps.Circle({
                center : new kakao.maps.LatLng(position.latitude, position.longitude),  // 원의 중심좌표 입니다 
                radius: 1500, // 미터 단위의 원의 반지름입니다 
                strokeWeight: 3, // 선의 두께입니다 
                strokeColor: '#75B8FA', // 선의 색깔입니다
                strokeOpacity: 0.4, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid', // 선의 스타일 입니다
                fillColor: '#CFE7FF', // 채우기 색깔입니다
                fillOpacity: 0.2  // 채우기 불투명도 입니다   
            });
            
            centerMarker.setMap(kakaoMap);
            circle.setMap(kakaoMap);
    
            const zoomControl = new kakao.maps.ZoomControl();
            kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

            kakao.maps.event.addListener(kakaoMap, 'zoom_changed', () => {
                kakaoMap.getLevel() < 4 ? circle.setMap(null) : circle.setMap(kakaoMap)
            });

            kakao.maps.event.addListener(kakaoMap, 'center_changed', () => {
                const latlng = kakaoMap.getCenter(); // .Ma : 위도, .La: 경도
    
                circle.setPosition(latlng)
                centerMarker.setPosition(latlng)
            })

            kakao.maps.event.addListener(kakaoMap, 'dragstart', () => {
                
                circle.setMap(null)

            });
    
            kakao.maps.event.addListener(kakaoMap, 'dragend', debounce(() => {
                
                searchRooms({ latitude: kakaoMap.getCenter().Ma.toFixed(6), longitude: kakaoMap.getCenter().La.toFixed(6) })                
                kakaoMap.getLevel() < 4 ? circle.setMap(null) : circle.setMap(kakaoMap)

            }, 200))
        }
        
        initFunction();
        
    }, []);

    return(
        <>
            <MapContainer>
              <KakaoMap id='map'></KakaoMap>
              <RoomList id='roomList'>
                {/* <StyledRoomCard/> */}
                {rooms.map((el) => {
                    return (
                        (
                            el.id === focused ?
                            <CardContainer id={`card${el.id}`} focused={true}>
                                <Roomcard key={el.id} listKey={el.id} room={{ ...el }} />
                            </CardContainer>
                            :
                            <CardContainer id={`card${el.id}`} focused={false}>
                                <Roomcard key={el.id} listKey={el.id} room={{ ...el }} />
                            </CardContainer>
                        )
                    )
                })}
              </RoomList>
              {/* <RadiusBtn onClick={handleButtonClickRadiusToggle}>반경 표시</RadiusBtn> */}
            </MapContainer>
        </>
    );
}

export default Maps