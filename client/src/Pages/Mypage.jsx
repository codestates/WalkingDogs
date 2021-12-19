import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Myroomlist from '../Components/Myroomlist'
import Myfriendlist from "../Components/Myfriendlist";
import {Link} from 'react-router-dom'
import mypage from "../api/mypage";
import styled from 'styled-components';
import check from '../api/check';
import { useDispatch } from 'react-redux';
import { signinAction, signoutAction } from '../store/actions';
import { useCookies } from 'react-cookie';


// import {authReducer, } from '../store/actions';


const MypageContainer = styled.div`
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4rem;
    gap: 2rem;
    span {
        display: flex;
        vertical-align:middle;
        justify-content: center;
    }
`;

const WrapBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: auto;
    height: auto;
`

const BoxTitle = styled.span`
    background-color: var(--color-darkwhite);
    text-align: center;
    display: flex;
    width: 8rem;
    padding: 5px;
    border-radius: 10rem;
    line-height: 20px;
`

const MypageInfo = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px 10px;
    padding: 2rem;
    width: 40rem;
    height: 20vh;
    border-radius: 10px;
    box-shadow: 1px 1px grey;
    background-color: var(--color-mainviolet--25);
`;

const ImgBox = styled.div`
    margin: 10% 10px;
    width: 10em;
    height: 10em;
    border: 1px solid lightgray;
    border-radius: 50%;
    background-size: cover;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
`

const Profile = styled.div`
    align-self: center;
    border-radius: 10px;
    margin: 5px 10px;
    width: 15rem;
    list-style: none;
    box-shadow: 1px 1px lightgray;
    background-color: var(--color-darkwhite);
    div {
        display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
    padding: 10px 10px;
    font-size: 3rem;
    }
`

const ExRoomList = styled.div`
    align-items: center;
    margin: 10px;
    width: 40rem;
    height: auto;
    padding: 2rem;
    border-radius: 10px;
    background-color: var(--color-mainviolet--25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
    span{
        width: 100%;
    }
`

const FriendsList = styled.div`
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: auto;
    height: auto;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--color-mainviolet--25);
    flex-direction: column;
    justify-content: space-around;
    overflow-y: auto;
    display: flex;
    span    {
        border-radius: 10px;
        background-color: var(--color-darkwhite);
        width: auto;
        padding: 0.5rem;
        font-size: 1.1rem;
    }
`

const SettingButton = styled.button`
    display: flex;
    justify-content: center;
    align-self: center;
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
    const dispatch = useDispatch();
    const [,, removeCookie] = useCookies();

    const getUserData = async () => {
        const userData = localStorage.getItem('userData');

        if(userData) {
            const localData = JSON.parse(userData);
            await check.checkApi({
            cookies: localData.cookies,
            })
            .then(res => {
                console.log(res.data.data)
            if(res.data.data) {
                // 로그인 작업을 실시
                localStorage.setItem('userData', JSON.stringify({ ...res.data.data }))
                const userData = JSON.parse(localStorage.getItem('userData'));
                delete userData.cookies;
                dispatch(signinAction(userData));
            }
            else {
                // 원래 쓰던거 사용
                const userData = JSON.parse(localStorage.getItem('userData'));
                delete userData.cookies;
                dispatch(signinAction(userData));
            }
            })
            .catch(err => {
                localStorage.clear();
                removeCookie('accessToken');
                removeCookie('refreshToken');
                dispatch(signoutAction());
                window.location.assign('https://walkingdogs.link')
            })
        }

        const resDogList = await mypage.dogListApi();
        const resRoomList = await mypage.myroomApi();
        const parsedData = JSON.parse(localStorage.getItem('userData'));
        const { image, username } = parsedData
        
        setProfileImg(image);
        setUserName(username);
        setDogs([ ...resDogList.data.dogs ]);
        setRooms([ ...resRoomList.data.rooms ]);
    };

    useEffect(async () => {
        window.scrollTo(0,0);
        await getUserData();
    }, [])

    return (
    
        <MypageContainer>
            <WrapBox>
            <MypageInfo>
                <ImgBox>
                    <Img className="profile_img" src={profileImg}/>
                </ImgBox>

                <Profile>
                    <div>
                        {username}
                    </div>
                </Profile>
                
                <Link to="/mypagechange" style={{color:'black'}}>
                    <SettingButton className="mypage_profile_change_btn" style={{ backgroundColor: 'white'}}>
                        <FontAwesomeIcon icon={ faCog } />
                    </SettingButton>
                </Link>
            </MypageInfo>
            
            <FriendsList className="myfrend_list">
                <span className="myfriendlist_title">
                    함께한 친구들 목록
                </span>
                {dogs.map((el) => 
                    <Myfriendlist listKey={el.id} dog={el}/>
                )}
            </FriendsList>
            </WrapBox>
          

            <ExRoomList className="myinfo_roomlist">
                <span className="roomlist_title">
                    참가한 모임 목록
                </span>
                {rooms.map((el, idx) => 
                    <Myroomlist listKey={el.id} room={el} />
                )}
            </ExRoomList>


        </MypageContainer>
    );
}

export default Mypage;