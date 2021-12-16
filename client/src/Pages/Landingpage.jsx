import React , {useEffect} from "react";
import Landing1 from "../Components/Landing/Landing1";
import Landing2 from "../Components/Landing/Landing2";
import Landing3 from "../Components/Landing/Landing3";
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

const Landingpage = () => {


  // useEffect(() =>{
  //   gsap.registerPlugin(ScrollTrigger);
  //   gsap.utils.toArray("section").forEach(())

  //   gsap.from("Landing1", {
  //     scrollTrigger: {
  //       trigger: 
  //     }
  //   })
  // })

  return (
    <div className="landingpage_container">
      <Landing1 />
      <Landing2 />
      <Landing3 />
    </div>
  );
};

export default Landingpage;
