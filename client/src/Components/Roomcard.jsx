import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {createGatherRoomDetailModalOnAction} from  '../store/actions';
import room from '../api/room';
import PropTypes from 'prop-types';
import UserIcon from './UserIcon';


const CardContainer = styled.div`
    border: 0.5rem solid var(--color-mainviolet--50);
    border-radius: 1rem;
    background-color: white;
    filter: drop-shadow(2px 2px 6px lightgray);
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* max-width: 25rem; */
    min-width: 21rem;
    > * {
        margin-bottom: 1.15rem;
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
    display: flex;
    border: 1px solid #000000;
    margin-left: 3px;
    width: 9rem;
    height: 8rem;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    overflow: hidden;
`
const Roominfo = styled.div`
    
    width: 14rem;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
`;

const TitleBox = styled.div`
    border: 1px solid green;
    width: 13rem;
    height: 2rem;
    margin: 3px;
    border-radius: 10px;
`

const AddressesBox = styled.div`
    border: 1px solid green;
    width: 12rem;
    height: 30px;
    margin: 5px;
    text-align: center;
    border-radius: 10px;
`

const RoomContentBox = styled.div`
    border: 1px solid green;
    width: 13rem;
    height: 8rem;
    margin: 3px;
    text-align: center;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

//styled-component boundary

const Roomcard = ({ listKey, room }) => {

const [leaderInfo, setLeaderInfo] = useState({})
const {isCreateGatherModal} = useSelector(({modalReducer})=>modalReducer);
const dispatch = useDispatch();
const handleGathDetailRoomModalOn = () =>{
    // if(!isCreateGatherModal) dispatch(createGatherRoomDetailModalOnAction(gathering));
};

    useEffect(() => {
        if(room){
            const leaderId = room.leader_id;
            const leader = room.user_rooms.filter(el => el.user_id === leaderId)[0].user
            setLeaderInfo({ ...leader })
        }
    }, [room])

    return(
        <Link to={`/room/${listKey}`} style={{textDecoration:'none', color:'black'}}>
            <CardContainer key={listKey}>
                <ImageBox>
                    <img src={leaderInfo.image}
                        style={{maxWidth: '100%', height: 'auto', display: 'block'}}/>
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
        address: PropTypes.string,
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