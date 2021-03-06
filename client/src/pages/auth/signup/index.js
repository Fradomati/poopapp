import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signupFn } from "../../../services/AuthService"
import { withRouter } from "react-router-dom"


// Styles
import { Container, SubContainer, AuthForm, CenterLogo, Logo, ErrorTxt } from "../../globalStyles"
import { Title, Input, InputSend, TextForgot } from "./style"

// Images

import logo from "../../../../public/images/icons/Pooptime-Logo2.png"

export const Signup = withRouter(({ history }) => {
    const [err, setErr] = useState()
    const { register, handleSubmit, errors } = useForm(
        {
            mode: "onSubmit"
        }
    );
    const onSubmit = async (data) => {
        const responseServer = await signupFn(data);

        if (responseServer.status == 417) {
            setErr(responseServer.message)
        } else {
            history.push("/login")
        }
    };


    if (errors.password) {

        console.log("Error", errors);
    }




    return (
        <Container>
            <SubContainer>
                <div>
                    <CenterLogo>
                        <Logo src={logo}></Logo>
                    </CenterLogo>
                    <AuthForm onSubmit={handleSubmit(onSubmit)}>
                        <Title>Registro</Title>
                        <Input type="text" placeholder="Email" name="mail" ref={register({
                            required: true, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, message: "El formato de email es incorrecto" }
                        })} />
                        {errors?.mail?.message && <ErrorTxt>{errors?.mail?.message}</ErrorTxt>}
                        <Input type="text" placeholder="Contraseña" name="password" ref={register({
                            required: true, min: 8,
                            pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, message: "Mínimo 8 caracteres con al menos 1 letra y número" }
                        })} />
                        {errors?.password?.message && <ErrorTxt>{errors?.password?.message}</ErrorTxt>}

                        <InputSend type="submit" />
                        {err && (<TextForgot>{err}<a href="/login"> ¿Iniciar Sesión?</a></TextForgot>)}
                    </AuthForm>
                </div>
            </SubContainer>
        </Container>
    )
})