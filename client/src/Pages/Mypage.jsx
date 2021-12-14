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
    width: auto;
    height: 33rem;
    margin: 2px 2px;
    display: flex;
    align-items: center;
    span {
        display: table-cell;
        vertical-align:middle;
    }
`;

const Span = styled.span`
    background-color: var(--color-darkwhite);
    text-align: center;
    width: 8rem;
    border-radius: 10rem;
    line-height: 20px;
`

const MypageInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 10px;
    padding: 10px;
    width: 50%;
    height: 20rem;
    border-radius: 10px;
    box-shadow: 1px 1px grey;
    background-color: var(--color-mainviolet--100);
`;

const ImgBox = styled.div`
    margin: 10% 10px;
    width: 10em;
    height: 10em;
    border: 1px solid lightgray;
    border-radius: 50%;
`;

const Img = styled.img`
    width: auto;
    height: 100%;
    border-radius: 100%;
    object-fit: fill;
`

const Profile = styled.div`
    align-self: stretch;
    border-radius: 10px;
    margin: 5px 10px;
    width: 15rem;
    list-style: none;
    box-shadow: 1px 1px grey;
    background-color: var(--color-darkwhite);
`

const Li = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
    padding: 10px 10px;
    font-size: 18px;
`

const ExRoomList = styled.div`
    margin: 10px;
    width: 60%;
    height: 20rem !important;
    border-radius: 10px;
    background-color: var(--color-mainviolet--25);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const FriendsList = styled.div`
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 40%;
    height: 20rem;
    border-radius: 10px;
    background-color: var(--color-mainviolet--25);
    flex-direction: column;
    justify-content: space-around;
`

const SettingButton = styled.button`
    display: flex;
    justify-content: center;
    align-self: flex-start;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin: 0px;
    padding: 5px;
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
        const { image, username } = parsedData

        setProfileImg(image);
        setUserName(username);
        setDogs([ ...resDogList.data.dogs ]);
        setRooms([ ...resRoomList.data.rooms ]);
    };

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
                    <Span className='myinfo_title' style={{flex: '1'}}> My Information</Span>
                    <Li>
                        {username}
                    </Li>
                </Profile>

                
                <SettingButton className="mypage_profile_change_btn" style={{ backgroundColor: 'white'}}>
                    <Link to="/mypagechange" style={{color:'black'}}>
                        <FontAwesomeIcon icon={ faCog } />
                    </Link>
                </SettingButton>
            </MypageInfo>
            
            <ExRoomList className="myinfo_roomlist">
                <Span className="roomlist_title">
                    참가한 모임 목록
                </Span>
                {rooms.map((el) => 
                    <Myroomlist listKey={el.id} room={el}/>
                )}
            </ExRoomList>

            <FriendsList className="myfrend_list">
                <Span className="myfriendlist_title">
                    함께한 친구들 목록
                </Span>
                {dogs.map((el) => 
                    <Myfriendlist listKey={el.id} dog={el}/>
                )}
            </FriendsList>

        </MypageContainer>
    );
}

export default Mypage;