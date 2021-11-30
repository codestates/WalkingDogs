import "./Nav.css";
import { faDog, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Mypage from '../Pages/Mypage'
import styled from 'styled-components'

export const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #5156bf;
    padding: 8px 20px;

` 




const Nav = () => {
  return (
    <NavbarContainer>
      <div className="navbar_title_container">
        <div className='nav_logo'>
          <img src='./logo.ico' 
                style={{width: '50px', 
                        height:'50px', 
                        objectFit:'cover'}}/>
          <Link to="/" 
                style={{
                  color:'#ffffff', 
                  fontSize:'40px', 
                  textDecoration:'none', 
                  fontFamily:'Rammetto One', 
                  marginLeft:'10px'}}>
            WalkingDogs
          </Link>
        </div>
      </div>

      <div className="navbar_mypage">
        <Link to="/mypage" className="mypage_icon" render={(props)=><Mypage/>}>
          <FontAwesomeIcon icon={faUser} style={{color: '#ffffff', fontSize: '40px'}}/>
        </Link>
      </div>
    </NavbarContainer>
  );
};

export default Nav;
