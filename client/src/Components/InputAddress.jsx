import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import media from 'styled-media-query';
import DataListInput from 'react-plain-datalist-input';
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce';
import {useSelector} from 'react-redux';

const {kakao} = window;

const Container = styled.div`
  border-radius: 1rem;
  filter: drop-shadow(2px 2px 6px var(--color-shadow));
  width: 28.1rem;
  height: auto;
`

const Map = styled.div`
  border-radius: 1rem;
  width: 20rem;
  height: 19rem;
`;


const Button = styled.button`
    border: 1px solid black;
    width: 10rem;
    height: 10rem;

`

//styled-components Boundary

const InputAddress = ({addressInput, setAddressInput, draggable = true}) => {

    const {position} = useSelector(({posReducer})=> posReducer);

    const geoCoder = new kakao.maps.services.Geocoder(); // 카카오 주소-좌표 변환 객체 생성
    const coord2Address = (latitude, longitude) => {
      return new Promise((resolve, reject) => {
        geoCoder.coord2Address(longitude, latitude, (result, status) => {
          if(status === kakao.maps.services.Status.OK){
            resolve(result)
          }
          else {
            reject(status)
          }
        })
      })
    }
  
    const infoElement = document.createElement('div')
    const elementStyle = `color: black; width: 200px; height: 30px; font-size: 14px; display: flex; align-items: center; justify-contents: center;`
    infoElement.setAttribute('style', elementStyle)
  
    useEffect(async () => {
      const container = document.querySelector('#map');
      const options = {
        center: new kakao.maps.LatLng(position.latitude, position.longitude),
        level: 3,
        draggable,
        disableDoubleClick: !draggable,
      };
      const kakaoMap = new kakao.maps.Map(container, options); // 카카오 map 생성
  
      const markerPosition = new kakao.maps.LatLng(position.latitude, position.longitude); // 현재 위치 좌표 저장
  
      const marker = new kakao.maps.Marker({ // 마커의 위치를 현재 위치로
        position: markerPosition,
      });
  
      marker.setMap(kakaoMap); // 카카오 map에 마커 등록
  
      if(draggable) {
        let latlng = kakaoMap.getCenter(); // 지도 중심좌표 저장
        
        let address = await coord2Address(latlng.getLat(), latlng.getLng()) // 최초 좌표 주소 요청
  
        setAddressInput(
          [
            {
              address: address[0].road_address === null ? address[0].address : address[0].road_address,
              latitude: Number(latlng.getLat().toFixed(6)),
              longitude: Number(latlng.getLng().toFixed(6)),
            }
          ]
        )
  
        // iwContent에 넣는 custom Element가 설명으로 표시 됩니다.
  
        infoElement.textContent = `${address[0].road_address === null ? address[0].address.address_name : address[0].road_address.address_name}`
      
        const iwContent = infoElement
        const infoWindow = new kakao.maps.InfoWindow({
          position: latlng,
          content: iwContent,
        })
  
        infoWindow.open(kakaoMap, marker)
  
        // 중심 좌표가 변화했을 때,
        kakao.maps.event.addListener(kakaoMap, 'center_changed', () => {
          latlng = kakaoMap.getCenter();
  
          marker.setPosition(latlng);
          infoWindow.setPosition(latlng);
        });
    
        // 드래그가 종료 되었을 때, (중심 좌표의 주소 반환하기)
        kakao.maps.event.addListener(kakaoMap, 'dragend', debounce(async () => {
          latlng = kakaoMap.getCenter();
  
          address = await coord2Address(latlng.getLat(), latlng.getLng())
  
          setAddressInput(
            [
              {
                address: address[0].road_address === null ? address[0].address : address[0].road_address,
                latitude: Number(latlng.getLat().toFixed(6)),
                longitude: Number(latlng.getLng().toFixed(6)),
              }
            ]
          )
  
          infoElement.textContent = `${address[0].road_address === null ? address[0].address.address_name : address[0].road_address.address_name}`
        }, 300))
      }
    }, []);
  

    const [isMapOn, setIsMapOn] = useState(false);

    const handleOpenMapClick = () => {
        setIsMapOn(!isMapOn);
    }

    return (

        <Container className='address_container'>
            {!isMapOn ? <Button onClick={handleOpenMapClick}> 버튼 </Button> : <Map id='map'></Map>}
        </Container>
    );
}

export default InputAddress;