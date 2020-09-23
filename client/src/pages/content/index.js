import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { withProtected } from "../../../lib/Protect"
import { getContentFN } from "../../services/ContentService"


// Styles

import { Container, A } from "../globalStyles"
import { CntDiv, UlCnt, LiCnt, DivInfo, DivTitle, DivBot, Icon } from "./style"

// Img

import time from "../../../public/images/icons/time.png"
import tag from "../../../public/images/icons/tag.png"




export const Content = withProtected(() => {

    const [allCnt, setAllCnt] = useState()

    useEffect(() => {
        getContentFN().then(e => {
            console.log(e, "Contenido!")
            setAllCnt(e)
        })
    }, [])

    return <Container>
        <div><Link to="/addContent">Add content Here</Link></div>
        <CntDiv>
            <UlCnt>
                {allCnt && (allCnt.map((cnt, i) => {
                    return <LiCnt key={i}>
                        <DivTitle>
                            <A href={cnt.url}>{cnt.title}</A>
                        </DivTitle>
                        <DivInfo>
                            <DivBot><Icon src={time}></Icon>{cnt.time} min</DivBot>
                            <DivBot><Icon src={tag}></Icon>{cnt.category}</DivBot>
                            <DivBot>Like</DivBot>
                            <DivBot>Dislike</DivBot>
                        </DivInfo>
                    </LiCnt>
                }))}
            </UlCnt>
        </CntDiv>
    </Container>
})