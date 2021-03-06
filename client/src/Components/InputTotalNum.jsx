import React , {useRef} from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types'
import media from 'styled-media-query';
import {FiPlus, FiMinus} from 'react-icons/fi';
import {IoCloseCircle} from  "react-icons/io5";


const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
    padding: 0 1rem;
    width: 100%;
    color: var(--color-black);
    text-align-last: center;
    text-align: center;
    -ms-text-align-last: center;
    -moz-text-align-last: center;
    ::placeholder {
    color: var(--color-gray);
    font-family: Interop-Light;
  }
  outline: none;
  font-size: 1rem;
`

const Popper = styled.div`
  position: absolute;
  margin-top: 7rem;
  width: calc(100% + 4rem);
  padding: 1rem;
  background-color: var(--color-white);
  font-size: 1.125rem;
  background-color: var(--color-white);
  border-radius: 1rem;
  overflow: auto;
  display: none;
  filter: drop-shadow(0px 6px 10px var(--color-shadow));
  ${media.lessThan("medium")`
    width: calc(100vw - 2rem);
    margin-top: 1.25rem;
    margin-bottom: -0.75rem;
    filter: none;
    border: 1px solid var(--color-maingreen--50);
  `};
`;

const PopperInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PopperInput = styled.input`
  max-width: calc(80% - 4rem);
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
  ${(props) =>
    props.disabled &&
    css`
      color: var(--color-gray);
    `};
`;

// const PopperWaring = styled.input`
//   max-width: calc(100% - 4rem);
//   text-align: center;
//   ${(props) =>
//     props.disabled &&
//     css`
//       color: var(--color-gray);
//     `};
// `;

const PlusBtn = styled(FiPlus)`
  flex: 0 0 auto;
  color: var(--color-gray);
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.25rem;
  border-radius: 50%;
  border: 1px solid var(--color-gray);
  :hover,
  :active {
    border: 1px solid var(--color-darkgray);
    color: var(--color-darkgray);
  }
`;

const MinusBtn = styled(FiMinus)`
  flex: 0 0 auto;
  color: var(--color-gray);
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.25rem;
  border-radius: 50%;
  border: 1px solid var(--color-gray);
  :hover,
  :active {
    border: 1px solid var(--color-darkgray);
    color: var(--color-darkgray);
  }
`;

const DisabledMinus = styled(MinusBtn)`
  color: var(--color-lightgray);
  border: 1px solid var(--color-lightgray);
  :hover,
  :active {
    color: var(--color-lightgray);
    border: 1px solid var(--color-lightgray);
  }
`;

const DisabledPlus = styled(MinusBtn)`
  color: var(--color-lightgray);
  border: 1px solid var(--color-lightgray);
  :hover,
  :active {
    color: var(--color-lightgray);
    border: 1px solid var(--color-lightgray);
  }
`;

const ClearBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  font-size: 1.25rem;
  color: var(--color-lightgray);
  :hover {
    color: var(--color-gray);
  }
`;



//styled-component Boundary

const InputTotalNum =({inputId, placeholder, total, setTotal}) => {
    const popper = useRef(null);

    const handleMinusClick = () => {
        setTotal(total - 1);
    }

    const handlePlusClick = () => {
        if(!total) setTotal(2);
        else setTotal(total + 1);
    }

    const handleClearClick = () => {
        setTotal(null);
        hidePopper();
    }

    const showPopper = () => {
        popper.current.style.cssText = css`
            display:block;
        `;
    }

    const hidePopper = () => {
        popper.current.style.cssText = css`
        display:none;
    `;
    }

    return (
        <Container
            tabIndex={-1}
            onFocus={() => showPopper()}
            onBlur={() => hidePopper()}
        >
            <Input value={total ? `?????? ${total} ???` : ""} placeholder={placeholder} readOnly/>
                <Popper ref={popper}>
                    <PopperInner>
                        {total > 2 ? <MinusBtn onClick={handleMinusClick}/> : <DisabledMinus/>}
                        <PopperInput id={inputId} value={total || 1} disabled={!total} readOnly/>
                        {total < 6 ? <PlusBtn onClick={handlePlusClick}/> : <DisabledPlus/>}
                    </PopperInner>
                </Popper>
                {total && (
                    <ClearBtn type='button' onClick={handleClearClick}>
                        <IoCloseCircle/>
                    </ClearBtn>
                )}
        </Container>
    )
}



InputTotalNum.propTypes = {
    inputId: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    total: PropTypes.number,
    setTotal: PropTypes.func.isRequired,
};
export default InputTotalNum;
