import React ,{useEffect, useState, useCallback, useMemo }from 'react';
import styled, {css} from 'styled-components';
import DataListInput from "react-plain-datalist-input"
import media from 'styled-media-query';
import axios from 'axios';
import PropTypes from 'prop-types'
import { IoCloseCircle } from "react-icons/io5";


const boxShadow = '0 4px 6px rgb(32 33 36 / 28%)';
const activeBorderRadius = '1rem 1rem 0 0';
const inactiveBorderRadius = '1rem 1rem 1rem 1rem';

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 0.5rem;
    width: 100%;
  .autocomplete-input{
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
        ${media.greaterThan("medium")`
          background-color: black;
          color: white;
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

const InputContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  width: 10rem;
  border: 1px solid rgb(223, 225, 229);
  border-radius: ${(props) =>
    props.hasText ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;
  box-shadow: ${(props) => (props.hasText ? boxShadow : 0)};

  &:focus-within {
    box-shadow: ${boxShadow};
  }

  > input {
    flex: 1 0 0;
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    font-size: 20px;
    overflow: auto;
    justify-content: space-between;
  }

  > div.delete-button {
    cursor: pointer;
  }
`;


const DropDownContainer = styled.ul`
  background-color: #ffffff;
  display: block;
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
  border: 1px solid rgb(223, 225, 229);
  border-radius: 0 0 1rem 1rem;
  box-shadow: ${boxShadow};
  z-index: 3;

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
`

const AreaList = styled.select`
    border: 1px solid black;
`

const ClearBtn = styled.button`
    position: absolute;
    right: 1rem;
    top: 1.375rem;
    width: 1.25rem;
    height: 1.25rem;
    font-size: 1.25rem;
    color: var(--color-lightgray);
        :hover {
            color: var(--color-gray);
        }
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

    const city = [
     "서울특별시",
     "경기도",
     "인천광역시",
     "강원도",
     "충청남도",
     "충청북도",
     "대전광역시",
     "세종특별자치시",
    "전라북도",
    "전라남도",
    "광주광역시",
    "경상북도",
    "경상남도",
    "대구광역시",
    "울산광역시",
    "부산광역시",
    "제주특별자치도"
    ];

    const [area, setArea] = useState({
        Seoul:[],
        Gyeonggi:[],
        Incheon:[],
        Kangwon:[],
        Chungnam:[],
        Chungbook:[],
        Daejeon:[],
        Sejong:[],
        Jeollanamdo:[],
        Jeollabukdo:[],
        Kwangju:[],
        Kyungsangbukdo:[],
        Kyungsangnamdo:[],
        Daegu:[],
        Ulsan:[],
        Busan:[],
        Jeju:[],
    })

    const [seletedCity,setSeletecCity] = useState([]);

    const [selectedArea, setSelectedArea] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState([]);
    const [backward, setBackward] = useState(false);
    const [item, setItem] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [hasText, setHasText] = useState(false);
    const [options, setOptions] = useState(city);
    const [selected, setSelected] = useState(-1);
    

    useEffect(()=>{
        if(inputValue === "") {
            setHasText(false);
        }
    })

   const handleInputChange = (e) => {
       const {value} = e.target;
       if(value.includes("\\")) return;

       value ? setHasText(true) : setHasText(false);
       setInputValue(value);

       const filterRegex = new RegExp(value, 'i');

       const resultOptions = city.filter((option)=>
        option.match(filterRegex)  
    );
    setOptions(resultOptions);
   };

   const handleDropDownClick = (clickedOption) => {
    setInputValue(clickedOption);
    const resultOptions = city.filter(
      (option) => option === clickedOption
    );
    setOptions(resultOptions);
  };

  const handleKeyUp = (event) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState#example
    // eslint-disable-next-line
    if (event.getModifierState("Fn") || event.getModifierState("Hyper") || event.getModifierState("OS") || event.getModifierState("Super") || event.getModifierState("Win")) return; if (event.getModifierState("Control") + event.getModifierState("Alt") + event.getModifierState("Meta") > 1) return;
    if (hasText) {
      if (event.code === 'ArrowDown' && options.length - 1 > selected) {
        setSelected(selected + 1);
      }
      if (event.code === 'ArrowUp' && selected >= 0) {
        setSelected(selected - 1);
      }
      if (event.code === 'Enter' && selected >= 0) {
        handleDropDownClick(options[selected]);
        setSelected(-1);
      }
    }
  };

    // useEffect(async () => {
    //     const areaUrl = 'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=';
        
    //     const res = await axios.get(`${areaUrl}*00000000`)
    //     const res2 = await axios.get(`${areaUrl}*000000`);
    //     const res3 = await axios.get(`${areaUrl}1111*&is_ignore_zero=true`);
        



    //     console.log(res.data.regcodes);
    //     console.log(res2.data.regcodes);

    //     const city = res.data.regcodes;
    //     const area = res2.data.regcodes;
        
    //     for(let i = 0; i < city.length; i++){
    //         seletedCity.push(city[i].name);
    //     }

    //     for(let j = 0; j < area.length; j++) {
    //         if(area[j].name)
    //         selectedArea.push(area[j].name);
    //     }

    //     console.log(seletedCity);
    //     console.log(selectedArea);




        
    // },[seletedCity,setSeletecCity,])


    const handleClearClick = () => {
        setItem ("");
    }
    return (
        <div className='autocomplete-wrapper' onKeyUp={handleKeyUp}>
        <InputContainer hasText={hasText} >
            <input type="text" 
            placeholder='입력하세요'
            className="autocomplete-input"
            onChange={handleInputChange}
            value={inputValue}/>
            <ClearBtn onClick={handleClearClick}>
                            <IoCloseCircle/>
                        </ClearBtn>
        </InputContainer>
        {hasText ? (
            <DropDown
                options={options}
                handleDropDownClick={handleDropDownClick}
                selected={selected}
                />
        ) : null}

    

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
        </div>
    )

};

const DropDown = ({options,handleDropDownClick, selected}) => {
 return (
     <DropDownContainer>
         {options.map((option,idx) => {
             <li 
                key={idx}
                onClick={()=>handleDropDownClick(option)}
                className={selected === idx ? 'selected' : ''}
                >
                    {option}
             </li>
         })}
     </DropDownContainer>
 )
};



export default InputCheckbox;
// InputCheckbox.PropTypes={
//     values: PropTypes.arrayOf(PropTypes.any).isRequired,
// };


