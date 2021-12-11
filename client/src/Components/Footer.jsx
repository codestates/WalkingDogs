import React from 'react';
import styled from 'styled-components'


const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 0;
  text-decoration:none;
  height: auto;
`

const FooterLogo = styled.div`
  width: auto !important;
`

const FooterIntro = styled.div`
  list-style: none;
  padding-left: 0;
  text-align: center;
  width:auto;
`

const IntroTitle = styled.div`
  color: #ffffff;
  font-size: 35px;
`

const Li = styled.li`
  padding: 6px 12px;
  text-align: center;
  font-size: 20px;
`

const MemberBox = styled.div`
  list-style: none;
  margin-right: 7rem;
  text-align: center;
`

const Atag = styled.a`
  color: var(--color-darkwhite);
  text-decoration: none;

`

const MemberA = styled.a`
  color: #ffffff;
  text-decoration: none;
`

const MemberTitle = styled.div`
  color: #ffffff;
  font-size: 35px;
`

const Image = styled.img`
  width: 20rem;
  height: 17rem;
  
`

// styled-component Boundary

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogo>
        <Image src='img/mainlogo.png'/>
      </FooterLogo>

      <FooterIntro>
        <IntroTitle>About us</IntroTitle>
        <Li>
          <Atag href="https://github.com/codestates/WalkingDogs"
              style={{color:'white',textDecoration:'none'}}>Repository</Atag>
        </Li>
        <Li>
          <Atag href="https://github.com/codestates/WalkingDogs/wiki"
              style={{color:'white',textDecoration:'none'}}> WIKI </Atag>
        </Li>
      </FooterIntro>

      <MemberBox>
        <MemberTitle className="footer_member_title">Members</MemberTitle>
        <Li>
          <MemberA href=""
              style={{color:'white',textDecoration:'none'}}> 박종환 </MemberA>
        </Li>
        <Li>
          <MemberA href=""
              style={{color:'white',textDecoration:'none'}}> 양예솔 </MemberA>
        </Li>
        <Li>
          <MemberA href=""
              style={{color:'white',textDecoration:'none'}}> 이진희 </MemberA>
        </Li>
        <Li>
          <MemberA href=""
              style={{color:'white',textDecoration:'none'}}> 홍순상 </MemberA>
        </Li>
      </MemberBox>
    </FooterContainer>
  );
};

export default Footer;
