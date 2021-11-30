import React from "react";
import "../ComponentStyles/Landing1.css";

const Landing1 = () => {
  return (
    <>
      <div
        className="lading1_background"
        style={{
          border: "1px solid #000000",
          width: "100%",
          height: "200px",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <span className="landing1_script">
          혼자 산책할때마다
          <br />
          근처 친구들이 있다면 <br />더 좋겠죠?
        </span>

        <div className="landing1_image"></div>
      </div>
    </>
  );
};

export default Landing1;
