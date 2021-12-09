import React ,{useEffect, useState}from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Roomcard from '../Components/Roomcard'
import RoomSearchBar from '../Components/RoomSearchBar'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import media from 'styled-media-query'
import AllButtons from '../Components/AllButtons'
import {createGatherRoomModalOnAction, signinAction,singoutAction} from '../store/actions'
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import useDeepCompareEffect from 'use-deep-compare-effect'
import room from '../api/room';
import map from '../api/map';


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
  min-height: 20rem;
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
    cursor: pointer;
    text-align: center;
`


const MapBtn = styled(Link)`
    border: 1px solid #000000;
    border-radius: 30px;
    width: 8rem;
    font-size: 20px;
    align-items: center;
    text-decoration: none;
`
const SuggestMent = styled.div`
    font-size: 20px;
`
// styled component boundary


const Roomlist = () => {

const [isListLoading, setIsListLoading] = useState(false);
const [Post, setPost] = useState([]);
const [rooms, setRooms] = useState([]);
const conditionOptions = {
    location: {
        latitude: '',
        longitude: '',
    },
    date: `${new Date().getFullYear}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    time: `${new Date().getHours()}:${new Date().getMinutes}`,
    member_limit: 0,
    breed: '',
};
const [conditions, setConditions] = useState({ ...conditionOptions });
console.log(conditions)
// const { conditions, gatherings } = useSelector(({ gathReducer }) => gathReducer);
const dispatch = useDispatch();
const history = useHistory();

useEffect(async () => {
  const result = await map.locationApi()

  console.log(result)
  setRooms([ ...result.data.rooms ]);
}, [])

useDeepCompareEffect(()=> {
    setIsListLoading(true);
    setTimeout(() => {
        setIsListLoading(false);
    }, 500)
}, [conditions])

const handleCreateRoom = () => {
    dispatch(createGatherRoomModalOnAction())
};

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
                            <RoomSearchBar/><button className='search_btn'>🔍</button>
                            <BtnContainer>
                                
                                <CreateRoomBtn onClick={handleCreateRoom}> 새로운 모임 만들기</CreateRoomBtn>
                                <MapBtn to='/maps'> 지도로 찾기 </MapBtn>
                            </BtnContainer>
                    </LocationBox>
                    {isListLoading ? (
                        <IsListLoadingBox>
                            test
                        </IsListLoadingBox>
                    ) : rooms.length ? (
                        <CardList>
                            {rooms.map((el) => {
                                return <Roomcard listKey={el.id} room={{ ...el }}/>
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