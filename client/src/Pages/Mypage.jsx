import React, { useEffect, useState } from "react";
import './PageStyle/Mypage.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Myroomlist from '../Components/Myroomlist'
import Myfriendlist from "../Components/Myfriendlist";
import {Link} from 'react-router-dom'
import mypage from "../api/mypage";

const Mypage = () => {

    const [dogs, setDogs] = useState([]);
    const [rooms, setRooms] = useState([]);

    const getUserData = async () => {
        const resDogList = await mypage.dogListApi();
        const resRoomList = await mypage.myroomApi();

        setDogs([ ...resDogList.data.dogs ]);
        setRooms([ ...resRoomList.data.rooms ]);
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
    
        <div className="mypage_container">
            <div className="mypage_info">
                <div className="mypage_profile_img">
                    <img className="profile_img"/>
                </div>

                <div className="mypage_profile_info">
                    <span className='myinfo_title'> My Information</span>
                    <li>{JSON.parse(localStorage.getItem('userData')).username}{/* 유저이름 데이터 props.username*/}</li>
                    <div className="dogs_container">
                        {dogs.map((el, idx) => {
                            return (
                            <li
                                key={idx}
                                style={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                                <span>{el.name}</span>
                                <span>{el.breed}</span>
                                <span>{el.neutering ? '중성화 O' : '중성화 X'}</span>
                            </li>
                            );
                        })}
                    </div>
                </div>

                
                <button className="mypage_profile_change_btn">
                <Link to="/mypagechange" style={{color:'black'}}>
                    <FontAwesomeIcon icon={ faCog } />
                </Link>
                </button>
            </div>
            
            <div className="myinfo_roomlist">
                <span className="roomlist_title">
                    참가한 모임 목록
                </span>
                    {rooms.map((el) => 
                        <Myroomlist listKey={el.id} room={el}/>
                    )}
            </div>

            <div className="myfrend_list">
                <span className="myfriendlist_title">
                    함께한 친구들 목록
                </span>
                    {dogs.map((el) => 
                        <Myfriendlist listKey={el.id} dog={el}/>
                    )}
            </div>

        </div>
    );
}

export default Mypage;