import axios from "axios";

axios.defaults.withCredentials = true;


export const authService = axios.create({
    baseURL: `${process.env.BACKEND_URL}/auth`,
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