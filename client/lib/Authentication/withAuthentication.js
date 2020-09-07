import React, { useState, useEffect, createContext } from "react";
import { whoameFN } from "../../src/services/AuthService"

export const UserSessionContext = createContext();


/* ERROR EN LA RECARGA DE USUARIO, puede que como tarda tanto en recibir la información del back
carge los datos... quizás podría solucionarse con un "if(!loading)..." */

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
            {!loading && (<Component value={userSession} />)}
        </UserSessionContext.Provider>
    );
};