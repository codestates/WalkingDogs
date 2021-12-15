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

const Select = styled.select`
margin: 0;
min-width: 0;
display: block;
width: 100%;
padding: 7px 7px;
font-size: inherit;
line-height: inherit;
border: 1px solid black;
border-radius: 4px;
color: inherit;
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

const SearchIcon = styled(FcSearch)`
  width: ${(prop) => prop.size}rem;
`

const breedList=[
  // {id: 1, breed:"소형"},
  // {id: 2, breed:"중형"},
  // {id: 3, breed:"대형"},
  '소형','중형','대형'
];

const breeds = breedList.map((breed)=>{
  return <option value={breed}>{breed}</option>
})

// const BreedBox = (props) => {

//   const handleChange = (e) => {
//     console.log(e.target.value);
//   }
//   return(
//     <Select onChange={(e)=>handleChange(e)}>
//         {props.breedList.map((breed)=> {
//           <option
//             key={breed.id} 
//             value={breed.id}
//             defaultValue={props.defaultValue === breed.id}
//             >
//               {breed.breed}
//           </option>
//         })}
//     </Select>
//   )
// }

// styled-component Boundary

const RoomSearchBar = () => {
  
  const dispatch = useDispatch();
  const [addressInput, setAddressInput] = useState("");
  const [timeInput, setTimeInput] = useState("")
  const [dateInput, setDateInput] = useState("")
  const [totalNumInput, setTotalNumInput] = useState(null);
  const [searchable, setSearchable] = useState(false); //검색할 수 있는  state
  

  
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

  const getTimes =(input, field)=> {
    let output = [];
    for (let i = 0; i < input.length; ++i) {
      output.push(input[i][field]);
    }
    return output;
  }
    
  const timesList = getTimes(list.time, 'times')
  console.log(timesList);

    const handleBreedClick = (e) => {
      console.log(e.target.value);
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
                  {list.time.times}
                  <InputDataList
                  id='time'
                  placeholder='시간은?'
                  values={list.times}
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
                  onClick={handleBreedClick}>
                <Select onChange={handleBreedClick}>
                  {breeds}
                </Select>
                </SearchInput>
            </Inputlist>
        <SearchBtnContainer className="pc">
            <AllButtons 
              type="submit"
              className="gath-search-btn pc"
              onClick={handleSubmit}
              disabled={!searchable}
              >
              검색
            </AllButtons>
        </SearchBtnContainer> 
        </InputContainer>
    );
}

export default RoomSearchBar;