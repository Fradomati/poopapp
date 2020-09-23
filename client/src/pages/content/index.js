import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { withProtected } from "../../../lib/Protect"
import { getContentFN } from "../../services/ContentService"


// Styles

import { Container, A } from "../globalStyles"
import { CntDiv, UlCnt, LiCnt, DivInfo, DivTitle } from "./style"



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
                            <div>{cnt.time}</div>
                            <div>{cnt.category}</div>
                            <div>Like</div>
                            <div>Dislike</div>
                        </DivInfo>
                    </LiCnt>
                }))}
            </UlCnt>
        </CntDiv>
    </Container>
})