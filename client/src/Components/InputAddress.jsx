import React from 'react';
import styled from 'styled-components'
import media from 'styled-media-query';
import DataListInput from 'react-plain-datalist-input';
import PropTypes from 'prop-types'
import Roommap from './Roommap'

const Container = styled.div`
    border: 1px solid red;

`
//styled-components Boundary

const InputAddress = () => {
    return (
        <Container>
            <DataListInput>
                <Roommap/>
            </DataListInput>
        </Container>
    );
}

InputAddress.propTypes = {
    values: PropTypes.arrayOf(PropTypes.any).isRequired,
    placeholder: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired, //아이템을 선택하는 경ㅇ
    setItem : PropTypes.func.isRequired,
}

export default InputAddress;