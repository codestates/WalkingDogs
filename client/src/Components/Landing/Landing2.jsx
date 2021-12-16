import React ,{useEffect, useState}from "react";
import styled, {keyframes} from 'styled-components'

const boxRightFade = keyframes`
  from  {
    opacity: 0;
    margin-right:0;
    }
  to  {
    margin-right: 10rem;
  }
`

const imageLeftFade = keyframes`
  from{
    opacity: 0;
    margin-left:0;
  }

  to{
    margin-left: 6.5rem;
  }
`


const Landing2Container = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  width : auto;
  height: 50rem;
  height: calc(var(--vh, 1vh) * 110);
  background-position: center;
  background-size: cover;
  background-image: url('img/1638980727301.jpeg');
  object-fit: scale-down;
  *{
    margin: 0;
  }
`

const Landing2Image = styled.div`
  border: 2px solid var(--color-black);
  width : 39rem;
  height : 39rem;
  border-radius: 29rem;
  margin-left: 6.5rem;
  animation: ${imageLeftFade} 3s ease-in-out; 
`

const Landing2Script = styled.span`
  background-color: #ffffff65;
  font-size: 2.5rem;
  margin-right: 10rem;
  font-family: BlackHanSans;
  animation: ${boxRightFade} 3s ease-in-out; 
`

const Title = styled.p`
  font-family: "BlackHanSans";
`

// const 

// styled-component Boundary

const Landing2 = () => {
  return (
    <>
    <Landing2Container>
      <Landing2Image></Landing2Image>
      <Landing2Script>
          <Title> 오늘 산책은 누구랑?</Title>
          <br/><br/>
          <p>우리 아이는 다른 아이들과 산책하는 걸 좋아해</p>
          <br/><br/>
          <p>그런데, 산책할때마다 지나치는것 뿐...</p>
          <br />
          <br />
          같이 산책할 친구를 찾아볼까?
      </Landing2Script>
    </Landing2Container>
    </>
  );
};

export default Landing2;
