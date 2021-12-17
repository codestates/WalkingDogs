import React, { useEffect }from "react";
import styled, {keyframes} from 'styled-components'
import {gsap} from 'gsap';
import media from 'styled-media-query'

const Landing2Container = styled.div`
  display:flex;
  justify-content: flex-start;
  width : auto;
  height: 75vh;
  height: calc(var(--vh, 1vh) * 110);
  background-position: center;
  background-size: cover;
  background-image: url('img/1638980727301.jpeg');
  object-fit: scale-down;
  *{
    margin: 0;
  }
  ${media.lessThan("medium")`
    /* screen width is less than 768px (medium) */
    height: 55vh;
  `}
`

const Landing2Script = styled.span`
  background-color: #ffffff65;
  font-size: 2.3rem;
  margin-right: 7rem;
  height: 8vh;
  font-family: BlackHanSans;
  >.script-title{
    font-size: 4rem;
  }
  
  ${media.lessThan("medium")`
    height: 10vh;
    font-size: 1rem;
    >.script-title{
      font-size:2.7rem;
    }
  `}
`

const Title = styled.p`
  font-family: "BlackHanSans";
  font-size
`

// const 

// styled-component Boundary

const Landing2 = () => {


  useEffect(() => {
    const timeline = gsap.timeline({default: { duration: 1}})
    timeline
      .from('.script-box', {x:'-20%', ease: 'linear'})
      .from('.script-1', {x:'-80%', stragger:.5})
  }, [])

  return (
    <>
    <Landing2Container>
      {/* <Landing2Image></Landing2Image> */}
      <Landing2Script className="script-box">
          <p className='script-title'> 
          오늘 산책은 누구랑?
          </p>
              <br/><br/>
          <p className='scripts'>
            우리 아이는 다른 아이들과 산책하는 걸 좋아해
            </p>
              <br/><br/>
          <p className='scripts'>
            그런데, 산책할때마다 지나치는것 뿐...
            </p>
              <br />
              <br />
          <p className='scripts'>
            같이 산책할 친구를 찾아볼까?
          </p>
      </Landing2Script>
    </Landing2Container>
    </>
  );
};

export default Landing2;
