import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import comment from '../api/comment';


const Container = styled.div`
    border: 1px solid #000000;
    width: 100%; 
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

const CommentContainer = styled.div`
    border: 1px solid black;
    width: 100rem;
    height: 10rem;
`

const Comment = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid red;
    width: 100%;
    height: 2rem;
`

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
`

const CommentInput = styled.input`
    width: 100%;
    min-height: 2rem;
    max-height: 2rem;
    border: 1px solid blue;
    border-radius: 5px;
    padding: 0px 10px;
    margin: 0px;
`

const ErrMessage = styled.div`
  color: var(--color-red);
  font-size: 0.8rem;
  padding: 0 1rem;
  height: 0.5rem;
`;

const CommentText = styled.span`
    padding: 0px 10px;
    display: flex;
    align-items: center;
    flex: 14 1 0;
`

const CommentOption = styled.div`
    flex: 1 1 0;
`

const ModifyButton = styled.button`
    flex: 1 1 0;
`

const DeleteButton = styled.button`
    flex: 1 1 0;
`

const Comments = ({ roomId }) => {

const [comments, setComments] = useState([]);
const [commentContent, setCommentContent] = useState("");
const [errMsg, setErrMsg] = useState("");

const textareaChange = (e) => {
    setCommentContent(e.target.value);
}

const commentSubmit = async (e) => {
    e.preventDefault();
    const convertedComment = commentContent.split(' ').join()

    if (convertedComment === "") {
        setErrMsg("내용을 입력해 주세요.")
    }
    else {
        setErrMsg("")
        const result = await comment.newCommentApi(roomId, commentContent)

        console.log(result)
    }
}

const handleButtonClickModify = () => {

}

const handleButtonClickDelete = () => {
    
}

useEffect(async () => {
  const getComments = await comment.getCommentApi(roomId)
  
  console.log(getComments)
  setComments([ ...getComments.data.data ])
}, [])

    return(
        <Container>
            <Title> 이 모임에서 자유롭게 얘기를 나눠봐요</Title>
            <CommentContainer>
                {comments.map((el) => 
                    <Comment key={el.id}>
                        <CommentText>{el.message}</CommentText>
                        <CommentOption>
                            <ModifyButton onClick={handleButtonClickModify}>...</ModifyButton> 
                            <DeleteButton onClick={handleButtonClickDelete}>X</DeleteButton>
                        </CommentOption>
                    </Comment>
                )}
            </CommentContainer>
            <InputContainer>
                <CommentInput type='text' placeholder='댓글을 입력하세요.' onChange={(e) => textareaChange(e)}/>
                <button type='button' className='commentSubmitBtn' onClick={(e) => commentSubmit(e)}>게시</button>
            </InputContainer>
            <ErrMessage>{errMsg}</ErrMessage>
        </Container>
    )
}

export default Comments;