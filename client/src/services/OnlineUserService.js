import { OnlineService } from "./Connections"

export const ON_user = async (id) => {
    const response = await OnlineService.post("/on_user", { id })
    return response.data
}

export const OFF_user = async (id) => {
    const response = await OnlineService.post("/off_user", { id })
    return response.data
}