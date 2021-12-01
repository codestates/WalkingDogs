import React, {useState} from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

const Container = styled.div`
    margin-top: 0.5rem;
    width: 100%;
`

// styled component boundary
const InputDatepicker = () => {

const [date, setDate] = useState(new Date());

    const handleClearClick = () => {
        
    }

    return(
        <Container>
            <DatePicker 
            selected={date} 
            onChange={(date)=> setDate(date)}
            />
        </Container>
    );
}

export default InputDatepicker;