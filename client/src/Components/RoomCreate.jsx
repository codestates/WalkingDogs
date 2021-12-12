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

    const [roomInfo, setRoomInfo] = useState({
        id: 1,
        title: '월드컵경기장에서 산책겸 애견카페 같이가요 !~',
        description: '마포구 포메라니안 집사입니다. 최근에 애견카페 괜찮을 곳 찾았어요!',
        creater:{
            id:'uuid',
            image:"",
        },
        address:"마포구",
        latitude: "37.56820203278462",
        longitude: "126.8990406557216",
        date: "2021-12-27",
        time:"evening",
        meeting_time: "18시",
        totalNum: 4,
        currentNum: 1,
        done: false,
        dogs: {
            id: 27, 
            name: "dog27",
            breed: "진도",
            image: null,
            gender: "female",
            createdAt: "2021-12-02T10:53:47.000Z",
            updatedAt: "2021-12-02T10:53:47.000Z",
        },
        users : [{
            id:'uuid',
            username:'말티즈집사',
            image:'imageUrl',
        },
      ],
    test1:'test',
    });

    const handlePrevBtn = () => {
        setIsOnSearch(false);
        setInputValue("");
        setList([]);
        setIsSelected(false);
        setSelectedOptions(selectedOptions.slice(0, selectedOptions.length - 1));
        setStep(step-1);
    }

    const handleNextBtn = () => {

        //----------------------------------------------------
        // 첫번째 방법: 각 항목을 입력해야만 다음 단계로 넘어감
        //----------------------------------------------------
        if(step === 1) {
            setSelectedOptions([...selectedOptions, inputValue]);
            setIsOnSearch(true);
            setInputValue("");
            setList([]);
            setIsSelected(false);
            setStep(step + 1);
        } else if(selectedOptions.length === step){
            setIsOnSearch(true);
            setInputValue("");
            setList([]);
            setIsSelected(false);
            setStep(step + 1);
            setShowMessage(false);
        } else if(step < 7) {
            setIsOnSearch(true);
            setInputValue("");
            setList([]);
            setIsSelected(false);
            // setStep(step + 1);
            setShowMessage(true);
        }
        //----------------------------------------------------------------------
        // 두번째 방법: 빠트린 항목이 있어도 일단 다음 단계로 넘어가고
        // 대신 맨 마지막에 '등록하기'를 누르면 빠트린 항목을 채우라는 메세지가 나옴.
        //----------------------------------------------------------------------
        // if (step <= 6) {
        //     setIsOnSearch(true);
        //     setInputValue("");
        //     setList([]);
        //     setIsSelected(false);
        //     setStep(step + 1);
        // } else if (step === 7) {
        //     setSelectedOptions([...selectedOptions, inputValue]);
        //     setIsOnSearch(true);
        //     // setInputValue("");
        //     setList([]);
        //     setIsSelected(false);
        //     setStep(step + 1);
        // } else {
        //     // setSelectedOptions([...selectedOptions, inputValue]);
        //     setIsOnSearch(true);
        //     // setInputValue("");
        //     setList([]);
        //     setIsSelected(false);
        //     // setStep(step + 1);
        // }
    };

    useEffect(async () => {
        // console.log('accessToken: ', document.cookie.split('; ').find(row => row.startsWith('accessToken')).split('=')[1]);
        // setAccessToken(document.cookie.split('; ').find(row => row.startsWith('accessToken')).split('=')[1]);
        const res = await mypageApi.dogListApi();
        console.log('res: ', res.data.dogs);
        setDogList(res.data.dogs);
    }, []);

    useEffect(()=>{
        switch(step){
            case 1:
                setAsk("모이는 곳의 장소는 어디인가요?")
                break;
            case 2:
                setAsk("몇 일날 모이나요?")
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
                setAsk("만들려는 모임의 설명을 남겨주세요")
                break;
            case 7:
                // setAsk("아이의 크기를 선택해 주세요")
                setAsk("함께 갈 아이들을 선택해 주세요")
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

        setRoomInfo({
            id: 1,

            title: selectedOptions[4] ? selectedOptions[4] : selectedOptions[0] && `${selectedOptions[0].slice(0, -2)} !`,

            description: selectedOptions[6] || '월드컵경기장에서 산책겸 애견카페 같이가요 !~',
            creater: {
                id:'uuid',
                username:user.username,
                image:user.image,
            },

            address: (selectedOptions[0] && selectedOptions[0].address && selectedOptions[0].address.split(" ")[1]) || "00구",

            latitude: "37.56820203278462",
            longitude: "126.8990406557216",
            date: selectedOptions[2] || "2021-12-27",
            time: selectedOptions[3] || "오후",
            timeDesctiption: selectedOptions[3] || "18시",
            totalNum: selectedOptions[4] || 0,
            currentNum: selectedOptions[4] - 3 || 0,
            done: false,
            users : [{
                id:'uuid',
                username:'말티즈집사',
                image:'imageUrl',
            },
          ],
        });
    },[step, selectedOptions]);

    const handleSave = () => {
        try {
            const payload = {
                latitude:roomInfo.latitude,
                longitude:roomInfo.longitude,
                address:roomInfo.address,
                // selected_dogs:,
                room_title: roomInfo.title,
                member_limit: roomInfo.totalNum,
                meeting_time: roomInfo.date + roomInfo.time
                // description: inputValue,
                // date: roomInfo.date,
                // time: roomInfo.time,
                // timeDesctiption:roomInfo.timeDesctiption,
                // totalNum: roomInfo.totalNum,
                // address: roomInfo.areaName,
            };
            if(payload.latitude && payload.longitude && payload.address && payload.selected_dogs && payload.room_title && payload.member_limit && payload.meeting_time) {
                setShowMessage(false);
                setClickedDog(false);
                setClickedTime(false);
                console.log(selectedOptions);
                const res = roomApi.newRoomApi(payload);
                console.log(res)
                if(res.status === 200){
                    dispatch(modalOffAction);
                    dispatch(createGatherRoomDetailModalOnAction(res.data));
                }
            } else {
                setShowMessage(true);
                setClickedDog(false);
                setClickedTime(false);
                console.log(selectedOptions);

            }
            
        } catch (error) {
            console.error(error);
        }
        console.log('aaaaa');
    };


    return (
        <>
            <CreateRoomContainer>
                <Info>
                    <div style={{color: 'black',fontSize: '20px'}}>질문 {step} 번</div>
                    <div style={{width: '100%', height: '0.2rem', color: 'black'}}>
                        {step === 3 && selectedOptions[1] &&
                            selectedOptions[1].length !==0 &&
                            `${selectedOptions[1].place_name} 에
                            모임`}
                        {(step === 4 || step === 5) && selectedOptions[0] && selectedOptions[1] &&
                            `${selectedOptions[1].split("-")[1]} 월 ${selectedOptions[1].split("-")[2]}일
                            '${selectedOptions[0].place_name}에서' 모임`}
                    </div>
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
                    
                        {step < 7 ? (
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