import React from "react";
import { MainContainer, SubMainContainer } from "./style"
import { Navbar } from "../navbar/index"
import { MainButton } from "../../components/main_button/index"

export const Layout = ({ children }) => {



    return (
        <MainContainer>
            <SubMainContainer>
                <Navbar />
                {children}
            </SubMainContainer>
        </MainContainer>
    )
}