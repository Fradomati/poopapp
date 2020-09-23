import styled from "styled-components"

export const CntDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100vw
`

export const UlCnt = styled.ul`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100%;
overflow: auto;
::-webkit-scrollbar {
    display: none;
}
`

export const LiCnt = styled.li`
border: 1px solid #2EC4B6;
color: #2EC4B6;
list-style-type: none;
margin: 0.4em 0;
width: 90vw;
`

export const DivTitle = styled.div`
padding: 0.5em 0.5em 0 0.5em;
`

export const DivInfo = styled.div`
display: flex;
justify-content: space-evenly;
padding: 0.5em 0;
`
