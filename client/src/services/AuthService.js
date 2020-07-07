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