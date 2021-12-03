import React from 'react';
import styled from 'styled-components'
import Roommap from '../Components/Roommap'

export const OneroomContainer = styled.div`
    border: 1px solid #000000;
    width: auto; 
    height: 500px;
    margin:10px 10px;
    border-radius: 10px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const RoomBox = styled.div`
    border: 1px solid green;
    display: flex;
    min-width: 100rem;
    height: 25rem;
    justify-content: space-around;
    align-items: center;
    margin:10px;
`
    

export const RoomBtnBox = styled.div`
    border: 1px solid blue;
    display: flex;
    min-width: 100rem;
    height: 10rem;
    margin: 10px;
`

export const ImageBox = styled.div`
    border: 1px solid black;
    width: 20%;
    height: 70%;
    border-radius:50%;
    object-fit: fill;
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


export const UsernameBox = styled.div`
    border: 1px solid green;
    min-width: 30%;
    height: 30px;
    margin: 5px;
`

export const ContentsBox = styled.div`
    border: 1px solid #000000;
    min-width: 96%;
    height: 30rem;
    margin: 5px;
`

export const AllianceBox = styled.div`
    border: 1px solid green;
    min-width: 96%;
    height: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
`

export const OtherUserImg = styled.img`
    border: 1px solid #000000;
    min-width: 50px;
    min-height: 48px;
    border-radius: 50%;
    margin: auto 5px;
`


// styled-component Boundary
const Oneroom = () => {
    return(
        <>
        <OneroomContainer>
                <RoomBox>
                    <ImageBox src='../puppy-test.jpeg'/>
                        <RoominfoBox>
                            <UsernameBox className='username'>
                                        유저네임{/*props.name*/}</UsernameBox>
                            <ContentsBox className='address'>
                                        내용{/*props.content*/}
                                </ContentsBox>
                                <AllianceBox>
                                    <span className="alliance_ment"
                                        style={{border: '1px solid #000000',
                                                height: '40px',
                                                justifyContent:'center',
                                                fontSize: '25px',
                                                margin:'0 5px'}}>
                                        같이 가는 친구들은 누굴까요?
                                    </span>
                                    <div className='test2'
                                        style={{border: '1px solid #000000',
                                                width: '50%',
                                                height: '55px',
                                                justifyContent:'flex-end',
                                                margin:'5px 10px'}}>
                                                    <OtherUserImg/>
                                                    <OtherUserImg/>
                                                    <OtherUserImg/>
                                                    <OtherUserImg/>
                                                </div>
                                </AllianceBox>
                        </RoominfoBox>
                </RoomBox>
            <RoomBtnBox>
                
            </RoomBtnBox>
        </OneroomContainer>
    <Roommap/>
        </>
    );
}

export default Oneroom;