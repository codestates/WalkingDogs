import React from 'react'
import './ComponentStyles/Myfriendlist.css'

const Myfriendlist = () => {
    return(
        <>
        <div className="myfriend_list_container">
            <div className="myfriend_img"></div>
            <div className="myfriend_info">
                <li>이름{/*이름 데이터 표기 props.name*/}/ 성별{/*성별 데이터 표기 props.gender*/}</li>
                <li>견종{/*견종 데이터 표기 props.breed*/}</li>
            </div>
        </div>
        </>
    );
}

export default Myfriendlist;