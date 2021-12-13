import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Myroomlist from '../Components/Myroomlist'
import Myfriendlist from "../Components/Myfriendlist";
import {Link} from 'react-router-dom'
import mypage from "../api/mypage";
import styled from 'styled-components';


// import {authReducer, } from '../store/actions';


const MypageContainer = styled.div`
    border: 1px solid red;
    width: auto;
    height: 33rem;
    margin: 2px 2px;
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
    height: 15rem;
    border-radius: 10px;
`;

const ImgBox = styled.div`
    margin: 20% 10px;
    width: 8em;
    height: 7em;
    border: 1px solid red;
    border-radius: 100%;
`;

const Img = styled.img`
    width: 6rem;
    height: 80px;
    margin-top: 10px;
    border-radius: 100%;
    object-fit: fit-content;
`

const Profile = styled.div`
    border-radius: 10px;
    margin: 10px 10px;
    width: 100%;
    height: auto;
    list-style: none;
    box-shadow: 1px 1px grey;
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
    height: auto;
    border-radius: 10px;
`

const FriendsList = styled.div`
    align-items: center;
    border: 1px solid red;
    margin: 10px 10px;
    width: 50%;
    height: auto;
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
        const storageKey = document.cookie.split('; ').find(row => row.startsWith('accessToken')).split('=')[1];
        const parsedData = JSON.parse(localStorage.getItem(storageKey));
        const [ img, username ] = [ parsedData.user_image, parsedData.username ];

        setProfileImg(img);
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