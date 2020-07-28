import React, { useContext, useState, useEffect } from "react";
// import { fnWhoame, UserContext } from "../src/connects/authConnect";
// import { Loading } from "./loading/preLoad";

// export const withAuthentication = (Component) => () => {
//     const [user, setUser] = useState();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         console.log("Welcome guy :)");
//         fnWhoame()
//             .then((user) => {
//                 console.log(`Welcome again user ${user.username}`);
//                 setUser(user);
//             })
//             .catch((e) => {
//                 console.log("No user logged in");
//             })
//             .finally(() => setLoading(false));
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser, loading }}>
//             {loading && (<p>Cargando...</p>)}
//             <Component />
//         </UserContext.Provider>
//     );
// };