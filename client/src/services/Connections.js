import axios from "axios";


export const authService = axios.create({
    baseURL: "http://localhost:3000/auth",
    withCredentials: true
})

export const dataService = axios.create({
    baseURL: "http://localhost:3000/dataTime",
    withCredentials: true
})