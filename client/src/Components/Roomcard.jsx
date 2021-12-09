import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {createGatherRoomDetailModalOnAction} from  '../store/actions';
import roomApi from '../api/room';
import PropTypes from 'prop-types';
import UserIcon from './UserIcon';


const CardContainer = styled.div`
    border-radius: 1rem;
    background-color: white;
    filter: drop-shadow(2px 2px 6px lightgray);
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    /* max-width: 25rem; */
    min-width: 20rem;
    > * {
        margin-bottom: 1.25rem;
    }
    .divider {
        margin: 0 0.4em 0.1em;
        overflow: hidden;
    }
    position: relative;
    .hovered {
        background-color: var(--color-maingreen--50);
    }
    cursor: pointer;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: auto;
`;

const ImageBox = styled.div`
    border: 1px solid #000000;
    margin-left: 3px;
    width: 9rem;
    height: 8rem;
    align-items: center;
    border-radius: 100%;
    display: fixed;
`
const Roominfo = styled.div`
    border: 1px solid #000000;
    width: 18rem;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
`;

const AddressesBox = styled.div`
    border: 1px solid green;
    width: 80%;
    height: 30px;
    margin: 5px;
    text-align: center;
    border-radius: 10px;
`

const RoomContentBox = styled.div`
    border: 1px solid green;
    width: 80%;
    height: 8rem;
    margin: 5px;
    text-align: center;
    border-radius: 10px;
`

//styled-component boundary

const Roomcard = ({ listKey, room }) => {


const {isCreateGatherModal} = useSelector(({modalReducer})=>modalReducer);
const dispatch = useDispatch();
const handleGathDetailRoomModalOn = () =>{
    // if(!isCreateGatherModal) dispatch(createGatherRoomDetailModalOnAction(gathering));
};

    return(
        <Link to={`/room/${listKey}`} style={{textDecoration:'none', color:'black'}}>
        <CardContainer key={listKey}>
            <ImageBox>
                <img src='image/puppy-test.jpeg'
                    style={{objectFit:'scale-down', width:'auto', height:'auto'}}/>
            </ImageBox>
            <Roominfo>
            <AddressesBox> {room.address} </AddressesBox>
              <RoomContentBox>{room.title}</RoomContentBox>
            </Roominfo>
        </CardContainer>
        </Link>
    );
};

Roomcard.propTypes = {
    gathering: PropTypes.exact({
        id: PropTypes.number,
        placeName: PropTypes.string,
        latitude: PropTypes.string,
        longitude: PropTypes.string,
        date: PropTypes.string,
        time: PropTypes.string,
        timeDesctiption: PropTypes.string,
        totalNum: PropTypes.number,
        currentNum: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        done: PropTypes.bool,
        creator: PropTypes.exact({
            id: PropTypes.string,
            username: PropTypes.string,
            image: PropTypes.string,
        }),
        user: PropTypes.arrayOf(
            PropTypes.exact({
                id:PropTypes.string,
                username: PropTypes.string,
                image: PropTypes.string,
            })
            ),
            areaName: PropTypes.string,
            placeName: PropTypes.string,
    })
}

export default Roomcard;