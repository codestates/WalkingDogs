import ReactDom from 'react-dom';
import styled from 'styled-components'
import media from 'styled-media-query';
import DataListInput from 'react-plain-datalist-input';
import PropTypes from 'prop-types'
import Roommap from './Roommap'

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
`

const Button = styled.button`
    border: 1px solid black;
    width: 8rem;
    height: 2.2rem;
`
const MapBox = styled.div`
    z-index: 2;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: calc(100%-56px);
    min-height: 200px;
    max-height: 100%;
    min-width: 200px;
    background-color: var(--color-darkwhite);
    white-space: normal;
    word-break: break-word;
    text-align: left;
    border-radius: 10px;
    padding: 30px;
    margin: auto;
    box-sizing: border-box;
    font-size: 16px;
`

//styled-components Boundary

const InputAddress = ({isMapOn, setIsMapOn }) => {


    const handleMapBtnClick = () => {
        setIsMapOn(isMapOn)
    }

    return (
        <Container className='address_container'>
                {!isMapOn ? (
                    <Button onClick={handleMapBtnClick}> 버튼 </Button>
                ) : (
                    <MapBox>
                        <Roommap />
                    </MapBox>
                )}
        </Container>
    );
}

InputAddress.propTypes = {
    isMapOn: PropTypes.bool.isRequired,
    setIsMapOn: PropTypes.func.isRequired,
}

export default InputAddress;