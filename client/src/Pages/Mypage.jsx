import React, { useEffect, useState } from "react";
import './PageStyle/Mypage.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Myroomlist from '../Components/Myroomlist'
import Myfriendlist from "../Components/Myfriendlist";
import {Link} from 'react-router-dom'
import mypage from "../api/mypage";
import styled from 'styled-components'



const MypageContainer = styled.div`
    border: 1px solid red;
    width: 100%;
    height: auto;
    margin: 10px 10px;
    display: flex;
    align-items: center;
    *{
        margin:0;
    }
    button {
        margin: 10px 10px;
        width: 8%;
        height: 20%;
        font-size: 20px;
        cursor: pointer; 
    }
    span {
        padding: 0px 10px;
        margin-top: 10px;
        border: 1px solid #000000;
        height:auto;
    }
`;

const MypageInfo = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid red;
    margin: 10px 10px;
    width: 50%;
    height: 50%;
    border-radius: 10px;
`;

const ImgBox = styled.div`
    margin: 10px 10px;
    width: 6rem;
`;

const Img = styled.img`
    width: 6rem;
    height: 80px;
    margin-top: 10px;
    border-radius: 50%;
    object-fit: scale-down;
`

const Profile = styled.div`
    border: 1px solid red;
    margin: 10px 10px;
    width: 100%;
    height: auto;
    list-style: none;
`

const Li = styled.li`
    padding: 8px 12px;
    font-size: 18px;
`
const ExRoomList = styled.div`
    align-items: center;
    border: 1px solid red;
    margin: 10px 10px;
    width: 50%;
    height: 2rem;
    border-radius: 10px;
`

const FriendsList = styled.div`
    align-items: center;
    border: 1px solid red;
    margin: 10px 10px;
    width: 50%;
    height: 50%;
    border-radius: 10px;
`




//styled-component Boundary
const Mypage = () => {

    const [dogs, setDogs] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [profileImg, setProfileImg] = useState('');
    const [username, setUserName] = useState('');

    const getUserData = async () => {
        const resDogList = await mypage.dogListApi();
        const resRoomList = await mypage.myroomApi();
        const parsedData = JSON.parse(localStorage.getItem('userData'));
        const { image, username } = parsedData;

        setProfileImg(image);
        setUserName(username);
        setDogs([ ...resDogList.data.dogs ]);
        setRooms([ ...resRoomList.data.rooms ]);
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
    
        <MypageContainer>
            <MypageInfo>
                <ImgBox>
                    <Img className="profile_img" src={profileImg}/>
                </ImgBox>

                <Profile>
                    <span className='myinfo_title'> My Information</span>
                    <Li>
                        {username}
                        {/* 유저이름 데이터 props.username*/}
                    </Li>
                </Profile>

                
                <button className="mypage_profile_change_btn">
                <Link to="/mypagechange" style={{color:'black'}}>
                    <FontAwesomeIcon icon={ faCog } />
                </Link>
                </button>
            </MypageInfo>
            
            <ExRoomList className="myinfo_roomlist">
                <span className="roomlist_title">
                    참가한 모임 목록
                </span>
                    {rooms.map((el) => 
                        <Myroomlist listKey={el.id} room={el}/>
                    )}
            </ExRoomList>

            <FriendsList className="myfrend_list">
                <span className="myfriendlist_title">
                    함께한 친구들 목록
                </span>
                    {dogs.map((el) => 
                        <Myfriendlist listKey={el.id} dog={el}/>
                    )}
            </FriendsList>

        </MypageContainer>
    );
}

export default Mypage;