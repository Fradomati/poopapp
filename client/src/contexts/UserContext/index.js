import React, { createContext, useState } from "react";


export const UserInfoContext = createContext();

export const UserInfoProvider = props => {

    const [userOn, setUserOn] = useState(null)



    return (

        <UserInfoContext.Provider value={{ userOn, setUserOn }}>
            {props.children}
        </UserInfoContext.Provider>
    )

}