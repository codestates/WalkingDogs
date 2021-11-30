import React from "react";
import {Link} from 'react-router-dom'
import "../ComponentStyles/Landing3.css";



const Landing3 = () => {

  return (
    <>
      <div
        className="landing3_backgrond"
        style={{
          border: "1px solid #000000",
          width: "100%",
          height: "200px",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <Link to="/roomlist">
          <button className="into_button"> 처음인데 한번 볼까?</button>
        </Link>
      </div>
    </>
  );
};

export default Landing3;
