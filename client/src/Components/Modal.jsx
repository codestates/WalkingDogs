import React , {useEffect} from 'react';
import styled, {css} from 'styled-components'
import {useDispatch} from 'react-redux'
import {modalOffAction} from '../store/actions'
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


const ModalBackdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  outline: none;
  z-index: 1000;
`;

const Modal = () => {
    return;
}

export default Modal;

