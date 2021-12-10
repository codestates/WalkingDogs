import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { set } from 'lodash';
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
    border: 1px solid darkgray;
    border-radius: 10px;
    width: 50%;
    height: 10rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

`

const Comment = styled.div`
    display: flex;
    align-items: center;
    width: 95%;
    height: auto;
    padding: 10px;
`

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
`

const CommentInput = styled.input`
    width: 55%;
    min-height: 2rem;
    max-height: 2rem;
    border: 1px solid blue;
    border-radius: 5px;
    padding: 0px 10px;
    margin: 0px;
`

const ModifyInput = styled.input`
    width: 55%;
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
    display: ${props => props.isMine ? 'block' : 'none'};
    flex: 2 1 0;
`

const ModifyButton = styled.button`
    flex: 1 1 0;
`

const DeleteButton = styled.button`
    flex: 1 1 0;
`

const CommentUserImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`
const CommentUserName = styled.span`
    padding: 0px 10px;
    display: flex;
    align-items: center;
    flex: 14 1 0;
`
const Comments = ({ roomId }) => {

const [comments, setComments] = useState([]);
const [commentContent, setCommentContent] = useState("");

const [errMsg, setErrMsg] = useState("");

const [isModify, setIsModify] = useState(false);
const [modifyContent, setModifyContent] = useState({});

const textAreaChange = (e) => {
    setCommentContent(e.target.value);
}

const modifyAreaChange = (e) => {
    setModifyContent(Object.assign({ ...modifyContent }, { message: e.target.value }));
    console.log(modifyContent)
}

const commentSubmit = async (e) => {
    e.preventDefault();
    const convertedComment = commentContent.split(' ').join()

    if (convertedComment === "") {
        setErrMsg("내용을 입력해 주세요.")
    }
    else {
        setErrMsg("")
        await comment.newCommentApi(roomId, commentContent)

        const result = await comment.getCommentApi(roomId)

        setComments([ ...result.data.data ])
        setCommentContent("")
    }
}

const modifySubmit = async (e) => {
    e.preventDefault();
    const convertedComment = modifyContent.message.split(' ').join()

    if (convertedComment === "") {
        setErrMsg("내용을 입력해 주세요.")
    }
    else {
        setErrMsg("")
        await comment.modifyCommentApi(modifyContent.id, modifyContent.message)

        const newComments = comments.map((el) => {
            return el.id === modifyContent.id ? {...modifyContent} : el
        })

        setComments(newComments)
        setIsModify(false)
        setModifyContent({})

    }
}

const handleButtonClickModify = (idx) => {
  setModifyContent({ ...comments[idx] })
  setIsModify(true)
}

// 삭제 확인 모달이 있다면 좋기는 할 것 같음.
const handleButtonClickDelete = async (idx) => {
  const targetId = comments[idx].id

  await comment.deleteCommentApi(targetId)
  
  setComments( [ ...comments.filter((_, elIdx) => elIdx !== idx) ])
}

useEffect(async () => {
  const getComments = await comment.getCommentApi(roomId)
  console.log(getComments);
  const commentArray = getComments.data.data;
  console.log(commentArray)
  for (let i = 0; i < commentArray.length; i++) {
    //   if (!commentArray[i].user.is_memeber){
    //     commentArray[i].user.username = 'anonymous';
    //   }
    commentArray[i].user.username = commentArray[i].user.is_member ? commentArray[i].user.username : 'anonymous'
  }
  setComments([ ...commentArray])
}, [])

    return(
        <Container>
            <Title> 이 모임에서 자유롭게 얘기를 나눠봐요</Title>
            <CommentContainer>
                {comments.map((el, idx) => 
                    <Comment key={el.id}>
                        <CommentUserImage src={el.user.image}/>
                        <CommentUserName>{el.user.username}</CommentUserName>
                        <CommentText>{el.message}</CommentText>
                        <CommentOption isMine={el.isMine}>
                            <ModifyButton onClick={() => handleButtonClickModify(idx)}>...</ModifyButton> 
                            <DeleteButton onClick={() => handleButtonClickDelete(idx)}>X</DeleteButton>
                        </CommentOption>
                    </Comment>
                )}
            </CommentContainer>
            <InputContainer>
                {isModify ? 
                    <>
                        <ModifyInput type='text' placeholder='댓글을 입력하세요.' onChange={(e) => modifyAreaChange(e)} value={modifyContent.message}/>
                        <button type='button' className='modifySubmitBtn' onClick={(e) => modifySubmit(e)}>게시</button>
                    </>
                :
                    <>
                        <CommentInput type='text' placeholder='댓글을 입력하세요.' onChange={(e) => textAreaChange(e)} value={commentContent} />
                        <button type='button' className='commentSubmitBtn' onClick={(e) => commentSubmit(e)}>게시</button>
                    </>
                }
            </InputContainer>
            <ErrMessage>{errMsg}</ErrMessage>
        </Container>
    )
}

export default Comments;