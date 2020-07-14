import { authService } from "./Connections"
import { getUserName } from "../../lib/Signup/Signup_Username"




export const signupFn = async ({ email, password }) => {
    const username = getUserName(email) // Get username from email
    const response = await authService.post("/signup", {
        email,
        username,
        password
    })

    console.log("New register:", email, username, password)
    return response.data
}

export const loginFn = async ({ email, password }) => {
    const response = await authService.post("/login", {
        email,
        password
    })

    console.log("Login user:", email, password, response.data)
    return response.data
}

export const logoutFn = async () => {
    const response = await authService.post("/logout");
    console.log("[LOGOUT]", response.data);
    return response.data;
};