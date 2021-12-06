import React from 'react'
import './ComponentStyles/Myfriendlist.css'

const Myfriendlist = ({ listKey, dog }) => {
    return(
        <>
        <div key={listKey} className="myfriend_list_container">
            <div className="myfriend_img"></div>
            <div className="myfriend_info">
                <li>이름 : {dog.name} / 중성화 : {dog.neutering ? 'O' : 'X'}</li>
                <li>견종 : {dog.breed}</li>
            </div>
        </div>
        </>
    );
}

export default Myfriendlist;