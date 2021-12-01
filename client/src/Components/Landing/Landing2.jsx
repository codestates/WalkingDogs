import React from "react";
import "../ComponentStyles/Landing2.css";

import styled from 'styled-components'


// styled-component Boundary

const Landing2 = () => {
  return (
    <>
      <div
        className="landing2_background"
        style={{
          border: "1px solid #000000",
          width: "100%",
          height: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div className="landing2_image"></div>
        <span className="landing2_script">
          <p className="landing2_title">오늘 산책은 누구랑?</p>
          <br />
          <br />
          우리 아이는 다른 아이들과 산책하는 걸 좋아해
          <br />
          그런데, 산책할떄마다 지나치는것 뿐...
          <br />
          <br />
          같이 산책할 친구를 찾아볼까?
        </span>
      </div>
    </>
  );
};

export default Landing2;
