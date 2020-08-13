import { dataService } from "./Connections"

export const sendTimeFN = async ({ id, seconds, day, hour, lastTime }) => {
    const response = await dataService.post("/sendtime", { id, seconds, day, hour, lastTime })
    return response.data
}