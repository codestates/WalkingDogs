import React , {useEffect} from "react";
import {Link} from 'react-router-dom'
import styled , {keyframes} from 'styled-components';
import media from 'styled-media-query';
import {gsap} from 'gsap';


const ButtonUp = keyframes`
  from {
    margin-top: 15rem ;
  }
  to{
    align-items: center;
  }
`

const Landing3Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
  background-position: center;
  background-size: cover;
  background-image:  url('img/1638945650734.jpeg');
`

const BtnLink = styled(Link)`
  height: auto;
`

const GuestIntoBtn = styled.button`
  border: 1px solid var(--color-mainviolet--75);
  width: 20rem;
  height: 4rem;
  border-radius: 4rem;
  font-size:2rem;
  animation: ${ButtonUp} 1.5s ease-in-out;
  :hover{
    background-color: var(--color-mainviolet--25);
    color: var(--color-darkwhite);
  }
  ${media.between("small","medium")`
    width: 20vw;
    font-size: 1.1rem;  
  `}
`



const Landing3 = () => {


  useEffect(() =>{
    gsap.from('.into_button',{ duration: 1, y: "100%", ease:'bounce'})
  }, [])

  return (
    <>
      <Landing3Container>
        <BtnLink to="/roomlist">
          <GuestIntoBtn className="into_button"> 처음인데 한번 볼까?</GuestIntoBtn>
        </BtnLink>
      </Landing3Container>
    </>
  );
};

export default Landing3;
