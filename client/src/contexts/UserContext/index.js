import React, { createContext, useState, useContext, useEffect } from "react";
import { UserSessionContext } from "../../../lib/Authentication/withAuthentication"


export const UserInfoContext = createContext();

export const UserInfoProvider = (props) => {

    const { userSession } = useContext(UserSessionContext)
    const [userOn, setUserOn] = useState(null)

    useEffect(() => {
        setUserOn(userSession)
    }, [userSession])




    return (

        <UserInfoContext.Provider value={{ userOn, setUserOn }}>
            {props.children}
        </UserInfoContext.Provider>
    )

}