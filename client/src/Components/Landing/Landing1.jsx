import React from "react";
import styled, {keyframes} from 'styled-components'


const boxLeftFade = keyframes`
  from {
    opacity: 0;
    margin-left: 0rem;
  }
  to {
    margin-left: 10rem;
  }
`

const imageFade = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`

const Landing1Container = styled.div`
  display: flex;
  width: auto;
  height: 55rem;
  background-position: center;
  background-size: cover;
  background-image: url("img/landingbackground1.jpeg");
  justify-content: space-evenly;
  align-items: center;
  object-fit: fit-content;
`

const Landing1Script = styled.span`
  background-color: #ffffffc0;
  font-size: 45px;
  margin-left: 10rem;
  animation: ${boxLeftFade} 3s ease-in-out;
`

const Landing1Image = styled.img`
  width: 45rem;
  height: 45rem;
  border-radius: 100%;
  animation: ${imageFade} 3s ease-in-out;
`

const Image = styled.img`
width: fit-content;
height: fit-content;
object-fit: scale-down;

`


// styled component boundary

const Landing1 = () => {
  return (
    <>
      <Landing1Container>
        <Landing1Script className="landing1_script">
          <p>혼자 산책할때마다<br/></p>
          <p>외로울 텐데...<br/><br/></p>
          <p>근처 친구들이 있다면 더 좋겠죠?</p>
        </Landing1Script>

        <Landing1Image className="landing1_image" src='img/Joy__Original.gif'>
        </Landing1Image>
          
      </Landing1Container>
    </>
  );
};

export default Landing1;
