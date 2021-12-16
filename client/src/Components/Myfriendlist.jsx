import React, { useEffect } from 'react'
import styled, {css} from 'styled-components';

const Container = styled.div`
    border: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    margin: 10px 0px;
    border: none;
    border-radius: 10px;
    list-style: none;
    background-color:var(--color-darkwhite);
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
    .li{
        padding: 3.5px 3.5px;
    }
`

//styled-component Boundary
const Myfriendlist = ({ listKey, dog }) => {

    useEffect(() => {
        console.log(dog.image)
    }, [])

    return(
        <>
            <Container key={listKey} className="myfriend_list_container">
                <ImageBox className="myfriend_img_container">
                    <DogImage className='myfriend_img' src={dog.image}/>
                </ImageBox>
                <FriendInfo className="myfriend_info">
                    <li>이름 : {dog.name} / 중성화 : {dog.neutering ? 'O' : 'X'}</li>
                    <li>견종 : {dog.breed} / 크기 : {dog.size}</li>
                </FriendInfo>
            </Container>
        </>
    );
}

export default Myfriendlist;