import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import media from 'styled-media-query'
import SearchInput from "./SearchInput";
import InputDatepicker from "./InputDatepicker";
import InputDataList from "./InputDataList";
import InputTotalNum from './InputTotalNum'
import InputCheckbox from "./InputCheckbox";
import AllButtons from './AllButtons'
import useDeepCompareEffect from "use-deep-compare-effect";
// import {useDispatch} from 'react-redux'
// import {FcSearch} from 'react-icons/fc'

const InputContainer = styled.form`
  margin-bottom: 2rem;
  height: auto;
  width: auto;
  background-color: var(--color-mainviolet-50);
  border-radius: 0.5rem;
  display: flex;
  gap: 1px;
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

const Inputlist = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 6px;
`


const SearchBtnContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem;
  position: relative;
`;

const Select = styled.select`
margin: 0;
min-width: 0;
text-align-last: center;
text-align: center;
-ms-text-align-last: center;
-moz-text-align-last: center;
width: 100%;
padding: 7px 7px;
font-size: inherit;
border: none;
border-radius: 4px;
color: inherit;
outline: 0;
background-color: transparent;
  -webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
&:focus {
  border-color: red;
}
  select{
  width: 8rem;
  padding: 0.8em 0.5em;
  border: 1px solid#34495e;
  font-family: inherit;
  font-size: 20px;
  color: #34495e;
  font-weight: bold;
}
`;

const sizeList = [
  '??????', '??????', '??????', '??????'
];

const sizes = sizeList.map((size)=>{
  return <option key={size} value={size}>{size}</option>
})

// styled-component Boundary

const RoomSearchBar = ({ handleSubmit }) => {
  
  // const dispatch = useDispatch();
  const [addressInput, setAddressInput] = useState([]);
  const [timeInput, setTimeInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [totalNumInput, setTotalNumInput] = useState(null);
  const [sizeInput, setSizeInput] = useState("");
  const [searchable, setSearchable] = useState(false); //????????? ??? ??????  state
  
  const list = {
    address: [],
    time: [
      { id: 1, times: `8???` },
      { id: 2, times: `9???` },
      { id: 3, times: `10???` },
      { id: 4, times: `11???` },
      { id: 5, times: `12???` },
      { id: 6, times: `13???` },
      { id: 7, times: `14???` },
      { id: 8, times: `15???` },
      { id: 9, times: `16???` },
      { id: 10, times: `17???` },
      { id: 11, times: `18???` },
      { id: 12, times: `19???` },
      { id: 13, times: `20???` },
      { id: 14, times: `21???` },
      { id: 15, times: `22???` },
    ],
  } 

  const handleBreedClick = (e) => {
    setSizeInput(e.target.value)
  }

    useEffect(()=>{
      // console.log('add : ', addressInput, '\ntime : ', timeInput, '\ndate: ', dateInput, '\ntotalNum : ', totalNumInput, '\nsize : ', sizeInput);
      setSearchable(timeInput || dateInput || totalNumInput || sizeInput);
    }, [timeInput, dateInput, totalNumInput, sizeInput])

    useDeepCompareEffect(() => {
      // console.log('add : ', addressInput, '\ntime : ', timeInput, '\ndate: ', dateInput, '\ntotalNum : ', totalNumInput, '\nsize : ', sizeInput);
      setSearchable(addressInput);
    }, [addressInput]);

    return(
        <InputContainer className='input-container'onSubmit={handleSubmit}>
            <Inputlist>
                <SearchInput name='??????'>
                  <InputCheckbox setAddressInput={setAddressInput}/>
                </SearchInput>

                <SearchInput name='??????'>
                    <InputDatepicker
                        id='date' 
                        placeholder='???????????????????'
                        selectedDate={dateInput}
                        setSelectedDate={setDateInput}/>
                </SearchInput>

                <SearchInput name='??????'>
                  <InputDataList
                  id='time'
                  placeholder='??????????'
                  values={list.time}
                  item={timeInput}
                  setItem={setTimeInput}/>
                </SearchInput>
                
                <SearchInput name='??????'>
                  <InputTotalNum
                    inputId='totalNum'
                    placeholder='?????? ??????'
                    total={totalNumInput}
                    setTotal={setTotalNumInput}/>
                </SearchInput>

                <SearchInput name='??????'
                  id='size'
                  placeholder='?????? ??????'
                  onClick={handleBreedClick}>
                    <Select defaultValue='??????' onChange={handleBreedClick}>
                      {sizes}
                    </Select>
                </SearchInput>
            </Inputlist>
        <SearchBtnContainer className="pc">
            <AllButtons 
              type="button"
              className="gath-search-btn pc"
              onClick={() => { handleSubmit({ addressInput, dateInput, timeInput, totalNumInput, sizeInput }) }}
              disabled={!searchable}
              >
              ??????
            </AllButtons>
        </SearchBtnContainer> 
        </InputContainer>
    );
}

export default RoomSearchBar;