import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserInfoContext } from "../../src/contexts/UserContext/index"



export const withProtected = (Component) => () => {

    const { userOn } = useContext(UserInfoContext);

    console.log("WithProtect", userOn)


    if (userOn == null) {
        return <p>Loading...</p>
    } else {
        if (userOn == false) {
            return <Redirect to="/login" />;
        } else {
            return <Component />;
        }
    }
};
