import React, { useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { modifyFN } from "../../../services/AuthService"
import { withProtected } from "../../../../lib/Protect/index"
import { logoutFn } from "../../../services/AuthService"

// Context

import { UserInfoContext } from "../../../contexts/UserContext/index"

// Styles 

import { Container, SubContainer } from "../../globalStyles"
import { Title, Input } from "../signup/style"
import { Ul, Li, TitleProfile, ImgEdit, ImgLogout } from "./style"

// images 

import edit from "../../../../public/images/icons/editar.png"
import logout from "../../../../public/images/icons/logout.png"


export const ModifyProfile = withProtected(() => {

    const [userOn, setUserOn] = useContext(UserInfoContext)
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
        const id = userOn._id
        const responseServer = await modifyFN(data, id);

        if (responseServer.status == 417) {
            setErr(responseServer.message)
        } else {
            setUserOn(responseServer)
            if (changeUser == true) setChangeUser(null)
            if (changeEmail == true) setChangeEmail(null)
            if (changePass == true) setChangePass(null)

        }
    };

    const modify = (field) => {
        switch (field) {
            case "User": changeUser ? setChangeUser(null) : setChangeUser(true);
                break;
            case "Email": changeEmail ? setChangeEmail(null) : setChangeEmail(true);
                break;
            case "Pass": changePass ? setChangePass(null) : setChangePass(true);
                break;
            default:
                console.log("Algo falla en Modificar Usuario")
        }
    }


    return (
        <Container>
            <SubContainer>
                <Ul>
                    <Title>Mi perfil</Title>
                    <Li><TitleProfile>Nick</TitleProfile> {userOn.username} <ImgEdit src={edit} onClick={() => modify("User")} ></ImgEdit></Li>
                    {changeUser && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input type="text" placeholder={userOn.username} name="username" ref={register({
                                required: true
                            })} />
                            <input type="submit" />
                        </form>
                    )}
                    <Li><TitleProfile>Email</TitleProfile> {userOn.email} <ImgEdit src={edit} onClick={() => modify("Email")} ></ImgEdit></Li>
                    {changeEmail && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input type="text" placeholder={userOn.email} name="mail" ref={register({
                                required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                            })} />
                            <input type="submit" />
                        </form>
                    )}
                    <Li><TitleProfile>¿Quieres cambiar la contraseña?</TitleProfile> ******* <ImgEdit src={edit} onClick={() => modify("Pass")} ></ImgEdit></Li>
                    {changePass && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input type="text" placeholder="********" name="password" ref={register({
                                required: true
                            })} />
                            <input type="submit" />
                        </form>
                    )}
                    <Li><TitleProfile >Salir<ImgLogout src={logout} onClick={async () => {
                        await logoutFn();
                        setUserOn(null)
                        localStorage.setItem("sessionOn", "")
                    }}></ImgLogout></TitleProfile></Li>
                </Ul>

            </SubContainer>
        </Container>
    )
})