import React from "react";
import styled, { keyframes } from "styled-components";

const bubble = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
`;

const Container = styled.div`
    width: 80px;
    margin: 0 auto;
    display: flex;
`


const BoxStyle = styled.div`
    float: 'left';
    width: '30%';
    padding: '5px';
`


const LoadingIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin: 5px;
  animation: ${bubble} 3s ease infinite;
  .icon-1{
    width: 30px;
    height: 30px;
  }
  .icon-2{
    width: 40px;
    height: 40px;
  }
  .icon-3{
    width: 40px;
    height: 40px;
  }
`;

const Loading = () => {

    return (
        <>
          <Container className="loading1">
            <BoxStyle>
              <LoadingIcon className="icon-1" />
            </BoxStyle>
            <BoxStyle>
              <LoadingIcon className="icon-2" />
            </BoxStyle>
            <BoxStyle>
              <LoadingIcon className="icon-3" />
            </BoxStyle>
          </Container>
        </>
      );

}

export default Loading;