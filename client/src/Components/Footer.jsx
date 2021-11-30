// import { faBuilding } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer_container">
      <div className="footer_logo">
        {/* <FontAwesomeIcon icon={faBuilding} className="footer_icon" /> */}
        <img src='./mainlogo.png' style={{width: '30%', height: '30%', objectFit:'cover'}}/>
      </div>

      <div className="footer_introduce">
        <div className="footer_introduce_title">About us</div>
        <li>
          <a href="https://github.com/codestates/WalkingDogs"
              style={{color:'white',textDecoration:'none'}}>Repository</a>
        </li>
        <li>
          <a href="https://github.com/codestates/WalkingDogs/wiki"
              style={{color:'white',textDecoration:'none'}}> WIKI </a>
        </li>
      </div>

      <div className="footer_member_box">
        <div className="footer_member_title">Members</div>
        <li>
          <a href=""
              style={{color:'white',textDecoration:'none'}}> 박종환 </a>
        </li>
        <li>
          <a href=""
              style={{color:'white',textDecoration:'none'}}> 양예솔 </a>
        </li>
        <li>
          <a href=""
              style={{color:'white',textDecoration:'none'}}> 이진희 </a>
        </li>
        <li>
          <a href=""
              style={{color:'white',textDecoration:'none'}}> 홍순상 </a>
        </li>
      </div>
    </footer>
  );
};

export default Footer;
