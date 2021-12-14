import React, {useState} from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {ko} from 'date-fns/esm/locale'
import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import PropTypes from 'prop-types'
import media from 'styled-media-query'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  .react-datepicker__tab-loop {
    margin-top: 1.5rem;
    ${media.lessThan("medium")`
      width: 100%;
      height: 20.5rem;
      margin-top: 1.25rem;
      margin-bottom: -0.75rem;
      border-radius: 1rem;
      border: 1px solid black;
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
    margin-top: 0.9rem;
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
    background-color: var(--color-white);
    border: none;
    border-radius: 1rem;
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
    }
    ${media.lessThan("medium")`
      width: 100% !important;
      inset: 0 !important;
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
    color: var(--color-darkgray);
    margin: 0.5rem 0;
  }
  .react-datepicker__day-names {
    margin-top: -0.5rem;
    border-bottom: 1px solid var(--color-lightgray);
  }
  .react-datepicker__day-name {
    font-size: 1rem;
    width: 2rem;
    line-height: 2rem;
    margin: 0.25rem;
    color: var(--color-darkgray);
  }
  .react-datepicker__week {
    > * {
      border-radius: 0.4rem;
      color: var(--color-darkgray);
      font-family: Interop-Medium;
      font-size: 1rem;
      width: 2rem;
      line-height: 2rem;
      margin: 0.25rem;
    }
    .react-datepicker__day {
      :hover {
        background-color: var(--color-maingreen--10);
      }
    }
    .react-datepicker__day--disabled {
      opacity: 0.4;
      :hover {
        background-color: transparent;
      }
    }
    .react-datepicker__day--selected {
      color: var(--color-white);
      background-color: var(--color-maingreen--75);
      :hover {
        color: var(--color-white);
        background-color: var(--color-maingreen--75);
        opacity: 0.8;
      }
    }
    .react-datepicker__day--today {
      border: 1px solid var(--color-maingreen--75);
      line-height: calc(2rem - 2px);
    }
  }
`;

const CustomHeader = styled.div`
  margin: 1rem;
  font-size: 1.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .month-navigation-arrow {
    font-size: 1.5rem;
  }
  .left {
    margin-right: 2rem;
  }
  .right {
    margin-left: 2rem;
  }
  .month-navigation-button {
    width: 2rem;
    height: 2rem;
    padding: 0.25rem;
    border-radius: 0.4rem;
    color: var(--color-gray);
    :hover {
      color: var(--color-darkgray);
      background-color: var(--color-darkwhite);
    }
  }
`;

const MonthYearContainer = styled.div`
  color: var(--color-darkgray);
  display: flex;
  font-size: 1.125rem;
  > * {
    margin-right: 0.6rem;
    :last-of-type {
      margin-right: 0;
    }
  }
`;

const ClearBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  font-size: 1.25rem;
  color: var(--color-lightgray);
  :hover {
    color: var(--color-gray);
  }
`;

// styled component boundary
const InputDatepicker = ({placeholder, selectedDate, setSelectedDate}) => {

const [date, setDate] = useState(new Date());

    const handleClearClick = () => {
      setSelectedDate("");
    }

    return(
        <Container>
            <DatePicker 
            showPopperArrow={false}
            selected={selectedDate}
            minDate={new Date()} 
            dateFormat="yyyy-MM-dd"
              onChange={(date) => {
                setSelectedDate(date);
              }}
            locale={ko}
            placeholderText={placeholder}
            disabledKeyboardNavigation
            isClearable
            showDisabledMonthNavigation
            renderCustomHeader={({
                date, 
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <CustomHeader>
                    <button
                    type='button'
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className='month-navigation-button left'
                    >
                        <FontAwesomeIcon icon={faCaretLeft}/>
                    </button>
                    <MonthYearContainer>
                        <span>{`${getYear(date)}년`}</span>
                        <span>{`${getMonth(date) + 1}월`}</span>
                    </MonthYearContainer>
                    <button
                    type='button'
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className='month-navigation-button Right'
                    >
                        <FontAwesomeIcon icon={faCaretRight}/>
                    </button>
                </CustomHeader>
            )}
            ></DatePicker>
            {selectedDate && (
                <ClearBtn type='button'>
                    <FontAwesomeIcon icon={faTimesCircle}/>
                </ClearBtn>)}
        </Container>
    );
}

InputDatepicker.propTypes = {
  placeholder: PropTypes.string.isRequired,
  selectedDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  setSelectedDate: PropTypes.func.isRequired,
}

export default InputDatepicker;