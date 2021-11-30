import React from "react";
import styled from 'styled-components'


export const Landing1Container = styled.div`
  border: 1px solid #000000;
  display: flex;
  width: auto;
  height: 350px;
  background-position: center;
  background-size: cover;
  justify-content: space-between;
  align-items: center;
`

export const Landing1Script = styled.span`
  border: 1px solid #000000;
  font-size: 45px;
  margin-left: 10px;
`

export const Landing1Image = styled.div`
    border: 2px solid #000000;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 10px;
`

export const Ment1 = styled.p`

`
export const Ment2 = styled.p`

`
export const Ment3 = styled.p`

`

// styled component boundary

const Landing1 = () => {
  return (
    <>
      <Landing1Container>
        <Landing1Script className="landing1_script">
          <Ment1 >혼자 산책할때마다<br/></Ment1>
          <Ment2>외로울 텐데...<br/><br/></Ment2>
          <Ment3>근처 친구들이 있다면 더 좋겠죠?</Ment3>
        </Landing1Script>

        <Landing1Image className="landing1_image"></Landing1Image>
      </Landing1Container>
    </>
  );
};

export default Landing1;
