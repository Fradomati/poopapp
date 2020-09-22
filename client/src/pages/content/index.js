import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { withProtected } from "../../../lib/Protect"
import { getContentFN } from "../../services/ContentService"


// Styles

import { Container } from "../globalStyles"



export const Content = withProtected(() => {
    useEffect(() => {
        getContentFN().then(e => {
            console.log(e, "Contenido!")
        })
    })
    return <Container>Page of Content | We are working on it...
        <div><Link to="/addContent">Add content Here</Link></div>
    </Container>
})