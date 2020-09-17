import React, { useContext } from "react"
import { UserInfoContext } from "../../contexts/UserContext/index"



// Api & Services 

import { rmLastSessionFN } from "../../services/DataService"



export const RemoveButton = ({ value }) => {

    // Context Resource
    const [userOn, setUserOn] = useContext(UserInfoContext)


    const { lastTime } = value


    const removeSession = () => {
        console.log("Remove last session")
        if (lastTime.hour == 0 && lastTime.min == 0 && lastTime.sec == 0) {
        } else {
            const id = userOn?._id
            rmLastSessionFN({ id }).then(response => {
                setUserOn(response)
            })
        }
    }


    return <button onClick={() => { removeSession() }}>Remove</button>

}