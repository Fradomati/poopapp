import React, { useState, useEffect, createContext } from "react";
import { whoameFN } from "../../src/services/AuthService"

export const UserSessionContext = createContext();


export const withAuthentication = (Component) => () => {
    const [loading, setLoading] = useState(true);
    const [userSession, setUserSession] = useState()

    useEffect(() => {
        whoameFN()
            .then((user) => {
                setUserSession(user)
            })
            .catch((e) => {
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