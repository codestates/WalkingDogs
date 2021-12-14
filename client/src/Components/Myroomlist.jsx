import React from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import roomApi from '../api/room';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.9rem;
    margin: 0px 10px;
    padding: 10px;
    border-radius: 10px;
    list-style: none;
    background-color: var(--color-darkwhite);
    li {
        font-size: 1.1rem;
    }
`

const LeaveButton = styled.button`
    width: fit-content;
    height: fit-content;
    border-radius: 50%;
    margin: 0px;
    padding: 0px;
`

const InfoContainer = styled.div`
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