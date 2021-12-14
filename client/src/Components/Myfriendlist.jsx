import React, { useEffect } from 'react'
import './ComponentStyles/Myfriendlist.css'
import styled, {css} from 'styled-components';


const Container = styled.div`
    border: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 4.8rem;
    margin: 5px 5px;
    border-radius: 10px;
    list-style: none;
    background-color:var(--color-darkwhite);
`;

const ImageBox = styled.div`
    border: 1px solid lightgray;
    width: 15%;
    height: 70%;
    border-radius: 50%;
`

const FriendInfo = styled.div`
    border: 1px solid lightgray;
    width: 60%;
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
                <img className='myfriend_img' src={'http://image.dongascience.com/Photo/2017/03/14900752352661.jpg'}/>
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