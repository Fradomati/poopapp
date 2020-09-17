import React, { createContext, useState, useContext, useEffect } from "react";
import { UserSessionContext } from "../../../lib/Authentication/withAuthentication"
import { whoameFN } from "../../services/AuthService";


export const UserInfoContext = createContext();

export const UserInfoProvider = (props) => {

    const { userSession, setUserSession } = useContext(UserSessionContext)
    const [userOn, setUserOn] = useState(null)

    useEffect(() => {
        setUserOn(userSession)
    }, [userSession])

    useEffect(() => {
        whoameFN()
            .then((user) => {
                setUserOn(user)
            })
            .catch((e) => {
                setUserOn(false)
            })
            .finally();
    }, []);





    return (

        <UserInfoContext.Provider value={[userOn, setUserOn]}>
            {props.children}
        </UserInfoContext.Provider>
    )

}