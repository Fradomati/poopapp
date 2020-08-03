import React, { useState, useEffect, createContext } from "react";
import { whoameFN } from "../../src/services/AuthService"

export const UserSessionContext = createContext();


export const withAuthentication = (Component) => () => {
    const [loading, setLoading] = useState(true);
    const [userSession, setUserSession] = useState()

    useEffect(() => {
        console.log("Welcome guy :)");
        whoameFN()
            .then((user) => {
                console.log(`Welcome again user ${user.username}`);
                setUserSession(user)
            })
            .catch((e) => {
                console.log("No user logged in");
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <UserSessionContext.Provider value={{ userSession, setUserSession }}>
            {loading && (<p>Cargando...</p>)}
            <Component />
        </UserSessionContext.Provider>
    );
};