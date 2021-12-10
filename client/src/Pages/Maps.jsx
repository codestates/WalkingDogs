import React,{ useEffect, useState, useMemo } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {Map, MapMarker, CustomOverlayMap} from 'react-kakao-maps-sdk';
import debounce from 'lodash/debounce';
import media from 'styled-media-query'
import Roomcard from '../Components/Roomcard'
import AllButtons from '../Components/AllButtons';

import { searchGatherAction, signinAction, signoutAction } from '../store/actions';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { set } from 'lodash';
import map from '../api/map';




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
    box-sizing: content-box;
    display: flex;
    gap: 0.5;
    z-index: 10;
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
        right: 1rem;
        width: 21rem;
        height: 100%;
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

const CardContainer = styled.div`
    width: auto;
`


// styled-component Boundary
const Maps = () => {

    const dispatch = useDispatch();
    const [listView, setListView] = useState(true);
    // const {conditions, gatherings} = useSelector(({gathReducer})=> gathReducer);
    // const [conditions, setConditions] 
    const [address, setAddress] = useState();

    // const bounds = useMemo(() => {
    //     const bounds = new kakao.maps.LatLngBounds();
    
    //     points &&
    //       points.length > 0 &&
    //       points.forEach((point) => {
    //         bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    //       });
    //     return bounds;
    //   }, [points]);

    const handleDragStart = () => {
        setListView(false);
    }

    const handleDragEnd = () => {
        setListView(true);
    }

    const searchRooms = async (position) => {
        const result = await map.locationApi({ latitude: position.latitude, longitude: position.longitude })
        console.log(result)
    }

    useEffect(async () => {
        const getPosition = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
        }
    
        await getPosition()
        .then((position) => {
            const container = document.querySelector('#map')
            const options = {
                center: new kakao.maps.LatLng(position.coords.latitude.toFixed(6), position.coords.longitude.toFixed(6)),
                level: 3,
            };
            
            const map = new kakao.maps.Map(container, options);
    
            const markerPosition = new kakao.maps.LatLng(position.coords.latitude.toFixed(6), position.coords.longitude.toFixed(6));
    
            const marker = new kakao.maps.Marker({
                position: markerPosition,
            })
    
            marker.setMap(map);
    
            kakao.maps.event.addListener(map, 'center_changed', () => {
                const level = map.getLevel();
                const latlng = map.getCenter(); // .Ma : 위도, .La: 경도
    
                marker.setPosition(latlng)
    
            })
    
            kakao.maps.event.addListener(map, 'dragend', debounce(() => {
                
                searchRooms({ latitude: map.getCenter().Ma.toFixed(6), longitude: map.getCenter().La.toFixed(6) })
    
            }, 1000))
        })
        .catch((err) => {
            const container = document.querySelector('#map')
            const options = {
                center: new kakao.maps.LatLng(37.54861162159671, 127.00215843848797),
                level: 3,
            };
            
            const map = new kakao.maps.Map(container, options);

            const markerPosition = new kakao.maps.LatLng(37.54861162159671, 127.00215843848797);

            const marker = new kakao.maps.Marker({
                position: markerPosition,
            })

            marker.setMap(map);

            kakao.maps.event.addListener(map, 'center_changed', () => {
                const level = map.getLevel();
                const latlng = map.getCenter(); // .Ma : 위도, .La: 경도

                marker.setPosition(latlng)

            })

            kakao.maps.event.addListener(map, 'dragend', debounce(() => {
                
                searchRooms({ latitude: map.getCenter().Ma.toFixed(6), longitude: map.getCenter().La.toFixed(6) })

            }, 1000))
        })
    }, []);

    // useEffect(() => {
    //     console.log(listView)
    // }, [listView])

    // useDeepCompareEffect(() => {
    //     console.log(center)
    // }, [center])

    // const handleCenterChange = debounce(() => {
    //     const geocoder = new kakao.maps.services.Geocoder()

    //     searchAddFromCoords(map.getCenter(), debounce(displayCanterInfo, 50));

    //     kakao.maps.event.addListener(map, 'idle', function () {
    //         searchAddFromCoords(map.getCenter(), debounce(displayCanterInfo,50));
    //     });

    //     const searchAddFromCoords = (coords, callback) =>{
    //         geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    //     }

    //     const displayCanterInfo = (result, status) => {
    //         if(status === kakao.maps.services.Status.OK) {
    //             const infoDiv = result[0].region_2depth_name;
    //             setAddress(infoDiv);
    //         }
    //     }
    // },50)

    return(
        <>
            <MapContainer>
              <KakaoMap id='map'></KakaoMap>
            </MapContainer>
            <RoomList>
                {/* <StyleRoomCard/> */}
            </RoomList>
        </>
    );
}

export default Maps