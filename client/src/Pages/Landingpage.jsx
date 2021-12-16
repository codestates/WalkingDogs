import React , {useEffect} from "react";
import Landing1 from "../Components/Landing/Landing1";
import Landing2 from "../Components/Landing/Landing2";
import Landing3 from "../Components/Landing/Landing3";
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import styled, {css, keyframes} from  'styled-components';
import media from 'styled-media-query'

const LandingContainer = styled.div`
  *{
    margin: 0;
    height: 100%;
  }
`

// const Landing = styled.div`
//   display: flex;
//   width: auto;
//   height: 60rem;
//   background-position: center;
//   background-size: cover;
  
//   justify-content: space-evenly;
//   align-items: center;
//   object-fit: fit-content;
//   .first-landing{
//     background-image: url("img/landingbackground1.jpeg");
//   }
// `

// const Script = styled.span`
//   background-color: #ffffffc0;
//   font-size: 45px;
//   margin-left: 10rem;
//   .script-left{
//     animation: ${boxLeftFade} 3s ease-in-out;
//   }
//   .script-right{
//     animation: ${boxRightFade} 3s ease-in-out; 
//   }
// `

// const Image = styled.img`
//   width: fit-content;
//   height: fit-content;
//   object-fit: scale-down;
//   .image-left{
//     animation: ${imageLeftFade} 3s ease-in-out;
//   }
//   .image-right{
//     animation: ${imageFade} 3s ease-in-out;
//   }
// `




// styled-component Boundary
const Landingpage = () => {


  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   gsap.utils.toArray("div").forEach((div, i) => {
  //     ScrollTrigger.create({
  //       trigger: div,
  //       start:"top top",
  //       pin:true,
  //       pinSpacing: false,
  //     });
  //   });
  //   ScrollTrigger.create({
  //     snap: 1/ 4
  //   })
  // })

  return (
    <div className="landingpage_container">    
        <Landing1 className="landing1-components"/>
        <Landing2 className='landing2-components'/>
        <Landing3 className='landing3-components'/>
    </div>
  );
};

export default Landingpage;
