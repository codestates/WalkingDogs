import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import DataListInput from 'react-plain-datalist-input';
import media from 'styled-media-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import { IoCloseCircle } from 'react-icons/io5';
import { forEach, set } from 'lodash';
import useDeepCompareEffect from 'use-deep-compare-effect';

const boxShadow = '0 4px 6px rgb(32 33 36 / 28%)';
const activeBorderRadius = '1rem 1rem 0 0';
const inactiveBorderRadius = '1rem 1rem 1rem 1rem';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 0.5rem;
  width: 100%;
  .autocomplete-input {
    padding: 0 1px;
    text-align: center;
    gap: 2px;
    ::placeholder {
      color: var(--color-gray);
      font-family: Interop-Light;
    }
    outline: none;
    font-size: 1rem;
    cursor: pointer;
  }
  .datalist-items {
    min-width: calc(90%);
    max-height: 18.5rem;
    margin-top: 1.2rem;
    font-size: 1.1rem;
    background-color: var(--color-white);
    border-radius: 1rem;
    filter: drop-shadow(0px 6px 10px var(--color-shadow));
    overflow: auto;
    > * {
      padding: 1rem;
      :hover {
        ${media.greaterThan('medium')`
          background-color: black;
          color: white;
        `};
      }
    }
    ${media.lessThan('medium')`
      min-width: unset;
      max-width: unset;
      width: 100%;
      margin-top: 1.25rem;
      margin-bottom: -0.75rem;
      max-height: 15rem;
      filter: none;
      border: 1px solid var(--color-maingreen--50);
    `};
  }
  .datalist-active-item {
    background-color: var(--color-maingreen--25);
    :hover {
      ${media.greaterThan('medium')`
        background-color: var(--color-maingreen--25);
      `};
    }
  }
`;

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

  > div.delete-button {
    cursor: pointer;
  }
`;

const DropDownContainer = styled.ul`
  position: absolute;
  top: 52px;
  background-color: #f6f6fa;
  display: block;
  width: 100%;
  height: 12rem;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  margin-top: -1px;
  padding: 0.5rem 0;
  border: none;
  border-radius: 0 0 1rem 1rem;
  z-index: 3;
  overflow-y: auto;

  > li {
    padding: 0 1rem;

    &:hover {
      background-color: #eee;
    }

    &.selected {
      background-color: #ebe5f9;
    }
  }
`;

const AreaListBox = styled.div`
  width: 10;
  height: 20px;
  border: 1px solid blue;
`;

const AreaList = styled.select`
  border: 1px solid black;
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

const InputCheckbox = () => {
  const onSelect = useCallback((selectedItem) => {
    setItem(selectedItem.label);
  });

  const onInput = (newValue) => {
    setItem(newValue);
  };

  // const items = useMemo(()=> values.map((oneItem) => {
  //     const valueList = {};
  //     valueList.key = oneItem.id;
  //     if(oneItem.city) valueList.city = oneItem.city;
  //     if(oneItem.area) valueList.area = oneItem.area;
  //     if(oneItem.place) valueList.place = oneItem.place;

  //     return { ...valueList};
  // }),[values]);

  const [seletedCity, setSeletecCity] = useState([]);

  const [selectedArea, setSelectedArea] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [backward, setBackward] = useState(false);
  const [item, setItem] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [hasText, setHasText] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [focus, setFocus] = useState(false);
  const posInput = useRef();

  const handleInputChange = (e) => {
    const { value } = e.target;
    
    value ? setHasText(true) : setHasText(false);
    setInputValue(value);
  };
  
  const handleDropDownClick = (clickedOption) => {
    setSelectedOptions([...selectedOptions, clickedOption]);
  };
  
  // const handleKeyUp = (event) => {
  //   // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState#example
  //   // eslint-disable-next-line
  //   if (
  //     event.getModifierState('Fn') ||
  //     event.getModifierState('Hyper') ||
  //     event.getModifierState('OS') ||
  //     event.getModifierState('Super') ||
  //     event.getModifierState('Win')
  //     )
  //     return;
  //     if (
  //       event.getModifierState('Control') +
  //       event.getModifierState('Alt') +
  //       event.getModifierState('Meta') >
  //       1
  //       )
  //       return;
  //       if (hasText) {
  //         if (event.code === 'ArrowDown' && options.length - 1 > selected) {
  //           setSelected(selected + 1);
  //         }
  //         if (event.code === 'ArrowUp' && selected >= 0) {
  //           setSelected(selected - 1);
  //         }
  //         if (event.code === 'Enter' && selected >= 0) {
  //           handleDropDownClick(options[selected]);
  //           setSelected(-1);
  //         }
  //       }
  //     };
    
      // useEffect(() => {
      //   if (inputValue === '') {
      //     setHasText(false);
      //   }
      // });

  const handleFocusOn = () => {
    setFocus(!focus);
  }
      
  useDeepCompareEffect(async () => {
    const addressUrl = 'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=';

    console.log(options)
    console.log(selectedOptions)
            
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
      case 3:
        setOptions([])
        break;
    } 
  }, [selectedOptions]);

  const handleClearClick = (idx) => {
    const slicedArr = selectedOptions.slice(0, idx)
    
    setSelectedOptions([ ...slicedArr ])
  };

  return (
    <AutoCompleteWrapper className="autocomplete-wrapper" onClick={handleFocusOn}>
      <InputContainer
        hasText={hasText}
        onChange={handleInputChange}
      >
        {selectedOptions.map((option, idx) => {
          return (
            <ClearBtn>
              <span style={{fontSize: '10px'}}>{option.name.split(' ')[option.name.split(' ').length - 1]}</span>
              <IoCloseCircle onClick={() => handleClearClick(idx)}/>
            </ClearBtn>
          )
        })}
      </InputContainer>

      {focus ?
        options.length !== 0 ?
          <DropDown
            options={options}
            handleDropDownClick={handleDropDownClick}
            selected={selected}
          />
        :
          <></>
      :
        <></>
      }

      {/* <Container> */}
      {/* <DataListInput
                    name='city'
                    placeholder="시,도"
                    />
                    <DataListInput
                    name='area'
                    placeholder="구, 군"
                    />
                    <DataListInput
                    name='place'
                    placeholder='동,읍,면'
                    /> */}
      {/* {item && (
                        <ClearBtn onClick={handleClearClick}>
                            <IoCloseCircle/>
                        </ClearBtn>
                    )}
        </Container> */}
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
              onClick={() => handleDropDownClick(option)}
              className={selected === idx ? 'selected' : ''}
            >
              {option.name.split(' ')[option.name.split(' ').length - 1]}
            </li>
          );
        })}
    </DropDownContainer>
  )
}

export default InputCheckbox;
// InputCheckbox.PropTypes={
//     values: PropTypes.arrayOf(PropTypes.any).isRequired,
// };
