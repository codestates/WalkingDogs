import React from "react";
import { useHistory } from "react-router-dom";
import './ComponentStyles/Myroomlist.css';


const Myroomlist = ({ listKey, room }) => {
    const history = useHistory();
    
    return (
        <>
            <div key={listKey} className="roomlist_container" onClick={() => {history.push(`/room/${listKey}`)}}>
                <li>모임 이름:{room.title}</li>
                <li>위치: {room.address}</li>
            </div>
        </>
    )
}
export default Myroomlist;