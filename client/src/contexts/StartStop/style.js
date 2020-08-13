import styled from "styled-components";

export const MainContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
height: 8vh;
padding: 0.5em 0.5em 0 0.5em
`
export const Img = styled.img`
width: 2em;
height: auto;
padding: 0.5em;
`

export const StartedButton = styled.button`
border-radius: 50%;
background-color: #E71D36;
box-shadow: 0px 0px 3px 0px #504f4f;
border: 0.4em solid #383737;
}
`

export const StoppedButton = styled.button`
border-radius: 50%;
background-color: #178825;
box-shadow: inset 0px 0px 6px 2px #0c0c0c;
border: 0.2em solid black;
`

export const LogoImg = styled.img`
height: 4em;
width: auto;
`