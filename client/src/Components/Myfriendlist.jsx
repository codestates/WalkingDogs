import React, { useEffect } from 'react'
import './ComponentStyles/Myfriendlist.css'
import styled, {css} from 'styled-components';


const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    margin: 10px 10px;
    border: none;
    border-radius: 10px;
    list-style: none;
`;

const ImageBox = styled.div`
    width: 15%;
    height: 70%;
    border-radius: 50%;
`

const FriendInfo = styled.div`
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