import React from "react";
import styled from 'styled-components'
import SearchInput from "./SearchInput";
import InputDatepicker from "./InputDatepicker";

const InputContainer = styled.form`
    margin-bottom: 2rem;
    height: 4rem;
    border: 1px solid #000000;
    width: 70%;
    display: inline-block;
`

const Inputlist = styled.div`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
`





const RoomSearchBar = () => {
    return(
        <InputContainer>
            <Inputlist>
                <SearchInput name='지역'>

                </SearchInput>

                <SearchInput name='날짜'>
                    <InputDatepicker
                        id='date'/>
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