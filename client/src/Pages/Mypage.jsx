import React from "react";
import './PageStyle/Mypage.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Myroomlist from '../Components/Myroomlist'
import Myfriendlist from "../Components/Myfriendlist";
import {Link} from 'react-router-dom'

const Mypage = () => {


    return (
    
        <div className="mypage_container">
            <div className="mypage_info">
                <div className="mypage_profile_img">
                    <img className="profile_img"/>
                </div>

                <div className="mypage_profile_info">
                    <span className='myinfo_title'> My Information</span>
                    <li>유저이름{/* 유저이름 데이터 props.username*/}</li>
                    <li>나의 펫 이름{/* 유저의 펫 이름 데이터 props.petname*/}</li>
                    <li> 견종 {/* 펫의 견종 데이터 props.breed*/}</li>
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
                    <Myroomlist/>
            </div>

            <div className="myfrend_list">
            <span className="myfriendlist_title">
                    함께한 친구들 목록
                </span>
                    <Myfriendlist/>
            </div>

        </div>
    );
}

export default Mypage;