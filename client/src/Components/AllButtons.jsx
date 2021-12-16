import React from 'react';
import styled from 'styled-components'
import media from 'styled-media-query'
import PropTypes from 'prop-types'


const ButtonContainer = styled.button`
  text-align: center;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  :hover {
    opacity: 0.1;
    color: black;
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  font-size: 1.2rem;
  min-width: fit-content;
  padding: 1rem 1.5rem;
  border-radius: 0.8rem;
  ${media.lessThan("medium")`
    font-size: 1.15rem;
    padding: 0.875rem 1.25rem;
    border-radius: 0.6rem;
    `};
  ${media.lessThan("small")`
    font-size: 1rem;
    padding: 0.75rem 1rem;
  `};
`;

// styled-component Boundary

const AllButtons = ({ type, className, color, bgColor ,onClick, disabled, children, ...rest}) => {
    return (
        <ButtonContainer
            type={type}
            className={className}
            color={color}
            bgColor={bgColor}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </ButtonContainer>
    )
}

AllButtons.defaultProps = {
    color: '#000000',
    bgColor: "var(--color-darkwhite)",
    onClick:null,
    disabled: false,
    children:null,
};

AllButtons.propTypes = {
    className: PropTypes.string.isRequired,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.element,
        PropTypes.node,
        PropTypes.string,
    ])
}

export default AllButtons;