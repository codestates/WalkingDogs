import React from 'react';
import styled, {css} from 'styled-components';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {modalOffAction} from '../store/actions'


const IconContainer = styled.div`
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
`

// styled-component Boundary
const UserIcon = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    return(
        <IconContainer>

        </IconContainer>
    )
}

export default UserIcon;