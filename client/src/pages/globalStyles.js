import styled from "styled-components";

export const Container = styled.div`
background-color: transparent;
height: 100vh
`

export const SubContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`


export const AuthForm = styled.form`
display: flex;
flex-direction: column;
margin: 0 auto;
width: 70vw;
`

export const CenterLogo = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    top: -12vh;
`
export const Logo = styled.img`
width: 15.5em;
height: auto;
@media (max-width:768px) {
    width: 250px; 
}
`

export const test = styled.div`
display: none;
`

export const ErrorTxt = styled.p`
font-size: 0.8em;
margin: 0 0 0.5em 0;
color: #ff284e;
`