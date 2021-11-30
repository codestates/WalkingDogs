import React from 'react';
import styled from 'styled-components'

export const OneroomContainer = styled.div`
    border: 1px solid #000000;
    width: auto; 
    height: 500px;
    margin:10px 10px;
    border-radius: 10px;
    display:flex;
    align-items: center;
    justify-content: center;
`

export const ImageBox = styled.div`
    border: 1px solid black;
    width: 20%;
    height: 70%;
    border-radius:50%;
`

export const RoominfoBox = styled.div`
    border: 1px solid black;
    width: 50%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
`


export const InfoBox = styled.div`
    border: 1px solid green;
    min-width: 30%;
    height: 30px;
    margin: 5px;
`
// styled-component Boundary
const Oneroom = () => {
    return(
        <>
        <OneroomContainer>
            <ImageBox >
                <img src='image/puppy-test.jpeg'/>
            </ImageBox>
            <RoominfoBox>
            <InfoBox className='username'>
                        유저네임</InfoBox>
            <InfoBox className='address'>
                        내용
                </InfoBox>
            </RoominfoBox>
        </OneroomContainer>
        </>
    );
}

export default Oneroom;