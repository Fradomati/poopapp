import React, { useContext, useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { withProtected } from "../../../../lib/Protect/index"
import { addContentFN } from "../../../services/ContentService"

// Context

import { UserInfoContext } from "../../../contexts/UserContext"

// Styles 

import { Input, InputSend, Title } from "../../auth/signup/style"
import { Container, AuthForm, InputSelect } from "../../globalStyles"
import { TitleProfile } from "../../auth/modifyProfile/style"
import { ContainerAdd, TextAdded } from "./style"






export const AddContent = withProtected(() => {

    const [userOn, setUserOn] = useContext(UserInfoContext)
    const [message, setMessage] = useState(false)
    const placeholder = {
        title: "Título o pequeña descripción",
        url: "URL/Enlace que quieres compartir"
    }

    const { register, handleSubmit, errors, reset } = useForm(
        {
            mode: "onSubmit",
            defaultValues: {}
        }
    );


    const onSubmit = async (data, e) => {
        // Add id to obj
        data.id = userOn._id
        const responseServer = await addContentFN(data)
        setMessage({ title: responseServer.title, category: responseServer.category })
        e.target.reset();
    };
    if (errors) console.log(errors);

    return (
        <Container>
            <ContainerAdd>
                {message && (<TextAdded>¡Genial! Has agregado a <b>{message.category}</b>:<br /> <b>"{message.title}"</b></TextAdded>)}
                <AuthForm onSubmit={handleSubmit(onSubmit)}>
                    <Title>Añadir Contenido</Title>
                    <TitleProfile>Título</TitleProfile>
                    <Input type="text" placeholder={placeholder.title} name="title" ref={register({ required: true })} />
                    <TitleProfile>URL / Link</TitleProfile>
                    <Input type="text" placeholder={placeholder.url} name="url" ref={register({ required: true })} />
                    <TitleProfile>Categoría</TitleProfile>
                    <InputSelect name="category" ref={register({ required: true })}>
                        <option value="Actualidad">Actualidad</option>
                        <option value="Belleza">Belleza</option>
                        <option value="Curiosidades">Curiosidades</option>
                        <option value="Empresa">Empresa</option>
                        <option value="Memes">Memes</option>
                        <option value="Moda">Moda</option>
                        <option value="Motor">Motor</option>
                        <option value="Política">Política</option>
                        <option value="Salud">Salud</option>
                        <option value="Salseo">Salseo</option>
                        <option value="Tecnología">Tecnología</option>
                    </InputSelect>
                    <TitleProfile>Tiempo aprox. en minutos</TitleProfile>
                    <InputSelect name="time" ref={register({ required: true })}>
                        <option value="0-1">0-1</option>
                        <option value="1-3">1-3</option>
                        <option value="3-5">3-5</option>
                        <option value="5-10">5-10</option>
                        <option value="10-15">10-15</option>
                        <option value="15+">15+</option>
                    </InputSelect>

                    <InputSend type="submit" />
                </AuthForm>
            </ContainerAdd>
        </Container>
    );
})