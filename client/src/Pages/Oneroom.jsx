import React from 'react';
import styled from 'styled-components'

export const OneroomContainer = styled.div`

`

const Oneroom = () => {
    return(
        <>
        <div className="oneroom_container"
            style={{border: '1px solid #000000',
                    width: '30%', 
                    height: '200px',
                    margin:'10px 10px',
                    borderRadius: '10px',
                    display:'flex',
                    alignItems: 'center'}}>
            <div className="image_box"
                style={{border: '1px solid #000000',
                        width: '20%',
                        height: '70%',
                        margin: '5px',
                        borderRadius: '50%'
                        }}>
            </div>

            <div className="rooninfo_box"
                           style={{border: '1px solid #000000',
                           width: '300px',
                           height: 'auto',
                           display: 'flex',
                           flexDirection:'column',
                           justifyContent: 'spaceBetween',
                           alignItems: 'center',
                           margin: '5px'}}>
            <div className="username_box"
                    style={{border: '1px solid green',
                    width: '80%',
                    height: '30px',
                    margin: '5px'}}>
                        유저네임</div>
            <div className="address_box"
                    style={{border: '1px solid green',
                    width: '80%',
                    height: '30px',
                    margin: '5px'}}>
                        주소
                </div>
            <div className="address_box"
                    style={{border: '1px solid green',
                    width: '80%',
                    height: '30px',
                    margin: '5px'}}>
                        내용
                </div>
            </div>
        </div>
        </>
    );
}

export default Oneroom;