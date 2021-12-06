import React, {useState} from 'react';
import styled from 'styled-components'


const Container = styled.div`
    border: 1px solid #000000;
    width: auto; 
    height: 30rem;
    margin:10px 10px;
    border-radius: 10px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h2`
    border-bottom: 1px solid black;
`

const CommentList = styled.div`
    border: 1px solid black;
    width: 100rem;
    height: 10rem;
`

const InputContainer = styled.div`
    border: 1px solid black;
`


const Comment = ({Post}) => {

const [commentContents, setCommentContent] = useState("");
const [errMsg, setErrMsg] = useState("");

const textareaChange = (e) => {
    setCommentContent(e.target.value);
}

const commentSubmit = (e) => {
    e.preventDefault();

    if (commentContents === "") {
        setErrMsg(" 내용을 입력해 주세요.")
    }
}

    return(
        <Container>
            <Title> 이 모임에서 자유롭게 얘기를 나눠봐요</Title>
            <CommentList></CommentList>
        </Container>
    )
}

export default Comment;