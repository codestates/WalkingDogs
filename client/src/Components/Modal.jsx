import React , {useEffect} from 'react';
import styled, {css} from 'styled-components'
import {useDispatch} from 'react-redux'
import { modalOffAction } from '../store/actions'
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";

import media from 'styled-media-query';


const ModalBackdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  outline: none;
  z-index: 1000;
  background-color: #80808097;
`;

const ModalOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #80808097;
`

const ModalContainer = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  width: fit-content;
  height: fit-content;
  border-radius: 1rem;
  color: darkgray;
  background-color: #646fcb;
  ${(props) => {
    props.bgColor &&
      css`
        background-color: ${props.bgColor};
      `;
  }};
  ${media.lessThan("medium")`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transform: translateY(0)
    min-height: 100%;
    min-width: 100%;
    border-radius: 0;
  `};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CloseBtn = styled.div`
border-radius: 0.5rem;
  padding: 0.25rem;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  width: 2.25rem;
  height: 2.25rem;
  font-size: 1.75rem;
  ${media.lessThan("small")`
    right: 1rem;
    top: 1rem;
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
  `};
  color: black;
  cursor: pointer;
  :hover {
    color: gray;
    background-color: gray;
    opacity: 0.8;
  }
`


// styled-component Boundary

const Modal = ({children, bgColor}) => {

  const dispatch = useDispatch();

  const handleBgClick = (e)=> {
    if(e.target === e.currentTarget) dispatch(modalOffAction())
  };
  const handleCloseClick = () => {
    dispatch(modalOffAction());
  };

  useEffect (() => {
    document.body.style.cssText=`
      position: fixed;
      top: -${window.scrollY}px;
      left: 0;
      right: 0;
    `;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText=`
        position: static;
        top: unset;
        left: unset;
        right: unset;
      `
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  },[]);

    return(
      <ModalOverlay>
        <ModalBackdrop onClick={handleBgClick} tabIndex='-1'>
          <ModalContainer tabIndex='0'>
            <CloseBtn onClick={handleCloseClick}>
              <FontAwesomeIcon icon={faTimes}/>
            </CloseBtn>
            {children}
          </ModalContainer>
        </ModalBackdrop>
      </ModalOverlay>
    );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]).isRequired,
  bgColor: PropTypes.string,
}

export default Modal;

