import React , {useEffect} from "react";
import styled, {keyframes} from 'styled-components'
import {gsap} from 'gsap';
import media from 'styled-media-query';

const Landing1Container = styled.div`
  display: flex;
  width: auto;
  height: 85vh;
  height: calc(var(--vh, 1vh) * 100);
  background-position: center;
  background-size: cover;
  background-image: url("img/landingbackground1.jpeg");
  justify-content: flex-end;
  align-items: 0.5vw;
  object-fit: fit-content;

  ${media.lessThan("medium")`
    height: calc(var(--vh, 1vh) * 70);
    `}
`

const Landing1Script = styled.span`
  background-color: #ffffffc0;
  font-size: 45px;
  margin-right: 34.1rem;
  height: 10vh;
  
  >.script-suggest {
    font-family: "PoorStory-Regular"
    font-size: 7rem
  }

  ${media.lessThan("medium")`
    font-size: 1.2rem;
  `}
`

const Landing1Image = styled.img`
  width: 45rem;
  height: 45rem;
  border-radius: 100%;
  display: inline-block;
`


// styled component boundary

const Landing1 = () => {

  useEffect(() => {
    const timeline = gsap.timeline({default: { duration: 1}})
    timeline
      .from('.script-box', {x:'100%', ease: 'linear', opacity: 0.01})   
  })

  return (
    <>
      <Landing1Container>
        <Landing1Script className="script-box">
          <p classname='scripts'>혼자 산책할때마다<br/></p>
          <p classname='scripts'>외로울 텐데...<br/><br/></p>
          <p classname='script-suggest'>근처 친구들이 있다면 더 좋겠죠?</p>
        </Landing1Script>

        {/* <Landing1Image className="landing1_image" src='img/Joy__Original.gif'>
        </Landing1Image> */}
          
      </Landing1Container>
    </>
  );
};

export default Landing1;
