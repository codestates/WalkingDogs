import React, {useEffect, useState} from "react";
import styled from 'styled-components'
import media from 'styled-media-query'
import SearchInput from "./SearchInput";
import InputDatepicker from "./InputDatepicker";
import InputDataList from "./InputDataList";
import InputTotalNum from './InputTotalNum'
import InputCheckbox from "./InputCheckbox";
import {useDispatch} from 'react-redux'
import { searchGatherAction } from "../store/actions";
import roomApi from '../api/room';
import AllButtons from './AllButtons'



import {FcSearch} from 'react-icons/fc'

const InputContainer = styled.form`
  margin-bottom: 2rem;
  height: auto;
  width: auto;
  background-color: var(--color-mainviolet-50);
  border: 2px solid var(--color-darkwhite);
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
    justify-content: space-evenly;
    gap: 2px;
`

const SearchBox = styled.div`
  border: 1px solid black;
  width: 28rem;
  justify-content: space-between;
  ${media.greaterThan("medium")`
    max-width: ${(props) => {
      if(props.name === '지역') return '28rem'
      if(props.name === '날짜') return '20rem'
      return "10rem";
    }};
  `}
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

const BreedBox = (props) => {
  return(
    <select>
      {props.breedList.map((breed)=> {
        <option
          value={breed.id} value={breed.id}>
            {breed.breed}
        </option>
      })}
    </select>
  )
}

// styled-component Boundary

const RoomSearchBar = () => {
  
  const dispatch = useDispatch();
  const [addressInput, setAddressInput] = useState("");
  const [timeInput, setTimeInput] = useState("")
  const [dateInput, setDateInput] = useState("")
  const [totalNumInput, setTotalNumInput] = useState(null);
  const [searchable, setSearchable] = useState(false); //검색할 수 있는  state
  const [breedList, setBreedList] = useState([
    { id: 1, breed: "소형"},
    { id: 2, breed: "중형"},
    { id: 3, breed: "대형"},
  ]);
  
  const [list, setList] = useState({
    address: [],
    time: [
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
    ],
  })
  // 
  
  useEffect (() => {

      const values = Object.keys(breedList);

      const arr = [];

      for (let i = 0; i < values.length; i++) {
        const key = values[i];
        const value = breedList[key];
        console.log(value);
      }


        // for( let i = 0; i < values.length; i){
        //   if(values[i].keys === breed ){

        //   }
        // }

      // for (let i = 0; i < keys.length; i++) {
      //   const key = keys[i];
      //   value[i] = list[key];
      // }
        
      // const breeds = Object.values(value);

      // const filtered = value[2].filter((idx)=>)

      // console.log(keys);
      // console.log(value);
      // console.log(value[2]);
      // console.log(breeds);

      console.log(values);
      




      // const thing = breed.filter(function(list) {return list.breed === 'breed'})
      
    })

  
    

    const handleBreedClick = () => {
      setBreedList(!breedList);
    }


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
          date:refinedDateInput,
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
        <InputContainer className='input-container'onSubmit={handleSubmit}>
            <Inputlist>
                <SearchInput name='지역'>
                  <InputCheckbox/>
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
                  placeholder='시간은?'
                  values={list.time}
                  item={timeInput}
                  setItem={setTimeInput}/>
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
                  breedList={breedList}
                  onClick={handleBreedClick}>
                </SearchInput>
                <BreedBox breedList={breedList}></BreedBox>
            </Inputlist>
        </InputContainer>
    );
}

export default RoomSearchBar;