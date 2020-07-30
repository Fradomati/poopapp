import React, { useState, useEffect, Children } from "react";
import { whoameFN } from "../../src/services/AuthService"
import { UserSessionContext, UserSessionProvider } from "../../src/contexts/UserSession/index.js"
export const withAuthentication = (Component) => () => {
    const [userSession, setUserSession] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Welcome guy :)");
        whoameFN()
            .then((user) => {
                console.log(`Welcome again user ${user.username}`);
                setUserSession(user);
            })
            .catch((e) => {
                console.log("No user logged in");
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <User value={{ userSession }}>
            {loading && (<p>Cargando...</p>)}
            <Component />
        </Session>
    );
};