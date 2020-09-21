import React from "react"
import { Link } from "react-router-dom"
import { withProtected } from "../../../lib/Protect"


export const Content = withProtected(() => {


    return <div>Page of Content | We are working on it...
        <div><Link to="/addContent">Add content Here</Link></div>
    </div>
})