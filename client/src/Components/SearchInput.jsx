import React ,{useRef}from 'react';
import styled from 'styled-components'


const InputWrapper = styled.label`
    height:100%;
    display: flex;
    position: relative;
`

const InputArea = styled.div`
    flex: 1 1 0;
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0.75rem 0;
`

const Name = styled.div`
    margin: 0 1rem;
    font-size: 0.8rem;
    flex: 0 0 1;
`

const Divider = styled.div`
  min-width: 1px;
  background-color: var(--color-lightgray);
  width: 1px;
  border-radius: 1px;
  margin: 0.75rem 0;
`;

const SearchInput = () => {
    const box = useRef(null)

    return (
        <InputWrapper>
            <div className="thing" ref={box}/>
            <InputArea>
                <Name>{/**/}test_01</Name>
                test_02
            </InputArea>
        </InputWrapper>
    )
}

export default SearchInput;