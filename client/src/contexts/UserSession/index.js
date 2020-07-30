import React, { createContext, useState } from "react";

export const UserSessionContext = createContext();

export const UserSessionProvider = props => {

    const [userSession, setUserSession] = useState(null)



    return (

        <UserSessionContext.Provider value={{ userSession, setUserSession }}>
            {props.children}
        </UserSessionContext.Provider>
    )

}