import React from 'react';
import styled from 'styled-components'
import AfterPost from '../Components/Post'


const Container = styled.div`
    align-items: center;
    border: 1px dotted red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80rem;
    width: auto;
`

const TitleBox = styled.div`
    border: 1px solid var(--color-black);
    width: 30rem;
    height:auto;
    margin:10px;
    text-align: center;
`

const Post1Container = styled.div`
    border: 1px solid var(--color-black);
    width: 80%;
    height: 50rem;
    margin:10px;
`

const H1 = styled.h1`
`

// styled-component Boundary

const Community = () => {
    return(
        <>
        <Container>
            <TitleBox>
                <H1>커뮤니티에서 후일담을 남겨봐요</H1>
            </TitleBox>

            <Post1Container>
                
            </Post1Container>
            <div className="container3"
                    style={{border: '1px solid #000000',
                            width: '80%',
                            height: '50rem',
                            margin:'10px'}}>
            </div>
        </Container>
        </>
    );
}

export default Community;