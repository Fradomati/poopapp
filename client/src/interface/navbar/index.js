import React from "react";
import { NavContainer, UlNavbar, LiNavBar } from "./style"
import { Link } from "react-router-dom"
import { logoutFn } from "../../services/AuthService"


export const Navbar = () => {

    const doLogout = async () => {
        await logoutFn();
    }

    return (
        <NavContainer>
            <UlNavbar>
                <LiNavBar>
                    <Link to="/">Home</Link>
                </LiNavBar>
                <LiNavBar>
                    <Link to="/signup">Signup</Link>
                </LiNavBar>
                <LiNavBar>
                    <Link to="/login">Login</Link>
                </LiNavBar>
                <LiNavBar>
                    <Link to="/" onClick={() => {
                        doLogout()
                    }}>Logout</Link>
                </LiNavBar>
            </UlNavbar>
        </NavContainer>
    )
}