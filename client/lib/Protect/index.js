import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserInfoContext } from "../../src/contexts/UserContext/index"



export const withProtected = (Component) => () => {

    const { userOn } = useContext(UserInfoContext);




    if (userOn) {
        return <Component />;
    } else {
        return <Redirect to="/signup" />;
    }
};
