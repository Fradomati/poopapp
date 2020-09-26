import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { withProtected } from "../../../lib/Protect"
import { getContentFN, getCategoryFn } from "../../services/ContentService"
import { useForm } from "react-hook-form"


// Styles

import { Container, A, LinkTo, InputSelect } from "../globalStyles"
import { CntDiv, UlCnt, LiCnt, DivInfo, DivTitle, DivBot, Icon, AddBtn } from "./style"

// Img

import time from "../../../public/images/icons/time.png"
import tag from "../../../public/images/icons/tag.png"




export const Content = withProtected(() => {

    const [allCnt, setAllCnt] = useState()

    useEffect(() => {
        getContentFN().then(e => {
            setAllCnt(e)
        })
    }, [])

    // Form to filter category

    const { register, handleSubmit, errors, reset } = useForm(
        {
            mode: "onChange",
            defaultValues: {}
        }
    );

    const onSubmit = async (data) => {
        if (data.category === "-" && data.time === "-") {
            const responseServer = await getContentFN(data)
            setAllCnt(responseServer)
        } else {
            const responseServer = await getCategoryFn(data)
            setAllCnt(responseServer)
        }

    };
    if (errors) console.log(errors);




    return <Container>
        <CntDiv>
            <AddBtn><LinkTo to="/addContent">+</LinkTo></AddBtn>
            <form onChange={handleSubmit(onSubmit)}>
                <select name="category" ref={register()}>
                    <option value="-" >-</option>
                    <option value="Actualidad" >Actualidad</option>
                    <option value="Belleza" >Belleza</option>
                    <option value="Curiosidades">Curiosidades</option>
                    <option value="Empresa">Empresa</option>
                    <option value="Memes">Memes</option>
                    <option value="Moda">Moda</option>
                    <option value="Motor">Motor</option>
                    <option value="Política">Política</option>
                    <option value="Salud">Salud</option>
                    <option value="Salseo">Salseo</option>
                    <option value="Tecnología">Tecnología</option>
                </select>
                <select name="time" ref={register()}>
                    <option value="-">-</option>
                    <option value="0-1">0-1</option>
                    <option value="1-3">1-3</option>
                    <option value="3-5">3-5</option>
                    <option value="5-10">5-10</option>
                    <option value="10-15">10-15</option>
                    <option value="15+">15+</option>
                </select>
            </form>

        </CntDiv>
        <CntDiv>
            <UlCnt>
                {allCnt && (allCnt.map((cnt, i) => {
                    return <LiCnt key={i}>
                        <DivTitle>
                            <A href={cnt.url}>{cnt.title}</A>
                        </DivTitle>
                        <DivInfo>
                            <DivBot onClick={() => onSubmit({ category: "-", time: cnt.time })} > <Icon src={time}></Icon>{cnt.time} min</DivBot>
                            <DivBot onClick={() => onSubmit({ category: cnt.category, time: "-" })}><Icon src={tag}></Icon>{cnt.category}</DivBot>
                            <DivBot>Like</DivBot>
                            <DivBot>Dislike</DivBot>
                        </DivInfo>
                    </LiCnt>
                }))}
            </UlCnt>
        </CntDiv>
    </Container>
})