import React from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import roomApi from '../api/room';

const Container = styled.div`
    border: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    margin: 10px 0px;
    padding: 10px;
    border-radius: 10px;
    list-style: none;
    background-color: var(--color-darkwhite);
    li {
        font-size: 1.1rem;
    }
`

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0px;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    overflow: hidden;
`

const LeaderImage = styled.img`
    position: absolute;
    max-width: 100%;
    height: 100%;
    border-radius: 100%;
    display: block;
    object-fit: cover;
`

const LeaveButton = styled.button`
    width: fit-content;
    height: fit-content;
    border-radius: 50%;
    margin: 0px;
    padding: 0px;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
    height: auto;
`

// styled-component Boundary
const Myroomlist = ({ listKey, room }) => {
    const history = useHistory();

    const handleDelete = async (e) => {
        e.stopPropagation();

        await roomApi.deleteRoomApi(listKey);
        window.location.assign('/mypage')
    }

    return (
        <>
            <Container key={listKey} className="roomlist_container" onClick={() => {history.push(`/room/${listKey}`)}}>
                <ImageContainer>
                    <LeaderImage src={room.user.image}/>
                </ImageContainer>
                <InfoContainer>
                    <span>모임 이름:{room.title}</span>
                    <span>위치: {room.address}</span>
                </InfoContainer>
                <LeaveButton onClick={(e) => handleDelete(e)}>
                    <span className="material-icons" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        close
                    </span>
                </LeaveButton>
            </Container>
        </>
    )
}
export default Myroomlist;