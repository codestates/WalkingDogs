import React, {useEffect, useState} from "react";
import styled from 'styled-components'
import media from 'styled-media-query'
import SearchInput from "./SearchInput";
import InputDatepicker from "./InputDatepicker";
// import InputDataList from "./InputDataList";
import {useDispatch} from 'react-redux'
import { searchGatherAction } from "../store/actions";
import roomApi from '../api/room';

const InputContainer = styled.form`
  margin-bottom: 2rem;
  height: 4rem;
  background-color: var(--color-white);
  border-radius: 1rem;
  display: flex;
  ${media.lessThan("medium")`
    margin-bottom: 1.25rem;
    width: calc(100% - 6rem);
  `}
  ${media.lessThan("small")`
    width: 100%;
    min-width: 20rem;
  `}
  .gath-search-btn {
    width: 100%;
    height: 100%;
    background-color: var(--color-maingreen--75);
    color: var(--color-white);
  }
  .gath-search-btn.pc {
    padding: 0;
    border-radius: 0.6rem;
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
    flex: 1 1 auto;
    display: flex;
    align-items: center;
`

// styled-component Boundary

const RoomSearchBar = () => {


    const dispatch = useDispatch();

    return(
        <InputContainer>
            <Inputlist>
                <SearchInput name='지역'>
                    {/* <InputDataLi/> */}
                </SearchInput>

                <SearchInput name='날짜'>
                    <InputDatepicker
                        id='date' />
                </SearchInput>

                <SearchInput name='시간'>
                
                </SearchInput>
                
                <SearchInput name='인원'>

                </SearchInput>

                <SearchInput name='견종'>

                </SearchInput>
            </Inputlist>
        </InputContainer>
    );
}

export default RoomSearchBar;