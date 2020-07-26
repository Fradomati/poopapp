import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from "react-router-dom";
import { forgotFN } from "../../../services/AuthService"



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
        <>
            <p>Escribe tu correo para mandarte la nueva contraseña:</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Email" name="mail" ref={register({
                    required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                })} />

                <input type="submit" />
            </form>
            {err && (<p>{err}</p>)}

        </>
    )
})