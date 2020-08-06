import styled from "styled-components";

// Mobile

export const NavContainer = styled.div`
display: flex;
align-items: center;
width: 100%;
height: 5vh;
background-color: #2EC4B6;
position: fixed;
bottom: 0;
`;

export const UlNavbar = styled.ul`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-evenly;
list-style-type: none;
color: black;
`

export const LiNavBar = styled.li`
text-decoration: none;
a {
    color: black;
    text-decoration: none;
}
`;

