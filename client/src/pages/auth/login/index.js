import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { loginFn } from "../../../services/AuthService";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom"

import { UserInfoContext } from "../../../contexts/UserContext/index"

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


    console.log("Error", errors);


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Email" name="mail" ref={register({
                    required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                })} />

                <input type="text" placeholder="Contraseña" name="password" ref={register({
                    required: true, min: 8,
                })} />

                <input type="submit" />
            </form>
            {err && (<p>{err}</p>)}
            <Link to="/forgot-password">¿Has olvidado la contraseña?</Link>
        </>
    )
})