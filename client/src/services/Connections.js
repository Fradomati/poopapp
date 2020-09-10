import axios from "axios";


export const authService = axios.create({
    baseURL: `${process.env.BACKEND_URL}/auth`,
    data: someJsonData,
    withCredentials: true
})

export const dataService = axios.create({
    baseURL: `${process.env.BACKEND_URL}/dataTime`,
    withCredentials: true
})

export const OnlineService = axios.create({
    baseURL: `${process.env.BACKEND_URL}/onlinesUser`,
    withCredentials: true
})