import React, { useContext } from "react";
import { NavContainer, UlNavbar, LiNavBar } from "./style"
import { Link } from "react-router-dom"
import { logoutFn } from "../../services/AuthService"

import { UserInfoContext } from "../../contexts/UserContext/index"


export const Navbar = () => {

    const { userOn } = useContext(UserInfoContext)

    const doLogout = async () => {
        await logoutFn();
    }

    return (
        <NavContainer>
            <UlNavbar>
                {userOn && (
                    <LiNavBar>
                        <Link to="/">Home</Link>
                    </LiNavBar>
                )}
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