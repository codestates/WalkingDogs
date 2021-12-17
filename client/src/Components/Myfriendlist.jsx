import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    border: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: auto;
    margin: 10px 0px;
    border: none;
    border-radius: 10px;
    list-style: none;
    background-color:var(--color-darkwhite);
    width: 30vw;
`;

const ImageBox = styled.div`
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

const DogImage = styled.img`
    position: absolute;
    max-width: 150%;
    height: 100%;
    display: block;
    object-fit: cover;
`

const FriendInfo = styled.div`
    width: 50%;
    height: auto;
    border-radius: 5px;
    li{
        margin: 0.1rem;
        padding: 0.1rem;
        box-shadow: 0.9px 0.9px lightgray
        display: flex;
    }
`

//styled-component Boundary
const Myfriendlist = ({ listKey, dog }) => {

    return(
        <>
            <Container key={listKey} className="myfriend_list_container">
                <ImageBox className="myfriend_img_container">
                    <DogImage className='myfriend_img' src={dog.image}/>
                </ImageBox>
                <FriendInfo className="myfriend_info">
                    <li> 이름: {dog.name} </li>
                    <li> 중성화: {dog.neutering ? 'O' : 'X'} </li>
                    <li> 견종: {dog.breed} </li>
                    <li> 크기: {dog.size} </li>
                </FriendInfo>
            </Container>
        </>
    );
}

export default Myfriendlist;