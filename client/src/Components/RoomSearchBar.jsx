import React, {useEffect, useState} from "react";
import styled from 'styled-components'
import media from 'styled-media-query'
import SearchInput from "./SearchInput";
import InputAddress from './InputAddress'
import InputDatepicker from "./InputDatepicker";
import InputDataList from "./InputDataList";
import InputTotalNum from './InputTotalNum'
import {useDispatch} from 'react-redux'
import { searchGatherAction } from "../store/actions";
import roomApi from '../api/room';
import AllButtons from './AllButtons'
import Roommap from './Roommap'

import {FcSearch} from 'react-icons/fc'

const InputContainer = styled.form`
  margin-bottom: 2rem;
  height: 15rem;
  background-color: var(--color-darkwhite);
  border-radius: 0.5rem;
  display: flex;
  ${media.lessThan("medium")`
    margin-bottom: 1.25rem;
    width: calc(100% - 2rem);
  `}
  ${media.lessThan("small")`
    width: 100%;
    min-width: 30rem;
  `}
  .gath-search-btn {
    width: 4rem;
    height: 4rem;
    background-color: var(--color-mainviolet--100);
    color: black;
  }
  .gath-search-btn.pc {
    padding: 0;
    border-radius: 0.1rem;

  }
  .gath-search-btn.mobile {
    width: 100%;
    ${media.lessThan("small")`
      min-width: 20rem;
      height: 3.2rem;
    `}
  }
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  position: relative;
  #placeholder-icon {
    flex: 0 0 auto;
    color: var(--color-maingreen--100);
  }
  #placeholder-text {
    flex: 1 1 auto;
    line-height: 3rem;
    color: var(--color-gray);
    font-family: Interop-Light;
    font-size: 1.25rem;
    display: inline;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Inputlist = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 18rem;
`

const SearchBtnContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem;
  position: relative;
`;

const SearchIcon = styled(FcSearch)`
  width: ${(prop) => prop.size}rem;

`

// styled-component Boundary

const RoomSearchBar = () => {

  const [addressInput, setAddressInput] = useState("");
  const [timeInput, setTimeInput] = useState("")
  const [dateInput, setDateInput] = useState("")
  const [totalNumInput, setTotalNumInput] = useState(null);
  const [searchable, setSearchable] = useState(false); //검색할 수 있는  state
  const [breed, setBreed] = useState([]);
  
  const [list, setList] = useState({
    address: [],
    time: [],
    breed: [
      { id: 1, breed: "소형"},
      { id: 2, breed: "중형"},
      { id: 3, breed: "대형"},
    ],
  })

  // 

  

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
      try {
        e.preventDefault();
        const months = {
          Jan:"01",
          Feb:"02",
          Mar:"03",
          Apr:"04",
          May:"05",
          Jun:"06",
          Jul:"07",
          Aug:"08",
          Sep:"09",
          Oct:"10",
          Nov:"11",
          Dec:"12",
        };

        const refinedAddressInput = addressInput.match(/[A-Za-z가-힣]*/).join("");
        const refinedDateArr = `${dateInput}`?.split(" ").slice(1, 4);
        const refinedDateInput = refinedDateArr.length
        ? `${refinedDateArr[2]}-${months[refinedDateArr[0]]}-${refinedDateArr[1]}`
        : "";

        const res = roomApi.roomDetailApi({
          address: refinedAddressInput,
          date:dateInput,
          time: timeInput,
          totalNum:totalNumInput,
        });
        dispatch(searchGatherAction(res.data));
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(()=>{
      setSearchable(addressInput);
    },[addressInput])

    
    return(
        <InputContainer onSubmit={handleSubmit}>
            <Inputlist>
                <SearchInput name='지역'>
                <InputAddress
                  id='address'
                  placeholder="지역이 어디인가요?"
                  item={addressInput}
                  setItem={setAddressInput}/>
                </SearchInput>

                <SearchInput name='날짜'>
                    <InputDatepicker
                        id='date' 
                        placeholder='언제모일까요?'
                        selectedDate={dateInput}
                        setSelectedDate={setDateInput}/>
                </SearchInput>

                <SearchInput name='시간'>
                  <InputDataList
                  id='time'
                  placeholder='시간은?'/>
                </SearchInput>
                
                <SearchInput name='인원'>
                  <InputTotalNum
                    inputId='totalNum'
                    placeholder='인원 입력'
                    total={totalNumInput}
                    setTotal={setTotalNumInput}/>
                </SearchInput>

                <SearchInput name='견종'
                  id='breed'
                  placeholder='견종 선택'
                  breed={breed}
                  setBreed={setBreed}>
                </SearchInput>
            </Inputlist>
            <SearchBtnContainer>
              <AllButtons
                type='submit'
                onClick={handleSubmit}
                className='gath-search-btn pc'
                disabled={!searchable}
                >
                검색
              </AllButtons>
            </SearchBtnContainer>
        </InputContainer>
    );
}

export default RoomSearchBar;