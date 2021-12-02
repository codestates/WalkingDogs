// import { faBuilding } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";
import styled from 'styled-components'


export const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
  padding: 0 20px;
  text-decoration:none;
  height: auto;
`

export const FooterLogo = styled.div`
  width: auto !important;
`

export const FooterIntro = styled.div`
  list-style: none;
  padding-left: 0;
  text-align: center;
  width:auto;
`

export const IntroTitle = styled.div`
  color: #ffffff;
  font-size: 35px;
`

export const Li = styled.li`
  padding: 6px 12px;
  text-align: center;
  font-size: 20px;
`

export const MemberBox = styled.div`
  list-style: none;
  text-align: center;
`

export const MemberA = styled.a`
  color: #ffffff;
  text-decoration: none;
`

// styled-component Boundary

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogo>
        {/* <FontAwesomeIcon icon={faBuilding} className="footer_icon" /> */}
        <img src='./mainlogo.png' 
              style={{width: '30%', 
                      height: '30%', 
                      objectFit:'cover'}}/>
      </FooterLogo>

      <FooterIntro>
        <IntroTitle>About us</IntroTitle>
        <Li>
          <a href="https://github.com/codestates/WalkingDogs"
              style={{color:'white',textDecoration:'none'}}>Repository</a>
        </Li>
        <Li>
          <a href="https://github.com/codestates/WalkingDogs/wiki"
              style={{color:'white',textDecoration:'none'}}> WIKI </a>
        </Li>
      </FooterIntro>

      <MemberBox>
        <div className="footer_member_title">Members</div>
        <Li>
          <a href=""
              style={{color:'white',textDecoration:'none'}}> 박종환 </a>
        </Li>
        <Li>
          <a href=""
              style={{color:'white',textDecoration:'none'}}> 양예솔 </a>
        </Li>
        <Li>
          <a href=""
              style={{color:'white',textDecoration:'none'}}> 이진희 </a>
        </Li>
        <Li>
          <a href=""
              style={{color:'white',textDecoration:'none'}}> 홍순상 </a>
        </Li>
      </MemberBox>
    </FooterContainer>
  );
};

export default Footer;
