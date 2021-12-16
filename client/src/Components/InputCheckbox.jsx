import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { IoCloseCircle } from 'react-icons/io5';
import useDeepCompareEffect from 'use-deep-compare-effect';

// const boxShadow = '0 4px 6px rgb(32 33 36 / 28%)';
// const activeBorderRadius = '1rem 1rem 0 0';
// const inactiveBorderRadius = '1rem 1rem 1rem 1rem';

// const Container = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   margin-top: 0.5rem;
//   width: 100%;
//   .autocomplete-input {
//     padding: 0 1px;
//     text-align: center;
//     gap: 2px;
//     ::placeholder {
//       color: var(--color-gray);
//       font-family: Interop-Light;
//     }
//     outline: none;
//     font-size: 1rem;
//     cursor: pointer;
//   }
//   .datalist-items {
//     min-width: calc(90%);
//     max-height: 18.5rem;
//     margin-top: 1.2rem;
//     font-size: 1.1rem;
//     background-color: var(--color-white);
//     border-radius: 1rem;
//     filter: drop-shadow(0px 6px 10px var(--color-shadow));
//     overflow: auto;
//     > * {
//       padding: 1rem;
//       :hover {
//         ${media.greaterThan('medium')`
//           background-color: black;
//           color: white;
//         `};
//       }
//     }
//     ${media.lessThan('medium')`
//       min-width: unset;
//       max-width: unset;
//       width: 100%;
//       margin-top: 1.25rem;
//       margin-bottom: -0.75rem;
//       max-height: 15rem;
//       filter: none;
//       border: 1px solid var(--color-maingreen--50);
//     `};
//   }
//   .datalist-active-item {
//     background-color: var(--color-maingreen--25);
//     :hover {
//       ${media.greaterThan('medium')`
//         background-color: var(--color-maingreen--25);
//       `};
//     }
//   }
// `;

const InputContainer = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 3px 3px;
  z-index: 3;
`;

const DropDownContainer = styled.ul`
  position: absolute;
  top: 52px;
  background-color: #f6f6fa;
  display: block;
  width: 100%;
  height: auto;
  max-height: 12rem;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  margin-top: 1rem;
  padding: 0.5rem 0;
  border: none;
  border-radius: 1rem 1rem 1rem 1rem;
  z-index: 3;
  overflow-y: auto;

  > li {
    padding: 1px 1rem;
    box-shadow: 1px 1px lightgray;

    &:hover {
      background-color: var(--color-mainviolet--25);
      color: var(--color-darkwhite);

    }

    &.selected {
      background-color: #ebe5f9;
      color: black;
    }
  }
`;

const ClearBtn = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  height: 25px;
  margin-right: 5px;
  border-radius: 15px;
  box-shadow: 1px 1px 3px;
  padding: 0px 5px;
  align-self: flex-end;
  font-size: 1rem; 
  color: var(--color-gray);
`;

const AutoCompleteWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`

// styled-component Boundary

const InputCheckbox = ({ setAddressInput }) => {

  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [focus, setFocus] = useState(false);
  
  const handleDropDownClick = (clickedOption) => {
    setAddressInput([...selectedOptions, clickedOption]);
    setSelectedOptions([...selectedOptions, clickedOption]);
  };

  const handleFocus = () => {
    setFocus(true);
  }
      
  useDeepCompareEffect(async () => {
    const addressUrl = 'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=';

    let res
    switch (selectedOptions.length) {
      case 0:
        res = await axios.get(`${addressUrl}*00000000`);
        setOptions(res.data.regcodes)
        break;
      case 1:
        res = await axios.get(`${addressUrl}${selectedOptions[selectedOptions.length - 1].code.slice(0, 2)}*000000&is_ignore_zero=true`);
        setOptions(res.data.regcodes)
        break;
      case 2:
        res = await axios.get(`${addressUrl}${selectedOptions[selectedOptions.length - 1].code.slice(0, 4)}*&is_ignore_zero=true`);
        setOptions(res.data.regcodes)
        break;
      default:
        setOptions([])
        break;
    } 

    setFocus(false)
  }, [selectedOptions]);

  const handleClearClick = (e, idx) => {
    e.stopPropagation();
    const slicedArr = selectedOptions.slice(0, idx)
    
    setAddressInput([ ...slicedArr ])
    setSelectedOptions([ ...slicedArr ])
  };

  return (
    <AutoCompleteWrapper className="autocomplete-wrapper" onClick={handleFocus}>
      <InputContainer
      >
        {selectedOptions.map((option, idx) => {
          return (
            <ClearBtn key={idx} type='button'>
              <span style={{fontSize: '10px'}}>{option.name.split(' ')[option.name.split(' ').length - 1]}</span>
              <IoCloseCircle onClick={(e) => handleClearClick(e, idx)}/>
            </ClearBtn>
          )
        })}
      </InputContainer>

      {focus ?
        (
          options.length !== 0 ?
          <DropDown
            options={options}
            handleDropDownClick={handleDropDownClick}
          />
        :
          <></>
        )
      :
        <></>
      }

    </AutoCompleteWrapper>
  );
};

const DropDown = ({options, handleDropDownClick, selected}) => {
  return (
    <DropDownContainer>
      {options.map((option, idx) => {
          return (
            <li
              key={idx}
              onClick={() => {
                handleDropDownClick(option);
              }}
            >
              {option.name.split(' ')[option.name.split(' ').length - 1]}
            </li>
          );
        })}
    </DropDownContainer>
  )
}

export default InputCheckbox;