import React ,{useEffect, useState}from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Roomcard from '../Components/Roomcard'
import RoomSearchBar from '../Components/RoomSearchBar'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import media from 'styled-media-query'
import { createGatherRoomModalOnAction, initPosAction, signinModalOnAction } from '../store/actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import map from '../api/map';

import Loading from '../Components/Loading';
import {gsap} from 'gsap';


const RoomlistContainer = styled.div`
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
  background-color: var(--color-mainviolet--100);
  min-height: auto;
  width: 100%;
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

const CardList = styled.div`
    width: 100%;
    display: grid;
    flex-wrap: row;
    margin: auto 4rem;
    gap: 3rem;
    grid-template-columns: repeat(auto-fill,minmax(17rem, auto));
    grid-gap: 3rem;
    /* justify-content: space-evenly; */
    padding: 1.2rem 10rem;
    background-image: url(${(props) => props.url});
`

const IsListLoadingBox = styled.div`
    width: 100%;
    height: 20rem;
`

const EmptyBox = styled.div`
    height: 20rem;
    font-family: 'Jua';
`
const BtnContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction:row;
    justify-content: flex-end;
    gap: 0.5rem;
`

const CreateRoomBtn = styled.button`
    border: 0.2rem solid var(--color-darkwhite);
    border-radius: 30px;
    width: 11rem;
    height: 3rem;
    font-size: 20px;
    color:var(--color-darkwhite);
    cursor: pointer;
    text-align: center;
    :hover{
        background-color: var(--color-darkwhite);
        border: 0.2rem solid var(--color-mainviolet--25);
        color: black;
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
    '???????????????': '??????',
    '???????????????': '??????',
    '???????????????': '??????',
    '???????????????': '??????',
    '???????????????': '??????',
    '???????????????': '??????',
    '???????????????': '??????',
    '?????????': '??????',
    '?????????': '??????',
    '????????????': '??????',
    '????????????': '??????',
    '????????????': '??????',
    '????????????': '??????',
    '????????????': '??????',
    '????????????': '??????',
    '?????????????????????': '??????',
}

const Roomlist = () => {

const [isListLoading, setIsListLoading] = useState(true);
const [rooms, setRooms] = useState([]);
const { isLogin } = useSelector(({ authReducer }) => authReducer);
const dispatch = useDispatch();
// const conditionOptions = {
//     location: {
//         latitude: 0,
//         longitude: 0,
//     },
//     date: '',
//     time: '',
//     member_limit: 0,
//     breed: '',
// };
// const [conditions, setConditions] = useState({ ...conditionOptions });

useEffect(() => {

    const initFunction = async () => {
        window.scrollTo(0,0);
        // window.location.assign('/roomlist');
        let latitude = 37.564213, longitude = 127.001698; // ?????? ??????
        
        const geoLocation = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
        }
        
        if(!navigator.geolocation) {
            console.log('???????????? GeoLocation ?????????')
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
                console.log('????????? ?????? ??? ????????????')
            })
        }
        
        const result = await map.locationApi({ latitude, longitude })
        setRooms([ ...result.data.rooms ]);
    
        setTimeout(() => {
            setIsListLoading(false)
        }, 1000)
    }

    initFunction();

}, []);

const handleSubmit = async (data) => {
    setIsListLoading(true)
    const allRooms = await map.locationApi({ isSearch: true }).then(res => res.data.rooms)

    // console.log(allRooms)
    // console.log(data)

    const filteredRooms = allRooms.filter(el => {
        // flag ?????? ??????
        let flag = true

        // timezone offset ??????
        const timeZoneOffset = new Date().getTimezoneOffset() * 60000
        let dateInput = new Date(data.dateInput - timeZoneOffset)

        // addressInput??? ????????? ???,
        if(flag && data.addressInput.length !== 0) {
            data.addressInput.forEach((input, idx) => {
                const name = input.name.split(' ')[input.name.split(' ').length - 1]
                // console.log(name)

                if(idx === 0){
                    // console.log(`region_${idx + 1}depth_name : `, name)
                    // console.log(`converted region_${idx + 1}depth_name : `, convertedCityName[name])
                    flag = flag && (el[`region_${idx + 1}depth_name`].includes(name) || el[`region_${idx + 1}depth_name`].includes(convertedCityName[name]))
                    // console.log(flag)
                }
                else {
                    // console.log(`region_${idx + 1}depth_name : `, name)
                    flag = flag && (el[`region_${idx + 1}depth_name`].includes(name))
                    // console.log(flag)
                }
            })
        }

        // ???????????? ????????? ??????
        if(flag && data.dateInput) {
            const isoDateInput = dateInput.toISOString().split('T')[0]
            flag = flag && (isoDateInput === el.meeting_time.split('T')[0])
        }

        if(flag && data.timeInput) {
            const inputTime = Number(data.timeInput.slice(0, -1))
            const roomTime = Number(el.meeting_time.split('T')[1].slice(0, 2))

            flag = flag && ((roomTime <= inputTime) && (inputTime <= roomTime + 1))
        }        

        // member_limit ???????????? ??????
        if(flag && data.totalNumInput) {
            flag = flag && (data.totalNumInput === el.member_limit)
        }

        // ?????? ????????? ???????????? ???????????? ????????? ????????? ????????? ?????? X
        if(flag && data.sizeInput) {
            const size = data.sizeInput
            
            el.room_dogs.forEach((joinTable) => {
                flag = flag && (size === '??????' || joinTable.dog.size.includes(size))
            })
        }

        return flag
    })
    setRooms([ ...filteredRooms ])

    setTimeout(() => {
        setIsListLoading(false)
    }, 1000)
}


// useDeepCompareEffect(()=> {
//     setTimeout(() => {
//         setIsListLoading(false)
//     }, 200)
// }, [rooms])

    return(
        <>
            <RoomlistContainer>
                <LocationBox> 
                    <h2 className='location_title'
                        style={{fontWeight:'inherit', margin:'2.5rem'}}>
                            <FontAwesomeIcon icon={faSearchLocation}
                                                style={{paddingRight:'5px'}}/>
                            ????????? ?????? ??? ????????? ????????????????
                            </h2>
                            <RoomSearchBar handleSubmit={handleSubmit}/>
                            <BtnContainer>
                                <CreateRoomBtn disabled={isListLoading} onClick={() => {
                                    if(!isLogin)
                                        dispatch(signinModalOnAction())
                                    else
                                        dispatch(createGatherRoomModalOnAction())}
                                }> ????????? ?????? ?????????</CreateRoomBtn>
                                <MapLinkBox to='/maps'>
                                    <MapBtn disabled={isListLoading} style={{textDecoration:'none', color:'black'}}> ????????? ?????? </MapBtn>
                                </MapLinkBox>
                            </BtnContainer>
                    </LocationBox>
                    {isListLoading ? (
                        <IsListLoadingBox>
                            <Loading/>
                        </IsListLoadingBox>
                    ) : rooms.length ? (
                        <CardList>
                            {rooms.map((el) => {
                                return <Roomcard className='card' key={el.id} listKey={el.id} room={{ ...el }}/>
                            })}
                        </CardList>
                    ) : (
                        <EmptyBox> ????????? ?????????????
                            <SuggestMent> ??????????????? ????????? ????????? ???????????????????</SuggestMent>    
                        </EmptyBox>
                        
                    )}
            </RoomlistContainer>
        </>
    );
}

export default Roomlist;