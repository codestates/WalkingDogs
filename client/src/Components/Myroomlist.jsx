import React from "react";
import './ComponentStyles/Myroomlist.css';


const Roomlist = () => {
    return (
        <>
            <div className="roomlist_container">
                <li>모임 이름:{/*props.roomName*/}</li>
                <li>위치: {/*props.place*/}</li>
            </div>
        </>
    )
}
export default Roomlist;