import React from 'react';
import styled from 'styled-components'


export const Container = styled.div`
    align-items: center;
    border: 1px dotted red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80rem;
    width: auto;
`

export const H1 = styled.h1`
`

// styled-component Boundary

const Community = () => {
    return(
        <>
        <Container>
            <div className="container1"
                    style={{border: '1px solid #000000',
                            width: 'auto',
                            height: 'auto',
                            margin:'10px',}}>
                                <H1>커뮤니티에서 후일담을 남겨봐요</H1>
            </div>

            <div className="container2"
                    style={{border: '1px solid #000000',
                            width: '80%',
                            height: '50rem',
                            margin:'10px'}}>
            </div>
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