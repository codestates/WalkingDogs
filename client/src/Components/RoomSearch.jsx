import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import roomApi from '../api/room'
import media from 'styled-media-query'
import Roommap from './Roommap';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


const Container = styled.div`
    height: 13rem;
`

const Search = styled.input`
    background-color: white;
    width: 18.5rem;
    height: 5rem;
    border: 1px solid gray;
    border-radius: 1rem;
    padding: 1.2rem;
    margin-bottom: 1.25rem;
    ${media.lessThan("medium")`
        width: 20rem;
    `}
`;

const SearchResult = styled.ul`
     position: absolute;
  width: 18.5rem;
  height: auto;
  max-height: 12rem;
  border: 1px solid var(--color-lightgray);
  border-radius: 1rem;
  background-color: var(--color-white);
  z-index: 5;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  ${media.lessThan("medium")`
    width: 20rem;
  `}
  filter: drop-shadow(2px 2px 6px var(--color-shadow));
`;

const SearchList = styled.li`
  display: flex;
  align-items: center;
  width: auto;
  height: 3rem;
  background-color: white;
  border-bottom: 1px solid gray;
  cursor: pointer;
  padding: 1.2rem;
  :hover {
    background-color: black;
  }
  :last-child {
    border-style: none;
  }
`;

const MapContainer = styled.div`
  width: 18.5rem;
  height: 12rem;
  margin-top: 1rem;
  ${media.lessThan("medium")`
    width: 20rem;
  `}
`;

const StyledDate = styled.div`
  .react-datepicker__tab-loop {
    margin-top: 1.75rem;
    ${media.lessThan("medium")`
      width: 100%;
      height: 20.5rem;
      margin-top: 1.25rem;
      margin-bottom: -0.75rem;
      border-radius: 1rem;
      border: 1px solid var(--color-mainviolet--50);
      position: relative;
    `};
  }
  .react-datepicker__input-container {
    > input {
      padding: 0 1rem;
      width: 100%;
      ::placeholder {
        color: var(--color-gray);
        font-family: Interop-Light;
      }
    }
    > button {
      display: none;
    }
  }
  .react-datepicker-popper {
    margin-top: 1.75rem;
    ${media.lessThan("medium")`
      filter: none;
      position: absolute;
      margin: 0 !important;
      inset: 0 !important;
      transform: unset !important;
    `};
    width: 100%;
    padding: 0;
  }
  .react-datepicker {
    background-color: white;
    border: none;
    border-radius: 1rem;
    ${media.greaterThan("medium")`
      filter: drop-shadow(0px 6px 10px var(--color-shadow));
    `};
    ${media.lessThan("medium")`
      width: 100% !important;
      inset: 0 !important;
    `};
  }
  .react-datepicker__month-container {
    > * {
      border: 0;
    }
    ${media.lessThan("medium")`
      width: 100% !important;
      inset: 0 !important;
    `};
  }
  .react-datepicker__month {
    margin: 0.5rem;
  }
  .react-datepicker__header {
    border-radius: 1rem 1rem 0 0;
    background-color: transparent;
    font-family: Interop-Medium;
  }
  .react-datepicker__navigation {
    margin: 0.5rem 0;
  }
  .react-datepicker__current-month {
    color: darkgray;
    margin: 0.5rem 0;
  }
  .react-datepicker__day-names {
    margin-top: -0.5rem;
    border-bottom: 1px solid gray;
  }
  .react-datepicker__day-name {
    font-size: 1rem;
    width: 2rem;
    line-height: 2rem;
    margin: 0.25rem;
    color: darkgray;
  }
  .react-datepicker__week {
    > * {
      border-radius: 0.4rem;
      color: darkgray;
      font-family: Interop-Medium;
      font-size: 1rem;
      width: 2rem;
      line-height: 2rem;
      margin: 0.25rem;
    }
    .react-datepicker__day {
      :hover {
        background-color: gray;
      }
    }
    .react-datepicker__day--selected {
      color: white;
      background-color: gray;
      :hover {
        color: white;
        background-color: gray;
        opacity: 0.8;
      }
    }
    .react-datepicker__day--today {
      border: 1px solid gray;
      line-height: calc(2rem - 2px);
    }
  }
`;

const StyleDatePicker = styled(DatePicker)`
    font-family: Interop-Bold;
    padding: 0.65rem;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
    color: var(--color-gray);
    border: 1px solid gray;
    font-size: 1rem;
    width:80%;
    text-align: center;
`

const Count = styled.div`
  width: 18.5rem;
  height: 5rem;
  border: 1px solid var(--color-lightgray);
  border-radius: 1rem;
  background-color: var(--color-darkwhite);
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  ${media.lessThan("medium")`
    width: 20rem;
  `}
  button {
    font-size: 2rem;
  }
  input {
    text-align: center;
  }
`;

//styled-component Boundary
const RoomSearch = ({
    step,
    isOnSearch,
    setOnSearch,
    inputValue,
    setInputValue,
    list,
    setList,
    isSelected,
    setIsSelected,
    selectedOptions,
    setSelectedOptions,
}) => {

    const [thing, setThing] = useState([]);

    // useEffect(() => {
    //     const getRoom = () => {
    //         const {data: rooms} = roomApi.newRoomApi();
    //         setThing(thing);
    //     };
    //     getRoom();
    // },[]);

    const time = [{
      id: 1, 
      krName: '🌞오전',
      enName: 'Morning'
    }, 
    {
      id:2, 
      krName: '🌗오후',
      enName: 'afternoon'
    }, 
    {
      id:3, 
      krName: '🌑저녁',
      enName: 'evening'
    },
  ]

  useEffect(() => {
    if(step === 6) {
      setInputValue(2);
      setSelectedOptions([...selectedOptions, inputValue]);
    }
  }, []);

  const handleSelect = (el) => {
    setOnSearch(false);
    setIsSelected(true);
    if (selectedOptions.length === 0) {
      setInputValue(el.place_name + " " );
      setSelectedOptions([...selectedOptions, el.place_name]);
    }
    if (selectedOptions.length === 1) {
      setInputValue(el.place_name);
      setSelectedOptions([...selectedOptions, el]);
    }
    if (selectedOptions.length === 2) {
      const formatedDate =
        el.getFullYear() +
        "년 " +
        (String(el.getMonth() + 1).length === 1 ? "0" + (el.getMonth() + 1) : el.getMonth() + 1) +
        "월 " +
        (String(el.getDate() + 1).length === 1 ? "0" + el.getDate() : el.getDate()) +
        "일";
      setInputValue(formatedDate);
      const selectedDate =
        el.getFullYear() +
        "-" +
        (String(el.getMonth() + 1).length === 1 ? "0" + (el.getMonth() + 1) : el.getMonth() + 1) +
        "-" +
        (String(el.getDate() + 1).length === 1 ? "0" + el.getDate() : el.getDate());
      setSelectedOptions([...selectedOptions, selectedDate]);
    }
    if (selectedOptions.length === 3) {
      setInputValue(el);
      const filtered = time.filter((a) => a.krName.includes(el.split(" ")[1]))[0].krName;
      setSelectedOptions([...selectedOptions, filtered.split(" ")[1]]);
    }
    if (
      selectedOptions.length === 4 ||
      selectedOptions.length === 6 ||
      selectedOptions.length === 7
    ) {
      setInputValue(el.target.innerText);
      setSelectedOptions([...selectedOptions, el.target.innerText]);
    }
  };

  const handleInputClick = () => {
    // if (selectedOptions.length === 0 || selectedOptions.length === step) {
    //   setSelectedOptions(selectedOptions.slice(0, selectedOptions.length - 1));
    //   setOnSearch(true);
    // }
    // if (step === 3 || step === 4) {
    //   setOnSearch(true);
    // }
    // setInputValue("");
  };

  const handleCount = (e) => {
    if (e.target.innerText === "+") {
      setInputValue((prevState) => prevState + 1);
    } else if (e.target.innerText === "-") {
      inputValue > 2 && setInputValue((prevState) => prevState - 1);
    }
  };

  const handleCountChange = (e) => {
    setInputValue(e.target.value);
  };


    return(
      <Container>
        {((step >= 1 && step <= 5) || step === 7 || step === 8) && (
          <Search
            value={inputValue}
            placeholder={step === 1 ? '선택해주세요' : step === 5 ? "오후 2시" : "작성해주세요"}
            onClick ={handleInputClick}
            isOnSearch={isOnSearch}
            />
        )}
        {step === 6 && (
          <Count>
            <button onClick={handleCount}>-</button>
            <input value={inputValue} onChange={handleCountChange}/>
            <button onClick={handleCount}>+</button>
          </Count>
        )}

        {isOnSearch && (
          <>
           {step === 1 && (
              <>
            <SearchResult>
              {thing.filter((el) => el.place_name.includes(inputValue))
              .map((el)=> {
                <SearchList key={el.id} onClick={() => handleSelect(el)}>
                  {el.place_name}
                </SearchList>
              })}
            </SearchResult>
          </>
           )}
        {step === 2 && list.length >= 1 && (
          <SearchResult>
            {list.map((el)=> {
              <SearchList>
                {el.place_name}
              </SearchList>
            })}
          </SearchResult>
        )}
        {step === 3 && (
          <StyledDate>
            <StyleDatePicker
              minDate={new Date()}
              dateFormat="yyyy/MM/dd"
              onChange={handleSelect}
              inline
              />
          </StyledDate>
        )}
        {step === 4 && (
          <SearchResult>
            {time.
              filter((el) => el.krName.includes(inputValue))
              .map((el)=> {
                <SearchList key={el.id} onClick={()=> handleSelect(el.krName)}>
                  {el.krName}
                </SearchList>
              })}
          </SearchResult>
        )}
        {(step === 5 || step === 7 || step === 8) && (
          <SearchResult>
            <SearchList>{inputValue}</SearchList>
          </SearchResult>
        )}
        </>
      )}
      {isSelected && step === 2 && (
        <MapContainer>
          <Roommap
          place = {selectedOptions[selectedOptions.length - 1].place_name}
          latitude={selectedOptions[selectedOptions.length - 1].y}
          longitude={selectedOptions[selectedOptions.length - 1].x}/>
        </MapContainer>
      )}
      </Container>
    );
}

RoomSearch.propTypes = {
    step: PropTypes.number.isRequired,
    isOnSearch: PropTypes.bool.isRequired,
    setOnSearch: PropTypes.func.isRequired,
    inputValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    setInputValue: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    setList: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    setIsSelected: PropTypes.func.isRequired,
    selectedOptions: PropTypes.array.isRequired,
    setSelectedOptions: PropTypes.func.isRequired,
}

export default RoomSearch;