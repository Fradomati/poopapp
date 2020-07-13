import React, { createContext, useState } from "react"


export const UserInfoContext = createContext();

export const UserInfoProvider = props => {

    const [userOn, setUserOn] = useState()

    return (

        <UserContext.Provider value={{ userOn, setUserOn }}>
            {props.children}
        </UserContext.Provider>
    )

}