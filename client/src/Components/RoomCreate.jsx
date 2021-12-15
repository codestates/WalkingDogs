import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { createGatherRoomDetailModalOnAction, modalOffAction } from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import RoomSearch from './RoomSearch'
import roomApi from '../api/room'
import mypageApi from '../api/mypage'
import AllButtons from './AllButtons';
import media from 'styled-media-query'
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'




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
    text-align: center;
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
    height: 1.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
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
    const [isOnSearch, setIsOnSearch] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [showMessage, setShowMessage] = useState(false);
    const [clickedDog, setClickedDog] = useState(false);
    const [clickedTime, setClickedTime] = useState(false);
    const [clickedCalendar, setClickedCalendar] = useState(false);
    const [dogList, setDogList] = useState([]);
    const [selectedDogs, setSelectedDogs] = useState([]);

    const user = useSelector(({authReducer}) => authReducer);
   
    const dispatch = useDispatch();

    const handlePrevBtn = () => {
        if(step === 5){
            setIsOnSearch(false);
            setInputValue(2);
            setList([]);
            setIsSelected(false);
            setSelectedOptions([ ...selectedOptions.slice(0, step - 2), 2 ]);
            setStep(step - 1);
        }
        else if(step === 3) {
            const now = new Date();
            const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
            const formedDate = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`
            setIsOnSearch(true);
            setInputValue(formedDate);
            setList([]);
            setIsSelected(false);
            setSelectedOptions([ ...selectedOptions.slice(0, step - 2), date ]);
            setStep(step - 1);
        }
        else {
            setIsOnSearch(false);
            setInputValue("");
            setList([]);
            setIsSelected(false);
            setSelectedOptions(selectedOptions.slice(0, step - 2));
            setStep(step - 1);
        }
    }

    const handleNextBtn = () => {

        console.log('selectedOptions : ', selectedOptions)

        if(selectedOptions.length === step){
            setIsOnSearch(true);
            if(step === 3) {
                setInputValue(2);
                setSelectedOptions([...selectedOptions, 2])
            }
            else
                setInputValue('');
            setList([]);
            setIsSelected(false);
            setStep(step + 1);
            setShowMessage(false);
            setSelectedDogs([])
        } else if(step < 6) {
            setIsOnSearch(true);
            setInputValue("");
            setList([]);
            setIsSelected(false);
            // setStep(step + 1);
            setShowMessage(true);
            setSelectedDogs([])
        }
    };

    useEffect(async () => {
        const res = await mypageApi.dogListApi();
        
        setDogList(res.data.dogs);
        
        setSelectedDogs(new Array(res.data.dogs.length).fill(false));
    }, []);

    useEffect(()=>{
        switch(step){
            case 1:
                setAsk("모이는 곳의 장소는 어디인가요?")
                break;
            case 2:
                setAsk("어느 날 모이나요?")
                break;
            case 3:
                setAsk("시간대는 몇 시 인가요?")
                break;
            case 4:
                setAsk("몇 명이서 모이나요?")
                break;
            case 5:
                setAsk("모임을 만들 때 제목을 남겨주세요")
                break;
            case 6:
                setAsk("함께 갈 아이들을 선택해 주세요")
                break;
            default:
                break;
        }
        
        // const {
        //     latitude,
        //     longitude,
        //     address,
        //     selected_dogs,
        //     room_title,
        //     member_limit,
        //     meeting_time,
        //   } = req.body;

        // setRoomInfo({
        //     id: 1,

        //     title: selectedOptions[4] ? selectedOptions[4] : selectedOptions[0] && `${selectedOptions[0].slice(0, -2)} !`,

        //     description: selectedOptions[6] || '월드컵경기장에서 산책겸 애견카페 같이가요 !~',
        //     creater: {
        //         id:'uuid',
        //         username:user.username,
        //         image:user.image,
        //     },

        //     address: (selectedOptions[0] && selectedOptions[0].address && selectedOptions[0].address.split(" ")[1]) || "00구",

        //     latitude: "37.56820203278462",
        //     longitude: "126.8990406557216",
        //     date: selectedOptions[2] || "2021-12-27",
        //     time: selectedOptions[3] || "오후",
        //     timeDesctiption: selectedOptions[3] || "18시",
        //     totalNum: selectedOptions[4] || 0,
        //     currentNum: selectedOptions[4] - 3 || 0,
        //     done: false,
        //     users : [{
        //         id:'uuid',
        //         username:'말티즈집사',
        //         image:'imageUrl',
        //     },
        //   ],
        // });
    },[step, selectedOptions]);

    const handleSave = async () => {
        try {
            // ! server Api 보면서 작성.

            // ! map에서 받아온 좌표를 selectedOption에 저장하는 logic 구현 필요
            // ! meeting_time을 서버가 원하는 Date 형식으로 변환해서 보내주는 작업 필요
            // ! 미완성은 주석처리 해놓았음.

            // latitude: roomInfo.latitude,
            // longitude: roomInfo.longitude,
            // address: roomInfo.address,
            // meeting_time: roomInfo.meeting_time,
            // member_limit: roomInfo.member_limit,
            // room_title: roomInfo.room_title,
            // selected_dogs: [...roomInfo.selected_dogs],
            const dummySelectedDogs = dogList.filter((_, idx) => selectedDogs[idx])
            const meetingTime = Date.parse(
                `${selectedOptions[1]}T${selectedOptions[2].length < 3 ? `0${selectedOptions[2].slice(0, -1)}` : `${selectedOptions[2].slice(0, -1)}`}:00:00.000Z`
                )
            console.log(meetingTime)
            const payload = {
                latitude: selectedOptions[0].latitude,
                longitude: selectedOptions[0].longitude,
                address: selectedOptions[0].address.address_name,
                meeting_time: meetingTime,
                member_limit: selectedOptions[3],
                room_title: selectedOptions[4],
                selected_dogs: dummySelectedDogs,
            };

            // ! 어차피 options를 작성할 때, 값을 넣지 않으면 다음으로 넘어갈 수 없게 구현이 되어있기 때문에
            // ! 가장 마지막으로 입력을 받는 값은 selected_dogs의 length가 0이 아닐 때에만 Room Create 요청을 보낼 수 있게 컨트롤

            if(payload.selected_dogs.length !== 0) {
                setShowMessage(false);
                setClickedDog(false);
                setClickedTime(false);
                console.log(selectedOptions);

                const res = await roomApi.newRoomApi(payload);
                console.log(res)
                
                if(res.status === 200){
                    dispatch(modalOffAction());
                    dispatch(createGatherRoomDetailModalOnAction(res.data));
                }
            } else {
                setShowMessage(true);
                setClickedDog(false);
                setClickedTime(false);
                console.log(selectedOptions);

            }
            window.location.assign('/roomlist')
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <CreateRoomContainer>
                <Info>
                    <div style={{color: 'black',fontSize: '20px'}}>질문 {step} 번</div>
                    <h2 style={{color: 'black'}}>{ask}</h2>                
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
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                        showMessage={showMessage}
                        setShowMessage={setShowMessage}
                        clickedDog={clickedDog}
                        setClickedDog={setClickedDog}
                        clickedTime={clickedTime}
                        setClickedTime={setClickedTime}
                        dogList={dogList}
                        setDogList={setDogList}
                        selectedDogs={selectedDogs}
                        setSelectedDogs={setSelectedDogs}
                        clickedCalendar={clickedCalendar}
                        setClickedCalendar={setClickedCalendar}
                    />
                </Container>
                {/* {showMessage ? <div>"모든 정보를 입력해 주세요"</div> : null} */}
                <MoveNextButton isOnSearch={isOnSearch}>
                    <Btn name="prev" onClick={handlePrevBtn}>
                        {step > 1 && (
                            <>
                            <BsArrowLeftCircleFill fontSize="2rem" style={{margin:'0.5rem'}}/>
                            <div> 이전 </div>
                            </>
                        )}
                    </Btn>
                    {/* <Btn name="next" onClick={handleNextBtn}>
                        {step < 7 ? (
                            <>
                            <div> 다음 </div>
                            <BsArrowRightCircleFill fontSize="2rem" style={{margin:'0.5rem'}}/>
                            </>
                        ) : (
                            <>
                             <StyledBtn color='white' bgColor='#646fcb' onClick={handleSave}> 
                                등록하기
                             </StyledBtn>
                            </>
                        )}
                    </Btn> */}
                    
                        {step < 6 ? (
                            <Btn name="next" onClick={handleNextBtn}>
                            <div> 다음 </div>
                            <BsArrowRightCircleFill fontSize="2rem" style={{margin:'0.5rem'}}/>
                            </Btn>
                        ) : (
                            <>
                             <StyledBtn color='white' bgColor='#646fcb' onClick={handleSave}> 
                                등록하기
                             </StyledBtn>
                            </>
                        )}
                </MoveNextButton>
            </CreateRoomContainer>
        </>
    )

}

export default RoomCreate;