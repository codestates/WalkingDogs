import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes, { instanceOf } from 'prop-types';
import roomApi from '../api/room';
import media from 'styled-media-query';
import Roommap from './Roommap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

const Container = styled.div`
  position: relative;
  height: 13rem;
  z-index: 2;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Search = styled.input`
  //create-modal창의 인풋
  background-color: white;
  width: 25.5rem;
  height: 5rem;
  border: 1px solid gray;
  border-radius: 1rem;
  padding: 1.2rem;
  margin-bottom: 1.25rem;
  ${media.lessThan('medium')`
        width: 20rem;
    `}
`;

const SearchResult = styled.ul`
  width: 25.5rem;
  height: auto;
  max-height: 12rem;
  border: 1px solid var(--color-lightgray);
  border-radius: 1rem;
  background-color: var(--color-white);
  z-index: 5;
  overflow: scroll;
  overflow-x: hidden;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  /*
  ::-webkit-scrollbar-thumb{
    display: block;
    scrollbar-color: gray;
  }*/
  ${media.lessThan('large')`
    width: 20rem;
  `}
  filter: drop-shadow(2px 2px 6px var(--color-shadow));
`;

const SearchList = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  color: black;
  background-color: white;
  border-bottom: 1px solid gray;
  cursor: pointer;
  padding: 0px 10px;
  :hover {
    background-color: #eaebff;
  }
  :last-child {
    border-style: none;
  }
`;

const MapContainer = styled.div`
  width: 18.5rem;
  height: 12rem;
  margin-top: 1rem;
  ${media.lessThan('medium')`
    width: 20rem;
  `}
`;

const StyledDate = styled.div`
  width: 25.5rem;

  ${media.lessThan('medium')`
    width: 20rem;
  `}
  .react-datepicker__tab-loop {
    margin-top: 1.75rem;
    ${media.lessThan('medium')`
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
    ${media.lessThan('medium')`
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
    ${media.greaterThan('medium')`
      filter: drop-shadow(0px 6px 10px var(--color-shadow));
    `};
    ${media.lessThan('medium')`
      width: 100% !important;
      inset: 0 !important;
    `};
  }
  .react-datepicker__month-container {
    width: 25.5rem;
    > * {
      border: 0;
    }
    ${media.lessThan('medium')`
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
  color: black;
  background-color: white;
  width: 100%;
  height: 5rem;
  border: 1px solid gray;
  border-radius: 1rem;
  padding: 1.2rem;
  text-align: center;
`;

const Count = styled.div`
  width: 18.5rem;
  height: 5rem;
  border: 1px solid var(--color-lightgray);
  border-radius: 1rem;
  background-color: var(--color-darkwhite);
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  ${media.lessThan('medium')`
    width: 20rem;
  `}
  button {
    font-size: 2rem;
  }
  input {
    text-align: center;
  }
`;

const CountCheck = styled.div`
  text-align: center;
`;
const AlertMessage = styled.div`
  margin-top: 10px;
  text-align: center;
  color: red;
`;
const DogInfo = styled.div`
  text-align: center;
  color: black;
`;

const DogCheckBox = styled.div`
  display: flex;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

//styled-component Boundary
const RoomSearch = ({
  step,
  isOnSearch,
  setIsOnSearch,
  inputValue,
  setInputValue,
  list,
  setList,
  isSelected,
  setIsSelected,
  selectedOptions,
  setSelectedOptions,
  showMessage,
  setShowMessage,
  clickedDog,
  setClickedDog,
  clickedTime,
  setClickedTime,
  dogList,
  setDogList,
  selectedDogs,
  setSelectedDogs,
  clickedCalendar,
  setClickedCalendar,
}) => {
  const [address, setAddress] = useState([]);
  const [clickedSize, setClickedSize] = useState(false);
  const [date, setDate] = useState(new Date());
  const [count, setCount] = useState(0);
  const { position } = useSelector(({ posReducer }) => posReducer);

  // useEffect(() => {
  //     const getRoom = () => {
  //         const {data: rooms} = roomApi.newRoomApi();
  //         setThing(thing);
  //     };
  //     getRoom();
  // },[]);

  const time = [
    { id: 1, times: `8시` },
    { id: 2, times: `9시` },
    { id: 3, times: `10시` },
    { id: 4, times: `11시` },
    { id: 5, times: `12시` },
    { id: 6, times: `13시` },
    { id: 7, times: `14시` },
    { id: 8, times: `15시` },
    { id: 9, times: `16시` },
    { id: 10, times: `17시` },
    { id: 11, times: `18시` },
    { id: 12, times: `19시` },
    { id: 13, times: `20시` },
    { id: 14, times: `21시` },
    { id: 15, times: `22시` },
  ];

  const size = [
    { id: 1, sizeType: '소' },
    { id: 2, sizeType: '중' },
    { id: 3, sizeType: '대' },
  ];
  /* '🌞오전' , '🌗오후', '🌑저녁'*/

  useEffect(() => {
    if (step === 6) {
      setInputValue(2);
      setSelectedOptions([...selectedOptions, inputValue]);
    }
  }, []);

  const handleSelect = el => {
    setIsSelected(true);
    // setClickedSize(true);

    if (step === 1) {
      setInputValue(el.place_name + ' ');

      const dummyOptions = [...selectedOptions];
      dummyOptions[0] = el.place_name;

      setSelectedOptions([...dummyOptions]);
      // } else if (step === 1) {
      //   setInputValue(el.place_name);
      //   setSelectedOptions([...selectedOptions, el]);
    } else if (step === 2) {
      const formatedDate =
        el.getFullYear() +
        '년 ' +
        (String(el.getMonth() + 1).length === 1
          ? '0' + (el.getMonth() + 1)
          : el.getMonth() + 1) +
        '월 ' +
        (String(el.getDate() + 1).length === 1
          ? '0' + el.getDate()
          : el.getDate()) +
        '일';
      setInputValue(formatedDate);
      const selectedDate =
        el.getFullYear() +
        '-' +
        (String(el.getMonth() + 1).length === 1
          ? '0' + (el.getMonth() + 1)
          : el.getMonth() + 1) +
        '-' +
        (String(el.getDate() + 1).length === 1
          ? '0' + el.getDate()
          : el.getDate());
      console.log('formatedDate: ', formatedDate);
      console.log('selectedDate: ', selectedDate);

      const dummyOptions = [...selectedOptions];
      dummyOptions[1] = selectedDate;

      setDate(selectedDate);
      setSelectedOptions([...dummyOptions]);
    } else if (step === 3) {
      setIsOnSearch(false);
      setInputValue(el);
      // const filtered = time.filter((a) => a.krName.includes(el.split(" ")[1]))[0].krName;
      // setSelectedOptions([...selectedOptions, filtered.split(" ")[1]]);

      const dummyOptions = [...selectedOptions];
      dummyOptions[2] = el;

      setSelectedOptions([...dummyOptions]);
    } else if (step === 6) {
      setInputValue(selectedDogs);

      const dummyOptions = [...selectedOptions];
      dummyOptions[6] = JSON.parse(JSON.stringify(selectedDogs));

      setSelectedOptions([...dummyOptions]);
    } else {
      setInputValue(el.target.innerText);
      // setSelectedOptions([...selectedOptions, el.target.innerText]);
    }

    setShowMessage(false);
  };

  const handleCount = e => {
    let nextState;

    if (e.target.innerText === '+') {
      // inputValue < 6 && setInputValue((prevState) => String(Number(prevState) + 1));
      if (inputValue < 6) {
        setInputValue(inputValue + 1);
        nextState = inputValue + 1;
      }
    } else if (e.target.innerText === '-') {
      // inputValue > 2 && setInputValue((prevState) => String(Number(prevState) - 1));
      if (inputValue > 2) {
        setInputValue(inputValue - 1);
        nextState = inputValue - 1;
      }
    }

    const dummyOptions = [...selectedOptions];
    dummyOptions[3] = nextState;
    setSelectedOptions([...dummyOptions]);
  };

  const handleInputAddress = e => {
    setInputValue(e.target.value);
  };

  const handleInputTitle = e => {
    const dummyOptions = [...selectedOptions];
    dummyOptions[4] = e.target.value;

    setInputValue(e.target.value);
    setSelectedOptions([...dummyOptions]);
  };

  const handleClickTime = () => {
    setClickedTime(true);
  };

  const handleSelectDog = idx => {
    const dummySelectedDogs = [...selectedDogs];
    dummySelectedDogs[idx] = !dummySelectedDogs[idx];

    setSelectedDogs([...dummySelectedDogs]);
  };

  const handleFocusTime = () => {
    setIsOnSearch(true);
  };

  return (
    <Container>
      {(step === 1) && (
        <Search
          value={inputValue}
          placeholder={'작성해주세요'}
          onChange={handleInputAddress}
          isOnSearch={isOnSearch}
        ></Search>
      )}
      
      {step === 3 && (
        <Search
          value={inputValue}
          placeholder={'클릭해 주세요'}
          onClick={handleClickTime}
          isOnSearch={isOnSearch}
          onFocus={handleFocusTime}
        ></Search>
      )}

      {step === 4 && (
        <Wrapper>
          <Count>
            <button onClick={handleCount}>-</button>
            {inputValue}
            <button onClick={handleCount}>+</button>
          </Count>
        </Wrapper> 
      )}

      {(step === 5) && (
        <Wrapper>
          <Search
            value={inputValue}
            placeholder={'작성해주세요'}
            onChange={handleInputTitle}
            isOnSearch={isOnSearch}
          ></Search>
        </Wrapper>
      )}

      {step === 6 && (
        <Wrapper>
          <SearchResult>
            {dogList.map((el, idx) => (
              <SearchList
                value={inputValue}
                key={el.id}
                onClick={() => handleSelectDog(idx)}
              >
                <DogInfo>
                  <span>사진: {el.image} </span>
                  <span>이름: {el.name} </span>
                  <span>중성화: {el.neutering ? 'O' : 'X'} </span>
                  <span>사이즈: {el.size}</span>
                </DogInfo>
                {selectedDogs[idx] && <DogCheckBox>c</DogCheckBox>}
              </SearchList>
            ))}
          </SearchResult>
        </Wrapper>
      )}

      {!isSelected && step === 1 && (
        <MapContainer>
          <Roommap
            latitude={position.latitude}
            longitude={position.longitude}
          />
        </MapContainer>
      )}

      {isOnSearch && (
        <>
          {step === 2 && (
            <StyledDate>
              <StyleDatePicker
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                autoFocus={true}
                onChange={handleSelect}
                inline={false}
                value={inputValue}
              />
            </StyledDate>
          )}

          {step === 3 && clickedTime && (
            <SearchResult>
              {time.map(el => (
                <SearchList
                  key={el.id}
                  onClick={() => handleSelect(el.times)}
                >
                  {el.times}
                </SearchList>
              ))}
            </SearchResult>
          )}
        </>
      )}
      {showMessage ? (
        <AlertMessage>모든 정보를 입력해 주세요.</AlertMessage>
      ) : null}
    </Container>
  );
};

RoomSearch.propTypes = {
  step: PropTypes.number.isRequired, // 숫자 props
  isOnSearch: PropTypes.bool.isRequired, // boolean type
  setIsOnSearch: PropTypes.func.isRequired,
  inputValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  setInputValue: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  setList: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  setIsSelected: PropTypes.func.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
};

export default RoomSearch;
