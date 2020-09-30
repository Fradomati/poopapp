import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { withProtected } from "../../../lib/Protect"
import { getContentFN, getCategoryFn, likeBtn } from "../../services/ContentService"
import { UserInfoContext } from "../../contexts/UserContext/index"
import { useForm } from "react-hook-form"


// Styles

import { Container, A, LinkTo, InputSelect } from "../globalStyles"
import { CntDiv, UlCnt, LiCnt, DivInfo, DivTitle, DivBot, Icon, IconLike, AddBtn } from "./style"

// Img

import time from "../../../public/images/icons/time.png"
import tag from "../../../public/images/icons/tag.png"
import liked from "../../../public/images/icons/+1_on.png"
import like from "../../../public/images/icons/+1_off.png"




export const Content = withProtected(() => {

    const [allCnt, setAllCnt] = useState()
    const [userOn, setUserOn] = useContext(UserInfoContext)
    const [dataCnt, setDataCnt] = useState()

    useEffect(() => {
        getContentFN().then(e => {
            setAllCnt(e)
        })
    }, [])

    // FORM TO FILTER OF CURRENT CONTENT

    const { register, handleSubmit, errors, reset } = useForm(
        {
            mode: "onChange",
            defaultValues: {}
        }
    );

    const onSubmit = async (data) => {
        // store data to prevent update of fav counter
        setDataCnt(data)
        if (data.category === "-" && data.time === "-") {
            const responseServer = await getContentFN(data)
            setAllCnt(responseServer)
        } else {
            const responseServer = await getCategoryFn(data)
            setAllCnt(responseServer)
        }

    };
    if (errors) console.log(errors);

    // FUNCTION ADD / REMOVE LIKE TO CONTENT (LIKE_1 TRUE OR FALSE)
    const goLike = async ({ like_1, id_cnt, id_user }) => {
        const responseServer = await likeBtn({ like_1, id_cnt, id_user })
        console.log(responseServer)
        const updateContent = responseServer.updateCnt
        const updateUser = responseServer.updateUser

        console.log(updateContent.like_1, "Likes on content")
        setUserOn(updateUser)
    }

    // FUNCTION COUNT THE TOTAL LIKES ON CONTENT
    const counter = (data) => {
        if (data.length) {
            return data.length
        } else {
            return 0
        }
    }

    // UPDATE CONTENT WITH NEW LIKES
    useEffect(() => {
        console.log("holaaa", dataCnt)
        if (dataCnt) {
            onSubmit(dataCnt).then(console.log("HECHO"))
        } else {
            getContentFN().then(e => {
                setAllCnt(e)
            })
        }
    }, [userOn])

    // FUNCTION CHECK IF THE USER HAVE CONTENT LIKE SELECTED AND MARK IT ON PAGE

    const isItLiked = (arr) => {
        const id_user = userOn._id
        if (arr.includes(id_user)) {
            return true
        } else {
            false
        }
    }

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
                            {
                                isItLiked(cnt.like_1) === true
                                    ? <DivBot onClick={() => goLike({ like_1: false, id_cnt: cnt._id, id_user: userOn._id })}>{counter(cnt.like_1)} <IconLike src={liked}></IconLike></DivBot>
                                    : <DivBot onClick={() => goLike({ like_1: true, id_cnt: cnt._id, id_user: userOn._id })}>{counter(cnt.like_1)} <IconLike src={like}></IconLike></DivBot>
                            }
                        </DivInfo>
                    </LiCnt>
                }))}
            </UlCnt>
        </CntDiv>
    </Container>
})