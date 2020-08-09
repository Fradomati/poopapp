import styled from "styled-components";

// Mobile

export const NavContainer = styled.div`
display: flex;
align-items: center;
width: 100%;
height: 7vh;
background-color: #011627;
box-shadow: 0px -1px 7px 0px #2EC4B6;
position: fixed;
bottom: 0;
`;

export const UlNavbar = styled.ul`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-evenly;
list-style-type: none;
color: white;
`

export const LiNavBar = styled.li`
text-decoration: none;
a {
    color: white;
    text-decoration: none;
}
`

export const Img = styled.img`
width: 1.8em;
`

