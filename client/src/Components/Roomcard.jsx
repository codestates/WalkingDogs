import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {gatherInfoAction} from  '../store/actions';
import roomApi from '../api/room';


export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid #000000;
    width: auto;
    height: 200px;
    margin: 5px 5px;
    border-radius: 1rem;
    align-items: center;
`
export const ImageBox = styled.div`
    border: 1px solid #000000;
    margin-left: 3px;
    width: 9rem;
    height: 8rem;
    align-items: center;
    border-radius: 100%;
    display: fixed;
`
export const Roominfo = styled.div`
    border: 1px solid #000000;
    width: 18rem;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
`
export const UsernameBox = styled.div`
    border: 1px solid green;
    width: 80%;
    height: 30px;
    margin: 5px;
    text-align: center;
    border-radius: 10px;
`

export const AddressesBox = styled.div`
    border: 1px solid green;
    width: 80%;
    height: 30px;
    margin: 5px;
    text-align: center;
    border-radius: 10px;
`

export const RoomContentBox = styled.div`
    border: 1px solid green;
    width: 80%;
    height: 8rem;
    margin: 5px;
    text-align: center;
    border-radius: 10px;
`

//styled-component boundary

const Roomcard = ({gathering, ...rest}) => {


const {gatherInfoAction} = useSelector(({gathReducer})=>gathReducer);
const dispatch = useDispatch();




    return(
        <Link to='/oneroom' style={{textDecoration:'none', color:'black'}}>
        <CardContainer {...rest}>
            <ImageBox>
                <img src='image/puppy-test.jpeg'
                    style={{objectFit:'scale-down', width:'auto', height:'auto'}}/>
            </ImageBox>
                <Roominfo>
                    <AddressesBox> {gathering} </AddressesBox>
                    <RoomContentBox>cc</RoomContentBox>
                </Roominfo>
        </CardContainer>
        </Link>

    );
};

export default Roomcard;