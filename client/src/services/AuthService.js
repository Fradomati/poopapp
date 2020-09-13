import { authService } from "./Connections"
import { getUserName } from "../../lib/Signup/Signup_Username"




export const signupFn = async ({ mail, password }) => {
    let email = mail.toLowerCase()
    const username = getUserName(email) // Get username from email
    const response = await authService.post("/signup", {
        email,
        username,
        password
    })

    return response.data
}

export const loginFn = async ({ mail, password }) => {
    let email = mail.toLowerCase()
    const response = await authService.post("/login", { withCredentials: true }, {
        email,
        password
    }
    )
    return response.data
}

export const logoutFn = async () => {
    const response = await authService.post("/logout");
    console.log("bye")
    return response.data;
};


export const forgotFN = async ({ mail }) => {
    let email = mail.toLowerCase()
    const response = await authService.post("/forgotPassWord", { email })
    return response.data
}

export const whoameFN = async () => {
    const response = await authService.get("/whoame")
    return response.data
}

export const modifyFN = async (data, id) => {

    if (data.username) {
        const username = data.username
        const response = await authService.post("/modifyProfile", { id, username })
        return response.data
    }

    if (data.mail) {
        let mail = data.mail
        let email = mail.toLowerCase()
        const response = await authService.post("/modifyProfile", { id, email })
        return response.data
    }

    if (data.password) {
        const password = data.password
        const response = await authService.post("/modifyProfile", { id, password })
        return response.data
    }

}