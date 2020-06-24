import React from "react";
import { NavContainer, UlNavbar, LiNavBar } from "./style"
import { Link } from "react-router-dom"


export const Navbar = () => {

    return (
        <NavContainer>
            <UlNavbar>
                <LiNavBar>
                    <Link to="/">Home</Link>
                </LiNavBar>
                <LiNavBar>
                    <Link to="/#">Option 1</Link>
                </LiNavBar>
                <LiNavBar>
                    <Link to="/#">Option 2</Link>
                </LiNavBar>
            </UlNavbar>
        </NavContainer>
    )
}