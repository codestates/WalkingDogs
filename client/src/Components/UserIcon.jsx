import React from 'react';
import styled, {css} from 'styled-components';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {modalOffAction} from '../store/actions'
import PropTypes from 'prop-types';

const IconContainer = styled.div`
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Interop-SemiBold;
    font-size: calc(${(props) => props.size} * 1rem);
    ${(props) =>
    props.size <= 0.8 &&
    css`
      font-family: Interop-Medium;
    `};
  > #image {
    width: calc(${(props) => props.size} * 1.4rem);
    height: calc(${(props) => props.size} * 1.4rem);
    margin-right: calc(${(props) => props.size} * 0.8rem);
    ${(props) => {
      if (props.size <= 0.8)
        return css`
          margin-right: 0.64rem;
        `;
      if (props.size >= 1.25)
        return css`
          margin-right: 1rem;
        `;
    }};
    position: relative;
  }
  > #username {
    width: fit-content;
    height: ${(props) => props.size};
    padding-top: calc(${(props) => props.size} * 0.1rem);
    line-height: calc(${(props) => props.size} * 1.4rem);
    ${(props) => {
      if (props.size <= 0.8) return "font-size: 0.8rem";
      if (props.size >= 1.25) return "font-size: 1.25rem";
    }};
    position: relative;
  }
  ${(props) =>
    !props.disabled &&
    css`
      cursor: pointer;
      :hover {
        opacity: 0.8;
      }
    `};
  #crownmark {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 40%;
    height: 40%;
    border-radius: 50%;
    font-size: 0.35em;
    color: var(--color-white);
    background-color: var(--color-mainviolet--100);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Image = styled.div`
  background-image: url(${(props) => props.url});
  background-size: cover;
  width: 100%;
  height: 0;
  padding-top: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

// styled-component Boundary
const UserIcon = ({size, user, isDisabled, isCreator, hideName}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleProfileClick = () => {
        dispatch(modalOffAction);
        history.push(`/user/${user.id}`);
    };


    return(
        <IconContainer
            disabled={isDisabled}
            size={size}
            onClick={()=>{
                if(!isDisabled) handleProfileClick()
                }}
                >
                    <div id='image'>
                    {user.image ? <Image url={user.image}/> : <DefaultImage src='img/defaultProfile.jpeg'/>}
                    {isCreator && (
                        <div id='creatormark'>
                            hi
                        </div>
                    )}
                    </div>
            {!hideName && <div id='username'> {user.username} </div>}
        </IconContainer>
    )
}

UserIcon.defaultProps = {
    isDisabled: false,
    isCreator: false,
    hideName: false,
}

UserIcon.propTypes = {
    size: PropTypes.number.isRequired,
    user: PropTypes.exact({
        id: PropTypes.string,
        username: PropTypes.string,
        image: PropTypes.string,
    }).isRequired,
    isDisabled:PropTypes.bool,
    isCreator: PropTypes.bool,
    hideName: PropTypes.bool,
};

//size, user, isDisabled, isCreator, hideName

export default UserIcon;