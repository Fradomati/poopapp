import React, { useContext, useState } from "react"
import { UserInfoContext } from "../../contexts/UserContext/index"

// Styles
import { ImgRM } from "./style"

// Api & Services 

import { rmLastSessionFN } from "../../services/DataService"

// Images
import yes from "../../../public/images/icons/yes_dark.png"
import not from "../../../public/images/icons/not_dark.png"
import remove from "../../../public/images/icons/remove_dark.png"




export const RemoveButton = ({ value }) => {

    // Context Resource
    const [userOn, setUserOn] = useContext(UserInfoContext)

    // Confirmation Pre-remove

    const [accept, setAccept] = useState(false);


    const { lastTime } = value



    const removeSession = () => {
        console.log("Remove last session")
        if (lastTime.hour == 0 && lastTime.min == 0 && lastTime.sec == 0) {
        } else {
            const id = userOn?._id
            rmLastSessionFN({ id }).then(response => {
                setUserOn(response)
                setAccept(false)

            })
        }
    }


    return (
        <>
            {accept && (<div><ImgRM src={not} onClick={() => { setAccept(false) }} ></ImgRM>
                <ImgRM src={yes} onClick={() => { removeSession() }}></ImgRM></div>)}
            {!accept && (<div><ImgRM src={remove} onClick={() => { setAccept(true) }}></ImgRM></div>)}
        </>
    )

}