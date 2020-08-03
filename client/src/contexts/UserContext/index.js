import React, { createContext, useState, useContext, useEffect } from "react";
import { UserSessionContext } from "../../../lib/Authentication/withAuthentication"


export const UserInfoContext = createContext();

export const UserInfoProvider = (props) => {

    const { userSession, setUserSession } = useContext(UserSessionContext)
    const [userOn, setUserOn] = useState(null)

    useEffect(() => {
        setUserOn(userSession)
    }, [userSession])




    return (

        <UserInfoContext.Provider value={{ userOn, setUserOn, setUserSession }}>
            {props.children}
        </UserInfoContext.Provider>
    )

}