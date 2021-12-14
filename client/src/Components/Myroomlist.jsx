import React from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 2.9rem;
    margin: 0.3rem 0.1rem;
    border-radius: 10px;
    list-style: none;
    background-color: var(--color-darkwhite);
    li {
        font-size: 1.1rem;
    }
`



// styled-component Boundary
const Myroomlist = ({ listKey, room }) => {
    const history = useHistory();
    
    return (
        <>
            <Container key={listKey} className="roomlist_container" onClick={() => {history.push(`/room/${listKey}`)}}>
                <li>모임 이름:{room.title}</li>
                <li>위치: {room.address}</li>
            </Container>
        </>
    )
}
export default Myroomlist;