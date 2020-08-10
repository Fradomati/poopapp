import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signupFn } from "../../../services/AuthService"
import { withRouter } from "react-router-dom"


// Styles
import { Container, SubContainer, AuthForm } from "../../globalStyles"
import { Title, Input, InputSend, TextForgot } from "./style"

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


    console.log("Error", errors);


    return (
        <Container>
            <SubContainer>



                <AuthForm onSubmit={handleSubmit(onSubmit)}>
                    <Title>Registro</Title>
                    <Input type="text" placeholder="Email" name="mail" ref={register({
                        required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                    })} />
                    <Input type="text" placeholder="Contraseña" name="password" ref={register({
                        required: true, min: 8,
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i
                    })} />

                    <InputSend type="submit" />
                    {err && (<TextForgot>{err}<a href="/login"> ¿Iniciar Sesión?</a></TextForgot>)}
                </AuthForm>
            </SubContainer>
        </Container>
    )
})