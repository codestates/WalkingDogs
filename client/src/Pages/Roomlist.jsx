import React ,{useEffect, useRef, useState}from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Roomcard from '../Components/Roomcard'
import RoomSearchBar from '../Components/RoomSearchBar'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import media from 'styled-media-query'
import AllButtons from '../Components/AllButtons'
import {createGatherRoomModalOnAction, initPosAction, signinAction,signinModalOnAction,singoutAction} from '../store/actions'
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import useDeepCompareEffect from 'use-deep-compare-effect'
import room from '../api/room';
import map from '../api/map';
import Modal from '../Components/Modal';
import RoomCreate from '../Components/RoomCreate';

export const RoomlistContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    >*{
        padding: 2rem;
        width: 100%;
        text-align: center;
        ${media.lessThan("medium")`
        `}
    }
    .pc {
        ${media.lessThan("medium")`
            display:none;
        `}
    }
    .mobile{
        display:none;
        ${media.lessThan("medium")`
        display:block;
        `}
    }
`;

const LocationBox = styled.div`
  background-color: var(--color-mainviolet--75);
  min-height: 30rem;
  flex: 0 0 1;
  ${media.lessThan("medium")`
    padding : 4rem 2rem;
  `}
  display: flex;
  flex-direction: column;
  align-items: center;
  .create-gathering {
    width: 16rem;
    ${media.lessThan("medium")`
      margin-bottom: 1.25rem;
    `}
    ${media.lessThan("small")`
      width: 100%;
      min-width: 20rem;
      height: 3.2rem;
    `}
    background-color: var(--color-darkwhite);
    color: var(--color-white);
  }
`;

export const CardList = styled.div`
    border: 1px solid #000000;
    width: 100%;
    display: grid;
    flex-wrap: row;
    gap: 0.8rem;
    grid-template-columns: repeat(auto-fill,minmax(20rem, auto));
`

export const Button = styled.button`
    
    border-bottom: 1px solid #000000;
`

const IsListLoadingBox = styled.div`
    width: 100%;
    height: 20rem;
`

const EmptyBox = styled.div`
    height: 20rem;
    font-family: 'Jua';
`
export const BtnContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction:row;
    justify-content: flex-end;
    gap: 0.5rem;
`

const CreateRoomBtn = styled.button`
    border: 1px solid #000000;
    border-radius: 30px;
    width: 11rem;
    height: 3rem;
    font-size: 20px;
    color: black;
    cursor: pointer;
    text-align: center;
    :hover{
        background-color: var(--color-darkwhite);
        border: 1px solid var(--color-mainviolet--50);
    }
`

const MapLinkBox = styled(Link)`
    border-radius: 30px;
    width: 8rem;
    font-size: 20px;
    align-items: center;
    text-decoration: none;
`

const MapBtn = styled.button`
    border: 1px solid #000000;
    border-radius: 30px;
    width: 8rem;
    height: 3rem;
    font-size: 20px;
    cursor: pointer;
    text-align: center;
    :hover{
        background-color: var(--color-darkwhite);
        border: 1px solid var(--color-mainviolet--50);
    }
`

const SuggestMent = styled.div`
    font-size: 20px;
`
// styled component boundary

const convertedCityName = {
    '서울특별시': '서울',
    '부산광역시': '부산',
    '대구광역시': '대구',
    '인천광역시': '인천',
    '광주광역시': '광주',
    '대전광역시': '대전',
    '울산광역시': '울산',
    '경기도': '경기',
    '강원도': '강원',
    '충청북도': '충북',
    '전라북도': '전북',
    '전라남도': '전남',
    '경상북도': '경북',
    '경상남도': '경남',
    '제주특별자치도': '제주',
}

const Roomlist = () => {

const [isListLoading, setIsListLoading] = useState(true);
const [rooms, setRooms] = useState([]);
const conditionOptions = {
    location: {
        latitude: 0,
        longitude: 0,
    },
    date: '',
    time: '',
    member_limit: 0,
    breed: '',
};
const [conditions, setConditions] = useState({ ...conditionOptions });
const { isLogin } = useSelector(({ authReducer }) => authReducer);
const dispatch = useDispatch();

useEffect(async () => {
    let latitude = 37.564213, longitude = 127.001698; // 서울 중앙
    
    const geoLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    }
    
    if(!navigator.geolocation) {
        console.log('브라우저 GeoLocation 미지원')
        dispatch(initPosAction({ latitude, longitude }))
    }
    else {
        await geoLocation()
        .then((pos) => {
            latitude = Number(pos.coords.latitude.toFixed(6))
            longitude = Number(pos.coords.longitude.toFixed(6))
            dispatch(initPosAction({ latitude, longitude }))
            
            // setConditions(Object.assign({}, { ...conditions }, { location: { latitude: latitude, longitude: longitude }}));
        })
        .catch((err) => {
            console.log(err)
            console.log('위치를 찾을 수 없습니다')
        })
    }
    
    const result = await map.locationApi({ latitude, longitude })
    setRooms([ ...result.data.rooms ]);
    setIsListLoading(false)

}, [])

const handleSubmit = async (data) => {
    const allRooms = await map.locationApi({ isSearch: true }).then(res => res.data.rooms)

    console.log(allRooms)
    console.log(data)

    const filteredRooms = allRooms.filter(el => {
        // flag 최초 선언
        let flag = true

        // timezone offset 설정
        const timeZoneOffset = new Date().getTimezoneOffset() * 60000
        let dateInput = new Date(data.dateInput - timeZoneOffset)

        // addressInput이 존재할 때,
        if(flag && data.addressInput.length !== 0) {
            data.addressInput.forEach((input, idx) => {
                const { name } = input

                // 우리가 서울특별시로 저장되는데 서버가 '서울'로 준다면...?
                // 우리가 전라북도로 읽는데 서버가 '전북'으로 준다면...?
                // 딕셔너리 제작은 해봤음.
                console.log(name)
                console.log(el[`region_${idx + 1}depth_name`].includes(name))
                console.log(el[`region_${idx + 1}depth_name`].includes(convertedCityName[name]))
                flag = flag && (el[`region_${idx + 1}depth_name`].includes(name) || el[`region_${idx + 1}depth_name`].includes(convertedCityName[name]))
            })
        }

        // 시간으로 검색은 성공
        if(flag && data.dateInput) {
            const isoDateInput = dateInput.toISOString().split('T')[0]
            flag = flag && (isoDateInput === el.meeting_time.split('T')[0])
        }

        if(flag && data.timeInput) {
            const inputTime = Number(data.timeInput.slice(0, -1))
            const roomTime = Number(el.meeting_time.split('T')[1].slice(0, 2))

            flag = flag && ((roomTime <= inputTime) && (inputTime <= roomTime + 1))
        }        

        // member_limit 기준으로 검색
        if(flag && data.totalNumInput) {
            flag = flag && (data.totalNumInput === el.member_limit)
        }

        // 내가 선택한 강아지의 사이즈를 제외한 애들이 있으면 검색 X
        if(flag && data.sizeInput) {
            
        }

        return flag
    })
    console.log(filteredRooms)

    // allRooms

    // ! 여기서 모든 방에서 data라는 factor를 활용해서 리스트를 필터링.
    // ! rooms를 수정
}

// useDeepCompareEffect(()=> {
//     if(isMounted.current) {
//         setIsListLoading(true);
//         setTimeout(() => {
//           setIsListLoading(false);
//         }, 500)
//     }
// }, [conditions])

    return(
        <>
            <RoomlistContainer>
                <LocationBox> 
                    <h2 className='location_title'
                        style={{fontWeight:'inherit', margin:'2.5rem'}}>
                            <FontAwesomeIcon icon={faSearchLocation}
                                                style={{paddingRight:'5px'}}/>
                            산책을 같이 할 친구를 찾아볼까요?
                            </h2>
                            <RoomSearchBar handleSubmit={handleSubmit}/>
                            <BtnContainer>
                                <CreateRoomBtn disabled={isListLoading} onClick={() => {
                                    if(!isLogin)
                                        dispatch(signinModalOnAction())
                                    else
                                        dispatch(createGatherRoomModalOnAction())}
                                }> 새로운 모임 만들기</CreateRoomBtn>
                                <MapLinkBox to='/maps'>
                                    <MapBtn disabled={isListLoading} style={{textDecoration:'none', color:'black'}}> 지도로 찾기 </MapBtn>
                                </MapLinkBox>
                            </BtnContainer>
                    </LocationBox>
                    {isListLoading ? (
                        <IsListLoadingBox>
                            Loading
                        </IsListLoadingBox>
                    ) : rooms.length ? (
                        <CardList>
                            {rooms.map((el) => {
                                return <Roomcard key={el.id} listKey={el.id} room={{ ...el }}/>
                            })}
                        </CardList>
                    ) : (
                        <EmptyBox> 모임이 없네요😢
                            <SuggestMent> 찾는모임이 없다면 모임을 만들어볼까요?</SuggestMent>    
                        </EmptyBox>
                        
                    )}
            </RoomlistContainer>
        </>
    );
}

export default Roomlist;