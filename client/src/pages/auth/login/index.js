import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { loginFn } from "../../../services/AuthService";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom"

import { UserInfoContext } from "../../../contexts/UserContext/index"

// Styles
import { Container, SubContainer, AuthForm, CenterLogo, Logo } from "../../globalStyles"
import { Title, Input, InputSend, LinkForgot, textForgot } from "../signup/style"
import { P } from "./style"

// Images 

import logo from "../../../../public/images/icons/Pooptime-Logo2.png"

export const Login = withRouter(({ history }) => {
    const { setUserOn } = useContext(UserInfoContext)
    const [err, setErr] = useState()


    const { register, handleSubmit, errors } = useForm(
        {
            mode: "onSubmit"
        }
    );
    const onSubmit = async (data) => {
        const responseServer = await loginFn(data);

        if (responseServer.status == 417) {
            setErr(responseServer.message)
        } else {
            setUserOn(responseServer)
            localStorage.setItem("sessionOn", true)
            history.push("/")
        }
    };


    // console.log("Error", errors);


    return (
        <Container>
            <SubContainer>
                <div>
                    <CenterLogo>
                        <Logo src={logo}></Logo>
                    </CenterLogo>
                    <AuthForm onSubmit={handleSubmit(onSubmit)}>
                        <Title>Iniciar Sesión</Title>
                        <Input type="text" placeholder="Email" name="mail" ref={register({
                            required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                        })} />

                        <Input type="text" placeholder="Contraseña" name="password" ref={register({
                            required: true, min: 8,
                        })} />

                        <InputSend type="submit" />
                        <Link to="/forgot-password"><LinkForgot>¿Has olvidado la contraseña?</LinkForgot></Link>
                    </AuthForm>
                    {err && (<P>{err}</P>)}
                </div>
            </SubContainer>
        </Container>
    )
})