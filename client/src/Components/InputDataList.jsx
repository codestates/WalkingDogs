import React, { useMemo } from 'react';
import styled from 'styled-components'
import DataListInput from 'react-plain-datalist-input';
import PropTypes from 'prop-types';
import media from 'styled-media-query';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  width: 100%;
  .autocomplete-input {
    text-align-last: center;
    text-align: center;
    -ms-text-align-last: center;
    -moz-text-align-last: center;
    margin-bottom: 0.6rem;
    padding:auto;
    width: 100%;
    ::placeholder {
      color: var(--color-hotstone);
      font-family: Interop-Light;
    }
    outline: none;
    font-size: 17px;
  }
  .datalist-items {
    min-width: calc(auto + 4rem);
    max-height: 15rem;
    background-color: var(--color-white);
    border-radius: 1rem;
    border: none;
    filter: drop-shadow(0px 6px 10px var(--color-shadow));
    overflow: auto;
    > * {
      padding: 1rem;
      :hover {
        ${media.greaterThan("medium")`
          background-color: var(--color-maingreen--10);
        `};
      }
    }
    ${media.lessThan("medium")`
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
      ${media.greaterThan("medium")`
        background-color: var(--color-maingreen--25);
      `};
    }
  }
`;

const ClearBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 1.375rem;
  /* top: 50%;
  transform: translateY(-50%); */
  width: 1.25rem;
  height: 1.25rem;
  font-size: 1.25rem;
  color: var(--color-lightgray);
  :hover {
    color: var(--color-gray);
  }
`;

//styled-component Boundary


const InputDataList = ({ values, placeholder, item, setItem }) => {

    const items = useMemo(() => values.map(value => ({ label: value.times, key: value.id })), [values])

    const onSelect = (selectedItem) => {
      setItem(selectedItem.label);
    };

    const onInput = (newVal) => {
        setItem(newVal);
    };

    const handleClearClick = () => {
        setItem("");
    }

    return (
        <Container>
            <DataListInput
                placeholder={placeholder}
                value={item}
                items={items}
                onSelect={onSelect}
                onInput={onInput}
                suppressReselect={false}
            />
            {item && ( //??????????????? ???????????? ???????????? ?????? ??????????????? ???????????? x???????????? ?????? ??? ??????. 
                <ClearBtn type='button' onClick={handleClearClick}>
                    <FontAwesomeIcon icon={faTimes}/>
                </ClearBtn>
            )}
        </Container>
    );
}

InputDataList.propTypes = {
    values: PropTypes.arrayOf(PropTypes.any).isRequired,
    placeholder: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired, //???????????? ???????????? ??????
    setItem : PropTypes.func.isRequired,
};

export default InputDataList;
