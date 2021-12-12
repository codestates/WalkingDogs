import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import roomApi from '../api/room'
import media from 'styled-media-query'
import Roommap from './Roommap';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { useSelector } from 'react-redux';


const Container = styled.div`
    height: 13rem;
`

const Search = styled.input` //create-modal창의 인풋
    background-color: white;
    width: 25.5rem;
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
  overflow-x: hidden;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  ${media.lessThan("large")`
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
    background-color:#ffffff;
    color: #000000;
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
    width: 25.2rem;
    height: 20.2rem;
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
      justify-content: center !important;
    }
    ${media.lessThan("medium")`
      width: auto !important;
      inset: 1 !important;
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
    color: black;
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
    color: black;
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
      color: black;
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
    color: #000000;
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


const CountBox =  styled.div`
  width: auto;
  display: flex;
`


const CountCheck = styled.div`
  text-align: center;
`
const AlertMessage = styled.div`
  text-align: center;
  color: red;
`
const DogInfo = styled.div`
  text-align: center;
  color: black;
`
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
    setClickedCalendar
}) => {

    const [address, setAddress] = useState([]);

    // const [position, setPosition] = useState([{}]);
    
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
      { id: 3, times: `10시`},
      { id: 4, times: `11시`},
      { id: 5, times: `12시`},
      { id: 6, times: `13시`},
      { id: 7, times: `14시`},
      { id: 8, times: `15시`},
      { id: 9, times: `16시`},
      { id: 10, times: `17시`},
      { id: 11, times: `18시`},
      { id: 12, times: `19시`},
      { id: 13, times: `20시`},
      { id: 14, times: `21시`},
      { id: 15, times: `22시`},
    ]

    const size = [
      {id: 1, sizeType: "소"},
      {id: 2, sizeType: "중"},
      {id: 3, sizeType: "대"},

    ]
  /* '🌞오전' , '🌗오후', '🌑저녁'*/

  useEffect(() => {
    if(step === 6) {
      setInputValue(2);
      setSelectedOptions([...selectedOptions, inputValue]);
    }
  }, []);

  const handleSelect = (el) => {
    setIsOnSearch(false);
    setIsSelected(true);
    // setClickedSize(true);
    if (step === 1) {
      setInputValue(el.place_name + " " );
      setSelectedOptions([...selectedOptions, el.place_name]);
    // } else if (step === 1) {
    //   setInputValue(el.place_name);
    //   setSelectedOptions([...selectedOptions, el]);
    } else if (step === 2) {
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
      console.log('formatedDate: ', formatedDate);
      console.log('selectedDate: ', selectedDate);
      setDate(selectedDate);
      setSelectedOptions([...selectedOptions, selectedDate]);
    } else if (step === 3) {
      setInputValue(el);
      // const filtered = time.filter((a) => a.krName.includes(el.split(" ")[1]))[0].krName;
      // setSelectedOptions([...selectedOptions, filtered.split(" ")[1]]);
      setSelectedOptions([...selectedOptions, el]);
    } else if (step === 4) {
      setInputValue(inputValue)
      setSelectedOptions([...selectedOptions, inputValue]);
    } else if (step === 5) {
      setInputValue(el.target.innerText);
      setSelectedOptions([...selectedOptions, el.target.innerText]);
    } else if (step === 6) {
      setInputValue(el.target.innerText);
      setSelectedOptions([...selectedOptions, el.target.innerText]);
    } else if (step === 7) {
      setInputValue(selectedDogs);
     
      setSelectedOptions([...selectedOptions, selectedDogs]);
      console.log(selectedOptions);
    } else {
      setInputValue(el.target.innerText);
      // setSelectedOptions([...selectedOptions, el.target.innerText]);
    }
    setShowMessage(false);
  };

  // const handleSelect = (el) => {
  //   setIsOnSearch(false);
  //   setIsSelected(true);
  //   if (selectedOptions && selectedOptions.length === 0) {
  //     setInputValue(el.place_name + " " );
  //     setSelectedOptions([...selectedOptions, el.place_name]);
  //   }
  //   if (selectedOptions && selectedOptions.length === 1) {
  //     setInputValue(el.place_name);
  //     setSelectedOptions([...selectedOptions, el]);
  //   }
  //   if (selectedOptions && selectedOptions.length === 2) {
  //     const formatedDate =
  //       el.getFullYear() +
  //       "년 " +
  //       (String(el.getMonth() + 1).length === 1 ? "0" + (el.getMonth() + 1) : el.getMonth() + 1) +
  //       "월 " +
  //       (String(el.getDate() + 1).length === 1 ? "0" + el.getDate() : el.getDate()) +
  //       "일";
  //     setInputValue(formatedDate);
  //     const selectedDate =
  //       el.getFullYear() +
  //       "-" +
  //       (String(el.getMonth() + 1).length === 1 ? "0" + (el.getMonth() + 1) : el.getMonth() + 1) +
  //       "-" +
  //       (String(el.getDate() + 1).length === 1 ? "0" + el.getDate() : el.getDate());
  //     setSelectedOptions([...selectedOptions, selectedDate]);
  //   }
  //   if (selectedOptions && selectedOptions.length === 3) {
  //     setInputValue(el);
  //     const filtered = time.filter((a) => a.krName.includes(el.split(" ")[1]))[0].krName;
  //     setSelectedOptions([...selectedOptions, filtered.split(" ")[1]]);
  //   }
  //   if (selectedOptions && (
  //     selectedOptions.length === 4 ||
  //     selectedOptions.length === 6 ||
  //     selectedOptions.length === 7)
  //   ) {
  //     setInputValue(el.target.innerText);
  //     setSelectedOptions([...selectedOptions, el.target.innerText]);
  //   }
  // };

  const handleInputClick = () => {
    if (selectedOptions.length === 0 || selectedOptions.length === step) {
      setSelectedOptions(selectedOptions.slice(0, selectedOptions.length - 1));
      setIsOnSearch(true);
    }
    if (step === 3 || step === 4) {
      setIsOnSearch(true);
    }
    setInputValue("");
  };

  const handleCount = (e) => {
    if (e.target.innerText === "+") {
      // inputValue < 6 && setInputValue((prevState) => String(Number(prevState) + 1));

      inputValue < 6 && setInputValue((prevState) => {
        const nextState =String(Number(prevState) + 1);
        setInputValue(nextState)
        console.log(inputValue);
      });
    } else if (e.target.innerText === "-") {
      // inputValue > 2 && setInputValue((prevState) => String(Number(prevState) - 1));

      inputValue > 2 && setInputValue((prevState) => {
        const nextState =String(Number(prevState) - 1);
        setInputValue(nextState)
        console.log(inputValue);
      });
    }
  };

  const handleCountChange = (e) => {
    console.log(inputValue);
    setInputValue(e.target.value); 
    console.log(e.target.value);
    setCount(inputValue);   
  };

  const hadleInputAddress = (e) =>{
    setInputValue(e.target.value);
  }

  const handleClickDogs = () => {
    setClickedDog(true);
  }

  const handleClickTime = () => {
    setClickedTime(true);
  }
  
  const handleClickCalendar = () => {
    setClickedCalendar(true);
  }

  const handleSelectDog = (el) => {
    setSelectedDogs([...selectedDogs, el])
    const selected = selectedDogs.map((elem) => {
      return elem.name
    })
    setInputValue([...selected])
  }

  const handleDateClick = (e) => {
    console.log(e.target);
  }
    return(
      <Container>
        {(step === 1 || step === 2 || step === 5 || step === 6) && (
          <Search
            value={inputValue}

            placeholder={
              step === 1 ? "작성해 주세요." 
            : step === 2 ? "선택해 주세요." : "작성해 주세요" }
            onClick={handleClickCalendar}
            onChange={hadleInputAddress}
            isOnSearch={isOnSearch}
            >
          </Search>
        )}
        {(step === 3) && (
          <Search
            value={inputValue}
            placeholder={"클릭해 주세요"}
            onClick={handleClickTime}
            isOnSearch={isOnSearch}
            >
          </Search>
        )}
        {(step === 7) && (
          <Search
            value={inputValue}
            placeholder={"클릭해 주세요"}
            onClick={handleClickDogs}
            isOnSearch={isOnSearch}
            >
          </Search>
        )}
        {step === 4 && (
          <>
          <CountBox>
            <Count>
              <button onClick={handleCount}>-</button>
              <input value={inputValue} placeholder={0} onChange={(e) => handleCountChange(e)}/>
              <button onClick={handleCount}>+</button>
            </Count>
            <CountCheck>
              <button 
                onClick={handleSelect}
                style={{
                  backgroundColor:'white',
                  width:'3rem',height:'5rem',
                  borderRadius:'1rem'}}>확인</button>
            </CountCheck>
          </CountBox>
          </>
        )}

        {!isSelected && step === 1 && (
          <MapContainer>
            <Roommap
              latitude={position.latitude}
              longitude={position.longitude}/>
          </MapContainer>
        )}

        {isOnSearch && (
          <>
          {step === 1 && list.length > 0 && (
            <>
            <SearchResult>
              {list.map((el) => {
                <SearchList key={el.id} onClick={()=> handleSelect(el)}>
                  {el.address}
                </SearchList>
              })}
            </SearchResult>
            </>
          )}


          {step === 2 && (
            <>
              <StyledDate style={{justifyContent:'center'}}>
                <StyleDatePicker
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  onChange={handleSelect}
                  style={{width:'100%', height:'100%'}}
                  inline
                />
              </StyledDate>
            </>
          )}

          {step === 3 && (
            <SearchResult>
              {clickedTime ? <div>{time.map((el) => 
                <SearchList key={el.id} onClick={() => handleSelect(el.times)}>
                  {el.times}
                </SearchList>)}</div> : null}
            </SearchResult>
          )}
          {/* step 5와 step 7의 순서를 바꾸었습니다. */}
          
          {(step === 5 && step ===6 ) && (
            <SearchResult onClick={handleSelect}>{inputValue}</SearchResult>
          )}

          {step === 7 && (
            <>
            <SearchResult>
              {clickedDog ? <div>{dogList.map((el) => 
                <SearchList value={inputValue} key={el.id} onClick={() => handleSelectDog(el)}>
                  <DogInfo>
                  <span>사진: {el.image} </span>
                  <span>이름: {el.name} </span>
                  <span>중성화: {el.neutering ? 'O' : 'X'} </span>
                  <span>사이즈: {el.size}</span>
                  </DogInfo>
                </SearchList>)}</div> : null}
            </SearchResult>
            <button onClick={handleSelect}>확인</button>
            </>
          )}
          </>
        )}
        {showMessage ? <AlertMessage>모든 정보를 입력해 주세요.</AlertMessage> : null}
      </Container>
    );
}

RoomSearch.propTypes = {
    step: PropTypes.number.isRequired, // 숫자 props
    isOnSearch: PropTypes.bool.isRequired, // boolean type
    setIsOnSearch: PropTypes.func.isRequired,
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