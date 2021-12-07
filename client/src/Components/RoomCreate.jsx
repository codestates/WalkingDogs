import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { createGatherRoomDetailModalOnAction, modalOffAction } from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import Roomcard from './Roomcard'
import RoomSearch from './RoomSearch'
import roomApi from '../api/room'
import AllButtons from './AllButtons';
import media from 'styled-media-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';




const CreateRoomContainer = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
`

const Info = styled.div`
    width: 44rem;
    padding: 2rem 2rem 1.5rem;
    * {
        margin: 1.2rem 0rem;
    }
    ${media.lessThan("medium")`
        width: 20rem;
        padding: 0rem 0rem 1.5rem;
    `}
`;

const MoveNextButton = styled.div`
    position: relative;
    display: flex;
    align-items: end;
    justify-content: space-between;
    width: 44rem;
    height: 12rem;
    z-index: ${(props) => props.inOnSearch && -1};
    padding: 2rem 2rem 2rem;
    ${media.lessThan("medium")`
        width: 20rem;
        margin-top: 2rem;
    `}
`

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  div {
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    width: fit-content;
    height: 15rem;
    ${media.lessThan("medium")`
        width: 20rem;
    `}
`;

const StyleRoomCard = styled(Roomcard)`
    ${media.lessThan("medium")`
    display:none;
    `}
`;

const StyledBtn = styled(AllButtons)`
  width: 5rem;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.4rem;
`


// styled-component Boundary
const RoomCreate = () => {

    const [step, setStep] = useState(1);
    const [ask, setAsk] = useState("모이는 곳의 주소는 어디인가요?")
    const [askExample, setAskExample] = useState({예: ""})
    const [isOnSearch, setIsOnSearch] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [selectedOption, setSelectedOption] = useState([]);
    const user = useSelector(({authReducer}) => authReducer);

    const dispatch = useDispatch();

    const [roomInfo, setRoomInfo] = useState({
        id: 1,
        room_title: '월드컵경기장에서 산책겸 애견카페 같이가요 !~',
        description: '마포구 포메라니안 집사입니다. 최근에 애견카페 괜찮을 곳 찾았어요!',
        creater:{
            id:'uuid',
            image:"",
        },
        address:"마포구",
        latitude: "37.56820203278462",
        longitude: "126.8990406557216",
        date: "2021-12-27",
        meeting_time: "18시",
        totalNum: 4,
        currentNum: 1,
        done: false,
        users : [{
            id:'uuid',
            username:'말티즈집사',
            image:'imageUrl',
        },
      ],
    });

    const handlePrevBtn = () => {
        setIsOnSearch(false);
        setInputValue("");
        setList([]);
        setIsSelected(false);
        setSelectedOption(selectedOption.slice(0, selectedOption.length - 1));
        setStep(step-1);
    }

    const handleNextBtn = async () => {
        if(step >= 5 && step < 8) {
            setSelectedOption([...selectedOption, inputValue]);
            setIsOnSearch(false);
            setInputValue("");
            setList([]);
            setIsSelected(false);
            setStep(step + 1);
        } else {
            if(selectedOption.length === step){
                setIsOnSearch(false);
                setInputValue("");
                setList([]);
                setIsSelected(false);
                setStep(step + 1);
            }
        }
    };

    useEffect(()=>{
        switch(step){
            case 1:
                setAsk("모이는 곳의 주소는 어디인가요?")
                setAskExample({예: "망원동, 연희동"})
                break;
            case 2:
                setAsk("모이는 곳의 장소 이름은 무엇인가요?")
                setAskExample({예: "00카페"})
                break;
            case 3:
                setAsk("언제 모이나요?")
                setAskExample({예: "0000년 00월 00일"})
                break;
            case 4:
                setAsk("시간대는 언제인가요?")
                setAskExample({예: "오후 0시"})
                break;
            case 5:
                setAsk("몇 명이서 모이나요?")
                setAskExample({예: "2명, 3명"})
                break;
            case 6:
                setAsk("모임을 만들 때 제목을 남겨주세요")
                setAskExample({예: "우리 산책가요!~"})
                break;
            case 7:
                setAsk("만드려는 모임의 설명을 남겨주세요")
                setAskExample({예: "산책을 갈 친구를 찾습니다. 많은 신청 및 문의 남겨주세요."})
                break;
            default:
            break;
        }
        if(step === 6) setInputValue(2);
        setRoomInfo({
            id:1,
            title: selectedOption[6]
            ? selectedOption[6]
            : selectedOption[0] && `${selectedOption[0].slice(0, -2)} !`,
            description: selectedOption[6] || '월드컵경기장에서 산책겸 애견카페 같이가요 !~',
            creater: {
                id:'uuid',
                username:user.username,
                image:user.image,
            },
            areaName: (selectedOption[0] && selectedOption[0].address_name.split(" ")[1]) || "00구",
            placeName: (selectedOption[1] && selectedOption[1].place_name) || '월드컵경기장',
            latitude: "37.56820203278462",
            longitude: "126.8990406557216",
            date: selectedOption[2] || "2021-12-27",
            time: selectedOption[3] || "오후",
            timeDesctiption: selectedOption[3] || "18시",
            totalNum: selectedOption[4] || 0,
            currentNum: selectedOption[4] - 3 || 0,
            done: false,
            users : [{
                id:'uuid',
                username:'말티즈집사',
                image:'imageUrl',
            },
          ],
        });
    },[step, selectedOption]);

    const handleSave = async () => {
        try {
            const payload = {
                title: roomInfo.title,
                description: inputValue,
                placeName:roomInfo.placeName,
                latitude:roomInfo.latitude,
                longitude:roomInfo.longitude,
                date: roomInfo.date,
                time: roomInfo.time,
                timeDesctiption:roomInfo.timeDesctiption,
                totalNum: roomInfo.totalNum,
                address: roomInfo.areaName,
            };
            const res = await roomApi.newRoomApi(payload);
            console.log(res)
            if(res.status === 200){
                dispatch(modalOffAction);
                dispatch(createGatherRoomDetailModalOnAction(res.data));
            }
        } catch (error) {
            console.error(error);
        }
    };

    
    /*
    latitude: roomInfo.latitude,
    longitude: roomInfo.longitude,
    address: roomInfo.address,
    selected_dogs: [...roomInfo.selected_dogs],
    room_title: roomInfo.room_title,
    member_limit: roomInfo.member_limit,
    meeting_time: roomInfo.meeting_time,
    */


    return (
        <>
            <CreateRoomContainer>
                <Info>
                    <div>질문 {step} 번</div>
                    <div style={{width: '100%', height: '1rem', color: 'grey'}}>
                        {step === 2 && selectedOption[0] && `${selectedOption[0]} 모임`}
                        {step === 3 &&
                            selectedOption[1].length !==0 &&
                            `${selectedOption[1].place_name} 에서
                            모임`}
                            {(step === 4 || step === 5) && 
                            `${selectedOption[2].split("-")[1]} 월 ${selectedOption[2].split("-")[2]}일
                            '${selectedOption[1].place_name}에서' 모임`}
                    </div>
                    <h2>{ask}</h2>
                </Info>
                <Container>
                    <RoomSearch
                    step={step}
                    isOnSearch={isOnSearch}
                    setIsOnSearch={setIsOnSearch}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    list={list}
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}/>
                    <StyleRoomCard roomInfo={roomInfo} disabled={true}/>
                </Container>
                <MoveNextButton isOnSearch={isOnSearch}>
                    <Btn name="prev" onClick={handlePrevBtn}>
                        {step > 1 && (
                            <>
                            <FontAwesomeIcon icon={faCaretSquareLeft}/>
                            <div> 이전 </div>
                            </>
                        )}
                    </Btn>
                    <Btn name="next" onClick={handleNextBtn}>
                        {step < 8 ? (
                            <>
                            <div> 다음 </div>
                            <FontAwesomeIcon icon={faCaretSquareRight}/>
                            </>
                        ) : (
                            <>
                             <StyledBtn color='white' bgColor='#646fcb' onClick={handleSave}> 
                                등록하기
                             </StyledBtn>
                            </>
                        )}
                    </Btn>
                </MoveNextButton>
            </CreateRoomContainer>
        </>
    )

}

export default RoomCreate;