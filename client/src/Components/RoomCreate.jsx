import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { createGatherRoomDetailModalOnAction, modalOffAction } from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import Roomcard from './Roomcard'
import roomApi from '../api/room'



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

    const [gathering, setGathering] = useState({
        id: 1,
        title: '월드컵경기장에서 산책겸 애견카페 같이가요 !~',
        description: '마포구 포메라니안 집사입니다. 최근에 애견카페 괜찮을 곳 찾았어요!',
        creater:{
            id:'uuid',
            username:'test1',
            image:"",
        },
        areaName:"마포구",
        placeName: "월드컵경기장",
        latitude: "37.56820203278462",
        longitude: "126.8990406557216",
        date: "2021-12-27",
        time: 'evening',
        timeDesctiption: "18시",
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
        setGathering({
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


    return (
        <>
            <CreateRoomContainer>
                <Info>
                    <div>질문 {step} 번</div>
                    <div style={{width: '100%', height: '1rem', color: 'grey'}}>
                        {step === 2 && selectedOption[0] && `${selectedOption[0]} 모임`}
                        {step === 3 &&
                            selectedOption[1].length !==0 &&
                            `${selectedOption[1].place_name} 에서`
                        }
                    </div>
                </Info>
            </CreateRoomContainer>
        </>
    )

}

export default RoomCreate;