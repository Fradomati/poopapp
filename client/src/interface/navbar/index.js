import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { logoutFn } from "../../services/AuthService"
import { withRouter } from "react-router-dom"

import { UserInfoContext } from "../../contexts/UserContext/index"

// Styles
import { NavContainer, UlNavbar, LiNavBar, Img } from "./style"

// Icons 

import timers from "../../../public/images/icons/Timers.png"


export const Navbar = withRouter(({ history }) => {

    const { userOn, setUserOn } = useContext(UserInfoContext)

    const doLogout = async () => {
        await logoutFn();
        setUserOn(null)
        localStorage.setItem("sessionOn", "")
        history.push("/login")
    }

    return (
        <NavContainer>
            <UlNavbar>
                {userOn && (
                    <LiNavBar>
                        <Link to="/" ><Img src={timers}></Img></Link>
                    </LiNavBar>
                )
                }
                {!userOn && (
                    <>
                        <LiNavBar>
                            <Link to="/signup" >Signup</Link>
                        </LiNavBar>
                        <LiNavBar>
                            <Link to="/login" >Login</Link>
                        </LiNavBar>
                    </>
                )}
                {userOn && (
                    <>
                        <LiNavBar>
                            <Link to="/profile" > ¡Hola! {userOn.username} </Link>
                        </LiNavBar>
                        <LiNavBar>
                            <Link to="/" onClick={() => {
                                doLogout()
                            }} >Logout</Link>
                        </LiNavBar>
                    </>
                )}
            </UlNavbar>
        </NavContainer>
    )
})