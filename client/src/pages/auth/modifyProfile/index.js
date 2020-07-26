import React, { useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { modifyFN } from "../../../services/AuthService"

import { UserInfoContext } from "../../../contexts/UserContext/index"




export const ModifyProfile = () => {

    const { userOn, setUserOn } = useContext(UserInfoContext)
    const [changeUser, setChangeUser] = useState(null)
    const [changeEmail, setChangeEmail] = useState(null)
    const [changePass, setChangePass] = useState(null)
    const [err, setErr] = useState()


    const { register, handleSubmit, errors } = useForm(
        {
            mode: "onSubmit"
        }
    );
    const onSubmit = async (data) => {
        const responseServer = await modifyFN(data);

        if (responseServer.status == 417) {
            setErr(responseServer.message)
        } else {
            setUserOn(responseServer)
        }
    };

    const modify = (field) => {
        switch (field) {
            case "User": setChangeUser(true)
                break;
            case "Email": setChangeEmail(true)
                break;
            case "Pass": setChangePass(true)
                break;
            default:
                console.log("Algo falla en Modificar Usuario")
        }
    }


    return (
        <>
            <ul>
                <li>Username: {userOn.username} <button onClick={() => modify("User")}>Modificar</button></li>
                {changeUser && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder={userOn.username} name="username" ref={register({
                            required: true
                        })} />
                    </form>
                )}
                <li>Email: {userOn.email} <button onClick={() => modify("Email")}>Modificar</button></li>
                {changeEmail && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder={userOn.email} name="mail" ref={register({
                            required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                        })} />
                    </form>
                )}
                <li>¿Quieres cambiar la contraseña? <button onClick={() => modify("Pass")}>Modificar</button></li>
                {changePass && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="********" name="password" ref={register({
                            required: true
                        })} />
                    </form>
                )}
            </ul>

        </>
    )
}