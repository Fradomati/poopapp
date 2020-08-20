import axios from "axios";


export const authService = axios.create({
    baseURL: `${process.env.BACKEND_URL}/auth`,
    withCredentials: true
})

export const dataService = axios.create({
    baseURL: `${process.env.BACKEND_URL}/dataTime`,
    withCredentials: true
})