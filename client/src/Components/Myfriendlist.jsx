import React from 'react'
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #000;
    height: 80px;
    margin: 10px 10px;
    border-radius: 10px;
    list-style: none;
`;

const ImageBox = styled.div`
    border: 1px solid #000000;
    width: 15%;
    height: 70%;
    border-radius: 50%;
`

const FriendInfo = styled.div`
    border: 1px solid #000000;
    width: 50%;
    height: auto;
    border-radius: 10px;
    padding: 10px;
    .li{
        padding: 3.5px 3.5px;
    }
`


//styled-component Boundary
const Myfriendlist = ({ listKey, dog }) => {
    return(
        <>
        <Container key={listKey}>
            <ImageBox></ImageBox>
            <FriendInfo>
                <li>이름 : {dog.name} / 중성화 : {dog.neutering ? 'O' : 'X'}</li>
                <li>견종 : {dog.breed}</li>
            </FriendInfo>
        </Container>
        </>
    );
}

export default Myfriendlist;