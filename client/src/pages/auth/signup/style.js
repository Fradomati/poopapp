import styled from "styled-components"
import { Link } from "react-router-dom"

export const Title = styled.p`
font-size: 1.5em;
color: #2EC4B6;
margin-bottom: 0.3em;
`

export const Input = styled.input`
background-color: #011728;
border: 1px solid #2ec4b6;
padding: 0.5em;
margin-bottom: 0.5em;
::placeholder,
::-webkit-input-placeholder {
  color: #ecececbf;
}
:-ms-input-placeholder {
   color: #ecececbf;
}
&:focus {
    color: white;
}
color: #2EC4B6;
`

export const InputSend = styled.input`
background-color: #26a49b;
    border: none;
    padding: 0.5em;
    color: #011728;
    font-weight: bold;
    margin-bottom: 0.4em;
    `

export const TextForgot = styled.p`
color: white;
margin-top: 0.2em;
a {
    text-decoration: none;
    color: #2EC4B6;
    font-size: 0.9em;
    
}
`

export const LinkForgot = styled.span`
    text-decoration: none;
    color: white;
    font-size: 0.9em;
`