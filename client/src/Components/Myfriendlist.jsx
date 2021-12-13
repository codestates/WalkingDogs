import React, { useEffect } from 'react'
import './ComponentStyles/Myfriendlist.css'

const Myfriendlist = ({ listKey, dog }) => {

    useEffect(() => {
        console.log(dog.image)
    }, [])

    return(
        <>
        <div key={listKey} className="myfriend_list_container">
            <div className="myfriend_img_container">
                <img className='myfriend_img' src={'http://image.dongascience.com/Photo/2017/03/14900752352661.jpg'}/>
            </div>
            <div className="myfriend_info">
                <li>이름 : {dog.name} / 중성화 : {dog.neutering ? 'O' : 'X'}</li>
                <li>견종 : {dog.breed} / 크기 : {dog.size}</li>
            </div>
        </div>
        </>
    );
}

export default Myfriendlist;