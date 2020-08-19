import axios from "axios";


export const authService = axios.create({
    baseURL: `${process.env.BACKEND_URL}/api/auth`,
    withCredentials: true
})

export const dataService = axios.create({
    baseURL: `${process.env.BACKEND_URL}/api/dataTime`,
    withCredentials: true
})