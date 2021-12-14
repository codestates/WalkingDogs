import React ,{useRef}from 'react';
import styled,{css} from 'styled-components'
import PropTypes from 'prop-types'
import media from 'styled-media-query'


const InputWrapper = styled.label`
    height:100%;
    ${media.greaterThan('medium')`
        min-width: ${(props) => {
            if(props.sort === '지역') return '10rem';
            if(props.sort === '날짜') return '10rem';
            if(props.sort === '시간') return '5rem';
                return '6.5rem';
        }};

        max-width: ${(props) => {
            if(props.sort === '지역') return '25rem';
            if(props.sort === '날짜') return '20rem';
            if(props.sort === '시간') return '8rem';
                return '10rem';
        }};
    `}
    border-radius: 1rem;
    display: flex;
    width: 20rem;
    :hover {
        ${media.greaterThan("medium")`
        background-color: var(--color-darkwhite);
        `};
    }
    position: relative;
    .bg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 4rem;
        border: 1px solid var(--color-lightgray);
        border-radius: 1rem;
        ${media.greaterThan("medium")`
        display: none;
        `};
    }
    `;

const InputArea = styled.div`
    flex: 1 1 0;
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${media.lessThan("medium")`
    height: fit-content;
  `};
`

const Name = styled.div`
    margin: 0 1rem;
    font-size: 0.9rem;
    color: black;
    flex: 0 0 1;
`

const Divider = styled.div`
  min-width: 1px;
  background-color: var(--color-lightgray);
  width: 1px;
  border-radius: 1px;
  margin: 0.75rem 0;
`;

const SearchInput = ({name, children, hideDivider}) => {
    const box = useRef(null)

    return (
        <InputWrapper
            onFocus={()=> {
                box.current.style.cssText = css`
                    border: 1px solid black;
                `;
            }}
            onBlur={()=> {
                box.current.style.cssText = css`
                    border: 1px solid var(--color-lightgray);
                `;
            }}
            sort={name}
            >
            <div className="thing" ref={box}/>
            <InputArea>
                <Name>{name}</Name>
                {children}
            </InputArea>
            {/* {!hideDivider && <Divider className="divider"/>} */}
        </InputWrapper>
    )
}

SearchInput.defaultProps = {
    hideDivider: false,
};

SearchInput.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]).isRequired,
}

export default SearchInput;