import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'


export const ItemContainer = styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid #000000;
    width: auto;
    height: 200px;
    margin: 5px 5px;
    border-radius: 30px;
    align-items: center;
`


export const ImageBox = styled.div`
    border: 1px solid #000000;
    margin-left: 3px;
    width: 30%;
    height: 40%;
    align-items: center;
    border-radius: 100%;
    
`
export const Roominfo = styled.div`
    border: 1px solid #000000;
    width: 55%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
`
export const UsernameBox = styled.div`
    border: 1px solid green;
    width: 70%;
    height: 30px;
    margin: 5px;
`

export const AddressesBox = styled.div`
    border: 1px solid green;
    width: 70%;
    height: 30px;
    margin: 5px;
`

export const RoomContentBox = styled.div`
    border: 1px solid green;
    width: 70%;
    height: 30px;
    margin: 5px;
`

//styled-component boundary

const Roomitem = () => {
    return(
        <Link to='/oneroom'>
        <ItemContainer>
            <ImageBox> 사진 </ImageBox>
                <Roominfo>
                    <UsernameBox>유저 네임</UsernameBox>
                    <AddressesBox> Address </AddressesBox>
                    <RoomContentBox>Contents</RoomContentBox>
                </Roominfo>
        </ItemContainer>
        </Link>

    );
};

export default Roomitem;