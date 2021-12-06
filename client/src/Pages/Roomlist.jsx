import React ,{useEffect, useState}from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Roomcard from '../Components/Roomcard'
import RoomSearchBar from '../Components/RoomSearchBar'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import media from 'styled-media-query'
import {createGatherRoomModalOnAction, signinAction,singoutAction} from '../store/actions'
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';


export const RoomlistContainer = styled.div`
    border: 1px solid #000000;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    >*{
        padding: 2rem;
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

export const LocationBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 1;
    border: 1px solid #000000;
    margin-top: 5px;
    min-height: 15rem;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    font-size: 25px;
` 

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

const isListLoadingBox = styled.div`
    width: 100%;
    height: 20rem;
`

const EmptyBox = styled.div`
    height: 20rem;
`
export const BtnContainer = styled.div`
    border: 1px solid #000000;
    width: 100%;
    display: flex;
    flex-direction:row;
    justify-content: flex-end;
    gap: 0.5rem;
`


export const CreateRoomBtn = styled.button`
    border: 1px solid #000000;
    border-radius: 30px;
    width: auto;
    font-size: 20px;
    cursor: pointer;
`


export const MapBtn = styled(Link)`
    border: 1px solid #000000;
    border-radius: 30px;
    width: auto;
    font-size: 20px;
    margin-right: 10px;
`

// styled component boundary


const Roomlist = () => {

const [isListLoading, setIsListLoading] = useState(false);
const [Post, setPost] = useState([]);

const {conditions, gatherings} = useSelector(({gathReducer})=> gathReducer);
const dispatch = useDispatch();
const history = useHistory();


const handleCreateRoom = () => {
    dispatch(createGatherRoomModalOnAction())
};

useEffect(()=> {
    setIsListLoading(true);
    setTimeout(()=>{
        setIsListLoading(false);
    },500)
},[conditions, gatherings]);

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
                        <RoomSearchBar/>

                        <BtnContainer>
                            <CreateRoomBtn onClick={handleCreateRoom}> 새로운 모임 만들기</CreateRoomBtn>
                            <MapBtn to='/maps'style={{textDecoration:'none', color:'black'}}> 지도로 찾기 </MapBtn>
                        </BtnContainer>
                </LocationBox>
                {isListLoading ? (
                    <isListLoadingBox>
                        yo!
                    </isListLoadingBox>
                ) : gatherings.length ? (
                    <CardList>
                        {(gatherings && gatherings.length > 0) && (
                        gatherings.map((gath, idx)=> {
                            <Roomcard key={idx} gathering={gath}/>
                        })
                    )}
                    </CardList>
                ) : (
                    <EmptyBox> 모임이 없네요😢 </EmptyBox>
                )}
        </RoomlistContainer>
        </>
    );
}

export default Roomlist;