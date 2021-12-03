import React ,{useEffect, useState}from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Roomcard from '../Components/Roomcard'
import RoomSearchBar from '../Components/RoomSearchBar'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {createGatherRoomModalOnAction, signinAction,singoutAction} from 'react-redux'
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';


export const RoomlistContainer = styled.div`
    border: 1px solid #000000;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:10px;
`

export const LocationBox = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #000000;
    margin-top: 5px;
    width: 99%;
    min-height: 15rem;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    font-size: 25px;
` 

export const ItemlistContainer = styled.div`
    border: 1px solid #000000;
    width: 100%;
    display: grid;
    flex-wrap: row;
    gap: 0.8rem;
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-template-columns: repeat(auto-fill,minmax(20rem, auto));
`

export const Button = styled.button`
    
    border-bottom: 1px solid #000000;

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

// const testState = useSelector(state=> state.testdumState);

// const {testDummys} = testState;

const [isListLoading, setIsListLoading] = useState(false);

const {conditions, gatherings} = useSelector(({gathReducer})=> gathReducer);
const dispatch = useDispatch();
const history = useHistory();


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
                            <CreateRoomBtn> 새로운 모임 만들기</CreateRoomBtn>
                            <MapBtn to='/maps'style={{textDecoration:'none', color:'black'}}> 지도로 찾기 </MapBtn>
                        </BtnContainer>
                </LocationBox>

                <ItemlistContainer>
                <Roomcard/>
                <Roomcard/>
                <Roomcard/>
                <Roomcard/>
                <Roomcard/>
                <Roomcard/>
                </ItemlistContainer>
        </RoomlistContainer>
        </>
    );
}

export default Roomlist;