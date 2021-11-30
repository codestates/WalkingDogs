import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Roomitem from '../Components/Roomitem'
import RoomSearchBar from '../Components/RoomSearchBar'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
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
    border: 1px solid #000000;
    margin-top: 5px;
    width: 99%;
    height: 320px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    font-size: 25px;
` 

export const Filterbox = styled.div`
    border: 1px solid #000000;
    width: 80%;
    height: 30%;
    align-items: center;
    display: inline-block;
`


// styled component boundary


const Roomlist = () => {

// const testState = useSelector(state=> state.testdumState);

// const {testDummys} = testState;

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
                </LocationBox>

                <Roomitem/>
        </RoomlistContainer>
        </>
    );
}

export default Roomlist;