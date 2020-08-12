import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from "react-router-dom";
import { forgotFN } from "../../../services/AuthService"


// Styles
import { Container, SubContainer, AuthForm } from "../../globalStyles"
import { Title, Input, InputSend } from "../signup/style"
import { P } from "./style"

export const ForgotPassword = withRouter(({ history }) => {

    const [err, setErr] = useState()


    const { register, handleSubmit, errors } = useForm(
        {
            mode: "onSubmit"
        }
    );
    const onSubmit = async (data) => {
        const responseServer = await forgotFN(data);

        if (responseServer.status == 417) {
            setErr(responseServer.message)
        } else {
            console.log(responseServer.message)
            history.push("/login")
        }
    };


    console.log("Error", errors);


    return (
        <Container>
            <SubContainer>

                <AuthForm onSubmit={handleSubmit(onSubmit)}>
                    <Title>Cambio de Contraseña</Title>
                    <P>Escribe tu correo y te enviamos una nueva contraseña:</P>
                    <Input type="text" placeholder="Email" name="mail" ref={register({
                        required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                    })}></Input>

                    <InputSend type="submit" ></InputSend>
                </AuthForm>
                {err && (<p>{err}</p>)}

            </SubContainer>
        </Container>
    )
})